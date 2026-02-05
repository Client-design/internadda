import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Users, Building2, ArrowRight, 
  ShieldCheck, Star, Award, Briefcase, Zap
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
    <div className="bg-white">
      {/* 1. MEGA HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm mb-8"
          >
            <ShieldCheck size={18} />
            MSME Certified Internship Platform
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight mb-8"
          >
            India's <span className="text-indigo-600">Adda</span> for <br />
            Premium Internships.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Hum koi fake promises nahi karte. Hum dete hain direct access top companies ko. 
            Join 7,000+ students who started their career with real stipends and verified certificates.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/internships" className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
              Apply for Internships <ArrowRight />
            </Link>
            <Link to="/about" className="px-12 py-5 bg-white text-slate-700 border-2 border-slate-200 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all">
              How it Works?
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. REAL TRUST METRICS (No Fluff) */}
      <section className="py-20 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Verified Placements', value: '7,000+', icon: Users },
              { label: 'Partner Companies', value: '150+', icon: Building2 },
              { label: 'Success Rate', value: '98%', icon: Zap },
              { label: 'MSME Registered', value: 'Certified', icon: Award },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-indigo-600 flex justify-center mb-4"><stat.icon size={40} strokeWidth={2.5} /></div>
                <div className="text-4xl font-black text-slate-900">{stat.value}</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERNSHIP PROMOTION SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black text-slate-900 mb-6">Explore Open Roles</h2>
              <p className="text-xl text-slate-600 font-medium">Bina kisi jhanjhat ke, seedha apply karein. Har internship verified hai aur stipend ke saath aati hai.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                    selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-xl' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredInternships.map(internship => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY TRUST INTERNADDA? (Simple & Clear) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-6">Pure Transparency. No Hidden Costs.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto">Humara mission hai students ko empower karna, unhe uljhana nahi.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Real Stipends", 
                desc: "₹1,000 se lekar ₹20,000 tak ka monthly stipend. Hum sirf vahi companies list karte hain jo pay karti hain.",
                icon: Briefcase
              },
              { 
                title: "MSME Verification", 
                desc: "Platform registered hai, certificates valid hain. Aapka career safe hands mein hai.",
                icon: ShieldCheck
              },
              { 
                title: "Direct Access", 
                desc: "Assessment clear karein aur seedha interview round mein baithein. No long waiting lists.",
                icon: Zap
              }
            ].map((box, i) => (
              <div key={i} className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100 transition-all">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 text-indigo-600">
                  <box.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{box.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-indigo-600 rounded-[60px] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Start Your Professional <br /> Journey Today.</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                <Link to="/signup" className="px-12 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:scale-105 transition-transform">
                  Create Account - Free
                </Link>
                <Link to="/internships" className="px-12 py-5 bg-indigo-700 text-white border border-indigo-500 rounded-2xl font-black text-xl hover:bg-indigo-800 transition-all">
                  Browse Roles
                </Link>
              </div>
              <p className="mt-12 text-indigo-100 font-bold flex items-center justify-center gap-2">
                <CheckCircle size={20} /> Join 7,000+ Students Already Placed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
