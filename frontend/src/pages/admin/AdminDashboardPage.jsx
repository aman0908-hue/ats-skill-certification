import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle, 
  FileQuestion, 
  ShieldAlert, 
  Sliders, 
  ArrowRight,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminApi.getDashboard();
        if (res.data?.data) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <LayoutDashboard className="h-4 w-4" />
              <span>System Command Center</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              ATS Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/admin/template"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs border border-slate-700 flex items-center space-x-1.5 transition"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Certificate Template Studio</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Registered Students</span>
              <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">{stats?.totalStudents || 0}</p>
            <p className="text-[11px] text-teal-400">Verified User Accounts</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Courses</span>
              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">{stats?.totalCourses || 0}</p>
            <p className="text-[11px] text-indigo-400">{stats?.totalPublishedCourses || 0} Published &amp; Active</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Certificates Issued</span>
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">{stats?.totalCertificatesIssued || 0}</p>
            <p className="text-[11px] text-rose-400">{stats?.totalRevokedCertificates || 0} Revoked</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Exam Pass Rate</span>
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-emerald-400">{stats?.overallPassRatePercentage || 0}%</p>
            <p className="text-[11px] text-slate-400">{stats?.totalQuizAttempts || 0} Total Exam Submissions</p>
          </div>

        </div>

        {/* Fast Action Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/courses"
            className="p-5 bg-slate-800/50 hover:bg-slate-800 rounded-2xl border border-slate-700/70 transition flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-teal-400" />
              <span className="font-bold text-sm text-white">Manage Courses</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white transition" />
          </Link>

          <Link
            to="/admin/questions"
            className="p-5 bg-slate-800/50 hover:bg-slate-800 rounded-2xl border border-slate-700/70 transition flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <FileQuestion className="h-5 w-5 text-amber-400" />
              <span className="font-bold text-sm text-white">Question Banks</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white transition" />
          </Link>

          <Link
            to="/admin/certificates"
            className="p-5 bg-slate-800/50 hover:bg-slate-800 rounded-2xl border border-slate-700/70 transition flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-emerald-400" />
              <span className="font-bold text-sm text-white">Certificates &amp; Revocation</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white transition" />
          </Link>

          <Link
            to="/admin/template"
            className="p-5 bg-slate-800/50 hover:bg-slate-800 rounded-2xl border border-slate-700/70 transition flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <Sliders className="h-5 w-5 text-indigo-400" />
              <span className="font-bold text-sm text-white">Template Studio</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white transition" />
          </Link>
        </div>

        {/* Course Catalog Highlights */}
        <div className="bg-slate-800/60 rounded-3xl border border-slate-700/80 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Certification Tracks Overview</h2>
            <Link to="/admin/courses" className="text-xs text-teal-400 hover:text-teal-300 font-bold">
              View All Courses &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats?.popularCourses?.map((course) => (
              <div key={course.id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800">
                  {course.category}
                </span>
                <h4 className="font-bold text-white text-sm line-clamp-1">{course.title}</h4>
                <p className="text-xs text-slate-400">Total Attempts: <strong className="text-white">{course.attemptCount}</strong></p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
