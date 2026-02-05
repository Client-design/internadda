import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface DashboardProps {
  user: UserProfile;
}

interface DashboardStats {
  testsCompleted: number;
  testsPassed: number;
  applicationsSubmitted: number;
  profileCompletion: number;
  skillLevel: number;
}

interface RecentActivity {
  id: string;
  type: 'test' | 'application' | 'profile_update';
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'in_progress';
  score?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [stats, setStats] = useState<DashboardStats>({
    testsCompleted: 0,
    testsPassed: 0,
    applicationsSubmitted: 0,
    profileCompletion: 65,
    skillLevel: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's test results from Supabase
        const { data: testResults, error } = await supabase
          .from('test_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const completedTests = testResults?.length || 0;
        const passedTests = testResults?.filter(t => t.passed).length || 0;
        const profileScore = calculateProfileCompletion(user);

        // Fetch applications
        const { data: applications } = await supabase
          .from('applications')
          .select('*')
          .eq('user_id', user.id);

        setStats({
          testsCompleted: completedTests,
          testsPassed: passedTests,
          applicationsSubmitted: applications?.length || 0,
          profileCompletion: profileScore,
          skillLevel: completedTests > 0 ? Math.min(passedTests * 25, 100) : 0
        });

        // Generate recent activity
        const activities: RecentActivity[] = [];
        
        if (testResults && testResults.length > 0) {
          testResults.slice(0, 3).forEach(result => {
            activities.push({
              id: result.id,
              type: 'test',
              title: `Test Completed: ${result.test_name || 'Skill Assessment'}`,
              description: `${result.score}% score`,
              date: new Date(result.created_at).toLocaleDateString(),
              status: result.passed ? 'completed' : 'in_progress',
              score: result.score
            });
          });
        }

        if (activities.length === 0) {
          activities.push({
            id: 'welcome',
            type: 'profile_update',
            title: 'Welcome to Internadda!',
            description: 'Complete your profile to get started',
            date: new Date().toLocaleDateString(),
            status: 'in_progress'
          });
        }

        setRecentActivity(activities);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to local data
        const profileScore = calculateProfileCompletion(user);
        setStats({
          testsCompleted: 0,
          testsPassed: 0,
          applicationsSubmitted: 0,
          profileCompletion: profileScore,
          skillLevel: 0
        });
        setRecentActivity([{
          id: 'welcome',
          type: 'profile_update',
          title: 'Welcome to Internadda!',
          description: 'Complete your profile and take your first test',
          date: new Date().toLocaleDateString(),
          status: 'in_progress'
        }]);
        setLoading(false);
      }
    };

    fetchUserData();

    // Set up real-time subscription for test results
    const channel = supabase
      .channel('test-results')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'test_results', filter: `user_id=eq.${user.id}` },
        (payload) => {
          // Update stats when new test result is added
          setStats(prev => ({
            ...prev,
            testsCompleted: prev.testsCompleted + 1,
            testsPassed: prev.testsPassed + (payload.new.passed ? 1 : 0),
            skillLevel: Math.min((prev.testsPassed + (payload.new.passed ? 1 : 0)) * 25, 100)
          }));

          // Add to recent activity
          const newActivity: RecentActivity = {
            id: payload.new.id,
            type: 'test',
            title: `Test Completed: ${payload.new.test_name || 'Skill Assessment'}`,
            description: `${payload.new.score}% score`,
            date: new Date().toLocaleDateString(),
            status: payload.new.passed ? 'completed' : 'in_progress',
            score: payload.new.score
          };

          setRecentActivity(prev => [newActivity, ...prev.slice(0, 4)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const calculateProfileCompletion = (user: UserProfile) => {
    let score = 0;
    if (user.name && user.name.length > 0) score += 25;
    if (user.email && user.email.length > 0) score += 25;
    if (user.phone && user.phone.length > 0) score += 25;
    if (user.education && user.education !== 'Undergraduate') score += 25;
    return score;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return '✓';
      case 'in_progress': return '⟳';
      case 'pending': return '⏱';
      default: return '●';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 rounded-lg w-48"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-slate-100 rounded-2xl"></div>
                ))}
              </div>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-100 rounded-2xl"></div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-slate-100 rounded-2xl"></div>
              <div className="h-48 bg-slate-100 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
            <p className="text-slate-600">
              Welcome back, {user.name}. Track your progress and manage your internship journey.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-500">Profile: {stats.profileCompletion}% complete</div>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.profileCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${stats.testsCompleted > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                  {stats.testsCompleted > 0 ? 'Active' : 'Start'}
                </div>
              </div>
              <div className="text-xl font-bold text-slate-900 mb-1">{stats.testsCompleted}</div>
              <div className="text-sm text-slate-500">Tests Completed</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${stats.testsPassed > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                  {stats.testsCompleted > 0 ? `${Math.round((stats.testsPassed/stats.testsCompleted)*100)}%` : '0%'}
                </div>
              </div>
              <div className="text-xl font-bold text-slate-900 mb-1">{stats.testsPassed}</div>
              <div className="text-sm text-slate-500">Tests Passed</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${stats.applicationsSubmitted > 0 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>
                  {stats.applicationsSubmitted > 0 ? 'Applied' : 'Ready'}
                </div>
              </div>
              <div className="text-xl font-bold text-slate-900 mb-1">{stats.applicationsSubmitted}</div>
              <div className="text-sm text-slate-500">Applications</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <Link 
                  to="/#internships"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Apply →
                </Link>
              </div>
              <div className="text-xl font-bold text-slate-900 mb-1">30+</div>
              <div className="text-sm text-slate-500">Active Internships</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
              <p className="text-sm text-slate-500 mt-1">Track your progress and achievements</p>
            </div>
            
            <div className="p-5">
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(activity.status).split(' ')[0]}`}>
                          <span className="text-sm font-medium">{getStatusIcon(activity.status)}</span>
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
                      <div className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
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
                      to="/#internships"
                      className="border border-slate-300 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"
                    >
                      Browse Internships
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Your Profile</h3>
                <Link to="/profile" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Edit
                </Link>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-indigo-700">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{user.name}</h4>
                    <p className="text-sm text-slate-500">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded">
                        {user.domain}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Phone</span>
                    <span className="font-medium text-slate-900">{user.phone || 'Not set'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Education</span>
                    <span className="font-medium text-slate-900">{user.education}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Account Status</span>
                    <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Progress Overview</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Profile Completion</span>
                  <span className="text-sm font-medium text-slate-900">{stats.profileCompletion}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${stats.profileCompletion}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Skill Level</span>
                  <span className="text-sm font-medium text-slate-900">{stats.skillLevel}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${stats.skillLevel}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Placement Readiness</span>
                  <span className="text-sm font-medium text-slate-900">
                    {stats.applicationsSubmitted > 0 ? 'Applied' : 'Ready'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(stats.applicationsSubmitted * 33, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-600 mb-4">Next steps to improve:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-xs text-indigo-700">1</span>
                  </div>
                  Complete profile details
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-xs text-indigo-700">2</span>
                  </div>
                  Take practice tests
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-xs text-indigo-700">3</span>
                  </div>
                  Apply for internships
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
