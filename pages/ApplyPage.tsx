import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { internships } from '../constants';
import { ShieldCheck, Clock, CheckCircle, Lock } from 'lucide-react';

const ApplyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = internships.find(i => i.id === id);

  // Prefilling state from localStorage (assuming 'user' was saved during login)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    resume: null as File | null,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
      }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for submission
    alert("Application submitted successfully!");
    navigate('/dashboard');
  };

  if (!internship) return <div className="p-20 text-center">Internship not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: The Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Apply for {internship.title}</h2>
            <p className="text-slate-500 mb-8">Confirm your details below to start your application.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.fullName}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">College/University</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Enter your college name"
                  required
                />
              </div>

              <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-center">
                <input type="file" className="hidden" id="resume-upload" />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="text-slate-600 font-bold text-sm">Upload Resume (PDF)</div>
                  <div className="text-slate-400 text-xs mt-1">Click to browse or drag and drop</div>
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                Submit Application <CheckCircle size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Trust & Summary */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl">
            <h4 className="text-xs font-bold text-indigo-400 uppercase mb-4">Application Summary</h4>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Clock className="text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-bold">{internship.title}</div>
                <div className="text-xs text-slate-400">{internship.company}</div>
              </div>
            </div>
            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Duration</span>
                <span className="font-bold">3 Months</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Type</span>
                <span className="font-bold">Remote/Virtual</span>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-green-500 mt-1" size={20} />
              <div>
                <p className="text-sm font-bold text-slate-800">Verified Partner</p>
                <p className="text-xs text-slate-500">This internship is manually verified by InternAdda.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="text-indigo-500 mt-1" size={20} />
              <div>
                <p className="text-sm font-bold text-slate-800">Secure Application</p>
                <p className="text-xs text-slate-500">Your personal data is encrypted and protected.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
