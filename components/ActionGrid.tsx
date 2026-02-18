
import React from 'react';
import { Smartphone, UserPlus, QrCode, Building2, Send, CreditCard } from 'lucide-react';

interface ActionGridProps {
  onActionClick: (label: string) => void;
}

const ActionGrid: React.FC<ActionGridProps> = ({ onActionClick }) => {
  const actions = [
    { icon: QrCode, label: 'Scan QR', color: 'bg-blue-50 text-blue-600' },
    { icon: UserPlus, label: 'Pay Contacts', color: 'bg-indigo-50 text-indigo-600' },
    { icon: Smartphone, label: 'Pay Phone', color: 'bg-purple-50 text-purple-600' },
    { icon: Building2, label: 'Bank Transfer', color: 'bg-emerald-50 text-emerald-600' },
    { icon: Send, label: 'Self Transfer', color: 'bg-orange-50 text-orange-600' },
    { icon: CreditCard, label: 'Pay Bills', color: 'bg-rose-50 text-rose-600' },
  ];

  return (
    <div className="grid grid-cols-3 gap-y-6 gap-x-2">
      {actions.map((action, idx) => (
        <button 
          key={idx} 
          onClick={() => onActionClick(action.label)}
          className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${action.color}`}>
            <action.icon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-semibold text-slate-700">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ActionGrid;
