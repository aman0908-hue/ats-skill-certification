import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizApi } from '../../services/api';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Send,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';

const QuizArenaPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // questionId -> [optionId]
  const [flagged, setFlagged] = useState({}); // questionId -> boolean
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const timerRef = useRef(null);

  // Initialize or resume attempt
  useEffect(() => {
    const initQuiz = async () => {
      try {
        const res = await quizApi.startAttempt(courseId);
        const data = res.data.data;
        setAttempt(data);

        // Calculate timer from server expiresAt
        const expiry = new Date(data.expiresAt).getTime();
        const now = new Date().getTime();
        const remaining = Math.max(0, Math.floor((expiry - now) / 1000));
        setSecondsRemaining(remaining);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not initiate examination');
      } finally {
        setLoading(false);
      }
    };

    initQuiz();
  }, [courseId]);

  // Live countdown timer
  useEffect(() => {
    if (secondsRemaining === null || secondsRemaining <= 0) return;

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [secondsRemaining]);

  const handleAutoSubmit = () => {
    alert('Time has expired! Submitting your examination automatically...');
    executeSubmission();
  };

  const handleSelectOption = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: [optionId],
    }));
  };

  const toggleFlag = (questionId) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const executeSubmission = async () => {
    if (!attempt || submitting) return;
    setSubmitting(true);
    try {
      const res = await quizApi.submitAttempt(attempt.attemptId, answers);
      const result = res.data.data;
      navigate(`/result/${attempt.attemptId}`, { state: { result } });
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting examination');
      setSubmitting(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    if (totalSeconds === null) return '--:--';
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-slate-400">Loading examination environment securely...</p>
        </div>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
        <div className="max-w-md bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-4">
          <ShieldAlert className="h-12 w-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Examination Ineligible</h2>
          <p className="text-sm text-slate-400">{error || 'Unable to access examination arena.'}</p>
          <button
            onClick={() => navigate('/courses')}
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-xl text-sm"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = attempt.questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const isTimerCritical = secondsRemaining !== null && secondsRemaining < 120; // < 2 mins

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-white">
      
      {/* Top Test Header Bar */}
      <header className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-8 py-3.5 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                {attempt.courseTitle}
              </h1>
              <p className="text-[11px] text-teal-400 font-medium">ATS Skill Certification Assessment</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border font-mono font-bold text-sm sm:text-base transition-all ${
            isTimerCritical
              ? 'bg-rose-950/80 border-rose-500 text-rose-400 animate-pulse'
              : 'bg-slate-800 border-slate-700 text-teal-300'
          }`}>
            <Clock className="h-4 w-4" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

        </div>
      </header>

      {/* Main Examination Arena */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Question Workspace */}
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Question Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-extrabold text-teal-400 tracking-wider">
                  Question {currentIdx + 1} of {attempt.questions.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleFlag(currentQuestion.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  flagged[currentQuestion.id]
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Flag className="h-3.5 w-3.5" />
                <span>{flagged[currentQuestion.id] ? 'Flagged for Review' : 'Flag Question'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
              {currentQuestion.questionText}
            </div>

            {/* MCQ Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id]?.[0] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-3.5 group ${
                      isSelected
                        ? 'bg-teal-950/60 border-teal-500 text-white shadow-md'
                        : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${
                      isSelected ? 'border-teal-400 bg-teal-500' : 'border-slate-600 group-hover:border-slate-500'
                    }`}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-slate-950"></div>}
                    </div>

                    <span className="text-sm font-medium leading-relaxed">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Question Navigation Controls */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              {currentIdx < attempt.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIdx((prev) => Math.min(attempt.questions.length - 1, prev + 1))}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow"
                >
                  <span>Next Question</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSubmitModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 text-xs font-extrabold flex items-center space-x-1.5 transition shadow-lg"
                >
                  <Send className="h-4 w-4" />
                  <span>Review &amp; Finish</span>
                </button>
              )}
            </div>

          </div>

          {/* Question Palette Sidebar */}
          <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="font-bold text-white text-sm">Question Navigation Palette</h3>

            {/* Circles Grid */}
            <div className="grid grid-cols-5 gap-2.5">
              {attempt.questions.map((q, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = !!answers[q.id]?.length;
                const isFlagged = !!flagged[q.id];

                let bgClasses = 'bg-slate-950 border-slate-800 text-slate-400';
                if (isAnswered) bgClasses = 'bg-teal-900/70 border-teal-500 text-teal-200';
                if (isFlagged) bgClasses = 'bg-amber-950/70 border-amber-500 text-amber-200';
                if (isCurrent) bgClasses += ' ring-2 ring-white ring-offset-2 ring-offset-slate-900 font-extrabold';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-10 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${bgClasses}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend & Stats */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span>Answered:</span>
                <span className="font-bold text-teal-400">{answeredCount} of {attempt.questions.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Unanswered:</span>
                <span className="font-bold text-slate-400">{attempt.questions.length - answeredCount}</span>
              </div>
            </div>

            {/* Big Finish Button */}
            <button
              type="button"
              onClick={() => setSubmitModalOpen(true)}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Submit Examination</span>
            </button>
          </div>

        </div>
      </main>

      {/* Submit Confirmation Modal */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="h-12 w-12 rounded-2xl bg-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto">
              <Send className="h-6 w-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Finalize Examination?</h3>
              <p className="text-xs text-slate-400">
                You have answered <strong className="text-white">{answeredCount}</strong> out of <strong className="text-white">{attempt.questions.length}</strong> questions.
              </p>
              {answeredCount < attempt.questions.length && (
                <p className="text-xs text-amber-400 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  Warning: You still have {attempt.questions.length - answeredCount} unanswered questions!
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
              >
                Return to Exam
              </button>
              <button
                type="button"
                onClick={executeSubmission}
                disabled={submitting}
                className="py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition shadow flex items-center justify-center space-x-1.5 disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Yes, Submit Now</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuizArenaPage;
