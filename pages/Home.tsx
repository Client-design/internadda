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
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(Array(2).fill(false));

  // Slider images - using reliable Unsplash images
  const sliderImages = [
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
    "https://media.licdn.com/dms/image/v2/D5622AQH6TRTfNcmgQA/feedshare-shrink_800/B56ZuKIgMQJgAg-/0/1767549044820?e=2147483647&v=beta&t=d3S1rYHHEhOB_cjYV8j-ej3OOv8iZEvYt3FSw7VRmPM"
  ];

  // Alternative backup images
  const backupImages = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
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

  const handleImageLoad = (index: number) => {
    const newLoaded = [...imagesLoaded];
    newLoaded[index] = true;
    setImagesLoaded(newLoaded);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, index: number) => {
    console.error(`Failed to load image ${index}:`, sliderImages[index]);
    e.currentTarget.src = backupImages[index];
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. COMPACT NAV-HERO */}
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
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${s.name}&background=random`;
                      }}
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
                
                {/* Loading State */}
                {!imagesLoaded[currentSlide] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-50 animate-pulse">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-sm text-slate-500 font-medium">Loading...</p>
                    </div>
                  </div>
                )}
                
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative"
                  >
                    <img 
                      src={sliderImages[currentSlide]} 
                      alt={`Collaboration ${currentSlide + 1}`}
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad(currentSlide)}
                      onError={(e) => handleImageError(e, currentSlide)}
                      style={{ display: imagesLoaded[currentSlide] ? 'block' : 'none' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-end justify-start p-6">
                      <div className="text-white">
                        <p className="text-sm font-semibold">Featured Partnership</p>
                        <p className="text-xs opacity-90">Successfully placed 500+ interns</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 right-4 flex gap-1.5">
                  {sliderImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-white w-6' : 'bg-white/50'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentSlide(prev => prev === 0 ? sliderImages.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous slide"
                >
                  <ArrowRight size={16} className="rotate-180" />
                </button>
                <button
                  onClick={() => setCurrentSlide(prev => prev === sliderImages.length - 1 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next slide"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              
              {/* Slide Counter */}
              <div className="mt-2 text-right">
                <span className="text-xs text-slate-500 font-medium">
                  {currentSlide + 1} / {sliderImages.length}
                </span>
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
              { label: 'Avg. Stipend', value: '₹6,500', icon: Award },
              { label: 'Hiring Time', value: '72 Hours', icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-indigo-600 border border-slate-100">
                  <stat.icon size={20} />
                </div>
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

      {/* 4. VERIFICATION WORKFLOW & TESTIMONIAL */}
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
            
            {/* Updated Testimonial Section */}
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
                  src="https://s3-symbol-logo.tradingview.com/tracxn-technologies-ltd--600.png"
                  alt="Tracxn" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=100&auto=format&fit=crop";
                  }}
                />
                <div>
                  <div className="text-sm font-bold">Tracxn</div>
                  <div className="text-xs text-slate-500 font-medium">Leading Startup Data Platform</div>
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
