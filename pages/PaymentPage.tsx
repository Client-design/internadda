import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '../constants';

const PaymentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = MOCK_INTERNSHIPS.find(i => i.id === id) || MOCK_INTERNSHIPS[0];
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // FIXED: Simplified payment handler to avoid CORS and API Key errors
  const handlePayment = () => {
    setIsProcessing(true);
    
    // This direct link bypasses all backend configuration issues
    window.location.href = "https://payments.cashfree.com/forms/internadda";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Complete Your Application
          </h1>
          <p className="text-lg text-slate-600">
            Secure your spot for {internship.title}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Details</h2>
              
              <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Internship Application Fee</span>
                    <span className="font-semibold">₹199</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span>₹199</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods Design Only */}
              <div className="mb-8">
                <h3 className="font-bold text-slate-900 mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['upi', 'card', 'netbanking', 'wallet'].map((id) => (
                    <button
                      key={id}
                      onClick={() => setPaymentMethod(id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'
                      }`}
                    >
                      <span className="font-semibold capitalize text-slate-900">{id}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#41478a] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg disabled:opacity-50 transition-all"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Redirecting to Secure Payment...
                  </div>
                ) : (
                  'Pay ₹199 & Start Assessment'
                )}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4">You're Applying For</h3>
              <h4 className="text-lg font-semibold text-slate-900">{internship.title}</h4>
              <p className="text-slate-600">{internship.company}</p>
              <p className="font-bold text-slate-900 mt-2">{internship.stipend}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
