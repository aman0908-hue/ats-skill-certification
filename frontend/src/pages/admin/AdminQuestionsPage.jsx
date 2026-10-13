import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  X,
  FileQuestion,
  Upload,
  FileCode,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const AdminQuestionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCourseIdFromUrl = searchParams.get('courseId') || '';

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(selectedCourseIdFromUrl);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Single Question Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctOptionId, setCorrectOptionId] = useState('opt1');
  const [explanation, setExplanation] = useState('');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [error, setError] = useState(null);

  // Bulk Question Modal & Parser State
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkRawText, setBulkRawText] = useState('');
  const [bulkParsedQuestions, setBulkParsedQuestions] = useState([]);
  const [bulkImporting, setBulkImporting] = useState(false);
  const [bulkError, setBulkError] = useState(null);
  const [bulkSuccess, setBulkSuccess] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await adminApi.getCourses();
        const content = res.data?.data?.content || [];
        setCourses(content);

        if (content.length > 0 && !selectedCourseId) {
          setSelectedCourseId(content[0].id);
        }
      } catch (err) {
        console.error('Failed to load courses', err);
      }
    };
    fetchCourses();
  }, []);

  const fetchQuestions = async (cId) => {
    if (!cId) return;
    setLoading(true);
    try {
      const res = await adminApi.getCourseQuestions(cId);
      if (res.data?.data) {
        setQuestions(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load questions', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCourseId) {
      fetchQuestions(selectedCourseId);
      searchParams.set('courseId', selectedCourseId);
      setSearchParams(searchParams);
    }
  }, [selectedCourseId]);

  const openCreateModal = () => {
    setEditingQuestion(null);
    setQuestionText('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setOpt4('');
    setCorrectOptionId('opt1');
    setExplanation('');
    setDifficulty('MEDIUM');
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (q) => {
    setEditingQuestion(q);
    setQuestionText(q.questionText);
    setOpt1(q.options[0]?.text || '');
    setOpt2(q.options[1]?.text || '');
    setOpt3(q.options[2]?.text || '');
    setOpt4(q.options[3]?.text || '');
    setCorrectOptionId(q.correctOptionIds[0] || 'opt1');
    setExplanation(q.explanation || '');
    setDifficulty(q.difficulty || 'MEDIUM');
    setError(null);
    setModalOpen(true);
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    setError(null);

    const options = [
      { id: 'opt1', text: opt1.trim() },
      { id: 'opt2', text: opt2.trim() },
      { id: 'opt3', text: opt3.trim() },
      { id: 'opt4', text: opt4.trim() },
    ].filter((o) => o.text.length > 0);

    if (options.length < 2) {
      setError('Please provide at least 2 options');
      return;
    }

    const payload = {
      questionText: questionText.trim(),
      options,
      correctOptionIds: [correctOptionId],
      explanation: explanation.trim(),
      difficulty,
    };

    try {
      if (editingQuestion) {
        await adminApi.updateQuestion(editingQuestion.id, payload);
      } else {
        await adminApi.createQuestion(selectedCourseId, payload);
      }
      setModalOpen(false);
      fetchQuestions(selectedCourseId);
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving question');
    }
  };

  const handleDelete = async (qId) => {
    if (window.confirm('Delete this question?')) {
      try {
        await adminApi.deleteQuestion(qId);
        fetchQuestions(selectedCourseId);
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete question');
      }
    }
  };

  const parseBulkText = (raw) => {
    setBulkRawText(raw);
    setBulkError(null);
    setBulkSuccess(null);

    const trimmed = raw.trim();
    if (!trimmed) {
      setBulkParsedQuestions([]);
      return;
    }

    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          const list = parsed.map((item, idx) => {
            let opts = [];
            if (Array.isArray(item.options)) {
              opts = item.options.map((opt, oIdx) => {
                if (typeof opt === 'string') {
                  return { id: String(oIdx + 1), text: opt };
                }
                return { id: opt.id || String(oIdx + 1), text: opt.text || '' };
              });
            }
            let correctId = '1';
            if (item.correctOptionIds && item.correctOptionIds[0]) {
              correctId = item.correctOptionIds[0];
            } else if (item.correctOption) {
              const co = String(item.correctOption).toUpperCase().trim();
              if (co === 'A' || co === '1') correctId = '1';
              else if (co === 'B' || co === '2') correctId = '2';
              else if (co === 'C' || co === '3') correctId = '3';
              else if (co === 'D' || co === '4') correctId = '4';
            }
            return {
              questionText: item.questionText || `Question ${idx + 1}`,
              options: opts,
              correctOptionIds: [correctId],
              explanation: item.explanation || 'Verified answer standard.',
              difficulty: item.difficulty || 'MEDIUM',
            };
          });
          setBulkParsedQuestions(list);
          return;
        }
      } catch (_) {}
    }

    const blocks = trimmed.split(/\n\s*\n+/);
    const parsedList = [];

    for (const block of blocks) {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length < 3) continue;

      let qText = '';
      const options = [];
      let correctLetter = 'A';
      let explanation = '';

      for (const line of lines) {
        const lower = line.toLowerCase();
        if (lower.startsWith('answer:') || lower.startsWith('ans:') || lower.startsWith('correct:')) {
          const ansVal = line.replace(/^(answer|ans|correct):/i, '').trim().toUpperCase();
          if (ansVal.length > 0) correctLetter = ansVal[0];
        } else if (lower.startsWith('explanation:') || lower.startsWith('exp:')) {
          explanation = line.replace(/^(explanation|exp):/i, '').trim();
        } else if (/^[A-Da-d][\)\.\:\-]\s*/.test(line)) {
          const text = line.replace(/^[A-Da-d][\)\.\:\-]\s*/, '').trim();
          const letter = line[0].toUpperCase();
          const idMap = { 'A': '1', 'B': '2', 'C': '3', 'D': '4' };
          options.push({ id: idMap[letter] || String(options.length + 1), text });
        } else if (/^[1-4][\)\.\:\-]\s*/.test(line) && qText) {
          const text = line.replace(/^[1-4][\)\.\:\-]\s*/, '').trim();
          options.push({ id: String(options.length + 1), text });
        } else if (!qText) {
          qText = line.replace(/^Q?\d+[\.\:\)\-]?\s*/i, '').trim();
        }
      }

      if (qText && options.length >= 2) {
        const letterToId = { 'A': '1', 'B': '2', 'C': '3', 'D': '4', '1': '1', '2': '2', '3': '3', '4': '4' };
        const correctId = letterToId[correctLetter] || '1';
        parsedList.push({
          questionText: qText,
          options,
          correctOptionIds: [correctId],
          explanation: explanation || 'Standard syllabus answer rationale.',
          difficulty: 'MEDIUM',
        });
      }
    }

    setBulkParsedQuestions(parsedList);
  };

  const handleBulkSubmit = async () => {
    if (!selectedCourseId) {
      setBulkError('Please select a course first');
      return;
    }
    if (bulkParsedQuestions.length === 0) {
      setBulkError('No valid questions parsed. Please check the input format.');
      return;
    }

    setBulkImporting(true);
    setBulkError(null);
    setBulkSuccess(null);

    try {
      const res = await adminApi.bulkCreateQuestions(selectedCourseId, bulkParsedQuestions);
      setBulkSuccess(`Successfully imported ${res.data?.data?.length || bulkParsedQuestions.length} questions into course question bank!`);
      fetchQuestions(selectedCourseId);
      setTimeout(() => {
        setBulkModalOpen(false);
        setBulkRawText('');
        setBulkParsedQuestions([]);
        setBulkSuccess(null);
      }, 1500);
    } catch (err) {
      setBulkError(err.response?.data?.message || 'Failed to bulk import questions');
    } finally {
      setBulkImporting(false);
    }
  };

  const loadSampleQuestions = () => {
    const sample = `1. What is the primary purpose of a Zero Trust Architecture?
A) Trust all devices inside the private office network
B) Continuously authenticate and verify every request regardless of network boundary
C) Eliminate the use of passwords completely
D) Rely exclusively on physical security keys
Answer: B
Explanation: Zero Trust enforces continuous authentication and least privilege everywhere.

2. Which metric evaluates customer acquisition cost efficiency relative to lifetime value?
A) P/E Ratio
B) LTV to CAC Ratio
C) Current Ratio
D) Inventory Turnover
Answer: B
Explanation: A healthy recurring business model aims for an LTV:CAC ratio of 3:1 or higher.

3. In Python, which Pandas method replaces missing or NaN values?
A) dropna()
B) fillna()
C) replace_nan()
D) impute()
Answer: B
Explanation: fillna() replaces NaN values with provided scalars or statistical aggregates.`;
    parseBulkText(sample);
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <Link to="/admin" className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 mb-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Question Bank Management
            </h1>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {/* Course Selector */}
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-500 max-w-xs"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.category})
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setBulkError(null);
                setBulkSuccess(null);
                setBulkModalOpen(true);
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition shrink-0 shadow-sm"
            >
              <Upload className="h-4 w-4" />
              <span>Bulk Import MCQs</span>
            </button>

            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Add Question</span>
            </button>
          </div>
        </div>

        {/* Questions List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : questions.length === 0 ? (
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-12 text-center max-w-md mx-auto">
            <FileQuestion className="h-10 w-10 text-slate-500 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">No questions in this pool</h3>
            <p className="text-xs text-slate-400 mt-1">Add MCQs to allow students to take this exam.</p>
            <button
              onClick={openCreateModal}
              className="mt-4 px-4 py-2 bg-teal-600 text-white font-bold rounded-xl text-xs"
            >
              Add First Question
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={q.id} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                      Question #{idx + 1} &bull; {q.difficulty}
                    </span>
                    <h3 className="text-base font-bold text-white">{q.questionText}</h3>
                  </div>

                  <div className="flex space-x-2 shrink-0">
                    <button
                      onClick={() => openEditModal(q)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-1.5 bg-slate-900 hover:bg-rose-950 text-rose-400 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Options display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt) => {
                    const isCorrect = q.correctOptionIds?.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-xl border flex items-center space-x-2 ${
                          isCorrect
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {isCorrect && <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                        <span>{opt.text}</span>
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <p className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingQuestion ? 'Edit Question' : 'Add Multiple Choice Question'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="bg-rose-950/80 border border-rose-500 text-rose-300 text-xs p-3 rounded-xl flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold uppercase mb-1">Question Text</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-slate-400 font-semibold uppercase mb-1">
                  Answer Choices (Select radio button for Correct Answer)
                </label>

                <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOptionId === 'opt1'}
                    onChange={() => setCorrectOptionId('opt1')}
                  />
                  <input
                    type="text"
                    value={opt1}
                    onChange={(e) => setOpt1(e.target.value)}
                    placeholder="Option 1"
                    required
                    className="w-full bg-transparent text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOptionId === 'opt2'}
                    onChange={() => setCorrectOptionId('opt2')}
                  />
                  <input
                    type="text"
                    value={opt2}
                    onChange={(e) => setOpt2(e.target.value)}
                    placeholder="Option 2"
                    required
                    className="w-full bg-transparent text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOptionId === 'opt3'}
                    onChange={() => setCorrectOptionId('opt3')}
                  />
                  <input
                    type="text"
                    value={opt3}
                    onChange={(e) => setOpt3(e.target.value)}
                    placeholder="Option 3"
                    className="w-full bg-transparent text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOptionId === 'opt4'}
                    onChange={() => setCorrectOptionId('opt4')}
                  />
                  <input
                    type="text"
                    value={opt4}
                    onChange={(e) => setOpt4(e.target.value)}
                    placeholder="Option 4"
                    className="w-full bg-transparent text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase mb-1">Explanation (Post-Exam Feedback)</label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Rationale for the correct answer..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk MCQ Import Modal */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Upload className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-bold text-white">Bulk MCQ Auto-Importer</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Paste raw plain text questions (A/B/C/D format) or JSON array. The parser will automatically format and link them into this course.
                </p>
              </div>
              <button
                onClick={() => setBulkModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {bulkError && (
              <div className="bg-rose-950/70 border border-rose-500 text-rose-300 text-xs p-3.5 rounded-xl flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{bulkError}</span>
              </div>
            )}

            {bulkSuccess && (
              <div className="bg-emerald-950/70 border border-emerald-500 text-emerald-300 text-xs p-3.5 rounded-xl flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{bulkSuccess}</span>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400">Target Course:</span>
                <span className="font-bold text-teal-400">
                  {courses.find((c) => c.id === selectedCourseId)?.title || 'Selected Course'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={loadSampleQuestions}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold flex items-center space-x-1.5 transition"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Load Sample MCQs</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBulkRawText('');
                    setBulkParsedQuestions([]);
                    setBulkError(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
                >
                  Clear Input
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="text-slate-300 font-semibold">Paste Questions Text or JSON</label>
                <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                  bulkParsedQuestions.length > 0
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {bulkParsedQuestions.length} Questions Auto-Detected
                </span>
              </div>

              <textarea
                value={bulkRawText}
                onChange={(e) => parseBulkText(e.target.value)}
                rows={10}
                placeholder={`1. What is the worst-case time complexity of QuickSort?\nA) O(n log n)\nB) O(n)\nC) O(n^2)\nD) O(log n)\nAnswer: C\nExplanation: QuickSort degrades to O(n^2) with worst-case pivot.\n\n2. Next question...`}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 font-mono text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500 transition"
              />
            </div>

            {/* Parsed Preview Table */}
            {bulkParsedQuestions.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Live Parsed Preview ({bulkParsedQuestions.length} Questions)
                </span>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {bulkParsedQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400">Q#{idx + 1}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Correct Option: #{q.correctOptionIds[0]}
                        </span>
                      </div>
                      <p className="text-white font-medium">{q.questionText}</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-1.5 rounded-lg border ${
                              q.correctOptionIds.includes(opt.id)
                                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>#{opt.id}: </span>
                            <span>{opt.text}</span>
                          </div>
                        ))}
                      </div>
                      {q.explanation && (
                        <p className="text-[10px] text-slate-500 italic">
                          Explanation: {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setBulkModalOpen(false)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={bulkImporting || bulkParsedQuestions.length === 0}
                onClick={handleBulkSubmit}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition shadow-lg shadow-teal-900/30"
              >
                {bulkImporting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Import All {bulkParsedQuestions.length} Questions</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminQuestionsPage;
