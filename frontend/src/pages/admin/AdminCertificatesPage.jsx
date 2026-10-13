import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi, certificatesApi } from '../../services/api';
import { 
  Award, 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  Download, 
  QrCode, 
  ArrowLeft,
  X,
  AlertCircle
} from 'lucide-react';

const AdminCertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Revocation modal
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [revoking, setRevoking] = useState(false);
  const [error, setError] = useState(null);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCertificates(search);
      if (res.data?.data?.content) {
        setCertificates(res.data.data.content);
      }
    } catch (err) {
      console.error('Failed to load certificates', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [search]);

  const openRevokeModal = (cert) => {
    setSelectedCert(cert);
    setRevokeReason('');
    setError(null);
    setRevokeModalOpen(true);
  };

  const handleRevoke = async (e) => {
    e.preventDefault();
    if (!revokeReason.trim()) {
      setError('Revocation reason is required');
      return;
    }

    setRevoking(true);
    try {
      await adminApi.revokeCertificate(selectedCert.id, revokeReason.trim());
      setRevokeModalOpen(false);
      fetchCertificates();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to revoke certificate');
    } finally {
      setRevoking(false);
    }
  };

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
      alert('Could not download certificate');
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <Link to="/admin" className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 mb-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Issued Certificates &amp; Integrity Controls
            </h1>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student, course, or ID..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 uppercase text-[10px] text-slate-400 border-b border-slate-700 tracking-wider">
                <tr>
                  <th className="py-4 px-6">Certificate ID</th>
                  <th className="py-4 px-6">Student Recipient</th>
                  <th className="py-4 px-6">Certification Track</th>
                  <th className="py-4 px-6">Score</th>
                  <th className="py-4 px-6">Issue Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-750 transition">
                    <td className="py-4 px-6 font-mono font-bold text-white">
                      {cert.certificateNumber}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-100">
                      {cert.studentName}
                    </td>
                    <td className="py-4 px-6 text-teal-300">
                      {cert.courseName}
                    </td>
                    <td className="py-4 px-6 font-bold text-emerald-400">
                      {cert.scorePercentage}%
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {new Date(cert.issueDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        cert.status === 'VALID'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleDownload(cert.id, cert.certificateNumber)}
                        className="p-1.5 bg-slate-900 hover:bg-slate-700 text-teal-300 rounded-lg transition"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </button>

                      <Link
                        to={`/verify/${cert.verificationToken}`}
                        target="_blank"
                        className="inline-block p-1.5 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                        title="Public QR Verification"
                      >
                        <QrCode className="h-4 w-4" />
                      </Link>

                      {cert.status === 'VALID' && (
                        <button
                          onClick={() => openRevokeModal(cert)}
                          className="p-1.5 bg-slate-900 hover:bg-rose-950 text-rose-400 rounded-lg transition"
                          title="Revoke Certificate"
                        >
                          <ShieldAlert className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Revocation Modal */}
      {revokeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-rose-400 flex items-center space-x-2">
                <ShieldAlert className="h-5 w-5" />
                <span>Revoke Certificate</span>
              </h3>
              <button onClick={() => setRevokeModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="bg-rose-950 border border-rose-500 text-rose-300 text-xs p-3 rounded-xl flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <p className="text-xs text-slate-300">
              Revoking certificate <strong className="text-white">{selectedCert?.certificateNumber}</strong> issued to <strong className="text-white">{selectedCert?.studentName}</strong> will immediately flag all public QR lookups as INVALID.
            </p>

            <form onSubmit={handleRevoke} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold uppercase mb-1">
                  Official Revocation Reason
                </label>
                <textarea
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  required
                  rows={3}
                  placeholder="e.g. Identity verification failure, exam irregularity..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRevokeModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={revoking}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow disabled:opacity-50"
                >
                  {revoking ? 'Revoking...' : 'Confirm Revocation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCertificatesPage;
