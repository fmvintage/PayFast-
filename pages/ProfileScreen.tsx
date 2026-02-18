
import React from 'react';
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
  Lock
} from 'lucide-react';
import { MOCK_USER, MOCK_BANKS } from '../constants';

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const menuItems = [
    { icon: CreditCard, label: 'Bank Accounts', count: MOCK_BANKS.length, color: 'bg-blue-50 text-blue-600' },
    { icon: Bell, label: 'Notifications', color: 'bg-indigo-50 text-indigo-600' },
    { icon: Lock, label: 'Security & MPIN', color: 'bg-purple-50 text-purple-600' },
    { icon: ShieldCheck, label: 'Privacy Policy', color: 'bg-emerald-50 text-emerald-600' },
    { icon: HelpCircle, label: 'Help & Support', color: 'bg-orange-50 text-orange-600' },
    { icon: Share2, label: 'Refer a Friend', color: 'bg-pink-50 text-pink-600' },
  ];

  return (
    <div className="flex flex-col bg-gray-50 flex-1">
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
        <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
           {menuItems.map((item, idx) => (
             <button 
                key={idx} 
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                   </div>
                   <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                   {item.count !== undefined && (
                     <span className="bg-gray-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{item.count}</span>
                   )}
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
    </div>
  );
};

export default ProfileScreen;
