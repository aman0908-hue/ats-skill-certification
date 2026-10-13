import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileQuestion, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  X
} from 'lucide-react';

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('B.Tech');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [questionCount, setQuestionCount] = useState(5);
  const [passingPercentage, setPassingPercentage] = useState(60);
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [status, setStatus] = useState('PUBLISHED');
  const [syllabusText, setSyllabusText] = useState('');
  const [formError, setFormError] = useState(null);

  // Categories list without MCA
  const availableCategories = ['B.Tech', 'BCA', 'BBA', 'B.Com', 'Computer Science & IT', 'Professional Skills'];

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCourses();
      if (res.data?.data?.content) {
        setCourses(res.data.data.content);
      }
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openCreateModal = () => {
    setEditingCourse(null);
    setTitle('');
    setCategory('B.Tech');
    setDescription('');
    setDurationMinutes(20);
    setQuestionCount(5);
    setPassingPercentage(60);
    setMaxAttempts(1);
    setStatus('PUBLISHED');
    setSyllabusText('');
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setTitle(course.title);
    setCategory(course.category);
    setDescription(course.description);
    setDurationMinutes(course.durationMinutes);
    setQuestionCount(course.questionCount);
    setPassingPercentage(course.passingPercentage);
    setMaxAttempts(course.maxAttempts);
    setStatus(course.status);
    setSyllabusText(course.syllabus ? course.syllabus.join('\n') : '');
    setFormError(null);
    setModalOpen(true);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    setFormError(null);

    const syllabus = syllabusText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      title,
      category,
      description,
      durationMinutes: Number(durationMinutes),
      questionCount: Number(questionCount),
      passingPercentage: Number(passingPercentage),
      maxAttempts: Number(maxAttempts),
      status,
      syllabus,
    };

    try {
      if (editingCourse) {
        await adminApi.updateCourse(editingCourse.id, payload);
      } else {
        await adminApi.createCourse(payload);
      }
      setModalOpen(false);
      fetchCourses();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error saving course settings');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course and its questions?')) {
      try {
        await adminApi.deleteCourse(courseId);
        fetchCourses();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete course');
      }
    }
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
              Course Catalog Administration
            </h1>
          </div>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition shadow"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Course</span>
          </button>
        </div>

        {/* Courses Table */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 uppercase text-[10px] text-slate-400 border-b border-slate-700 tracking-wider">
                <tr>
                  <th className="py-4 px-6">Course Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Questions</th>
                  <th className="py-4 px-6">Passing %</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-750 transition">
                    <td className="py-4 px-6 font-bold text-white max-w-xs truncate">
                      {course.title}
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-slate-900 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-800/60 text-[11px] font-semibold">
                        {course.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">{course.durationMinutes} mins</td>
                    <td className="py-4 px-6">{course.questionCount} MCQs</td>
                    <td className="py-4 px-6 font-semibold text-emerald-400">{course.passingPercentage}%</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        course.status === 'PUBLISHED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        to={`/admin/questions?courseId=${course.id}`}
                        className="inline-block p-1.5 bg-slate-900 hover:bg-slate-700 text-amber-300 rounded-lg transition"
                        title="Manage Question Bank"
                      >
                        <FileQuestion className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => openEditModal(course)}
                        className="p-1.5 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                        title="Edit Course"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-1.5 bg-slate-900 hover:bg-rose-950 text-rose-400 rounded-lg transition"
                        title="Delete Course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingCourse ? 'Edit Course Settings' : 'Create New Certification Course'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="bg-rose-950/80 border border-rose-500 text-rose-300 text-xs p-3 rounded-xl flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold uppercase mb-1">Course Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. B.Tech: Core Computer Science & Algorithms"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold uppercase mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  >
                    {availableCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold uppercase mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold uppercase mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    min={5}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold uppercase mb-1">MCQs Count</label>
                  <input
                    type="number"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                    min={1}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold uppercase mb-1">Passing %</label>
                  <input
                    type="number"
                    value={passingPercentage}
                    onChange={(e) => setPassingPercentage(e.target.value)}
                    min={40}
                    max={100}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase mb-1">
                  Syllabus (One topic per line)
                </label>
                <textarea
                  value={syllabusText}
                  onChange={(e) => setSyllabusText(e.target.value)}
                  rows={4}
                  placeholder="Topic 1&#10;Topic 2&#10;Topic 3"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500 font-mono text-xs"
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
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold shadow"
                >
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCoursesPage;
