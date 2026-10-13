import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle, GraduationCap } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [academicBranch, setAcademicBranch] = useState('B.Tech');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await register(fullName, email, password, confirmPassword, academicBranch);
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 502 || err.response?.status === 503 || !err.response) {
        setError('Backend server is booting up or connecting to database. Please try again in 1 minute.');
      } else if (err.response?.data?.data && typeof err.response.data.data === 'object') {
        const firstMsg = Object.values(err.response.data.data)[0];
        setError(firstMsg || err.response.data.message || 'Registration failed. Please check inputs.');
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please check inputs.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2.5">
          <img src="/logo.png" alt="AmanTech Solutions" className="h-12 w-12 rounded-full shadow-sm" />
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            ATS Skill Certification
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight">
          Create Student Account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your legal full name for verified certificate issuance
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-slate-200">
          
          {error && (
            <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3.5 rounded-xl flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Legal Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
                />
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">This exact name will be printed on your digital certificate.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="student@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
                />
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Degree / Academic Track
              </label>
              <div className="relative">
                <select
                  value={academicBranch}
                  onChange={(e) => setAcademicBranch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition appearance-none cursor-pointer"
                >
                  <option value="B.Tech">B.Tech — Cyber Security, DSA, AI &amp; Cloud Systems</option>
                  <option value="BCA">BCA — Web Dev, DBMS, Java, C, Python &amp; Data Science</option>
                  <option value="BBA">BBA — Business Analytics &amp; Strategic Growth</option>
                  <option value="B.Com">B.Com — Financial Analytics &amp; Corporate Valuation</option>
                  <option value="Computer Science & IT">Computer Science &amp; IT — Data Analytics, DevOps &amp; Cloud</option>
                </select>
                <GraduationCap className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">You will be matched to industry exams tailored to your chosen domain track.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimum 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
                />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
                />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-sm transition shadow-md shadow-teal-900/20 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account &amp; Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-teal-700 hover:text-teal-800">
              Sign In here
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
