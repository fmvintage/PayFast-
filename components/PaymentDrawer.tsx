
import React, { useState } from 'react';
import { X, ChevronDown, ShieldCheck, CheckCircle2, ArrowRight, Share2, Download } from 'lucide-react';
import { MOCK_BANKS } from '../constants';
import PinModal from './PinModal';

interface PaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  recipient?: string;
}

const PaymentDrawer: React.FC<PaymentDrawerProps> = ({ isOpen, onClose, type, recipient: initialRecipient }) => {
  const [step, setStep] = useState<'input' | 'success'>('input');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState(initialRecipient || '');
  const [showPin, setShowPin] = useState(false);
  const [txId, setTxId] = useState('');

  if (!isOpen) return null;

  const handlePay = () => {
    if (amount && parseFloat(amount) > 0 && recipient) {
      setShowPin(true);
    }
  };

  const onPinSuccess = () => {
    setTxId(Math.random().toString(36).substring(2, 12).toUpperCase());
    setStep('success');
  };

  const resetAndClose = () => {
    setStep('input');
    setAmount('');
    setRecipient('');
    onClose();
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-[110] bg-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-14 h-14 text-green-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Payment Successful</h2>
        <p className="text-4xl font-black text-slate-900 mb-8">₹{parseFloat(amount).toLocaleString('en-IN')}</p>
        
        <div className="w-full bg-slate-50 rounded-3xl p-6 mb-10 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase">To</span>
            <span className="text-slate-800 font-bold">{recipient}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase">From</span>
            <span className="text-slate-800 font-bold">{MOCK_BANKS[0].bankName}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase">Transaction ID</span>
            <span className="text-slate-800 font-bold font-mono">{txId}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <button className="flex items-center justify-center gap-2 p-4 bg-slate-100 rounded-2xl text-slate-700 font-bold text-sm">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-slate-100 rounded-2xl text-slate-700 font-bold text-sm">
            <Download className="w-4 h-4" /> Receipt
          </button>
        </div>
        <button 
          onClick={resetAndClose}
          className="mt-8 text-blue-600 font-black uppercase tracking-widest text-sm"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-wide">{type}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Recipient Info</label>
            <input 
              type="text" 
              placeholder={type.includes('Bills') ? "Enter Consumer ID" : "Enter UPI ID or Number"}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800"
            />
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

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={MOCK_BANKS[0].logo} alt="Bank" className="w-8 h-8 rounded-lg bg-white p-1" />
              <div>
                <p className="text-xs font-bold text-blue-900">{MOCK_BANKS[0].bankName}</p>
                <p className="text-[10px] text-blue-700/60 font-medium">Default Account</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-blue-400" />
          </div>

          <button 
            onClick={handlePay}
            disabled={!amount || !recipient}
            className="w-full bg-blue-600 disabled:bg-slate-200 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 mt-4 transition-all active:scale-95"
          >
            PROCEED TO PAY <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            100% Secure UPI Payment
          </div>
        </div>
      </div>

      <PinModal 
        isOpen={showPin}
        onClose={() => setShowPin(false)}
        onSuccess={onPinSuccess}
        title={`Authorize Payment of ₹${amount}`}
      />
    </div>
  );
};

export default PaymentDrawer;
