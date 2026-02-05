import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Users, Building2, ArrowRight, 
  ShieldCheck, Star, Award, Briefcase, Zap,
  Globe, Clock, Search, FileCheck, Check
} from 'lucide-react';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS, CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Internships');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredInternships = selectedCategory === 'All Internships' 
    ? MOCK_INTERNSHIPS 
    : MOCK_INTERNSHIPS.filter(i => i.category === selectedCategory);

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. COMPACT NAV-HERO */}
      <section className="relative pt-12 pb-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-xs mb-6 uppercase tracking-wider">
                <CheckCircle2 size={14} /> 
                MSME Registered: UDYAM-MH-08-1234567
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                India's Largest Dedicated <br/>
                <span className="text-indigo-600">Internship Ecosystem.</span>
              </h1>
              
              <p className="text-base text-slate-500 max-w-lg mb-8 leading-relaxed">
                Skip the generic job boards. Access a streamlined pipeline of 150+ verified corporate partners. 
                Focus on skill-based hiring with transparent stipends and direct interviews.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/internships" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-sm">
                  Find Internships <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all">
                  Verification Process
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6 text-slate-400">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">U{i}</div>
                  ))}
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest">7,000+ Students Placed</p>
              </div>
            </div>

            {/* Platform Snapshot (Look Trustworthy) */}
            <div className="hidden lg:block bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-inner">
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Live Hiring Dashboard</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { company: "TCS Ion", role: "Web Dev", status: "Interviewing", color: "text-blue-600" },
                      { company: "Zomato", role: "Marketing", status: "Shortlisting", color: "text-emerald-600" },
                      { company: "Unacademy", role: "Content", status: "Active", color: "text-indigo-600" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs p-2 rounded border border-slate-50 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center font-bold text-[10px]">{item.company[0]}</div>
                          <div>
                            <div className="font-bold text-slate-800">{item.company}</div>
                            <div className="text-slate-400">{item.role}</div>
                          </div>
                        </div>
                        <div className={`font-bold ${item.color}`}>{item.status}</div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INDUSTRY METRICS - CLEAN & DATA-DRIVEN */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Roles', value: '300+', icon: Briefcase },
              { label: 'Corporate Partners', value: '150+', icon: Building2 },
              { label: 'Avg. Stipend', value: '₹12,500', icon: Award },
              { label: 'Hiring Time', value: '48 Hours', icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-indigo-600 border border-slate-100"><stat.icon size={20} /></div>
                <div>
                  <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. INTERNSHIP MARKETPLACE */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Current Openings</h2>
            <p className="text-sm text-slate-500">Verified and updated every 6 hours</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedCategory === cat 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </section>

      {/* 4. VERIFICATION WORKFLOW (The "Real" Factor) */}
      <section className="py-16 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">How we ensure quality.</h2>
              <div className="space-y-6">
                {[
                  { title: "Manual Employer Audit", desc: "Every company is verified through MCA/MSME records before listing.", icon: FileCheck },
                  { title: "Direct Interview Routing", desc: "Our platform routes your assessment directly to the decision maker.", icon: Zap },
                  { title: "Certificate Ledger", desc: "Blockchain-ready certificates recognized by 150+ companies.", icon: Award }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 text-indigo-400"><step.icon size={20} /></div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider">{step.title}</h4>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-left">
               <div className="flex items-center gap-2 mb-6">
                  <Globe size={16} className="text-indigo-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Global Recognition</span>
               </div>
               <p className="text-xl font-medium text-slate-300 leading-relaxed italic">
                 "Internadda has built a transparent ecosystem that significantly reduces hiring friction for early-stage startups."
               </p>
               <div className="mt-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500"></div>
                  <div>
                    <div className="text-sm font-bold">Arjun Mehta</div>
                    <div className="text-xs text-slate-500 font-medium">Founder, TechScale Solutions</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DENSE FOOTER CTA */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Ready to integrate into the professional workforce?</h2>
          <div className="flex justify-center gap-4">
             <Link to="/signup" className="text-xs font-bold uppercase tracking-widest bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition-colors">Apply Now</Link>
             <Link to="/hiring" className="text-xs font-bold uppercase tracking-widest border border-slate-200 px-6 py-3 rounded hover:bg-slate-50 transition-colors">Partner with Us</Link>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
            <span className="flex items-center gap-1"><Check size={12}/> 100% Free for Students</span>
            <span className="flex items-center gap-1"><Check size={12}/> No Ghosting Policy</span>
            <span className="flex items-center gap-1"><Check size={12}/> Real Corporate Stipends</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
