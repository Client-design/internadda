import React, { useState, useEffect } from 'react';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS, CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Internships');

  // Ensure page starts at top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredInternships = selectedCategory === 'All Internships' 
    ? MOCK_INTERNSHIPS 
    : MOCK_INTERNSHIPS.filter(i => i.category === selectedCategory);

  const stats = {
    internships: '30+',
    placed: '7,000+',
    companies: '150+',
    processTime: '48h'
  };

  const trustBadges = [
    { text: '🏛️ MSME Certified', desc: 'Government Registered' },
    { text: '🏆 98% Success Rate', desc: '7,000+ Students Placed' },
    { text: '💰 Stipend Range', desc: '₹1,000 - ₹20,000/month' },
    { text: '⚡ Fast Process', desc: 'Interview in 48 hours' }
  ];

  const testimonials = [
    {
      quote: "The direct interview process saved me months of waiting. Got my Google internship in 3 days!",
      name: "Rahul Sharma",
      company: "SWE Intern @ Google",
      score: 92
    },
    {
      quote: "As a non-tech student, I found amazing opportunities here. MSME certification gave me confidence.",
      name: "Neha Gupta",
      company: "Marketing @ Unacademy",
      score: 85
    }
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Direct Interviews',
      description: 'Skip HR rounds, meet hiring managers directly'
    },
    {
      icon: '📊',
      title: 'Skill Assessment',
      description: 'Industry-standard tests with anti-cheat'
    },
    {
      icon: '🏆',
      title: 'Certificate',
      description: 'Recognized by 150+ companies'
    },
    {
      icon: '💼',
      title: 'Real Projects',
      description: 'Work on live industry projects'
    }
  ];

  return (
    <div className="pb-12">
      {/* Hero Section - More Minimal & Professional */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 mb-6 border border-indigo-100 mx-auto lg:mx-0">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  Trusted by {stats.companies} Partner Companies
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Premium Internships with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                    Guaranteed Interviews
                  </span>
                </h1>
                <p className="text-lg text-slate-600 mt-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Join 7,000+ students who launched their careers through skill-based assessments and direct industry connections.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/internships"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Browse Internships</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  to="/tests"
                  className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-3.5 rounded-xl font-semibold text-lg hover:border-indigo-300 hover:shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  Try Practice Test
                </Link>
              </div>

              {/* Trust Badges - Minimal */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {trustBadges.map((badge, idx) => (
                  <div key={idx} className="text-left p-3 bg-white rounded-xl border border-slate-100">
                    <div className="font-bold text-slate-900 text-sm">{badge.text}</div>
                    <div className="text-xs text-slate-500 mt-1">{badge.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Side */}
            <div className="space-y-6">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                        <span className="text-lg font-bold text-indigo-600">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-700 italic mb-3">"{testimonial.quote}"</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-slate-900">{testimonial.name}</div>
                          <div className="text-sm text-slate-500">{testimonial.company}</div>
                        </div>
                        <div className="text-emerald-600 font-bold">
                          {testimonial.score}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Internadda?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Industry-leading platform with proven results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 transition-colors">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Internship Listings */}
      <div id="internships" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Featured Internships</h2>
            <p className="text-lg text-slate-600">
              Hand-picked opportunities from top companies
            </p>
          </div>
          
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map(internship => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>

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
        </div>

        {/* Trust & Safety Score Section */}
        <div className="mt-24 pt-16 border-t border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Trust & Safety Metrics</h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Rated higher than other internship platforms
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">Platform Safety Score</h4>
                  <div className="text-5xl font-bold text-emerald-600 mb-4">9.2/10</div>
                  <p className="text-slate-600 mb-6">Higher than industry average of 7.5</p>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 w-[92%]"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-200 p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">📈</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">Tracxn Recognition</h4>
                  <div className="text-3xl font-bold text-indigo-600 mb-4">Top 10 EdTech</div>
                  <p className="text-slate-600 mb-6">Featured in 2024 EdTech Startup Report</p>
                  <div className="text-sm text-slate-500">
                    "Fastest growing internship platform"
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-200 p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">Founder Endorsements</h4>
                  <div className="space-y-4">
                    <p className="text-slate-600 italic">
                      "Internadda's skill-first approach is revolutionizing hiring."
                    </p>
                    <div className="font-semibold text-slate-900">
                      - Startup Founder, Y Combinator
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Offer Letter Section */}
        <div className="mt-24 pt-16 border-t border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-2 rounded-full text-sm font-bold text-indigo-700 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
              Official Selection Letter
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">Get Your Personalized Offer Letter</h3>
            
            <div className="relative group rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border-8 border-white">
              <iframe 
                src="/offer-letter.html" 
                className="w-full h-[600px] border-0"
                title="Offer Letter Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-12">
                <Link 
                  to="/offer-letter"
                  className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-xl hover:bg-indigo-50 transition-colors"
                >
                  Generate Your Offer Letter
                </Link>
              </div>
            </div>
            
            <p className="mt-8 text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
              Upon successful assessment, you'll receive a personalized, industry-recognized offer letter to boost your professional portfolio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
