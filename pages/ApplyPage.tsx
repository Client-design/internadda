import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';

const ApplyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: 'Undergraduate',
    college: '',
    year: '2024',
    github: '',
    linkedin: '',
    portfolio: '',
    why: ''
  });

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Your personal details' },
    { number: 2, title: 'Education', description: 'Academic background' },
    { number: 3, title: 'Portfolio', description: 'Showcase your work' },
    { number: 4, title: 'Review', description: 'Finalize application' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, submit to backend
    navigate(`/payment/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Apply for {internship.title}
          </h1>
          <p className="text-lg text-slate-600">
            Complete your application in 4 simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((s, idx) => (
              <div key={s.number} className="relative">
                <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  step >= s.number 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-slate-200'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s.number 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {s.number}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{s.title}</div>
                    <div className="text-sm text-slate-500">{s.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="9876543210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Education Level *</label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({...formData, education: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Education Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">College/University *</label>
                  <input
                    type="text"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({...formData, college: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="Enter your college name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Graduation Year *</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  >
                    {Array.from({length: 6}, (_, i) => 2024 + i).map(year => (
                      <option key={year} value={year.toString()}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Why do you want this internship? *
                  </label>
                  <textarea
                    value={formData.why}
                    onChange={(e) => setFormData({...formData, why: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="Tell us why you're interested in this role and what you hope to achieve..."
                    maxLength={500}
                  />
                  <div className="text-xs text-slate-500 mt-1 text-right">
                    {formData.why.length}/500 characters
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Portfolio & Links</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">GitHub Profile</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Portfolio Website</label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Review Your Application</h3>
              
              <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl p-6 border border-slate-200">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-500">Name</div>
                      <div className="font-semibold">{formData.name || 'Not provided'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Email</div>
                      <div className="font-semibold">{formData.email || 'Not provided'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Phone</div>
                      <div className="font-semibold">{formData.phone || 'Not provided'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Education</div>
                      <div className="font-semibold">{formData.education}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">College</div>
                      <div className="font-semibold">{formData.college || 'Not provided'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Graduation Year</div>
                      <div className="font-semibold">{formData.year}</div>
                    </div>
                  </div>
                  
                  {formData.why && (
                    <div>
                      <div className="text-sm text-slate-500">Why this internship?</div>
                      <div className="text-slate-700 mt-1">{formData.why}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h4 className="font-semibold text-amber-900 mb-4">Important Information</h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✅</span>
                    <span>Guaranteed interview within 48 hours of application approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✅</span>
                    <span>Free certificate and LinkedIn recommendation upon completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✅</span>
                    <span>100% money-back guarantee if you don't get an interview</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✅</span>
                    <span>MSME certified platform - Government recognized</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Step Navigation */}
          <div className="flex justify-between pt-8 mt-8 border-t border-slate-200">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-all"
              >
                ← Back
              </button>
            )}
            
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="ml-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Proceed to Payment
              </button>
            )}
          </div>

          {/* Trust Section */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-slate-900">Guaranteed Interview</div>
                <div className="text-sm text-slate-600">Or 100% money back</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold text-slate-900">48-Hour Process</div>
                <div className="text-sm text-slate-600">Test → Interview → Offer</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                <div className="text-2xl mb-2">🏅</div>
                <div className="font-semibold text-slate-900">Free Certificate</div>
                <div className="text-sm text-slate-600">With LinkedIn recommendation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
