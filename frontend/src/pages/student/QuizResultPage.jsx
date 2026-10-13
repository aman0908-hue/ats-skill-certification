import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { quizApi, certificatesApi } from '../../services/api';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  Download, 
  QrCode, 
  ArrowRight, 
  RotateCcw,
  ShieldCheck,
  Share2
} from 'lucide-react';

const QuizResultPage = () => {
  const { attemptId } = useParams();
  const location = useLocation();

  const [result, setResult] = useState(location.state?.result || null);
  const [loading, setLoading] = useState(!result);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!result) {
      const fetchResult = async () => {
        try {
          const res = await quizApi.getResult(attemptId);
          setResult(res.data.data);
        } catch (err) {
          console.error('Failed to load result', err);
        } finally {
          setLoading(false);
        }
      };
      fetchResult();
    }
  }, [attemptId, result]);

  // Confetti celebration if passed
  useEffect(() => {
    if (result && result.passed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0D9488', '#14B8A6', '#F59E0B', '#10B981'],
      });
    }
  }, [result]);

  const handleDownload = async () => {
    if (!result?.certificateId) return;
    setDownloading(true);
    try {
      const res = await certificatesApi.downloadPdf(result.certificateId);
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ATS-Certificate-${result.certificateNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Could not download certificate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = () => {
    if (result?.certificateId) {
      const verifyUrl = `${window.location.origin}/verify/${result.certificateNumber}`;
      navigator.clipboard.writeText(verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
          <p className="text-base font-bold text-slate-800">Result Not Found</p>
          <Link to="/dashboard" className="text-xs font-semibold text-teal-700">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header Banner */}
          <div className={`p-8 text-center text-white ${
            result.passed ? 'bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900' : 'bg-gradient-to-r from-rose-700 to-slate-900'
          }`}>
            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-4">
              {result.passed ? (
                <Award className="h-9 w-9 text-amber-300" />
              ) : (
                <XCircle className="h-9 w-9 text-rose-200" />
              )}
            </div>

            <span className="inline-block bg-white/20 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
              Official Assessment Summary
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight">
              {result.passed ? 'Congratulations! You Passed!' : 'Assessment Not Cleared'}
            </h1>

            <p className="text-sm text-slate-200 mt-1 max-w-md mx-auto">
              {result.courseTitle}
            </p>
          </div>

          {/* Score Statistics */}
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-3 gap-4 text-center pb-6 border-b border-slate-100">
              <div className="p-4 rounded-2xl bg-slate-50">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Your Score</span>
                <span className={`text-2xl font-black ${result.passed ? 'text-teal-700' : 'text-rose-600'}`}>
                  {result.scorePercentage}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Passing Threshold</span>
                <span className="text-2xl font-black text-slate-700">
                  {result.passingPercentage}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Correct MCQs</span>
                <span className="text-2xl font-black text-slate-700">
                  {result.correctAnswers} / {result.totalQuestions}
                </span>
              </div>
            </div>

            {/* Certificate Issuance Section */}
            {result.passed ? (
              <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-teal-900 text-lg">Official Digital Certificate Issued</h3>
                    <p className="text-xs text-teal-700">Certificate ID: <strong className="font-mono">{result.certificateNumber}</strong></p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-300">
                    VALID &amp; VERIFIED
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    <span>{downloading ? 'Rendering PDF...' : 'Download Official Certificate (PDF)'}</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="py-3.5 px-5 bg-white border border-teal-300 hover:bg-teal-100/50 text-teal-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition"
                  >
                    <Share2 className="h-4 w-4 text-teal-600" />
                    <span>{copied ? 'Link Copied!' : 'Copy Verification Link'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-3">
                <p className="text-sm text-rose-800">
                  You scored {result.scorePercentage}%, which is below the required passing benchmark of {result.passingPercentage}%.
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Review Other Courses</span>
                </Link>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="pt-4 flex items-center justify-between text-xs">
              <Link to="/dashboard" className="text-slate-500 hover:text-slate-800 font-semibold">
                &larr; Back to Student Dashboard
              </Link>
              <Link to="/courses" className="text-teal-700 hover:text-teal-800 font-bold flex items-center space-x-1">
                <span>Browse More Certifications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizResultPage;
