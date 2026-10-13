import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { coursesApi } from '../../services/api';
import { BookOpen, Clock, Layers, CheckCircle, Search, ArrowRight, Filter, Sparkles, GraduationCap } from 'lucide-react';

const CoursesPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || user?.academicBranch || 'B.Tech';

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Course categories without MCA
  const categories = [
    { id: 'ALL', label: 'All Courses' },
    { id: 'B.Tech', label: 'B.Tech' },
    { id: 'BCA', label: 'BCA' },
    { id: 'BBA', label: 'BBA' },
    { id: 'B.Com', label: 'B.Com' },
    { id: 'Computer Science & IT', label: 'Computer Science & IT' },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await coursesApi.getAll(selectedCategory);
        if (res.data?.data) {
          setCourses(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [selectedCategory]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'ALL') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block mb-2">
            Catalog &amp; Syllabus
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Browse All Certification Programs
          </h1>
          <p className="mt-2 text-slate-600 text-base">
            Choose an academic curriculum, review the syllabus, and complete the timed MCQ evaluation to earn your verified credential.
          </p>
        </div>

        {user?.academicBranch && (
          <div className="mb-6 bg-teal-50 border border-teal-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-teal-900">
            <div className="flex items-center space-x-2.5">
              <GraduationCap className="h-4 w-4 text-teal-600 shrink-0" />
              <span>
                Enrolled Degree: <strong className="font-bold text-teal-950">{user.academicBranch}</strong> — Displaying industry examinations tailored to your domain track.
              </span>
            </div>
            <span className="bg-teal-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              Enrolled Domain
            </span>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-10 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                <span>{cat.label}</span>
                {user?.academicBranch === cat.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                )}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search course title..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>

        </div>

        {/* Courses Listing */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No courses found</h3>
            <p className="text-sm text-slate-500 mt-1">
              Try adjusting your category filter or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full border border-teal-200">
                      {course.category}
                    </span>
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      <span>{course.durationMinutes} Mins</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Syllabus Pills */}
                  {course.syllabus && course.syllabus.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Topics Covered
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.syllabus.slice(0, 3).map((topic, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md truncate max-w-[200px]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="flex items-center space-x-1.5">
                      <Layers className="h-3.5 w-3.5 text-teal-600" />
                      <span>{course.questionCount} Questions</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-amber-600" />
                      <span>Passing: {course.passingPercentage}%</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Single Attempt Policy
                  </span>
                  <Link
                    to={`/courses/${course.slug || course.id}`}
                    className="inline-flex items-center space-x-1 text-sm font-bold text-teal-700 hover:text-teal-800 transition"
                  >
                    <span>View Syllabus &amp; Exam</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CoursesPage;
