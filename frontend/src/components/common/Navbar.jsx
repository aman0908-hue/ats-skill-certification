import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Award, 
  BookOpen, 
  QrCode, 
  User, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X,
  LayoutDashboard
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin, isStudent } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Title */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="AmanTech Solutions" 
                className="h-12 w-12 rounded-full object-contain bg-slate-950 p-0.5 border border-teal-500/30 group-hover:border-teal-400 transition-all duration-300 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5 border-2 border-slate-900">
                <Award className="h-3 w-3 text-slate-950" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-teal-400 transition-colors">
                  ATS Skill Certification
                </span>
              </div>
              <span className="text-[11px] font-medium text-teal-400/90 tracking-wider uppercase block">
                AmanTech Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') ? 'text-teal-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/courses') ? 'text-teal-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Courses
            </Link>
            <Link 
              to="/verify" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                isActive('/verify') ? 'text-teal-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <QrCode className="h-4 w-4 text-teal-400" />
              <span>Verify Certificate</span>
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-teal-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-teal-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2.5 bg-slate-800 hover:bg-slate-700/80 text-white px-3.5 py-2 rounded-xl text-sm font-medium border border-slate-700 transition shadow-sm"
                >
                  <div className="h-7 w-7 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold text-xs uppercase">
                    {user.fullName ? user.fullName.charAt(0) : 'U'}
                  </div>
                  <span className="max-w-[120px] truncate">{user.fullName}</span>
                  {isAdmin && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded uppercase font-bold">
                      Admin
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-xl shadow-xl border border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-700/80">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{user.email}</p>
                    </div>

                    {isAdmin ? (
                      <Link
                        to="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-teal-300"
                      >
                        <ShieldCheck className="h-4 w-4 mr-2.5 text-amber-400" />
                        Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-teal-300"
                        >
                          <LayoutDashboard className="h-4 w-4 mr-2.5 text-teal-400" />
                          Student Dashboard
                        </Link>
                        <Link
                          to="/my-certificates"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-teal-300"
                        >
                          <Award className="h-4 w-4 mr-2.5 text-amber-400" />
                          My Certificates
                        </Link>
                      </>
                    )}

                    <div className="border-t border-slate-700/80 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-rose-300 hover:bg-rose-500/10 hover:text-rose-200"
                    >
                      <LogOut className="h-4 w-4 mr-2.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <Link
                  to="/login"
                  className="text-slate-200 hover:text-white px-3.5 py-2 text-sm font-medium transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm hover:shadow-teal-500/25 shadow-teal-900/50"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-5 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Browse Courses
          </Link>
          <Link
            to="/verify"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Verify Certificate
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-slate-800">
            {user ? (
              <div className="space-y-1">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-amber-300 hover:bg-slate-800"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-base font-medium text-teal-300 hover:bg-slate-800"
                    >
                      Student Dashboard
                    </Link>
                    <Link
                      to="/my-certificates"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
                    >
                      My Certificates
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-rose-300 hover:bg-slate-800"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg border border-slate-700 text-slate-200 text-sm font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
