
import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { BankAccount } from '../types';
import PinModal from './PinModal';

interface BankCardProps {
  bank: BankAccount;
}

const BankCard: React.FC<BankCardProps> = ({ bank }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleCheck = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setShowPin(true);
    }
  };

  return (
    <div className={`p-5 rounded-3xl border transition-all ${bank.isDefault ? 'bg-white border-blue-500 shadow-md shadow-blue-50' : 'bg-gray-50 border-gray-100'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white p-1 border border-gray-100 overflow-hidden">
            <img src={bank.logo} alt={bank.bankName} className="w-full h-full object-contain" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">{bank.bankName}</h4>
            <p className="text-[10px] text-slate-500 font-medium">{bank.accountNumber}</p>
          </div>
        </div>
        {bank.isDefault && (
          <div className="flex items-center gap-1 bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            DEFAULT
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Available Balance</p>
          <p className="text-xl font-black text-slate-800 tabular-nums">
            {isVisible ? `₹${bank.balance.toLocaleString('en-IN')}` : '₹ ••••••'}
          </p>
        </div>
        <button 
          onClick={handleCheck}
          className={`flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors ${
            isVisible ? 'text-slate-500 bg-slate-100' : 'text-blue-600 bg-blue-50'
          }`}
        >
          {isVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {isVisible ? 'HIDE' : 'CHECK'}
        </button>
      </div>

      <PinModal 
        isOpen={showPin} 
        onClose={() => setShowPin(false)} 
        onSuccess={() => setIsVisible(true)} 
        title={`View Balance - ${bank.bankName}`}
      />
    </div>
  );
};

export default BankCard;
