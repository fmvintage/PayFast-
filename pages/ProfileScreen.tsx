
import React, { useState } from 'react';
import { 
  LogOut, 
  Settings, 
  HelpCircle, 
  Share2, 
  ShieldCheck, 
  CreditCard, 
  ChevronRight,
  User,
  Bell,
  Lock,
  PlusCircle,
  CheckCircle
} from 'lucide-react';
import { MOCK_USER } from '../constants';
import PinModal from '../components/PinModal';
import { BankAccount } from '../types';

interface ProfileScreenProps {
  onLogout: () => void;
  onAddBank: () => void;
  banks: BankAccount[];
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, onAddBank, banks }) => {
  const [showPinModal, setShowPinModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleResetPin = () => {
    localStorage.removeItem('payfast_upi_pin');
    setShowPinModal(true);
  };

  const onPinSetSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const menuItems = [
    { icon: Bell, label: 'Notifications', color: 'bg-indigo-50 text-indigo-600' },
    { 
      icon: Lock, 
      label: 'Reset UPI PIN', 
      color: 'bg-purple-50 text-purple-600',
      onClick: handleResetPin 
    },
    { icon: ShieldCheck, label: 'Privacy Policy', color: 'bg-emerald-50 text-emerald-600' },
    { icon: HelpCircle, label: 'Help & Support', color: 'bg-orange-50 text-orange-600' },
    { icon: Share2, label: 'Refer a Friend', color: 'bg-pink-50 text-pink-600' },
  ];

  return (
    <div className="flex flex-col bg-gray-50 flex-1 relative overflow-y-auto hide-scrollbar pb-24">
      <div className="bg-white p-8 pt-10 flex flex-col items-center border-b border-gray-100 rounded-b-[40px] shadow-sm">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white shadow-xl mb-4">
            <img src={MOCK_USER.profilePic} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-6 right-0 bg-blue-600 p-1.5 rounded-xl border-2 border-white text-white shadow-lg">
             <Settings className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-slate-800">{MOCK_USER.name}</h2>
        <p className="text-sm text-slate-500 font-medium">{MOCK_USER.mobile}</p>
        <div className="mt-4 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
           <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{MOCK_USER.upiId}</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Banks Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Your Bank Accounts</h3>
            <button onClick={onAddBank} className="text-xs font-bold text-blue-600 flex items-center gap-1">
              <PlusCircle className="w-3 h-3" /> ADD BANK
            </button>
          </div>
          
          <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
            {banks.length > 0 ? (
              banks.map((bank) => (
                <div key={bank.id} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <img src={bank.logo} alt={bank.bankName} className="w-10 h-10 rounded-xl bg-slate-50 p-1 border border-slate-100" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{bank.bankName}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{bank.accountNumber}</p>
                    </div>
                  </div>
                  {bank.isDefault && (
                    <span className="bg-green-50 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Default</span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-xs text-slate-400 font-bold mb-4 uppercase tracking-widest">No Bank Accounts Linked</p>
                <button 
                  onClick={onAddBank}
                  className="bg-blue-600 text-white font-black px-6 py-2.5 rounded-full text-[10px] shadow-lg shadow-blue-100"
                >
                  LINK ACCOUNT
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
           {menuItems.map((item, idx) => (
             <button 
                key={idx} 
                onClick={item.onClick}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 text-left"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                   </div>
                   <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                   <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
             </button>
           ))}
        </div>

        <button 
          onClick={onLogout}
          className="w-full bg-white border border-red-100 text-red-500 font-bold py-4 rounded-[24px] flex items-center justify-center gap-2 shadow-sm hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          SIGN OUT
        </button>

        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pb-6">
          App Version 2.4.1 (Build 890)
        </p>
      </div>

      <PinModal 
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={onPinSetSuccess}
      />

      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-bold uppercase tracking-wide">UPI PIN Updated</span>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
