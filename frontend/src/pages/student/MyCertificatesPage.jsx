import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { certificatesApi } from '../../services/api';
import { Award, Download, QrCode, ExternalLink, ShieldCheck, Share2, Eye } from 'lucide-react';

const MyCertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewCert, setPreviewCert] = useState(null);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await certificatesApi.getMyCertificates();
        if (res.data?.data) {
          setCertificates(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load certificates', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
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
      alert('Could not download certificate. Please try again.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block mb-1">
            Student Credentials
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Earned Certificates
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            Download your high-resolution PDF credentials and share verified validation links with employers.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : certificates.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <Award className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Certificates Earned Yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              Pass any course exam with 60% or higher to unlock your official digital certificate.
            </p>
            <Link
              to="/courses"
              className="mt-5 inline-block px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs"
            >
              Browse Examination Tracks
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                      {cert.certificateNumber}
                    </span>
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {cert.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-teal-700 transition">
                      {cert.courseName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Recipient: <strong className="text-slate-800">{cert.studentName}</strong>
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span>Score: <strong>{cert.scorePercentage}%</strong></span>
                    <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => handleDownload(cert.id, cert.certificateNumber)}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition shadow"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF Certificate</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center space-x-1 transition"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Preview</span>
                    </button>

                    <Link
                      to={`/verify/${cert.verificationToken}`}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center space-x-1 transition"
                    >
                      <QrCode className="h-3.5 w-3.5 text-teal-600" />
                      <span>Verify QR</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
            <div className="border-4 border-slate-900 p-6 rounded-2xl bg-slate-50 relative text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <img src="/logo.png" alt="AmanTech" className="h-10 w-10 rounded-full" />
                <span className="font-extrabold text-slate-900 tracking-wider text-sm uppercase">ATS SKILL CERTIFICATION</span>
              </div>
              <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest">Certificate of Achievement</h3>
              <p className="text-xs text-slate-500 uppercase">Presented to</p>
              <h2 className="text-2xl font-extrabold text-slate-900 border-b border-slate-300 pb-2">{previewCert.studentName}</h2>
              <p className="text-xs text-slate-600">for verified completion of examination in</p>
              <h4 className="text-lg font-bold text-teal-800">{previewCert.courseName}</h4>
              <p className="text-xs font-semibold text-slate-700">Scored: {previewCert.scorePercentage}% | Grade: Distinction Verified</p>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-left text-[11px] text-slate-500">
                <div>
                  <span className="block font-mono font-bold text-slate-700">{previewCert.certificateNumber}</span>
                  <span>Issued: {new Date(previewCert.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-bold block">Status: VALID &amp; VERIFIED</span>
                  <span>AmanTech Cryptographic QR</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setPreviewCert(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Close Preview
              </button>
              <button
                onClick={() => handleDownload(previewCert.id, previewCert.certificateNumber)}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyCertificatesPage;
