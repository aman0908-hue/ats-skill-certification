import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coursesApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  Clock, 
  Layers, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Award, 
  ArrowLeft, 
  Play,
  FileText,
  Lock
} from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

const CourseDetailPage = () => {
  const { idOrSlug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useSEO({
    title: course ? `${course.title} (${course.category}) Certification Exam` : 'Course Details',
    description: course ? course.description : 'Official industry certification examination syllabus and requirements.',
    canonicalPath: `/courses/${idOrSlug}`
  });

  useEffect(() => {
    const fetchCourseAndEligibility = async () => {
      setLoading(true);
      try {
        const res = await coursesApi.getByIdOrSlug(idOrSlug);
        const courseData = res.data.data;
        setCourse(courseData);

        if (user) {
          const eligRes = await coursesApi.checkEligibility(courseData.id);
          setEligibility(eligRes.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndEligibility();
  }, [idOrSlug, user]);

  const handleStartExam = () => {
    if (!user) {
      navigate('/login', { state: { from: `/courses/${idOrSlug}` } });
      return;
    }
    navigate(`/quiz/${course.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200">
          <AlertTriangle className="h-12 w-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900">Course Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">{error || 'This certification track does not exist.'}</p>
          <Link
            to="/courses"
            className="mt-6 inline-flex items-center space-x-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Courses</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/courses"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Courses</span>
        </Link>

        {/* Header Hero Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <div className="inline-block bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {course.category}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-base max-w-3xl leading-relaxed">
              {course.description}
            </p>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-teal-400" />
                <span>Duration: <strong>{course.durationMinutes} Minutes</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Layers className="h-4 w-4 text-teal-400" />
                <span>Questions: <strong>{course.questionCount} MCQs</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-amber-400" />
                <span>Passing: <strong>{course.passingPercentage}%</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-teal-400" />
                <span>Attempts: <strong>{course.maxAttempts} Allowed</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Syllabus & Instructions */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Syllabus */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 text-teal-600 mr-2" />
                Curriculum Syllabus
              </h2>

              {course.syllabus && course.syllabus.length > 0 ? (
                <ul className="space-y-3">
                  {course.syllabus.map((topic, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-700">
                      <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{topic}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">Comprehensive academic syllabus aligned with standard university curriculum.</p>
              )}
            </div>

            {/* Exam Rules */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <ShieldCheck className="h-5 w-5 text-amber-600 mr-2" />
                Examination Instructions &amp; Anti-Cheat Rules
              </h2>

              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-teal-600 mr-2 mt-0.5 shrink-0" />
                  <span>The examination runs under a strict server-enforced countdown timer of {course.durationMinutes} minutes.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-teal-600 mr-2 mt-0.5 shrink-0" />
                  <span>When the deadline expires, all answered questions are automatically submitted and locked.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-teal-600 mr-2 mt-0.5 shrink-0" />
                  <span>To earn your digital certificate, you must achieve at least {course.passingPercentage}%.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-teal-600 mr-2 mt-0.5 shrink-0" />
                  <span>Each certificate is cryptographically signed and verifiable via QR code.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-28">
              <h3 className="font-bold text-slate-900 text-base mb-4">
                Certification Status
              </h3>

              {!user ? (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
                    Please log in to verify your attempt eligibility and start the examination.
                  </div>
                  <Link
                    to="/login"
                    state={{ from: `/courses/${course.id}` }}
                    className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 transition shadow-md"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Log In to Attempt Exam</span>
                  </Link>
                </div>
              ) : eligibility?.alreadyPassed ? (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-800 text-xs font-medium space-y-1">
                    <p className="font-bold text-sm">Exam Passed!</p>
                    <p>You have already earned your official certificate for this course.</p>
                  </div>
                  <Link
                    to="/my-certificates"
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 transition shadow"
                  >
                    <Award className="h-4 w-4 text-amber-400" />
                    <span>View Your Certificate</span>
                  </Link>
                </div>
              ) : eligibility && !eligibility.eligible && !eligibility.activeAttemptId ? (
                <div className="space-y-4">
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-800 text-xs font-medium">
                    <p className="font-bold text-sm">Attempt Limit Reached</p>
                    <p className="mt-1">{eligibility.reason || 'You have exhausted the maximum allowed attempts for this course.'}</p>
                  </div>
                  <Link
                    to="/courses"
                    className="w-full py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold rounded-xl text-xs flex items-center justify-center transition"
                  >
                    Browse Other Courses
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-teal-50/70 border border-teal-200 p-4 rounded-xl text-teal-900 text-xs space-y-1.5">
                    <div className="flex items-center space-x-1 font-bold text-teal-800">
                      <CheckCircle className="h-4 w-4 text-teal-600" />
                      <span>Ready to Test</span>
                    </div>
                    <p className="text-teal-700">
                      Ensure a stable internet connection. You will have {course.durationMinutes} minutes once started.
                    </p>
                  </div>

                  <button
                    onClick={handleStartExam}
                    className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-teal-900/20"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    <span>{eligibility?.activeAttemptId ? 'Resume Active Exam' : 'Start Certification Exam'}</span>
                  </button>
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                AmanTech Solutions Assessment Engine
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CourseDetailPage;
