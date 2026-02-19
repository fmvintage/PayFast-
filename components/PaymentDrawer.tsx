
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ShieldCheck, CheckCircle2, ArrowRight, Share2, Download, Check, Sparkles } from 'lucide-react';
import { BankAccount } from '../types.ts';
import PinModal from './PinModal.tsx';

interface PaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  recipient?: string;
  banks: BankAccount[];
}

const PaymentDrawer: React.FC<PaymentDrawerProps> = ({ isOpen, onClose, type, recipient: initialRecipient, banks }) => {
  const [step, setStep] = useState<'input' | 'success'>('input');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState(initialRecipient || '');
  const [selectedRecipientBank, setSelectedRecipientBank] = useState<string | null>(null);
  const [showPin, setShowPin] = useState(false);
  const [txId, setTxId] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize sound
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    audioRef.current.volume = 0.5;
  }, []);

  const isSelfTransfer = type === 'Self Transfer';
  const defaultBank = banks.find(b => b.isDefault) || banks[0];
  const otherBanks = banks.filter(bank => bank.id !== defaultBank?.id);

  if (!isOpen) return null;

  const handlePay = () => {
    const finalRecipient = isSelfTransfer ? selectedRecipientBank : recipient;
    if (amount && parseFloat(amount) > 0 && finalRecipient) {
      setShowPin(true);
    }
  };

  const onPinSuccess = () => {
    const newTxId = Math.random().toString(36).substring(2, 12).toUpperCase();
    setTxId(newTxId);
    setStep('success');
    
    // Play success sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
  };

  const resetAndClose = () => {
    setStep('input');
    setAmount('');
    setRecipient('');
    setSelectedRecipientBank(null);
    onClose();
  };

  if (step === 'success') {
    const displayRecipient = isSelfTransfer ? selectedRecipientBank : recipient;
    return (
      <div className="fixed inset-0 z-[110] bg-green-600 flex flex-col items-center justify-between p-8 animate-in fade-in duration-500 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-green-400/20 rounded-full blur-3xl"></div>

        <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping duration-[2000ms]"></div>
            <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl animate-in zoom-in duration-500">
               <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center animate-[success-pop_0.6s_ease-out_forwards]">
                  <Check className="w-16 h-16 text-green-600 stroke-[4px]" />
               </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 p-2 rounded-xl rotate-12 animate-bounce">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Payment Successful</h2>
          <p className="text-5xl font-black text-white mb-8 drop-shadow-md">₹{parseFloat(amount).toLocaleString('en-IN')}</p>
          
          <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <span className="text-green-100 text-[10px] font-bold uppercase tracking-widest">Paid To</span>
              <span className="text-white font-bold">{displayRecipient}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-100 text-[10px] font-bold uppercase tracking-widest">From</span>
              <div className="flex items-center gap-2">
                <img src={defaultBank?.logo} alt="bank" className="w-4 h-4 rounded bg-white" />
                <span className="text-white font-bold">{defaultBank?.bankName}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between items-center">
              <span className="text-green-100 text-[10px] font-bold uppercase tracking-widest">Transaction ID</span>
              <span className="text-white font-mono text-[10px] font-bold">{txId}</span>
            </div>
          </div>
        </div>

        <div className="w-full relative z-10 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white font-bold text-sm transition-all border border-white/10">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white font-bold text-sm transition-all border border-white/10">
              <Download className="w-4 h-4" /> Receipt
            </button>
          </div>
          <button 
            onClick={resetAndClose}
            className="w-full bg-white text-green-700 font-black py-4 rounded-2xl shadow-xl transition-transform active:scale-95"
          >
            DONE
          </button>
        </div>

        <style>{`
          @keyframes success-pop {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-wide">{type}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              {isSelfTransfer ? "Select Destination Account" : "Recipient Info"}
            </label>
            
            {isSelfTransfer ? (
              <div className="space-y-3">
                {otherBanks.length > 0 ? otherBanks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedRecipientBank(bank.bankName)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      selectedRecipientBank === bank.bankName 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <img src={bank.logo} alt={bank.bankName} className="w-8 h-8 rounded-lg bg-white p-1" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{bank.bankName}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{bank.accountNumber}</p>
                      </div>
                    </div>
                    {selectedRecipientBank === bank.bankName && (
                      <div className="bg-blue-600 rounded-full p-1 text-white">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                )) : (
                  <p className="text-xs text-slate-400 font-bold p-4 text-center">Please add another bank account first.</p>
                )}
              </div>
            ) : (
              <input 
                type="text" 
                placeholder={type.includes('Bills') ? "Enter Consumer ID" : "Enter UPI ID or Number"}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800"
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400">₹</span>
              <input 
                type="number" 
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 pl-10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-black text-2xl text-slate-800"
              />
            </div>
          </div>

          {defaultBank && (
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={defaultBank.logo} alt="Bank" className="w-8 h-8 rounded-lg bg-white p-1" />
                <div>
                  <p className="text-xs font-bold text-blue-900">{defaultBank.bankName}</p>
                  <p className="text-[10px] text-blue-700/60 font-medium">Transferring From</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-blue-400" />
            </div>
          )}

          <button 
            onClick={handlePay}
            disabled={!amount || (isSelfTransfer ? !selectedRecipientBank : !recipient) || banks.length === 0}
            className="w-full bg-blue-600 disabled:bg-slate-200 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 mt-4 transition-all active:scale-95"
          >
            {banks.length === 0 ? 'NO BANK LINKED' : 'PROCEED TO TRANSFER'} <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            Direct Bank to Bank Transfer
          </div>
        </div>
      </div>

      <PinModal 
        isOpen={showPin}
        onClose={() => setShowPin(false)}
        onSuccess={onPinSuccess}
        title={`Authorize Transfer of ₹${amount}`}
      />
    </div>
  );
};

export default PaymentDrawer;
