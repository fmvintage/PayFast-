
import React, { useState } from 'react';
import { ShieldCheck, Phone, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleNext = () => {
    if (step === 1 && mobile.length === 10) setStep(2);
    else if (step === 2 && otp.join('').length === 4) onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

      <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PayFast <span className="text-blue-600 font-black">UPI</span></h1>
        </div>

        {step === 1 ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Welcome to PayFast</h2>
              <p className="text-sm text-slate-500 mt-2">Enter your mobile number to get started with secure payments.</p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <span className="text-slate-400 font-medium">+91</span>
              </div>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-lg font-semibold rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block pl-14 pr-4 py-4 outline-none transition-all"
                placeholder="00000 00000"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Verify Code</h2>
              <p className="text-sm text-slate-500 mt-2">Sent to +91 {mobile.slice(0, 5)} {mobile.slice(5)}</p>
            </div>
            
            <div className="flex justify-between gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value.slice(-1);
                    setOtp(newOtp);
                    // Auto-focus next input
                    if (e.target.value && idx < 3) {
                      (e.target.nextSibling as HTMLInputElement)?.focus();
                    }
                  }}
                  className="w-full h-16 bg-slate-50 border border-slate-200 text-center text-2xl font-bold text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              ))}
            </div>
            <p className="text-center text-xs text-slate-500">Didn't receive code? <button className="text-blue-600 font-semibold">Resend</button></p>
          </div>
        )}
      </div>

      <div className="p-8">
        <button
          onClick={handleNext}
          disabled={step === 1 ? mobile.length < 10 : otp.join('').length < 4}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
        >
          {step === 1 ? 'GET STARTED' : 'VERIFY & PROCEED'}
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-[10px] text-center text-slate-400 mt-6 leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy. Secured by NPCI and RBI standards.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
