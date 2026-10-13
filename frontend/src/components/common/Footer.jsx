import React from 'react';
import { Link } from 'react-router-dom';
import { Award, QrCode, Mail, MapPin, CheckCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Company & Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="AmanTech Solutions" 
                className="h-12 w-12 rounded-full object-contain bg-slate-900 p-0.5 border border-teal-500/40"
              />
              <div>
                <h3 className="text-white font-extrabold text-lg tracking-tight">
                  ATS Skill Certification
                </h3>
                <p className="text-teal-400 text-xs font-semibold tracking-wider uppercase">
                  AmanTech Solutions
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering students across B.Tech, BCA, BBA, B.Com, and professional computer science streams with verifiable academic examinations and digital skill credentials.
            </p>

            <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 max-w-sm">
              <CheckCircle className="h-4 w-4 text-teal-400 shrink-0" />
              <span>Standardized MCQ evaluation with cryptographically secure QR validation.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/verify" className="hover:text-teal-400 transition flex items-center space-x-1">
                  <QrCode className="h-3.5 w-3.5 text-teal-400" />
                  <span>Verify Certificate</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teal-400 transition">
                  Browse All Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition">
                  About ATS Platform
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-teal-400 transition">
                  Student Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Helpdesk */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Helpdesk &amp; Office
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" />
                <span>AmanTech Solutions Tech Hub, India</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-teal-400 shrink-0" />
                <span>support@amantechsolutions.in</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Mandatory Developer Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} ATS Skill Certification. All rights reserved.
          </div>

          {/* User Requested: "last me develod by compney ka name ok" */}
          <div className="flex items-center space-x-2 text-slate-400 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
            <span>Developed by</span>
            <a 
              href="https://amantechsolutionss.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white tracking-wide flex items-center space-x-1.5 hover:text-teal-400 transition"
            >
              <img src="/logo.png" alt="AmanTech" className="h-4 w-4 rounded-full inline" />
              <span className="text-teal-400">AmanTech Solutions</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400 text-[11px]">Transforming Ideas into Digital Reality</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/about" className="hover:text-slate-300">Terms &amp; Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
