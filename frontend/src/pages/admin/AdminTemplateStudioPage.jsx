import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { Sliders, Eye, Save, ArrowLeft, CheckCircle2, AlertCircle, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

const AdminTemplateStudioPage = () => {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Editable coordinates
  const [nameY, setNameY] = useState(48);
  const [nameSize, setNameSize] = useState(36);
  const [courseY, setCourseY] = useState(61.6);
  const [courseSize, setCourseSize] = useState(20);

  // Background upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [bgCacheBuster, setBgCacheBuster] = useState(Date.now());

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await adminApi.getActiveTemplate();
        const t = res.data.data;
        setTemplate(t);
        if (t.fieldPositions?.studentName) {
          setNameY(t.fieldPositions.studentName.y);
          setNameSize(t.fieldPositions.studentName.fontSize);
        }
        if (t.fieldPositions?.courseName) {
          setCourseY(t.fieldPositions.courseName.y);
          setCourseSize(t.fieldPositions.courseName.fontSize);
        }
      } catch (err) {
        console.error('Failed to load active template', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    const updated = {
      ...template,
      fieldPositions: {
        ...template.fieldPositions,
        studentName: {
          ...template.fieldPositions?.studentName,
          y: Number(nameY),
          fontSize: Number(nameSize),
        },
        courseName: {
          ...template.fieldPositions?.courseName,
          y: Number(courseY),
          fontSize: Number(courseSize),
        },
      },
    };

    try {
      const res = await adminApi.updateActiveTemplate(updated);
      setTemplate(res.data.data);
      setSuccessMsg('Certificate template layout saved successfully!');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to save template settings');
    } finally {
      setSaving(false);
    }
  };

  const handleLivePreview = async () => {
    setPreviewing(true);
    setErrorMsg(null);

    const testTemplate = {
      ...template,
      fieldPositions: {
        ...template?.fieldPositions,
        studentName: { y: Number(nameY), fontSize: Number(nameSize) },
        courseName: { y: Number(courseY), fontSize: Number(courseSize) },
      },
    };

    try {
      const res = await adminApi.previewTemplate(testTemplate);
      const blob = res.data instanceof Blob ? res.data : new Blob([res.data], { type: 'application/pdf' });
      if (previewUrl) {
        window.URL.revokeObjectURL(previewUrl);
      }
      const blobUrl = window.URL.createObjectURL(blob);
      setPreviewUrl(blobUrl);
    } catch (err) {
      console.error('Preview error:', err);
      let msg = 'Failed to render live PDF preview';
      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          if (json.message) msg += `: ${json.message}`;
        } catch (_) {}
      } else if (err.response?.data?.message) {
        msg += `: ${err.response.data.message}`;
      }
      setErrorMsg(msg);
    } finally {
      setPreviewing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPEG or PNG)');
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setFilePreview(url);
    setErrorMsg(null);
  };

  const handleUploadBackground = async () => {
    if (!selectedFile) {
      setErrorMsg('Please select an image file first');
      return;
    }
    setUploadingImage(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await adminApi.uploadCertificateTemplate(formData);
      setTemplate(res.data.data);
      setSuccessMsg('Master Certificate Background uploaded successfully! All certificates and live previews are now cloned from this image.');
      setBgCacheBuster(Date.now());
      setSelectedFile(null);
      setFilePreview(null);
      // Automatically refresh the live PDF preview so user instantly sees the newly uploaded background!
      setTimeout(() => {
        handleLivePreview();
      }, 500);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to upload certificate image');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <Link to="/admin" className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 mb-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Certificate Template Studio
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Adjust placement coordinates and font sizes for dynamic text over your certificate background.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleLivePreview}
              disabled={previewing}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs border border-slate-700 flex items-center space-x-1.5 transition disabled:opacity-50"
            >
              <Eye className="h-4 w-4" />
              <span>{previewing ? 'Generating Preview...' : 'Render Live PDF Preview'}</span>
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs p-3.5 rounded-xl flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-rose-950/80 border border-rose-500 text-rose-300 text-xs p-3.5 rounded-xl flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form */}
          <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="font-bold text-white text-base flex items-center space-x-2">
              <Sliders className="h-5 w-5 text-teal-400" />
              <span>Certificate Configuration Studio</span>
            </h3>

            {/* Master Certificate Background Upload Card */}
            <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5 text-xs">
                  <Upload className="h-4 w-4" />
                  <span>Upload Master Certificate Background</span>
                </span>
                <span className="bg-amber-500/10 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
                  Global Clone
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Upload your custom official certificate design (.jpg or .png). It is automatically cloned as the background for all student certificates and the live PDF preview.
              </p>

              {/* Current Background Preview Thumbnail */}
              <div className="flex items-center space-x-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                <img
                  src={filePreview || `/certificate-template.jpg?t=${bgCacheBuster}`}
                  alt="Current Certificate Background"
                  className="w-24 h-16 object-cover rounded-lg border border-slate-700 shadow-sm shrink-0"
                />
                <div className="space-y-1 text-[11px]">
                  <span className="text-white font-semibold block">
                    {selectedFile ? selectedFile.name : 'AmanTech Master Background'}
                  </span>
                  <span className="text-slate-400 block text-[10px]">
                    {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'Active 1024x724 Canvas'}
                  </span>
                  {selectedFile && (
                    <span className="text-emerald-400 font-bold block text-[10px]">
                      Ready to apply as clone
                    </span>
                  )}
                </div>
              </div>

              {/* Upload Input & Button */}
              <div className="space-y-2">
                <input
                  type="file"
                  id="certUploadInput"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="grid grid-cols-2 gap-2">
                  <label
                    htmlFor="certUploadInput"
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-center font-bold text-xs cursor-pointer border border-slate-700 transition flex items-center justify-center space-x-1"
                  >
                    <ImageIcon className="h-3.5 w-3.5 text-teal-400" />
                    <span>Choose Image</span>
                  </label>

                  <button
                    type="button"
                    disabled={!selectedFile || uploadingImage}
                    onClick={handleUploadBackground}
                    className="py-2.5 px-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition flex items-center justify-center space-x-1.5 shadow"
                  >
                    {uploadingImage ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5" />
                        <span>Apply &amp; Clone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              
              {/* Student Name Coordinates */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
                <span className="font-bold text-teal-300 uppercase tracking-wider block">
                  Student Name Field
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Vertical Y Position (%)</label>
                    <input
                      type="number"
                      value={nameY}
                      onChange={(e) => setNameY(e.target.value)}
                      min={10}
                      max={90}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Font Size (px)</label>
                    <input
                      type="number"
                      value={nameSize}
                      onChange={(e) => setNameSize(e.target.value)}
                      min={14}
                      max={60}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Course Name Coordinates */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
                <span className="font-bold text-amber-300 uppercase tracking-wider block">
                  Course Title Field
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Vertical Y Position (%)</label>
                    <input
                      type="number"
                      value={courseY}
                      onChange={(e) => setCourseY(e.target.value)}
                      min={10}
                      max={90}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Font Size (px)</label>
                    <input
                      type="number"
                      value={courseSize}
                      onChange={(e) => setCourseSize(e.target.value)}
                      min={12}
                      max={40}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition shadow flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? 'Saving...' : 'Save Coordinate Configuration'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Live Preview Display */}
          <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-base">Live Certificate Preview (PDF)</h3>

            {previewUrl ? (
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-white">
                <iframe
                  src={previewUrl}
                  title="Certificate Preview"
                  className="w-full h-[450px]"
                />
              </div>
            ) : (
              <div className="h-[450px] rounded-2xl border border-dashed border-slate-700 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <Eye className="h-12 w-12 text-slate-600" />
                <p className="text-sm font-bold text-slate-300">No Preview Rendered Yet</p>
                <p className="text-xs text-slate-500 max-w-sm">
                  Click "Render Live PDF Preview" above to generate a mock certificate with your exact coordinates.
                </p>
                <button
                  onClick={handleLivePreview}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition"
                >
                  Generate Preview Now
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminTemplateStudioPage;
