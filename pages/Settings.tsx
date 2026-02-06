import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { useNavigate } from 'react-router-dom';

interface SettingsProps {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ user: initialUser, setUser }) => {
  const [user, setLocalUser] = useState<UserProfile>(initialUser);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [skills, setSkills] = useState<string[]>(initialUser.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const navigate = useNavigate();

  const educationLevels = [
    'High School',
    'Undergraduate',
    'Graduate',
    'Post Graduate',
    'Doctorate',
    'Diploma',
    'Other'
  ];

  const domains = [
    'Technology',
    'Business',
    'Design',
    'Marketing',
    'Finance',
    'Healthcare',
    'Engineering',
    'Science',
    'Arts',
    'Other'
  ];

  useEffect(() => {
    // Update local user when initialUser changes
    setLocalUser(initialUser);
    setSkills(initialUser.skills || []);
  }, [initialUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update user with skills
      const updatedUser = { 
        ...user, 
        skills: skills,
        updatedAt: new Date().toISOString()
      };
      
      // Simulate API call with better animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update parent state
      setUser(updatedUser);
      
      // Update local state
      setLocalUser(updatedUser);
      
      // Show success animation
      setSaved(true);
      
      // Redirect to profile after 1.5 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 1500);

    } catch (error) {
      console.error('Error updating profile:', error);
      // Show error animation
      const submitBtn = document.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('shake-animation');
        setTimeout(() => {
          submitBtn.classList.remove('shake-animation');
        }, 500);
      }
      alert('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill('');
      
      // Animate skill addition
      const input = document.querySelector('input[placeholder*="skills"]');
      if (input) {
        input.classList.add('skill-added');
        setTimeout(() => {
          input.classList.remove('skill-added');
        }, 300);
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
    
    // Animate skill removal
    const skillElements = document.querySelectorAll('.skill-tag');
    skillElements.forEach((el, index) => {
      if (el.textContent?.includes(skillToRemove)) {
        el.classList.add('skill-removed');
        setTimeout(() => {
          el.classList.remove('skill-removed');
        }, 300);
      }
    });
  };

  // Add CSS animations
  const styles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
      from { transform: translateX(-10px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .skill-added {
      animation: pulse 0.3s ease-in-out;
    }
    
    .skill-removed {
      animation: slideIn 0.3s reverse;
    }
    
    .shake-animation {
      animation: shake 0.5s ease-in-out;
    }
    
    .success-animation {
      animation: pulse 2s infinite;
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-out;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white fade-in">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate('/profile')}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                title="Back to Profile"
              >
                ←
              </button>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Profile Settings</h1>
            </div>
            <p className="text-slate-600">Update your basic information and skills</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-5 bg-indigo-600 rounded-full"></div>
                <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>
              </div>
              
              <div className="space-y-6">
                <div className="form-group">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={user.name}
                    onChange={(e) => setLocalUser({...user, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 mt-1">Contact support to change email</p>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={user.phone}
                    onChange={(e) => setLocalUser({...user, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                    placeholder="9876543210"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Education Level *
                    </label>
                    <select
                      value={user.education}
                      onChange={(e) => setLocalUser({...user, education: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 bg-white"
                    >
                      {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Domain/Field *
                    </label>
                    <select
                      value={user.domain}
                      onChange={(e) => setLocalUser({...user, domain: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 bg-white"
                    >
                      {domains.map(domain => (
                        <option key={domain} value={domain}>{domain}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-5 bg-emerald-600 rounded-full"></div>
                <h2 className="text-lg font-semibold text-slate-900">Your Skills</h2>
              </div>
              
              <div className="space-y-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Add Your Skills *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200"
                      placeholder="e.g., Python, React, Marketing, etc."
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-700 active:scale-95 transition-all duration-200"
                    >
                      Add
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Press Enter or click Add to include skill</p>
                </div>

                {/* Skills Display */}
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-3">
                    Your Skills <span className="text-emerald-600">({skills.length})</span>
                  </div>
                  {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <div
                          key={index}
                          className="skill-tag flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 hover:border-emerald-300 transition-all duration-200"
                        >
                          <span className="font-medium">{skill}</span>
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-emerald-500 hover:text-emerald-700 hover:scale-110 transition-transform duration-200"
                            title="Remove skill"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg hover:border-slate-300 transition-colors duration-200">
                      <div className="text-4xl mb-3 text-slate-300">🎯</div>
                      <div className="text-slate-400 mb-2 font-medium">No skills added yet</div>
                      <div className="text-sm text-slate-500">Add skills to personalize your experience</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200">
              <div className="text-sm text-slate-500 mb-4 sm:mb-0">
                * Required fields
              </div>
              <div className="flex items-center gap-4">
                {saved && (
                  <div className="success-animation bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg flex items-center gap-2 border border-emerald-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Profile saved! Redirecting...</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Note about skills */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100 hover:shadow-sm transition-shadow duration-300">
            <div className="flex items-start gap-3">
              <div className="text-emerald-600 text-2xl">💡</div>
              <div>
                <h4 className="font-semibold text-emerald-900 mb-2">How Skills Help You</h4>
                <p className="text-sm text-emerald-800">
                  Adding your skills helps us recommend relevant internships and increases your chances 
                  of finding the perfect opportunity. Companies look for specific skills - make sure yours are visible!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
