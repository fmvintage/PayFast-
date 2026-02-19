
import React, { useState, useEffect } from 'react';
import { 
  X, Search, Landmark, CheckCircle2, ChevronRight, 
  Smartphone, CreditCard, Fingerprint, ArrowRight,
  ShieldCheck, Loader2, KeyRound, MessageSquare, AlertCircle,
  MessageSquareText
} from 'lucide-react';
import { MOCK_USER } from '../constants';

interface BankOption {
  name: string;
  logo: string;
}

const ALL_BANKS: BankOption[] = [
  { name: 'State Bank of India', logo: 'https://picsum.photos/seed/sbi/100' },
  { name: 'HDFC Bank', logo: 'https://picsum.photos/seed/hdfc/100' },
  { name: 'ICICI Bank', logo: 'https://picsum.photos/seed/icici/100' },
  { name: 'Axis Bank', logo: 'https://picsum.photos/seed/axis/100' },
  { name: 'Kotak Mahindra Bank', logo: 'https://picsum.photos/seed/kotak/100' },
  { name: 'Punjab National Bank', logo: 'https://picsum.photos/seed/pnb/100' },
  { name: 'Bank of Baroda', logo: 'https://picsum.photos/seed/bob/100' },
  { name: 'Canara Bank', logo: 'https://picsum.photos/seed/canara/100' },
  { name: 'Union Bank of India', logo: 'https://picsum.photos/seed/union/100' },
  { name: 'YES Bank', logo: 'https://picsum.photos/seed/yes/100' },
  { name: 'IndusInd Bank', logo: 'https://picsum.photos/seed/indus/100' },
  { name: 'Airtel Payments Bank', logo: 'https://picsum.photos/seed/airtel/100' },
  { name: 'Paytm Payments Bank', logo: 'https://picsum.photos/seed/paytm/100' },
  { name: 'IDFC FIRST Bank', logo: 'https://picsum.photos/seed/idfc/100' },
].sort((a, b) => a.name.localeCompare(b.name));

type LinkingStep = 
  | 'select-bank' 
  | 'sim-verify' 
  | 'sim-otp' 
  | 'verification-method' 
  | 'identity-input' 
  | 'bank-otp' 
  | 'set-pin' 
  | 'success';

interface AddBankDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBankAdded: (bankName: string, logo: string) => void;
}

const AddBankDrawer: React.FC<AddBankDrawerProps> = ({ isOpen, onClose, onBankAdded }) => {
  const [step, setStep] = useState<LinkingStep>('select-bank');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const [selectedSim, setSelectedSim] = useState<number | null>(null);
  const [verifyMethod, setVerifyMethod] = useState<'atm' | 'aadhaar' | null>(null);
  
  // Form Inputs
  const [simOtp, setSimOtp] = useState('');
  const [identityVal, setIdentityVal] = useState('');
  const [expiryVal, setExpiryVal] = useState('');
  const [atmPin, setAtmPin] = useState('');
  const [mobileConfirm, setMobileConfirm] = useState(MOCK_USER.mobile.replace(/\D/g, '').slice(-10));
  const [bankOtp, setBankOtp] = useState('');
  const [upiPin, setUpiPin] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSmsToast, setShowSmsToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(reset, 300);
    }
  }, [isOpen]);

  const reset = () => {
    setStep('select-bank');
    setSearchTerm('');
    setSelectedBank(null);
    setSelectedSim(null);
    setVerifyMethod(null);
    setSimOtp('');
    setIdentityVal('');
    setExpiryVal('');
    setAtmPin('');
    setBankOtp('');
    setUpiPin('');
    setIsProcessing(false);
    setErrorMessage(null);
    setShowSmsToast(false);
  };

  const handleSelectBank = (bank: BankOption) => {
    setSelectedBank(bank);
    setStep('sim-verify');
  };

  const handleSimSelect = (sim: number) => {
    setSelectedSim(sim);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('sim-otp');
      // Simulate SIM OTP arrival
      setTimeout(() => {
        setShowSmsToast(true);
        setTimeout(() => {
          setSimOtp('1234');
          setShowSmsToast(false);
        }, 2000);
      }, 1000);
    }, 1500);
  };

  const handleSimOtpSubmit = () => {
    if (simOtp === '1234') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('verification-method');
        setErrorMessage(null);
      }, 1000);
    } else {
      setErrorMessage('Invalid SIM OTP. Use 1234');
    }
  };

  const handleIdentitySubmit = () => {
    if (verifyMethod === 'atm') {
      if (identityVal.length < 6 || expiryVal.length < 4 || atmPin.length < 4) {
        setErrorMessage('Check your card details.');
        return;
      }
    } else {
      if (identityVal.length < 4) {
        setErrorMessage('Enter valid Aadhaar digits.');
        return;
      }
    }

    const actualMobile = MOCK_USER.mobile.replace(/\D/g, '').slice(-10);
    if (mobileConfirm !== actualMobile) {
      setErrorMessage('Wrong details: Mobile not linked with bank.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('bank-otp');
      setErrorMessage(null);
      // Simulate Bank OTP arrival
      setTimeout(() => {
        setShowSmsToast(true);
        setTimeout(() => {
          setBankOtp('5678');
          setShowSmsToast(false);
        }, 2500);
      }, 1200);
    }, 1500);
  };

  const handleBankOtpSubmit = () => {
    if (bankOtp === '5678') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('set-pin');
        setErrorMessage(null);
      }, 1000);
    } else {
      setErrorMessage('Wrong Bank OTP. Use 5678');
    }
  };

  const handleUpiPinSubmit = () => {
    if (upiPin.length === 4) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('success');
        localStorage.setItem('payfast_upi_pin', upiPin);
        setTimeout(() => {
          if (selectedBank) onBankAdded(selectedBank.name, selectedBank.logo);
          onClose();
        }, 3000);
      }, 1500);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ''); 
    if (val.length <= 4) setExpiryVal(val);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Simulated SMS Toast */}
      {showSmsToast && (
        <div className="fixed top-6 left-6 right-6 z-[350] bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-[28px] shadow-2xl flex items-start gap-4 animate-in slide-in-from-top-full duration-500">
          <div className="bg-emerald-600 p-2 rounded-xl">
            <MessageSquareText className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Bank SMS • Now</p>
            <p className="text-sm font-bold">{step === 'sim-otp' ? 'Device Binding' : selectedBank?.name}</p>
            <p className="text-xs text-slate-300">
              {step === 'sim-otp' ? '1234 is your SIM verification code.' : `OTP: 5678 is for linking your account with PayFa. Valid for 10 min.`}
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300 h-[85vh] flex flex-col relative overflow-hidden">
        
        {step !== 'success' && (
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-1.5 flex-1">
              {['select', 'sim', 'verify', 'bank', 'pin'].map((s, i) => {
                const stepSequence: LinkingStep[] = ['select-bank', 'sim-verify', 'verification-method', 'bank-otp', 'set-pin'];
                const currentIdx = stepSequence.indexOf(step) === -1 ? 2 : stepSequence.indexOf(step);
                return (
                  <div 
                    key={s} 
                    className={`h-1 rounded-full transition-all duration-300 ${i <= currentIdx ? 'flex-1 bg-blue-600' : 'w-2 bg-slate-100'}`}
                  />
                );
              })}
            </div>
            <button onClick={onClose} className="p-2 ml-4 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in slide-in-from-top duration-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wide leading-tight">{errorMessage}</span>
          </div>
        )}

        {/* 1. SELECT BANK */}
        {step === 'select-bank' && (
          <>
            <h3 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">Select Bank Account</h3>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search your bank..."
                className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 overflow-y-auto hide-scrollbar space-y-2 pb-6">
              {ALL_BANKS.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase())).map((bank) => (
                <button
                  key={bank.name}
                  onClick={() => handleSelectBank(bank)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <img src={bank.logo} alt={bank.name} className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-100 object-contain" />
                    <span className="font-bold text-slate-700 text-sm">{bank.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* 2. SIM VERIFICATION */}
        {step === 'sim-verify' && (
          <div className="flex flex-col items-center text-center animate-in slide-in-from-right duration-300">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
              <Smartphone className={`w-10 h-10 text-blue-600 ${isProcessing ? 'animate-bounce' : ''}`} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Binding Device</h3>
            <p className="text-sm text-slate-500 mb-8 font-medium">Verify your registered SIM card.</p>
            
            <div className="w-full space-y-4">
              {[1, 2].map(num => (
                <button
                  key={num}
                  disabled={isProcessing}
                  onClick={() => handleSimSelect(num)}
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[24px] flex items-center justify-between hover:border-blue-500 hover:bg-blue-50 transition-all group disabled:opacity-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-800">SIM Card {num}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Auto-detect Network</p>
                    </div>
                  </div>
                  {isProcessing && selectedSim === num ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2.5 SIM OTP */}
        {step === 'sim-otp' && (
          <div className="flex flex-col items-center text-center animate-in slide-in-from-right duration-300">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
              <MessageSquare className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Detecting SMS</h3>
            <p className="text-sm text-slate-500 mb-8 font-medium">Secure OTP being read from SIM slot {selectedSim}</p>
            
            <div className="w-full space-y-6">
              <div className="flex gap-4 justify-center">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`w-14 h-16 bg-slate-50 border-2 rounded-2xl flex items-center justify-center text-2xl font-black ${simOtp[i] ? 'border-blue-600 bg-blue-50' : 'border-slate-100'}`}>
                    {simOtp[i] || ''}
                  </div>
                ))}
              </div>
              <button
                disabled={simOtp.length < 4 || isProcessing}
                onClick={handleSimOtpSubmit}
                className="w-full bg-blue-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:bg-slate-200"
              >
                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : 'CONTINUE'}
              </button>
            </div>
          </div>
        )}

        {/* 3. VERIFICATION METHOD */}
        {step === 'verification-method' && (
          <div className="flex flex-col animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Verify Identity</h3>
            <p className="text-sm text-slate-500 mb-8 font-medium">Link {selectedBank?.name} with secured methods.</p>
            
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => { setVerifyMethod('atm'); setStep('identity-input'); setErrorMessage(null); }}
                className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] flex items-center gap-5 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 shadow-sm">
                  <CreditCard className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Debit Card + ATM PIN</h4>
                  <p className="text-xs text-slate-500 font-medium">Link using your physical card</p>
                </div>
              </button>

              <button
                onClick={() => { setVerifyMethod('aadhaar'); setStep('identity-input'); setErrorMessage(null); }}
                className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] flex items-center gap-5 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 shadow-sm">
                  <Fingerprint className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Aadhaar (OTP)</h4>
                  <p className="text-xs text-slate-500 font-medium">Link using Aadhaar-linked number</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* 4. IDENTITY INPUT */}
        {step === 'identity-input' && (
          <div className="flex-1 overflow-y-auto hide-scrollbar pb-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Identity Details</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">Secure authentication for {selectedBank?.name}</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Registered Mobile</label>
                <input 
                  type="number"
                  placeholder="10-digit mobile number"
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-lg font-bold outline-none focus:ring-2 focus:ring-blue-600"
                  value={mobileConfirm}
                  onChange={(e) => setMobileConfirm(e.target.value.slice(0, 10))}
                />
              </div>

              {verifyMethod === 'atm' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Last 6 Digits</label>
                      <input 
                        type="number"
                        placeholder="XXXXXX"
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-lg font-black tracking-widest outline-none focus:ring-2 focus:ring-blue-600"
                        value={identityVal}
                        onChange={(e) => setIdentityVal(e.target.value.slice(0, 6))}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Expiry (MMYY)</label>
                      <input 
                        type="text"
                        placeholder="MMYY"
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-lg font-black tracking-widest outline-none focus:ring-2 focus:ring-blue-600"
                        value={expiryVal}
                        onChange={handleExpiryChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">ATM PIN</label>
                    <input 
                      type="password"
                      placeholder="••••"
                      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-2xl font-black text-center tracking-widest outline-none focus:ring-2 focus:ring-blue-600"
                      value={atmPin}
                      onChange={(e) => setAtmPin(e.target.value.slice(0, 4))}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Aadhaar Last 4</label>
                  <input 
                    type="number"
                    placeholder="XXXX"
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-2xl font-black tracking-widest outline-none focus:ring-2 focus:ring-blue-600"
                    value={identityVal}
                    onChange={(e) => setIdentityVal(e.target.value.slice(0, 4))}
                  />
                </div>
              )}

              <button
                disabled={isProcessing}
                onClick={handleIdentitySubmit}
                className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : 'FETCH BANK OTP'}
              </button>
            </div>
          </div>
        )}

        {/* 5. BANK OTP */}
        {step === 'bank-otp' && (
          <div className="flex flex-col items-center text-center animate-in slide-in-from-right duration-300">
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Auto-fetching Bank OTP</h3>
            <p className="text-sm text-slate-500 mb-8 font-medium">OTP sent by {selectedBank?.name}. Waiting for automatic detection...</p>
            
            <div className="w-full space-y-6">
              <div className="flex gap-4 justify-center">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`w-14 h-16 bg-slate-50 border-2 rounded-2xl flex items-center justify-center text-3xl font-black transition-all ${bankOtp[i] ? 'border-emerald-600 bg-emerald-50 text-emerald-600' : 'border-slate-100'}`}>
                    {bankOtp[i] || ''}
                  </div>
                ))}
              </div>
              <button
                disabled={bankOtp.length < 4 || isProcessing}
                onClick={handleBankOtpSubmit}
                className="w-full bg-emerald-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:bg-slate-200"
              >
                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : 'PROCEED'}
              </button>
            </div>
          </div>
        )}

        {/* 6. SET PIN */}
        {step === 'set-pin' && (
          <div className="flex flex-col items-center text-center animate-in slide-in-from-right duration-300">
             <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
              <KeyRound className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Set UPI PIN</h3>
            <p className="text-sm text-slate-500 mb-8 font-medium">Create a secure 4-digit PIN for {selectedBank?.name}</p>
            
            <div className="w-full space-y-8">
              <div className="flex gap-4 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-14 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                      upiPin.length > i ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    {upiPin[i] ? '●' : ''}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                {['1','2','3','4','5','6','7','8','9','','0','del'].map((key, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (key === 'del') setUpiPin(upiPin.slice(0, -1));
                      else if (key && upiPin.length < 4) setUpiPin(upiPin + key);
                    }}
                    className={`h-14 rounded-2xl font-bold transition-all active:bg-slate-200 ${key === '' ? 'invisible' : 'bg-slate-50 text-slate-700'}`}
                  >
                    {key === 'del' ? <X className="w-5 h-5 mx-auto" /> : key}
                  </button>
                ))}
              </div>

              <button
                disabled={upiPin.length < 4 || isProcessing}
                onClick={handleUpiPinSubmit}
                className="w-full bg-blue-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:bg-slate-200"
              >
                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'COMPLETE LINKING'}
              </button>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {step === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25"></div>
              <CheckCircle2 className="w-16 h-16 text-green-600 animate-in zoom-in duration-500" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Account Linked!</h3>
            <p className="text-slate-500 font-medium px-8 mb-8">
              Your {selectedBank?.name} account is ready for UPI payments.
            </p>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-[32px] w-full flex items-center gap-4">
              <img src={selectedBank?.logo} alt="bank" className="w-12 h-12 rounded-2xl bg-white p-2 border border-slate-100 object-contain" />
              <div className="text-left">
                <p className="font-bold text-slate-800">{selectedBank?.name}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">NPCI Secured Account</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {step !== 'success' && (
          <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            Secured by PayFast Encryption
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBankDrawer;
