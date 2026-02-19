
import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Loader2, Smartphone, MessageSquareText } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSmsToast, setShowSmsToast] = useState(false);
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      if (mobile.length === 10) {
        setIsProcessing(true);
        // Simulate "Sending SMS via PayFast"
        setTimeout(() => {
          setIsProcessing(false);
          setStep(2);
          // Simulate OTP arrival after 1.5 seconds
          setTimeout(() => {
            setShowSmsToast(true);
            setTimeout(() => {
              setOtp(['1', '2', '3', '4']); // Auto-fill simulation
              setShowSmsToast(false);
            }, 2000);
          }, 1000);
        }, 1500);
      }
    } else {
      const otpStr = otp.join('');
      if (otpStr === '1234') {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          onLogin();
        }, 1000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    }
  };

  const handleOtpChange = (val: string, idx: number) => {
    const newOtp = [...otp];
    newOtp[idx] = val.replace(/\D/g, '').slice(-1);
    setOtp(newOtp);
    if (val && idx < 3) {
      const nextInput = document.getElementById(`otp-${idx + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto relative overflow-hidden font-sans">
      {/* Simulated OS Notification */}
      {showSmsToast && (
        <div className="fixed top-4 left-4 right-4 z-[300] bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-3xl shadow-2xl flex items-start gap-4 animate-in slide-in-from-top-full duration-500">
          <div className="bg-blue-600 p-2 rounded-xl">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Messages • Now</span>
            </div>
            <p className="text-sm font-bold">PayFast Secure OTP</p>
            <p className="text-xs text-slate-300">1234 is your login OTP for PayFa. Do not share it with anyone.</p>
          </div>
        </div>
      )}

      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      
      <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600 p-3 rounded-[20px] text-white shadow-xl shadow-blue-100">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">PayFa<span className="text-blue-600">.</span></h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Bharat UPI</p>
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Login Securely</h2>
              <p className="text-sm text-slate-500 mt-2 font-medium">OTP will be sent automatically to your SIM card.</p>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <span className="text-slate-400 font-black">+91</span>
              </div>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-slate-50 border-2 border-slate-50 text-slate-800 text-xl font-bold rounded-[24px] focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 block pl-16 pr-6 py-5 outline-none transition-all"
                placeholder="Mobile Number"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Auto-verifying OTP</h2>
              <p className="text-sm text-slate-500 mt-2 font-medium">Waiting for SMS on SIM {mobile.slice(0, 2)}xxxxx{mobile.slice(-2)}</p>
            </div>
            
            <div className="flex justify-between gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="number"
                  maxLength={1}
                  value={digit}
                  readOnly={digit !== ''}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  className={`w-full h-16 bg-slate-50 border-2 text-center text-3xl font-black text-slate-800 rounded-[20px] outline-none transition-all ${error ? 'border-red-500 bg-red-50' : digit ? 'border-blue-600 bg-blue-50' : 'border-slate-50 focus:border-blue-600'}`}
                />
              ))}
            </div>
            
            {!otp.every(d => d !== '') && (
              <div className="flex items-center justify-center gap-3 py-2">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest animate-pulse">Detecting SMS OTP...</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-8">
        <button
          onClick={handleNext}
          disabled={isProcessing || (step === 1 ? mobile.length < 10 : otp.join('').length < 4)}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-100 active:scale-95"
        >
          {isProcessing ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              {step === 1 ? 'SEND SECURE OTP' : 'ENTER PAYFA'}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
