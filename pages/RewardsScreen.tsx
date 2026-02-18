
import React, { useState } from 'react';
import { Award, Zap, Ticket, TrendingUp, Gift, CheckCircle } from 'lucide-react';

const RewardsScreen: React.FC = () => {
  const [redeemed, setRedeemed] = useState<Record<number, boolean>>({});
  const [showToast, setShowToast] = useState(false);

  const handleRedeem = (idx: number) => {
    if (!redeemed[idx]) {
      setRedeemed({ ...redeemed, [idx]: true });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const rewards = [
    { title: '₹50 Cashback', sub: 'On Electricity Bill', date: 'Exp 20 Dec', icon: Zap, color: 'bg-yellow-50 text-yellow-600' },
    { title: '₹100 Voucher', sub: 'Zomato Food Order', date: 'Exp 25 Dec', icon: Ticket, color: 'bg-red-50 text-red-600' },
    { title: 'Flat 10% Off', sub: 'Amazon Fashion', date: 'Exp 15 Jan', icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <div className="p-4 bg-gray-50 flex-1 space-y-6">
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-[40px] p-8 text-white shadow-xl shadow-purple-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-purple-100 text-[10px] font-bold uppercase tracking-widest mb-1">Total Rewards Earned</p>
            <h2 className="text-4xl font-black">₹2,450</h2>
          </div>
          <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/10">
            <Gift className="w-8 h-8" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] text-purple-100 font-bold mb-1">SCRATCH CARDS</p>
              <p className="text-2xl font-black">12</p>
           </div>
           <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] text-purple-100 font-bold mb-1">COUPONS</p>
              <p className="text-2xl font-black">08</p>
           </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 mb-4 px-1">Exclusive Offers</h3>
        <div className="space-y-4">
           {rewards.map((reward, idx) => (
             <div key={idx} className="bg-white p-5 rounded-[32px] border border-gray-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${reward.color}`}>
                      <reward.icon className="w-7 h-7" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-800">{reward.title}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">{reward.sub}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-slate-400 font-bold mb-3">{reward.date}</p>
                   <button 
                    onClick={() => handleRedeem(idx)}
                    disabled={redeemed[idx]}
                    className={`text-[10px] font-black px-5 py-2 rounded-full transition-all ${
                      redeemed[idx] ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'
                    }`}
                   >
                    {redeemed[idx] ? 'REDEEMED' : 'REDEEM'}
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center">
         <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-blue-600" />
         </div>
         <h3 className="font-bold text-slate-800 mb-3 text-lg">Invite & Earn ₹500</h3>
         <p className="text-xs text-slate-500 leading-relaxed mb-8 px-4 font-medium">Refer a friend to PayFast UPI and get ₹500 when they make their first payment of ₹100 or more.</p>
         <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-colors">
            SHARE REFERRAL LINK
         </button>
      </div>

      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-bold uppercase tracking-wide">Voucher Redeemed!</span>
        </div>
      )}
    </div>
  );
};

export default RewardsScreen;
