import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { UserProfile } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
);

interface SettingsProps {
  user: UserProfile;
}

const Settings: React.FC<SettingsProps> = ({ user: initialUser }) => {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: 'Undergraduate',
    domain: 'Technology',
    bio: '',
    github: '',
    linkedin: '',
    portfolio: '',
    resume: null as File | null
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        education: user.education || 'Undergraduate',
        domain: user.domain || 'Technology',
        bio: user.bio || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        portfolio: user.portfolio || '',
        resume: null
      });
    }
  }, [user]);

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

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update user in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          phone: formData.phone,
          education: formData.education,
          domain: formData.domain,
          bio: formData.bio,
          github: formData.github,
          linkedin: formData.linkedin,
          portfolio: formData.portfolio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local storage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      // Update password in Supabase
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;

      alert('Password updated successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      console.error('Error updating password:', error);
      alert(error.message || 'Error updating password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    setFormData({ ...formData, resume: file });
    
    // In a real app, you would upload to storage
    console.log('Resume selected:', file.name);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '👁️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Account Settings</h1>
          <p className="text-slate-600">Manage your profile, security, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm sticky top-24">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-indigo-700">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all mb-1 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Verified</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                    ✅ Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Member Since</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Last Login</span>
                  <span className="font-medium">Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-lg font-semibold text-slate-900">Profile Information</h2>
                  <p className="text-sm text-slate-500 mt-1">Update your personal and professional details</p>
                </div>

                <form onSubmit={handleProfileSubmit} className="p-6">
                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name *
                          </label>
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
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            disabled
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 cursor-not-allowed"
                          />
                          <p className="text-xs text-slate-400 mt-1">Contact support to change email</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Phone Number *
                          </label>
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
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Education Level *
                          </label>
                          <select
                            value={formData.education}
                            onChange={(e) => setFormData({...formData, education: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
                          >
                            {educationLevels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Domain/Field *
                          </label>
                          <select
                            value={formData.domain}
                            onChange={(e) => setFormData({...formData, domain: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
                          >
                            {domains.map(domain => (
                              <option key={domain} value={domain}>{domain}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">About You</h3>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Bio/Introduction
                        </label>
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                          placeholder="Tell us about yourself, your skills, career goals, and what you're looking for in an internship..."
                          maxLength={500}
                        />
                        <div className="flex justify-between mt-1">
                          <div className="text-xs text-slate-400">
                            Helps companies understand your background and aspirations
                          </div>
                          <div className="text-xs text-slate-400">
                            {formData.bio.length}/500 characters
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Portfolio Links */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">Portfolio & Links</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            GitHub Profile
                          </label>
                          <input
                            type="url"
                            value={formData.github}
                            onChange={(e) => setFormData({...formData, github: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                            placeholder="https://github.com/username"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Portfolio Website
                          </label>
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

                    {/* Resume Upload */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">Resume</h3>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
                        <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl text-indigo-600">📄</span>
                        </div>
                        <p className="text-slate-600 mb-2">
                          {formData.resume 
                            ? `Selected: ${formData.resume.name}`
                            : 'Drop your resume here or click to browse'
                          }
                        </p>
                        <p className="text-sm text-slate-500 mb-4">PDF, DOC, DOCX (Max 5MB)</p>
                        <label className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 cursor-pointer transition-colors">
                          <span>Choose File</span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                          />
                        </label>
                        {formData.resume && (
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, resume: null})}
                            className="block mx-auto mt-4 text-sm text-red-600 hover:text-red-700"
                          >
                            Remove File
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                      <div className="text-sm text-slate-500">
                        * Required fields
                      </div>
                      <div className="flex items-center gap-4">
                        {saved && (
                          <span className="text-sm text-emerald-600 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Profile saved successfully!
                          </span>
                        )}
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                {/* Change Password */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>
                    <p className="text-sm text-slate-500 mt-1">Update your password to keep your account secure</p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="p-6">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Current Password *
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                          placeholder="Enter current password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          New Password *
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                          placeholder="Enter new password"
                        />
                        <p className="text-xs text-slate-400 mt-1">Must be at least 6 characters</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Confirm New Password *
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <div className="pt-6 border-t border-slate-100">
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {loading ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-900">Two-Factor Authentication</h2>
                    <p className="text-sm text-slate-500 mt-1">Add an extra layer of security to your account</p>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="font-medium text-slate-900">SMS Authentication</div>
                        <div className="text-sm text-slate-500">Receive OTP on your phone</div>
                      </div>
                      <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                        Enable
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-900">Authenticator App</div>
                        <div className="text-sm text-slate-500">Use Google Authenticator or similar</div>
                      </div>
                      <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                        Set Up
                      </button>
                    </div>
                  </div>
                </div>

                {/* Session Management */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-900">Active Sessions</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage your active login sessions</p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-900">Current Session</div>
                          <div className="text-sm text-slate-500">
                            {navigator.userAgent} • {new Date().toLocaleString()}
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                          Active
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-900">Mobile App</div>
                          <div className="text-sm text-slate-500">iOS • Last active: 2 hours ago</div>
                        </div>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          Log Out
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <button className="w-full border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                        Log Out From All Devices
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2>
                  <p className="text-sm text-slate-500 mt-1">Choose what notifications you want to receive</p>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-900">New Internship Alerts</div>
                            <div className="text-sm text-slate-500">Get notified about new matching internships</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-900">Application Updates</div>
                            <div className="text-sm text-slate-500">Status changes on your applications</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-900">Test Reminders</div>
                            <div className="text-sm text-slate-500">Reminders for upcoming skill tests</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div className="pt-6 border-t border-slate-100">
                      <h3 className="font-semibold text-slate-900 mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-900">Interview Alerts</div>
                            <div className="text-sm text-slate-500">Immediate alerts for interview schedules</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-900">Message Notifications</div>
                            <div className="text-sm text-slate-500">When companies message you</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 border-t border-slate-100">
                      <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-8">
                {/* Privacy Settings */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-900">Privacy Settings</h2>
                    <p className="text-sm text-slate-500 mt-1">Control your privacy and data sharing preferences</p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-900">Profile Visibility</div>
                          <div className="text-sm text-slate-500">Who can see your profile</div>
                        </div>
                        <select className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white">
                          <option>Only Me</option>
                          <option>Registered Companies</option>
                          <option>All Users</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-900">Show Test Scores</div>
                          <div className="text-sm text-slate-500">Display your test scores to companies</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-900">Show Applications Count</div>
                          <div className="text-sm text-slate-500">Display total applications submitted</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Management */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-900">Data Management</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage your data and account</p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-900">Export Your Data</div>
                          <div className="text-sm text-slate-500">Download all your data in JSON format</div>
                        </div>
                        <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                          Export Data
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                        <div>
                          <div className="font-medium text-red-900">Delete Account</div>
                          <div className="text-sm text-red-700">Permanently delete your account and all data</div>
                        </div>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GDPR Compliance */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Your Privacy Rights</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    At Internadda, we take your privacy seriously. You have the right to:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">✓</span>
                      <span>Access your personal data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">✓</span>
                      <span>Correct inaccurate data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">✓</span>
                      <span>Request deletion of your data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">✓</span>
                      <span>Object to data processing</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <a 
                      href="/privacy-policy" 
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      Read our full Privacy Policy →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
