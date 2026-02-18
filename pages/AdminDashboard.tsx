
import React, { useState } from 'react';
import { 
  BarChart, 
  Users, 
  ShieldAlert, 
  Activity, 
  ArrowUp, 
  ArrowDown,
  MoreVertical,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', tx: 4000, users: 2400 },
  { name: 'Tue', tx: 3000, users: 1398 },
  { name: 'Wed', tx: 2000, users: 9800 },
  { name: 'Thu', tx: 2780, users: 3908 },
  { name: 'Fri', tx: 1890, users: 4800 },
  { name: 'Sat', tx: 2390, users: 3800 },
  { name: 'Sun', tx: 3490, users: 4300 },
];

const AdminDashboard: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  const handleInvestigate = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="p-4 bg-slate-50 flex-1 space-y-6 pb-24 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-blue-600" />
          Admin Console
        </h2>
        <div className="bg-green-100 text-green-700 text-[10px] font-black px-4 py-1.5 rounded-full border border-green-200 uppercase tracking-widest">
          System Live
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Activity className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Volume</span>
          </div>
          <h4 className="text-2xl font-black text-slate-800">₹8.4M</h4>
          <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold mt-2">
            <ArrowUp className="w-3 h-3" /> 12.5%
          </div>
        </div>
        <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm group hover:shadow-md transition-all">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Act. Users</span>
          </div>
          <h4 className="text-2xl font-black text-slate-800">12.2K</h4>
          <div className="flex items-center gap-1 text-red-500 text-[10px] font-bold mt-2">
            <ArrowDown className="w-3 h-3" /> 2.1%
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm">
        <h3 className="text-sm font-black text-slate-800 mb-8 uppercase tracking-widest">Transaction Velocity</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="tx" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTx)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Fraud Detection</h3>
          <button 
            onClick={handleInvestigate}
            className="text-[10px] text-blue-600 font-black uppercase tracking-widest hover:underline"
          >
            Investigate All
          </button>
        </div>
        <div className="p-2">
           {[
             { id: 1, type: 'High Frequency', user: '@user_9281' },
             { id: 2, type: 'Large Amount', user: '@shop_quick' },
             { id: 3, type: 'New Location', user: '@travel_99' }
           ].map((item) => (
             <div key={item.id} className="flex items-center justify-between p-5 hover:bg-slate-50 rounded-3xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">{item.type}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">{item.user} flagged recently</p>
                   </div>
                </div>
                <MoreVertical className="w-5 h-5 text-slate-300" />
             </div>
           ))}
        </div>
      </div>

      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="text-sm font-bold uppercase tracking-wide">Analysis in Progress...</span>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
