// pages/InterviewConfirmation.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const InterviewConfirmation: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get('order');
  
  const interviewData = orderId 
    ? JSON.parse(localStorage.getItem(`interview_${orderId}`) || '{}')
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-emerald-100">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-emerald-100 to-green-100 flex items-center justify-center">
              <span className="text-6xl">📧</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-900">
              Check Your Email!
            </h1>
            
            <p className="text-xl text-slate-600">
              Your interview details have been sent to your registered email address
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="font-bold text-emerald-900 text-lg mb-4">What's in the email?</h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">✓</div>
                <span>AI Interview link with ArjunaAI</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">✓</div>
                <span>Scheduled date and time</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">✓</div>
                <span>Technical requirements checklist</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">✓</div>
                <span>Preparation guidelines</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2">About ArjunaAI Interview</h4>
              <p className="text-sm text-blue-800">
                Your interview will be AI-powered for fair and accurate assessment. 
                Make sure you have a webcam, microphone, and stable internet connection.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-emerald-600">24h</div>
                <div className="text-sm text-slate-600">Email Delivery</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-indigo-600">98%</div>
                <div className="text-sm text-slate-600">Success Rate</div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-6">
                Didn't receive the email? Check your spam folder or contact support@internadda.com
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/dashboard"
                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Go to Dashboard
                </Link>
                <a 
                  href="mailto:support@internadda.com"
                  className="border-2 border-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewConfirmation;
