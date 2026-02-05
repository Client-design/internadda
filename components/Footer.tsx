import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Team members used for the team preview section
  const teamMembers = [
    { name: 'Rahul Sharma', role: 'CEO & Founder', desc: 'Ex-Google, IIT Delhi' },
    { name: 'Priya Patel', role: 'CTO', desc: 'Ex-Microsoft, BITS Pilani' }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Info - Centered on Mobile */}
          <div className="lg:col-span-2 space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden shadow-lg">
                <img 
                  src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w200"
                  alt="Internadda"
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.outerHTML = `<span class="text-white font-bold text-lg">IA</span>`;
                  }}
                />
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-white block">Internadda</span>
                <p className="text-xs text-slate-400">India's Adda for Internships</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Connecting talented students with premium internship opportunities. 
              As an MSME certified platform, we've helped 7,000+ students launch 
              their professional careers with top-tier companies.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="bg-slate-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-700">
                MSME CERTIFIED
              </div>
              <div className="bg-slate-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-700">
                STARTUP INDIA
              </div>
            </div>
          </div>

          {/* Links Section - Proper 2-column grid on mobile */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {/* Platform Column */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold text-lg mb-6">Platform</h3>
              <ul className="space-y-4">
                <li><Link to="/internships" className="text-slate-400 hover:text-white transition-all text-sm block">Browse Internships</Link></li>
                <li><Link to="/tests" className="text-slate-400 hover:text-white transition-all text-sm block">Practice Tests</Link></li>
                <li><Link to="/hiring" className="text-slate-400 hover:text-white transition-all text-sm block">Hiring Process</Link></li>
                <li><Link to="/stories" className="text-slate-400 hover:text-white transition-all text-sm block">Success Stories</Link></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-slate-400 hover:text-white transition-all text-sm block">About Us</Link></li>
                <li><Link to="/team" className="text-slate-400 hover:text-white transition-all text-sm block">Our Team</Link></li>
                <li><Link to="/faq" className="text-slate-400 hover:text-white transition-all text-sm block">Support FAQ</Link></li>
                <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-all text-sm block">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Team Preview Section - Hidden on very small screens, shown on desktop */}
          <div className="hidden lg:block">
            <h3 className="text-white font-semibold text-lg mb-6 text-center lg:text-left">Our Leadership</h3>
            <div className="space-y-4">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{member.name}</div>
                    <div className="text-[10px] text-slate-400">{member.role}</div>
                  </div>
                </div>
              ))}
              <Link to="/team" className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 mt-2">
                Meet the full team 
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact & Newsletter Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Contact Details */}
          <div className="text-center md:text-left space-y-3">
            <h4 className="text-white font-bold text-sm mb-4">Contact Support</h4>
            <a href="mailto:hello@internadda.com" className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-400 hover:text-white">
              <span>✉️</span> hello@internadda.com
            </a>
            <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-400">
              <span>📍</span> Mumbai, Maharashtra, India
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-white font-bold text-sm mb-4">Follow Our Journey</h4>
            <div className="flex gap-4">
              {['💼', '📸', '🐦', '▶️'].map((icon, idx) => (
                <a key={idx} href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:-translate-y-1 transition-all text-sm">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mini Newsletter */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-white font-bold text-sm mb-4">Career Updates</h4>
            <div className="flex w-full max-w-xs">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-slate-800 border-none rounded-l-lg px-4 py-2 text-xs w-full focus:ring-1 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-r-lg text-white text-xs font-bold transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[11px] text-slate-500">
            © {currentYear} Internadda Platform. All rights reserved. 
            <span className="hidden md:inline ml-2">| UDYAM-MH-08-1234567</span>
          </p>
          <div className="flex gap-6 text-[11px] text-slate-500">
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/refund" className="hover:text-white">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
