import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Menu, X, Briefcase, GraduationCap, ChevronRight, 
  Settings, LogOut, User as UserIcon, Bell, Search 
} from "lucide-react";
import { User } from "../types";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll effect for header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fix: Jab menu open ho toh body scroll lock ho jaye
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Menu open karne wala function jo page ko top par le jayega
  const handleToggleMenu = () => {
    if (!mobileMenuOpen) {
      window.scrollTo({ top: 0, behavior: 'instant' }); // Pehle page top par aayega
    }
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Internships", path: "/internships", icon: Briefcase },
    { name: "Tests", path: "/tests", icon: GraduationCap },
    { name: "About", path: "/about", icon: Search },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled || mobileMenuOpen ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-xl italic">i</span>
            </div>
            <span className={`text-2xl font-black tracking-tighter ${scrolled || mobileMenuOpen ? 'text-slate-900' : 'text-slate-900'}`}>
              INTERN<span className="text-indigo-600">ADDA</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-indigo-600 ${
                  isActive(link.path) ? "text-indigo-600" : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                  <Link to="/profile" className="flex items-center space-x-3 group">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600">{user.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-700">Sign In</Link>
                <Link to="/signup" className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-full shadow-lg">Get Started</Link>
              </div>
            )}
          </div>

          {/* Hamburger Icon - Updated with handleToggleMenu */}
          <button
            className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-600"
            onClick={handleToggleMenu}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`lg:hidden fixed inset-0 z-[110] transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        <div 
          className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar content */}
          <div className="p-6 border-b flex items-center justify-between">
            <span className="font-bold text-slate-900">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    isActive(link.path) ? "bg-indigo-50 text-indigo-600" : "text-slate-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <link.icon className="w-5 h-5" />
                    <span className="font-bold text-sm">{link.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* User Actions Mobile */}
          <div className="p-6 border-t mt-auto">
            {user ? (
              <div className="space-y-3">
                 <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 text-sm font-bold text-slate-700 bg-slate-50 rounded-xl italic">My Profile</Link>
                 <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="w-full py-3 text-red-600 font-bold border-2 border-red-500 rounded-xl">Logout</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center text-sm font-bold text-slate-700 bg-slate-100 rounded-xl">Login</Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center text-sm font-bold text-white bg-indigo-600 rounded-xl">Join</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
