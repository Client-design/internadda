import React, { useState } from 'react';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS, CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Internships');

  const filteredInternships = selectedCategory === 'All Internships' 
    ? MOCK_INTERNSHIPS 
    : MOCK_INTERNSHIPS.filter(i => i.category === selectedCategory);

  const stats = {
    internships: '30+',
    placed: '7000+',
    companies: '50+',
    successRate: '98%'
  };

  const features = [
    {
      icon: '🔒',
      title: 'Secure Testing',
      description: 'Proctored assessments with anti-cheat'
    },
    {
      icon: '⚡',
      title: 'Fast Results',
      description: 'Get placement results in 24-48 hours'
    },
    {
      icon: '💼',
      title: 'Direct Interviews',
      description: 'Connect directly with hiring teams'
    },
    {
      icon: '🎓',
      title: 'Certificate',
      description: 'Industry-recognized certification'
    }
  ];

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 mb-6 border border-indigo-100 shadow-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  Trusted by {stats.companies} Top Companies
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Launch Your Career with{' '}
                  <span className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                      Guaranteed Internships
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 blur-xl"></span>
                  </span>
                </h1>
                <p className="text-lg text-slate-600 mt-6 leading-relaxed">
                  Join 7,000+ students who transformed their careers through skill-based assessments and direct industry connections.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/tests"
                  className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-3.5 rounded-xl font-semibold text-lg hover:border-indigo-300 hover:shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  Try Practice Test
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                {[
                  { label: 'Active Internships', value: stats.internships, color: 'text-indigo-600' },
                  { label: 'Students Placed', value: stats.placed, color: 'text-emerald-600' },
                  { label: 'Partner Companies', value: stats.companies, color: 'text-blue-600' },
                  { label: 'Success Rate', value: stats.successRate, color: 'text-amber-600' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100">
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
                <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center mb-6 p-4">
                      <img 
                        src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
                        alt="Internadda"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.outerHTML = `
                            <div class="w-full h-full flex items-center justify-center">
                              <span class="text-indigo-600 font-bold text-2xl">IA</span>
                            </div>
                          `;
                        }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Why Internadda?</h3>
                    <p className="text-slate-600 mt-2">Industry-leading placement platform</p>
                  </div>
                  
                  <div className="space-y-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shadow-sm">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{feature.title}</h4>
                          <p className="text-sm text-slate-500">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internship Listings */}
      <div id="internships" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Featured Internships</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hand-picked opportunities from top companies
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Internship Grid */}
          {filteredInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInternships.map(internship => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No internships found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Try selecting a different category</p>
            </div>
          )}

          {/* View All Button */}
          {filteredInternships.length > 0 && (
            <div className="mt-12 text-center">
              <Link 
                to="/internships"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all group shadow-sm hover:shadow-md"
              >
                View All Internships
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">Trusted by Students Worldwide</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform has helped thousands of students secure their dream internships at top companies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Skill-Based', 
                desc: 'Focus on your skills, not just academics',
                icon: '🎯'
              },
              { 
                title: 'Secure', 
                desc: 'Enterprise-grade security & anti-cheat',
                icon: '🛡️'
              },
              { 
                title: 'Fast', 
                desc: 'Get results within 24-48 hours',
                icon: '⚡'
              },
              { 
                title: 'Direct', 
                desc: 'Direct interviews with companies',
                icon: '💼'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 pt-16 border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative mb-10">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-12">
                <h3 className="text-3xl font-bold mb-6">
                  Ready to Launch Your Career?
                </h3>
                <p className="text-lg text-indigo-100 mb-8">
                  Join 7,000+ students who have transformed their careers with Internadda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/signup"
                    className="bg-white text-indigo-600 px-10 py-3.5 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all"
                  >
                    Start Free Today
                  </Link>
                  <Link 
                    to="/tests"
                    className="bg-transparent border-2 border-white text-white px-10 py-3.5 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
                  >
                    Try Demo Test
                  </Link>
                </div>
                <p className="text-sm text-indigo-200 mt-6">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
