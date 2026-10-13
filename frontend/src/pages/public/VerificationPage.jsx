import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { certificatesApi } from '../../services/api';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Award, 
  Calendar, 
  FileText, 
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

const VerificationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useSEO({
    title: token ? `Verify Certificate (${token}) — Instant QR Credential Verification` : 'Certificate Verification — Verify Official ATS Credentials',
    description: 'Verify digital skill certification credentials issued by Aman Tech Solutions. Instant tamper-proof cryptographic validation with student name, track, and score.',
    canonicalPath: token ? `/verify/${token}` : '/verify'
  });

  const [inputToken, setInputToken] = useState(token || '');
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const cleanInput = (raw) => {
    let s = (raw || '').trim();
    if (s.includes('/verify/')) {
      s = s.substring(s.lastIndexOf('/verify/') + 8).trim();
    } else if (s.includes('/')) {
      s = s.substring(s.lastIndexOf('/') + 1).trim();
    }
    if (s.includes('?')) s = s.substring(0, s.indexOf('?')).trim();
    if (s.includes('#')) s = s.substring(0, s.indexOf('#')).trim();
    return s;
  };

  useEffect(() => {
    if (token) {
      const cleaned = cleanInput(token);
      setInputToken(cleaned);
      performVerification(cleaned);
    }
  }, [token]);

  const performVerification = async (verifyToken) => {
    const cleaned = cleanInput(verifyToken);
    if (!cleaned) return;
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const res = await certificatesApi.verifyPublic(cleaned);
      if (res.data?.data) {
        setVerificationData(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Could not validate certificate.');
      setVerificationData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const cleaned = cleanInput(inputToken);
    if (cleaned) {
      navigate(`/verify/${cleaned}`);
      performVerification(cleaned);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
            <ShieldCheck className="h-4 w-4 text-teal-600" />
            <span>Official Public Verification Gateway</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verify Certificate Authenticity
          </h1>
          <p className="mt-2 text-slate-600 text-sm">
            Scan the QR code on any issued certificate or enter the unique verification token / Certificate ID below.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-md mb-12">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                placeholder="Enter Certificate Number (e.g. ATS-SC-2026-X8Y7Z6W5) or Token"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
                required
              />
              <Search className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="py-3.5 px-7 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-sm transition shadow flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verify Record</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Verification Result Card */}
        {searched && (
          <div>
            {loading ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
                <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-base font-bold text-slate-800">Querying Verification Registry</h3>
                <p className="text-xs text-slate-400 mt-1">Cross-referencing cryptographic signature with MongoDB Atlas records...</p>
              </div>
            ) : verificationData && verificationData.verified ? (
              
              /* VALID CERTIFICATE BADGE & RECORD */
              <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-xl overflow-hidden transition-all animate-in fade-in duration-300">
                
                {/* Banner */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
                      <CheckCircle2 className="h-8 w-8 text-emerald-200" />
                    </div>
                    <div>
                      <div className="inline-block bg-white/20 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                        Cryptographically Verified
                      </div>
                      <h2 className="text-2xl font-extrabold text-white">Valid &amp; Authentic Certificate</h2>
                      <p className="text-emerald-100 text-xs">Official record exists in ATS Skill Certification registry</p>
                    </div>
                  </div>

                  <div className="hidden sm:block text-right">
                    <span className="text-xs text-emerald-200 block uppercase font-semibold">Issuer</span>
                    <span className="font-extrabold text-sm text-white">ATS Skill Certification</span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Student Name (Recipient)
                      </span>
                      <p className="text-xl font-bold text-slate-900">
                        {verificationData.studentName}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Certification Track
                      </span>
                      <p className="text-xl font-bold text-teal-800">
                        {verificationData.courseName}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Certificate Number
                      </span>
                      <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md text-xs">
                        {verificationData.certificateNumber}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Issue Date
                      </span>
                      <span className="font-medium text-slate-800">
                        {verificationData.issueDate ? new Date(verificationData.issueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Verified'}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Score Achieved
                      </span>
                      <span className="font-bold text-emerald-700">
                        {verificationData.scorePercentage}% (Distinction)
                      </span>
                    </div>
                  </div>

                  {/* Security Statement */}
                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Tamper-proof record protected by AmanTech Solutions cryptographic hashing.</span>
                    </div>
                    <div className="font-semibold text-slate-700">
                      Status: ACTIVE
                    </div>
                  </div>

                </div>
              </div>

            ) : (

              /* REVOKED OR INVALID RESULT */
              <div className="bg-white rounded-3xl border-2 border-rose-400 shadow-xl overflow-hidden transition-all animate-in fade-in duration-300">
                <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white p-6 sm:p-8 flex items-center space-x-4">
                  <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
                    <XCircle className="h-8 w-8 text-rose-200" />
                  </div>
                  <div>
                    <div className="inline-block bg-white/20 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                      Verification Alert
                    </div>
                    <h2 className="text-2xl font-extrabold text-white">
                      {verificationData?.status === 'REVOKED' ? 'Certificate Revoked / Invalid' : 'Certificate Record Not Found'}
                    </h2>
                    <p className="text-rose-100 text-xs">
                      {verificationData?.status === 'REVOKED' 
                        ? 'This credential has been officially invalidated by the ATS Academic Council.' 
                        : 'No authentic record matches the provided token or certificate number.'}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  {verificationData?.revocationReason && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-900">
                      <strong>Revocation Reason:</strong> {verificationData.revocationReason}
                    </div>
                  )}

                  <p className="text-sm text-slate-600 leading-relaxed">
                    If you believe this is an error, please reach out to the issuing authority with your original exam attempt reference. Do not rely on unverified digital copies.
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Registry Security Check</span>
                    <Link to="/contact" className="font-semibold text-rose-600 hover:text-rose-700">
                      Report Discrepancy &rarr;
                    </Link>
                  </div>
                </div>
              </div>

            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default VerificationPage;
