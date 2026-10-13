import React from 'react';
import { Award, ShieldCheck, CheckCircle, GraduationCap, Building2 } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

const AboutPage = () => {
  useSEO({
    title: 'About Us — Aman Tech Solutions Skill Certification',
    description: 'Learn about ATS Skill Certification by Aman Tech Solutions. Standardizing academic evaluation, verified skill badges, and tamper-proof digital credentials for college students.',
    canonicalPath: '/about'
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">
            <Award className="h-3.5 w-3.5 text-teal-600" />
            <span>AmanTech Solutions Education Division</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About ATS Skill Certification
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Standardizing online academic evaluation and digital credentials across India's leading higher education curricula.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Our Objective</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            ATS Skill Certification was created by <strong>AmanTech Solutions</strong> to bridge academic coursework with verifiable professional skill assessment. We provide students of <strong>B.Tech, BCA, BBA, B.Com</strong>, and technical disciplines an independent examination platform to test their mastery and receive high-integrity digital credentials.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <ShieldCheck className="h-6 w-6 text-teal-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-sm">Server-Graded Integrity</h4>
              <p className="text-xs text-slate-500 mt-1">Zero answer leakage. All evaluations run on hardened Java backend logic.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <CheckCircle className="h-6 w-6 text-amber-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-sm">Cryptographic QR</h4>
              <p className="text-xs text-slate-500 mt-1">Each certificate has a tamper-proof verification token and live lookup badge.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Building2 className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-sm">Employer Verification</h4>
              <p className="text-xs text-slate-500 mt-1">Instant public verification with valid or revoked status transparency.</p>
            </div>
          </div>
        </div>

        {/* Integrity Disclaimer */}
        <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 border border-slate-800 space-y-4">
          <h3 className="text-white font-bold text-base flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-teal-400" />
            <span>Academic Disclosure &amp; Policy</span>
          </h3>
          <p className="text-xs leading-relaxed text-slate-400">
            ATS Skill Certification credentials represent verified performance on standardized online examinations conducted by AmanTech Solutions. Certificates validate specific subject-matter competencies and do not claim university degree accreditation or government licensure.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
