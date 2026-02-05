import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
);

interface ProfileProps {
  user: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    testsCompleted: 0,
    testsPassed: 0,
    applicationsSubmitted: 0,
    profileCompletion: 85,
    skillLevel: 72
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch test results
      const { data: testResults } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch applications
      const { data: applications } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id);

      // Calculate stats
      const completedTests = testResults?.length || 0;
      const passedTests = testResults?.filter(t => t.passed).length || 0;
      
      setStats({
        testsCompleted: completedTests,
        testsPassed: passedTests,
        applicationsSubmitted: applications?.length || 0,
        profileCompletion: calculateProfileCompletion(user),
        skillLevel: completedTests > 0 ? Math.min(passedTests * 25, 100) : 0
      });

      // Format recent activity
      const activities = testResults?.map(result => ({
        id: result.id,
        type: 'test',
        title: `Test Completed: ${result.test_name || 'Skill Assessment'}`,
        description: `${result.score}% score`,
        date: new Date(result.created_at).toLocaleDateString(),
        status: result.passed ? 'completed' : 'in_progress',
        score: result.score
      })) || [];

      setRecentActivity(activities);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
    }
  };

  const calculateProfileCompletion = (user: UserProfile) => {
    let score = 0;
    if (user.name && user.name.length > 0) score += 25;
    if (user.email && user.email.length > 0) score += 25;
    if (user.phone && user.phone.length > 0) score += 25;
    if (user.education && user.education !== 'Undergraduate') score += 25;
    return score;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'applications', label: 'Applications', icon: '📋' },
    { id: 'certificates', label: 'Certificates', icon: '🏅' },
    { id: 'skills', label: 'Skills', icon: '🎯' }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 rounded-lg w-48"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-slate-100 rounded-2xl"></div>
              <div className="h-48 bg-slate-100 rounded-2xl"></div>
            </div>
            <div className="space-y-6">
              <div className="h-80 bg-slate-100 rounded-2xl"></div>
              <div className="h-48 bg-slate-100 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">My Profile</h1>
              <p className="text-slate-600">Track your progress and manage your internship journey</p>
            </div>
            <Link 
              to="/settings"
              className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              <span>⚙️</span>
              Edit Profile
            </Link>
          </div>

          {/* Profile Header Card */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 text-white mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center border-4 border-white/30">
                  <span className="text-2xl md:text-3xl font-bold">
                    {getInitials(user.name)}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-bold">🎯</span>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{user.name}</h2>
                <p className="text-indigo-100 mb-4">{user.email}</p>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm font-medium">
                    {user.education}
                  </span>
                  <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm font-medium">
                    {user.domain}
                  </span>
                  <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-100 rounded-full text-sm font-medium">
                    Active Member
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{stats.testsCompleted}</div>
                  <div className="text-sm text-indigo-100">Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{stats.applicationsSubmitted}</div>
                  <div className="text-sm text-indigo-100">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{stats.testsPassed}</div>
                  <div className="text-sm text-indigo-100">Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{stats.skillLevel}%</div>
                  <div className="text-sm text-indigo-100">Skill Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-slate-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-white border-t border-l border-r border-slate-200 text-indigo-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Progress Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-slate-900">Profile Completion</h3>
                      <span className="text-sm font-medium text-emerald-600">{stats.profileCompletion}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${stats.profileCompletion}%` }}
                      ></div>
                    </div>
                    <div className="mt-4 text-sm text-slate-600">
                      Complete your profile to get better internship matches
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-slate-900">Skill Level</h3>
                      <span className="text-sm font-medium text-indigo-600">{stats.skillLevel}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${stats.skillLevel}%` }}
                      ></div>
                    </div>
                    <div className="mt-4 text-sm text-slate-600">
                      Based on your test performance and certifications
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                    <p className="text-sm text-slate-500 mt-1">Your latest tests and applications</p>
                  </div>
                  
                  <div className="p-6">
                    {recentActivity.length > 0 ? (
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                activity.status === 'completed' ? 'bg-emerald-100' :
                                activity.status === 'in_progress' ? 'bg-blue-100' : 'bg-amber-100'
                              }`}>
                                <span className="text-sm font-medium">
                                  {activity.status === 'completed' ? '✓' : activity.status === 'in_progress' ? '⟳' : '⏱'}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900">{activity.title}</h4>
                                <p className="text-sm text-slate-500">{activity.description}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs text-slate-400">{activity.date}</span>
                                  {activity.score !== undefined && (
                                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded">
                                      Score: {activity.score}%
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className={`text-xs font-medium px-3 py-1 rounded-full ${
                              activity.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                              activity.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {activity.status.replace('_', ' ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl">📝</span>
                        </div>
                        <h4 className="font-medium text-slate-900 mb-2">No activity yet</h4>
                        <p className="text-sm text-slate-500 mb-6">Start by taking a practice test or applying for internships</p>
                        <div className="flex justify-center gap-3">
                          <Link 
                            to="/tests"
                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                          >
                            Take Practice Test
                          </Link>
                          <Link 
                            to="/internships"
                            className="border border-slate-300 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"
                          >
                            Browse Internships
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recommended Internships */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Recommended For You</h3>
                        <p className="text-sm text-slate-500 mt-1">Based on your skills and preferences</p>
                      </div>
                      <Link 
                        to="/internships"
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="p-4 border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-slate-900">Python Developer Intern</h4>
                              <p className="text-sm text-slate-500">Corporate Partners</p>
                            </div>
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">Remote</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                            <span className="flex items-center gap-1">
                              <span>💰</span>
                              <span>₹1,000-10,000/month</span>
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {['Python', 'Django', 'PostgreSQL'].slice(0, 3).map(skill => (
                              <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <Link 
                            to={`/apply/1`}
                            className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:shadow-sm"
                          >
                            Apply Now
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900">Your Applications</h3>
                  <p className="text-sm text-slate-500 mt-1">Track all your internship applications</p>
                </div>
                
                <div className="p-6">
                  {stats.applicationsSubmitted > 0 ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 border border-slate-200 rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-slate-900">Python Developer Intern</h4>
                              <p className="text-sm text-slate-500">Corporate Partners</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              i === 1 ? 'bg-emerald-100 text-emerald-800' :
                              i === 2 ? 'bg-amber-100 text-amber-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {i === 1 ? 'Interview Scheduled' : i === 2 ? 'Under Review' : 'Applied'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-slate-500">Applied Date</div>
                              <div className="font-medium">Jan 15, 2024</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500">Status</div>
                              <div className="font-medium">
                                {i === 1 ? 'Test Passed' : i === 2 ? 'Test Completed' : 'Application Submitted'}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500">Next Step</div>
                              <div className="font-medium">
                                {i === 1 ? 'Interview' : i === 2 ? 'Decision' : 'Skill Test'}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500">Estimated Time</div>
                              <div className="font-medium">
                                {i === 1 ? '1-2 days' : i === 2 ? '3-5 days' : '48 hours'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Link 
                              to={`/internship/${i}`}
                              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                            >
                              View Details
                            </Link>
                            {i === 1 && (
                              <Link 
                                to="/dashboard"
                                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                              >
                                Prepare for Interview
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">📋</span>
                      </div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">No applications yet</h4>
                      <p className="text-slate-600 max-w-md mx-auto mb-6">
                        Start applying for internships to kickstart your career journey
                      </p>
                      <Link 
                        to="/internships"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg"
                      >
                        <span>🚀</span>
                        Browse Internships
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900">Your Certificates</h3>
                  <p className="text-sm text-slate-500 mt-1">Professional certificates earned through Internadda</p>
                </div>
                
                <div className="p-6">
                  {stats.testsPassed > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2].map((i) => (
                        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center text-white">
                                <div className="text-4xl mb-2">🏅</div>
                                <div className="font-bold text-lg">Skill Assessment Certificate</div>
                                <div className="text-sm opacity-90">Python Development</div>
                              </div>
                            </div>
                          </div>
                          <div className="p-6">
                            <h4 className="font-semibold text-slate-900 mb-2">Python Programming Certification</h4>
                            <p className="text-sm text-slate-600 mb-4">
                              Awarded for scoring 92% in Python skill assessment
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-slate-500">Issued: Jan 10, 2024</div>
                              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                                Download PDF
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">🏅</span>
                      </div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">No certificates yet</h4>
                      <p className="text-slate-600 max-w-md mx-auto mb-6">
                        Pass skill assessments to earn professional certificates
                      </p>
                      <Link 
                        to="/tests"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg"
                      >
                        <span>🎯</span>
                        Take Skill Test
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900">Your Skills</h3>
                  <p className="text-sm text-slate-500 mt-1">Skills assessed through tests and verified by employers</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Python Skill */}
                    <div className="p-4 border border-slate-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-slate-900">Python Programming</h4>
                          <p className="text-sm text-slate-500">Advanced level certification</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-indigo-600">92%</div>
                          <div className="text-xs text-slate-500">Test Score</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-slate-600 mb-1">
                          <span>Skill Level</span>
                          <span>Advanced</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {['Django', 'Flask', 'Pandas', 'NumPy', 'SQL'].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm text-slate-600">
                        <span className="font-medium">Last assessed:</span> Jan 10, 2024
                      </div>
                    </div>

                    {/* Web Development Skill */}
                    <div className="p-4 border border-slate-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-slate-900">Web Development</h4>
                          <p className="text-sm text-slate-500">Intermediate level</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-indigo-600">78%</div>
                          <div className="text-xs text-slate-500">Test Score</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-slate-600 mb-1">
                          <span>Skill Level</span>
                          <span>Intermediate</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {['React', 'JavaScript', 'HTML/CSS', 'Node.js'].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-600">
                          <span className="font-medium">Need improvement:</span> React advanced concepts
                        </div>
                        <Link 
                          to="/tests"
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                        >
                          Retake Test
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/tests"
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600">📝</span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Take Practice Test</div>
                    <div className="text-sm text-slate-500">Improve your skills</div>
                  </div>
                </Link>
                
                <Link 
                  to="/internships"
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600">💼</span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Find Internships</div>
                    <div className="text-sm text-slate-500">Browse opportunities</div>
                  </div>
                </Link>
                
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600">📊</span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">View Dashboard</div>
                    <div className="text-sm text-slate-500">Track progress</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Account Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Member Since</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Account Type</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">Premium</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Subscription</span>
                  <span className="font-medium text-emerald-600">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Credits Left</span>
                  <span className="font-medium">3 applications</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-indigo-100">
                <Link 
                  to="/settings"
                  className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:shadow-sm"
                >
                  Upgrade Account
                </Link>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Complete Your Profile</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      user.name ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {user.name ? '✓' : '1'}
                    </div>
                    <span className={`text-sm ${user.name ? 'text-slate-700' : 'text-slate-500'}`}>
                      Basic Information
                    </span>
                  </div>
                  {user.name ? (
                    <span className="text-xs text-emerald-600 font-medium">Complete</span>
                  ) : (
                    <Link to="/settings" className="text-xs text-indigo-600 font-medium">Add</Link>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      user.education !== 'Undergraduate' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {user.education !== 'Undergraduate' ? '✓' : '2'}
                    </div>
                    <span className={`text-sm ${user.education !== 'Undergraduate' ? 'text-slate-700' : 'text-slate-500'}`}>
                      Education Details
                    </span>
                  </div>
                  {user.education !== 'Undergraduate' ? (
                    <span className="text-xs text-emerald-600 font-medium">Complete</span>
                  ) : (
                    <Link to="/settings" className="text-xs text-indigo-600 font-medium">Add</Link>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                      3
                    </div>
                    <span className="text-sm text-slate-500">Upload Resume</span>
                  </div>
                  <Link to="/settings" className="text-xs text-indigo-600 font-medium">Add</Link>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                      4
                    </div>
                    <span className="text-sm text-slate-500">Add Portfolio</span>
                  </div>
                  <Link to="/settings" className="text-xs text-indigo-600 font-medium">Add</Link>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-2">Profile Strength</div>
                  <div className="text-2xl font-bold text-indigo-600">{stats.profileCompletion}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
