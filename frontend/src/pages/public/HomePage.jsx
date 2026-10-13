import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { coursesApi } from '../../services/api';
import { 
  Award, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  QrCode, 
  ShieldCheck, 
  GraduationCap, 
  Search,
  Sparkles,
  Layers,
  ChevronRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [quickVerifyToken, setQuickVerifyToken] = useState('');
  const navigate = useNavigate();

  // Academic categories without MCA
  const categories = [
    { id: 'ALL', label: 'All Tracks' },
    { id: 'B.Tech', label: 'B.Tech Engineering' },
    { id: 'BCA', label: 'BCA Applications' },
    { id: 'BBA', label: 'BBA Analytics' },
    { id: 'B.Com', label: 'B.Com Accounting' },
    { id: 'Computer Science & IT', label: 'IT & Cloud Systems' },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await coursesApi.getAll(activeCategory);
        if (res.data?.data) {
          setCourses(res.data.data.slice(0, 6));
        }
      } catch (err) {
        console.warn('Failed to load courses from API, fallback to default display');
      }
    };
    fetchCourses();
  }, [activeCategory]);

  const handleQuickVerify = (e) => {
    e.preventDefault();
    let s = (quickVerifyToken || '').trim();
    if (s.includes('/verify/')) {
      s = s.substring(s.lastIndexOf('/verify/') + 8).trim();
    } else if (s.includes('/')) {
      s = s.substring(s.lastIndexOf('/') + 1).trim();
    }
    if (s.includes('?')) s = s.substring(0, s.indexOf('?')).trim();
    if (s.includes('#')) s = s.substring(0, s.indexOf('#')).trim();
    if (s) {
      navigate(`/verify/${s}`);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.18),transparent_70%)] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-slate-900 border border-teal-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-teal-300 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Next-Gen Academic &amp; Skill Verification</span>
              </div>

              {/* Exact required heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Validate Your Skills. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-200 to-amber-300">
                  Showcase Your Achievement.
                </span>
              </h1>

              <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Validate your enterprise domain mastery through industry-benchmarked examinations, real-world job simulations, and cryptographic QR-verified credentials recognized across top technology firms.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-teal-900/30 transition transform hover:-translate-y-0.5"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/verify"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold flex items-center justify-center space-x-2 transition"
                >
                  <QrCode className="h-4 w-4 text-teal-400" />
                  <span>Verify a Certificate</span>
                </Link>
              </div>

              {/* Highlights pills */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-left">
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-slate-400">Verifiable Online</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-400">Tamper-Proof</div>
                  <div className="text-xs text-slate-400">Dynamic QR Code</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">Standardized</div>
                  <div className="text-xs text-slate-400">Server Graded</div>
                </div>
              </div>
            </div>

            {/* Quick QR Lookup Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-7 shadow-2xl backdrop-blur-xl relative">
                <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Instant Verification
                </div>

                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-teal-950/80 border border-teal-500/30 flex items-center justify-center text-teal-400">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Check Authenticity</h3>
                    <p className="text-slate-400 text-xs">Verify issued certificate validity</p>
                  </div>
                </div>

                <form onSubmit={handleQuickVerify} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Certificate ID or Verification Token
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={quickVerifyToken}
                        onChange={(e) => setQuickVerifyToken(e.target.value)}
                        placeholder="e.g. ATS-SC-2026-X8Y7Z6W5"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        required
                      />
                      <Search className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition shadow-md flex items-center justify-center space-x-2"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Verify Authenticity Now</span>
                  </button>
                </form>

                <div className="mt-6 pt-5 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Powered by AmanTech Engine</span>
                  <span className="text-teal-400 font-medium">Public Records Portal</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Course Categories & Curated Catalog */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-2">
            Academic &amp; Professional Specializations
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Certification Tracks
          </h3>
          <p className="mt-3 text-slate-600 text-base">
            Each track features targeted question pools, server-enforced timelines, and instant credential issuance upon passing.
          </p>
        </div>

        {/* Category Filter Pills (NO MCA) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {courses.map((course) => (
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

                <h4 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                  {course.title}
                </h4>

                <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Key Metrics */}
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
                  className="inline-flex items-center space-x-1 text-sm font-bold text-teal-700 hover:text-teal-800 group-hover:translate-x-1 transition-transform"
                >
                  <span>Take Exam</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm shadow-sm transition"
          >
            <span>View All Certification Programs</span>
            <ArrowRight className="h-4 w-4 text-teal-600" />
          </Link>
        </div>
      </section>

      {/* How Certification Works */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">
              The Examination Process
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How Certification Works
            </h3>
            <p className="mt-3 text-slate-400 text-base">
              A transparent four-step workflow ensuring examination integrity and tamper-proof verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 relative">
              <div className="h-10 w-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-extrabold text-lg mb-5">
                1
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Select Your Course</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Choose your academic stream from B.Tech, BCA, BBA, B.Com, or IT courses and review the syllabus.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 relative">
              <div className="h-10 w-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-extrabold text-lg mb-5">
                2
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Take Online Quiz</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Answer randomized MCQs under a secure, server-enforced countdown timer with auto-submit protection.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 relative">
              <div className="h-10 w-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-extrabold text-lg mb-5">
                3
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Server-Side Scoring</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your answers are verified directly on the backend. Correct answers are never sent to the browser prior to grading.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 relative">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-extrabold text-lg mb-5">
                4
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Earn Digital Certificate</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Passing students receive an authentic PDF certificate featuring their name, score, and a tamper-proof QR code.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-2">
            Got Questions?
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-slate-900 text-base mb-1.5 flex items-center">
              <HelpCircle className="h-4 w-4 text-teal-600 mr-2 shrink-0" />
              How does the QR verification work?
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed pl-6">
              Each certificate is embedded with a cryptographically generated QR code pointing to our live verification portal. When employers or universities scan the code, our backend validates the secure token and displays authentic completion records.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-slate-900 text-base mb-1.5 flex items-center">
              <HelpCircle className="h-4 w-4 text-teal-600 mr-2 shrink-0" />
              How many attempts are allowed per course?
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed pl-6">
              By default, ATS Skill Certification implements a strict one-attempt policy to maintain rigorous testing integrity. Once you pass and earn your certificate, re-attempts are locked.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-slate-900 text-base mb-1.5 flex items-center">
              <HelpCircle className="h-4 w-4 text-teal-600 mr-2 shrink-0" />
              Is there any government or university accreditation claimed?
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed pl-6">
              No. ATS Skill Certification is an independent skill evaluation framework provided by AmanTech Solutions for skill benchmarking and competency demonstration. We do not claim government or university degree equivalence.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold tracking-tight">
            Ready to Certify Your Knowledge?
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Create your student account, browse our comprehensive course catalogs, and earn your verified digital credential today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition shadow-lg"
            >
              Get Started Now
            </Link>
            <Link
              to="/courses"
              className="px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition border border-slate-700"
            >
              Explore All Courses
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
