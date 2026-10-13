import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block">
            Support &amp; Verification Helpdesk
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact AmanTech Solutions
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Need assistance with exam attempts, certificate downloads, or institutional verification partnerships?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Office Info */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="AmanTech" className="h-10 w-10 rounded-full" />
                <div>
                  <h3 className="font-extrabold text-white text-base">ATS Skill Certification</h3>
                  <p className="text-xs text-teal-400">AmanTech Solutions</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" />
                  <span>AmanTech Solutions Tech Hub, Sector Tech Campus, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-teal-400 shrink-0" />
                  <span>support@amantechsolutions.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-teal-400 shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400">
              Transforming Ideas into Digital Reality
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="h-12 w-12 text-teal-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-500">
                  Our academic support team will review your query within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Aman Kumar"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold uppercase mb-1">Subject / Query</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="How can we assist you with your exam or certificate?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition shadow flex items-center justify-center space-x-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
