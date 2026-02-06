import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
  setUser: (user: UserProfile | null) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const [stats, setStats] = useState({
    testsCompleted: 0,
    applicationsSubmitted: 0,
    profileCompletion: 85
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const motivationalMessages = [
    "Your next opportunity is just one application away! 🚀",
    "Great profiles get great internships. Complete yours! ✨",
    "Ready to kickstart your career journey? Apply now! 💼",
    "Don't wait for opportunities. Create them! ⚡",
    "Your dream internship awaits. Take the first step today! 🌟"
  ];

  const getRandomMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Your Profile</h1>
          <p className="text-slate-600">Simple. Clean. Ready for opportunities.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src="https://iili.io/fb5Wtrx.md.png" 
                    alt="Explorer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <span class="text-indigo-600 font-bold text-2xl">
                              ${getInitials(user.name)}
                            </span>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{user.name}</h2>
                <p className="text-slate-600 mb-4">{user.email}</p>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {user.education}
                  </span>
                  <span className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {user.domain}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-slate-900">{stats.testsCompleted}</div>
                    <div className="text-sm text-slate-600">Tests Taken</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-slate-900">{stats.applicationsSubmitted}</div>
                    <div className="text-sm text-slate-600">Applications</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Link 
                    to="/internships"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    🚀 Apply for Internships
                  </Link>
                  <Link 
                    to="/settings"
                    className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-all"
                  >
                    ✏️ Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="border border-red-300 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-all"
                  >
                    🔒 Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="text-center">
            <div className="text-4xl mb-4">💫</div>
            <h3 className="text-2xl font-bold mb-4">Ready for Your Next Adventure?</h3>
            <p className="text-lg text-indigo-100 mb-6">
              {getRandomMessage()}
            </p>
            <Link 
              to="/internships"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              Explore Opportunities →
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
            <div className="text-2xl font-bold text-slate-900 mb-2">98%</div>
            <div className="text-sm text-slate-600">Success Rate</div>
            <div className="text-xs text-slate-400 mt-2">Students placed through Internadda</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
            <div className="text-2xl font-bold text-slate-900 mb-2">48h</div>
            <div className="text-sm text-slate-600">Avg. Process Time</div>
            <div className="text-xs text-slate-400 mt-2">From application to interview</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
            <div className="text-2xl font-bold text-slate-900 mb-2">₹6.5k</div>
            <div className="text-sm text-slate-600">Avg. Stipend</div>
            <div className="text-xs text-slate-400 mt-2">Per month across all roles</div>
          </div>
        </div>

        {/* Simple CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">
            Start your journey today. It only takes one application to change everything.
          </p>
          <Link 
            to="/internships"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            💼 Browse Open Internships
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
