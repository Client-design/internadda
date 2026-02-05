import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, ArrowRight, Briefcase, Building2, 
  Award, Clock, FileCheck, Zap, Globe, Check 
} from 'lucide-react';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS, CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Internships');
  const [currentSlide, setCurrentSlide] = useState(0);

  // 1. SLIDER IMAGES (Direct Link Format used for auto-display)
  const sliderImages = [
    "https://drive.google.com/uc?id=1tiWKmhhoO3UoNk9pRus8apZX0p2qxo27",
    "https://drive.google.com/uc?id=1FgSK-yi7D73JZZx_EHGzvN5YAokwMMNx"
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

  // Student Stock Images
  const students = [
    { name: "Rahul", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop" },
    { name: "Priya", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
    { name: "Amit", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" },
    { name: "Neha", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" }
  ];

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-xs mb-6 uppercase tracking-wider">
                <CheckCircle2 size={14} /> 
                MSME Registered: UDYAM-MH-08-XXXXXXXX
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                India's Largest Dedicated <br/>
                <span className="text-indigo-600">Internship Ecosystem.</span>
              </h1>
              
              <p className="text-base text-slate-500 max-w-lg mb-8 leading-relaxed">
                Skip generic job boards. Access verified corporate partners with transparent stipends and direct interviews.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/internships" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-sm">
                  Find Internships <ArrowRight size={16} />
                </Link>
                <Link to="/tests" className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all">
                  Practice Mode
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6 text-slate-400">
                <div className="flex -space-x-2">
                  {students.map((s, i) => (
                    <img key={i} src={s.img} alt={s.name} className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
                  ))}
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest">7,000+ Students Placed</p>
              </div>
            </div>

            {/* 2. AUTO-SLIDER (Proper Look) */}
            <div className="hidden lg:block relative group">
               <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl aspect-[4/3] relative">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur shadow-sm rounded text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                      Our Collaborations
                    </span>
                  </div>
                  
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full"
                    >
                      <img 
                        src={sliderImages[currentSlide]} 
                        alt="Achievement"
                        className="w-full h-full object-cover"
                        loading="eager"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/800x600?text=Internadda+Achievement";
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-4 right-4 flex gap-1.5 z-20">
                    {sliderImages.map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-indigo-600 w-4' : 'bg-slate-300'}`} />
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS & REST OF THE PAGE */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Roles', value: '300+', icon: Briefcase },
              { label: 'Partners', value: '150+', icon: Building2 },
              { label: 'Avg. Stipend', value: '₹6,500', icon: Award },
              { label: 'Hiring Time', value: '72 Hours', icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-indigo-600"><stat.icon size={20} /></div>
                <div>
                  <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-2xl font-bold text-slate-900">Current Openings</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-1.5 rounded-full text-xs font-bold border ${selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-12 bg-white border-t border-slate-100 text-center">
        <div className="flex justify-center gap-4 mb-8">
           <Link to="/signup" className="text-xs font-bold uppercase tracking-widest bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition-colors">Apply Now</Link>
           <Link to="/hiring" className="text-xs font-bold uppercase tracking-widest border border-slate-200 px-6 py-3 rounded hover:bg-slate-50 transition-colors">Partner with Us</Link>
        </div>
        <div className="flex justify-center gap-8 text-[10px] font-bold text-slate-400 uppercase">
          <span className="flex items-center gap-1"><Check size={12}/> 100% Free</span>
          <span className="flex items-center gap-1"><Check size={12}/> No Ghosting Policy</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
