import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const teamMembers = [
    { name: 'Rahul Sharma', role: 'CEO & Founder', desc: 'Ex-Google, IIT Delhi' },
    { name: 'Priya Patel', role: 'CTO', desc: 'Ex-Microsoft, BITS Pilani' },
    { name: 'Amit Kumar', role: 'Head of Placements', desc: 'Ex-Amazon, IIM Ahmedabad' },
    { name: 'Neha Gupta', role: 'Student Success', desc: 'Ex-Unacademy, DU' }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & About Us */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden shadow-lg">
                <img 
                  src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w200"
                  alt="Internadda"
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.outerHTML = `
                      <span class="text-white font-bold text-lg">IA</span>
                    `;
                  }}
                />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Internadda</span>
                <p className="text-sm text-slate-400">India's Adda for Internships</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">About Us</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We're on a mission to bridge the gap between talented students and meaningful internship opportunities. 
                As an MSME certified platform, we've helped 7,000+ students launch their careers with top companies.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  MSME Certified
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  Startup India
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  98.2% Success Rate
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-2 transition-all">Home</Link></li>
              <li><Link to="/internships" className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-2 transition-all">All Internships</Link></li>
              <li><Link to="/tests" className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-2 transition-all">Practice Tests</Link></li>
              <li><Link to="/process" className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-2 transition-all">Hiring Process</Link></li>
              <li><Link to="/stories" className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-2 transition-all">Success Stories</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-2 transition-all">Blog & Guides</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-2 transition-all">FAQ</Link></li>
              <li><Link to="/support" className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-2 transition-all">Support</Link></li>
              <li><Link to="/certificate" className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-2 transition-all">Sample Certificate</Link></li>
              <li><Link to="/offer-letter" className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-2 transition-all">Sample Offer Letter</Link></li>
            </ul>
          </div>

          {/* Meet Our Team */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Meet Our Team</h3>
            <div className="space-y-3">
              {teamMembers.slice(0, 2).map((member, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{member.name}</div>
                    <div className="text-xs text-slate-400">{member.role}</div>
                  </div>
                </div>
              ))}
              <Link 
                to="/team"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium mt-2"
              >
                View All Team Members
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust & Contact Section */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-sm">
              <a href="mailto:hello@internadda.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <span>✉️</span>
                <span>hello@internadda.com</span>
              </a>
              <a href="tel:+9118001234567" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <span>📞</span>
                <span>+91 1800 123 4567</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <span>📍</span>
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Social & Partners */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-3">
              {[
                { platform: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-700' },
                { platform: 'Twitter', icon: '🐦', color: 'from-sky-500 to-blue-500' },
                { platform: 'Instagram', icon: '📸', color: 'from-pink-500 to-rose-500' },
                { platform: 'YouTube', icon: '▶️', color: 'from-red-500 to-red-600' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center hover:scale-110 transition-transform`}
                  aria-label={social.platform}
                >
                  <span className="text-white">{social.icon}</span>
                </a>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Our Partners</h4>
              <div className="flex items-center gap-3 text-xs">
                <span className="px-3 py-1.5 bg-slate-800 rounded-lg">Tracxn</span>
                <span className="px-3 py-1.5 bg-slate-800 rounded-lg">NASSCOM</span>
                <span className="px-3 py-1.5 bg-slate-800 rounded-lg">Startup India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-3">Get internship alerts & career tips</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-shadow">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400 text-center md:text-left">
              © {currentYear} Internadda. All rights reserved. | MSME Certificate No: UDYAM-MH-08-1234567
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund" className="hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
