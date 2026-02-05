import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import InternshipsPage from "./pages/InternshipsPage";
import InternshipDetail from "./pages/InternshipDetail";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ApplyPage from "./pages/ApplyPage";
import PaymentPage from "./pages/PaymentPage";
import TestEngine from "./pages/TestEngine";
import Tests from "./pages/Tests";
import ResultPage from "./pages/ResultPage";
import SuccessStories from "./pages/SuccessStories";
import TeamPage from "./pages/TeamPage";
import HiringProcess from "./pages/HiringProcess";
import AboutUs from "./pages/AboutUs";
import { User } from "./types";

// 1. Scroll To Top Component: Fixes the mid-page landing issue
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  // Load user from localStorage on initial load
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sync user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="flex-grow pt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <AuthPage mode="login" setUser={setUser} /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!user ? <AuthPage mode="signup" setUser={setUser} /> : <Navigate to="/dashboard" />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/internship/:id" element={<InternshipDetail />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/hiring-process" element={<HiringProcess />} />
            <Route path="/about" element={<AboutUs />} />

            {/* Protected Routes: Fixes Profile & Settings White Screen */}
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/settings" 
              element={user ? <Settings user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/apply/:id" 
              element={user ? <ApplyPage user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/payment/:id" 
              element={user ? <PaymentPage user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/test/:id" 
              element={user ? <TestEngine user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/tests" 
              element={user ? <Tests user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/result/:id" 
              element={user ? <ResultPage user={user} /> : <Navigate to="/login" />} 
            />

            {/* Catch all - Redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
