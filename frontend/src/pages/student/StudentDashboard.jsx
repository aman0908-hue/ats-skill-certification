import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { certificatesApi, coursesApi } from '../../services/api';
import { 
  Award, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  QrCode, 
  Download,
  AlertCircle,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [certRes, courseRes] = await Promise.all([
          certificatesApi.getMyCertificates().catch(() => ({ data: { data: [] } })),
          coursesApi.getAll().catch(() => ({ data: { data: [] } })),
        ]);

        if (certRes.data?.data) setCertificates(certRes.data.data);
        if (courseRes.data?.data) setCourses(courseRes.data.data);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleDownload = async (certId, certNumber) => {
    try {
      const res = await certificatesApi.downloadPdf(certId);
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ATS-Certificate-${certNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download certificate. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
                Student Examination Portal
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.fullName}!
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Track your exam attempts, download tamper-proof digital certificates, and verify your professional skills.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/courses"
              className="px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>Browse All Exams</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Earned Certificates</p>
              <p className="text-2xl font-extrabold text-slate-900">{certificates.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200 shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Tracks</p>
              <p className="text-2xl font-extrabold text-slate-900">{courses.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Authentication Status</p>
              <p className="text-base font-bold text-emerald-700">Verified Student</p>
            </div>
          </div>
        </div>

        {/* Earned Certificates Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Award className="h-5 w-5 text-amber-500" />
              <span>Your Earned Certificates</span>
            </h2>
            {certificates.length > 0 && (
              <Link to="/my-certificates" className="text-xs font-bold text-teal-700 hover:text-teal-800">
                View All &rarr;
              </Link>
            )}
          </div>

          {certificates.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <Award className="h-10 w-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">No certificates earned yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Complete any course exam with a score of 60% or higher to automatically generate your verified credential.
              </p>
              <Link
                to="/courses"
                className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <span>Take an Exam Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded font-bold">
                        {cert.certificateNumber}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        VALID
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                      {cert.courseName}
                    </h3>

                    <p className="text-xs text-slate-500">
                      Score: <strong className="text-slate-800">{cert.scorePercentage}%</strong> | Issued: {new Date(cert.issueDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleDownload(cert.id, cert.certificateNumber)}
                      className="flex-1 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download PDF</span>
                    </button>

                    <Link
                      to={`/verify/${cert.verificationToken}`}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                      title="Verify Certificate"
                    >
                      <QrCode className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Exams Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-teal-600" />
              <span>Your Enrolled Track ({user?.academicBranch || 'B.Tech'}) Certification Exams</span>
            </h2>
            <Link to="/courses" className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center space-x-1">
              <span>View Track Catalog</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(
              courses.filter(c => c.category === (user?.academicBranch || 'B.Tech')).length > 0
                ? courses.filter(c => c.category === (user?.academicBranch || 'B.Tech'))
                : courses
            ).slice(0, 3).map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded-full border border-teal-200">
                      {c.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {c.durationMinutes}m
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {c.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link
                    to={`/courses/${c.slug || c.id}`}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1 transition"
                  >
                    <span>View Exam Rules</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
