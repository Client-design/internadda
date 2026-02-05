import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Users, Building2, Zap, ArrowRight, 
  ShieldCheck, Star, Award, TrendingUp 
} from 'lucide-react';
import InternshipCard from '../components/InternshipCard';
import { MOCK_INTERNSHIPS, CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Internships');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredInternships = selectedCategory === 'All Internships' 
    ? MOCK_INTERNSHIPS 
    : MOCK_INTERNSHIPS.filter(i => i.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Top Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-[1000] origin-left" style={{ scaleX }} />

      {/* Hero Section with Animated Mesh Background */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
              </span>
              India's #1 Skill-Based Internship Platform
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight"
            >
              Don't Just Apply, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
                Get Directly Placed.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Skip the HR line. Show your skills via industry-standard assessments and 
              land internships at companies like <span className="font-bold text-slate-800">Google, Microsoft, and Unacademy.</span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/internships" className="group relative px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2">
                Browse Internships
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/tests" className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-indigo-200 hover:bg-slate-50 transition-all">
                Take Practice Test
              </Link>
            </motion.div>

            {/* Live Stats */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-slate-100"
            >
              {[
                { label: 'Placements', value: '7,000+', icon: Users },
                { label: 'Partners', value: '150+', icon: Building2 },
                { label: 'Success Rate', value: '98%', icon: TrendingUp },
                { label: 'Stipend Avg', value: '₹12k', icon: Award },
              ].map((stat, i) => (
                <motion.div key={i} variants={itemVariants} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-3 text-indigo-600">
                    <stat.icon size={24} />
                  </div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Marquee Style Look */}
      <div className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Trusted by MSME & Startup India</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
             <div className="font-black text-2xl text-slate-400">MICROSOFT</div>
             <div className="font-black text-2xl text-slate-400">GOOGLE</div>
             <div className="font-black text-2xl text-slate-400">UNACADEMY</div>
             <div className="font-black text-2xl text-slate-400">RAZORPAY</div>
             <div className="font-black text-2xl text-slate-400">ZOMATO</div>
          </div>
        </div>
      </div>

      {/* Why Internadda - Feature Cards with Glass effect */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Why Students Love Us</h2>
          <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Direct Interviews", 
              desc: "No more ghosting. Your test score gets you a direct seat with the hiring manager.",
              icon: Zap, color: "bg-amber-500" 
            },
            { 
              title: "Verified MSME Platform", 
              desc: "Government recognized certification that adds massive value to your Resume.",
              icon: ShieldCheck, color: "bg-emerald-500" 
            },
            { 
              title: "Stipend Guaranteed", 
              desc: "We only list paid internships. Earn while you learn with 100% payment security.",
              icon: CheckCircle, color: "bg-indigo-500" 
            }
          ].map((feat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feat.color} text-white flex items-center justify-center mb-6 shadow-lg`}>
                <feat.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{feat.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Internships with Filter Pills */}
      <section id="internships" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Featured Opportunities</h2>
              <p className="text-slate-500 font-medium">Hand-picked premium roles for you</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredInternships.map(internship => (
              <motion.div layout key={internship.id}>
                <InternshipCard internship={internship} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <Link to="/internships" className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl">
              Explore 500+ More Roles
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Slider Style Look */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Real Stories from <br /> 
                <span className="text-indigo-600">Internadda Achievers</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                   <div className="text-4xl italic text-indigo-300">"</div>
                   <div>
                     <p className="text-lg text-slate-700 font-medium mb-4">
                       The assessment was challenging but fair. Within 48 hours, I was talking to the CTO of a top startup. Internadda is a game changer!
                     </p>
                     <div className="font-bold text-slate-900">Rahul Sharma</div>
                     <div className="text-sm text-indigo-600 font-bold uppercase tracking-wider">SWE Intern @ Google</div>
                   </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-indigo-100 to-white rounded-[40px] rotate-3 absolute inset-0 -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Students working" 
                className="rounded-[40px] shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-500 object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <Star fill="currentColor" />
                </div>
                <div>
                  <div className="font-black text-2xl text-slate-900">4.9/5</div>
                  <div className="text-sm font-bold text-slate-500">Average Student Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Radical Design */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[50px] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8">Ready to start your professional journey?</h2>
            <p className="text-indigo-200 text-xl mb-12 max-w-2xl mx-auto">Join the exclusive community of high-skilled interns and get recruited by top-tier companies today.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup" className="px-12 py-5 bg-white text-slate-900 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-white/10">
                Create Free Account
              </Link>
              <Link to="/about" className="px-12 py-5 bg-slate-800 text-white rounded-2xl font-black text-xl border border-slate-700 hover:bg-slate-700 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
