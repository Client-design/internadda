import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider images for achievements/collaborations
  const sliderImages = [
    "https://drive.google.com/file/d/1tiWKmhhoO3UoNk9pRus8apZX0p2qxo27/view?usp=drive_link",
    "https://drive.google.com/file/d/1FgSK-yi7D73JZZx_EHGzvN5YAokwMMNx/view?usp=drive_link"
  ];

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredInternships = selectedCategory === 'All Internships' 
    ? MOCK_INTERNSHIPS 
    : MOCK_INTERNSHIPS.filter(i => i.category === selectedCategory);

  // Real Indian student face images (Stock)
  const students = [
    { name: "Rahul", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop" },
    { name: "Priya", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
    { name: "Amit", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" },
    { name: "Neha", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" }
  ];

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
                {/* Updated Button to Practice Mode */}
                <Link to="/tests" className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all">
                  Practice Mode
                </Link>
              </div>

              {/* Real Student Images */}
              <div className="mt-8 flex items-center gap-6 text-slate-400">
                <div className="flex -space-x-2">
                  {students.map((s, i) => (
                    <img 
                      key={i} 
                      src={s.img} 
                      alt={s.name}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest">7,000+ Students Placed</p>
              </div>
            </div>

            {/* Achievement Slider */}
            <div className="hidden lg:block relative group">
               <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl aspect-[4/3] flex items-center justify-center relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur shadow-sm rounded text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                      Our Collaborations
                    </span>
                  </div>
                  
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <img 
                        src={sliderImages[currentSlide]} 
                        alt="Achievement"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Fallback View link if image doesn't render directly from drive link */}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-50/10">
                         <a href={sliderImages[currentSlide]} target="_blank" className="bg-white/80 px-4 py-2 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">View Achievement Proof</a>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-4 right-4 flex gap-1.5">
                    {sliderImages.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all ${currentSlide === i ? 'bg-indigo-600 w-4' : 'bg-slate-300'}`}
                      />
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INDUSTRY METRICS */}
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
      <section className="py-16 max-w-7xl mx-auto px-4" id="internships">
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

      {/* 4. VERIFICATION WORKFLOW & ARJUN MEHTA TESTIMONIAL */}
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
            
            {/* Updated Arjun Mehta Section with Image */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-left">
               <div className="flex items-center gap-2 mb-6">
                  <Globe size={16} className="text-indigo-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Global Recognition</span>
               </div>
               <p className="text-xl font-medium text-slate-300 leading-relaxed italic">
                 "Internadda has built a transparent ecosystem that significantly reduces hiring friction for early-stage startups."
               </p>
               <div className="mt-6 flex items-center gap-4">
                  <img 
                    src="https://drive.google.com/file/d/12p0wO__YLIPYjABT1VmbA7wCgXrSlJyi/view?usp=drive_link" 
                    alt="Arjun Mehta" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                  />
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
