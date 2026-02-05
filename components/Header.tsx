import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Internships', path: '/internships' },
    { label: 'Courses', path: '#' },
    { label: 'Jobs', path: '#' },
    { label: 'About Us', path: '/about' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg py-2' 
          : 'bg-white border-b border-slate-100 py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="relative">
                  <img 
                    src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
                    alt="Internadda"
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                    onError={(e) => {
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<span class="text-white font-bold text-lg">IA</span>';
                      }
                    }}
                  />
                </div>

              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 tracking-tight">
                  Internadda
                </span>
                <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium -mt-1 leading-tight">
                  India's Adda for Internships
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`text-sm font-medium px-4 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold shadow-md'
                        : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="trust-badge px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                MSME Certified
              </div>
              
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center ring-2 ring-indigo-100">
                      <span className="text-sm font-semibold text-indigo-700">
                        {getInitials(user.name)}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-slate-900">
                        {user.name.split(' ')[0]}
                      </div>
                      <div className="text-xs text-slate-500">Account</div>
                    </div>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50">
                        <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500 truncate">{user.email}</div>
                      </div>
                      <div className="py-2">
                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Dashboard</Link>
                        <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Profile</Link>
                        <Link to="/settings" onClick={() => setDropdownOpen(false)} className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">Settings</Link>
                        <button onClick={() => { onLogout(); setDropdownOpen(false); }} className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t border-slate-100 mt-2">Logout</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-semibold text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-50 hover:shadow-sm transition-all">Sign In</Link>
                  <Link to="/signup" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all">Get Started Free</Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="trust-badge px-2 py-1 rounded text-[10px] font-bold">
                MSME
              </div>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-10 h-10 flex flex-col items-center justify-center z-50"
                aria-label="Menu"
              >
                <span className={`absolute w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
                <span className={`absolute w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-20' : 'opacity-0'}`}
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          <div 
            className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">IA</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg text-slate-900">Internadda</span>
                    <p className="text-xs text-slate-600">India's Adda for Internships</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-600 hover:bg-slate-50"
                >
                  ✕
                </button>
              </div>

              {user ? (
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-indigo-700">
                      {getInitials(user.name)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-500 truncate">{user.email}</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            <div className="p-4 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3.5 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-l-4 border-indigo-500'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Dashboard
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Profile
                </Link>
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Settings
                </Link>
                {user && (
                  <button 
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-white">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs font-semibold text-emerald-700">MSME Certified Platform</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  7,000+ Students Trust Us • 98% Success Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}></div>
    </>
  );
};

export default Header;
