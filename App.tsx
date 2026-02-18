
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  History, 
  QrCode, 
  CreditCard, 
  User, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ScanLine, 
  ShieldCheck,
  Search,
  Settings,
  Bell,
  ChevronRight,
  LogOut,
  BarChart3,
  Award,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';

// Components
import BottomNav from './components/BottomNav';
import TransactionItem from './components/TransactionItem';
import BankCard from './components/BankCard';
import ActionGrid from './components/ActionGrid';
import ScanScreen from './pages/ScanScreen';
import HistoryScreen from './pages/HistoryScreen';
import ProfileScreen from './pages/ProfileScreen';
import AdminDashboard from './pages/AdminDashboard';
import RewardsScreen from './pages/RewardsScreen';
import PinModal from './components/PinModal';
import PaymentDrawer from './components/PaymentDrawer';

// Types and Mocks
import { MOCK_USER, MOCK_TRANSACTIONS, MOCK_BANKS, MOCK_BILLS, BILL_ICON_MAP } from './constants';

const MainApp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  
  // Payment States
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activePaymentType, setActivePaymentType] = useState('');
  const [prefillRecipient, setPrefillRecipient] = useState('');

  const toggleBalance = () => {
    if (isBalanceVisible) {
      setIsBalanceVisible(false);
    } else {
      setShowPin(true);
    }
  };

  const handleGenericAction = (name: string) => {
    if (name.includes('Bill') || name.includes('Recharge') || name === 'Electricity' || name === 'Water Bill' || name === 'DTH' || name === 'Broadband' || name === 'Credit Card') {
      setActivePaymentType(`Bill: ${name}`);
      setPrefillRecipient(`${name.toLowerCase()}@payfast`);
      setIsPaymentOpen(true);
    } else if (name === 'Search' || name === 'Notifications' || name === 'Logout') {
      setShowToast(name);
      setTimeout(() => setShowToast(null), 2000);
    }
  };

  const onActionGridClick = (label: string) => {
    if (label === 'Scan QR') {
      navigate('/scan');
    } else {
      setActivePaymentType(label);
      setPrefillRecipient('');
      setIsPaymentOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 bg-gray-50 max-w-md mx-auto shadow-xl ring-1 ring-gray-200">
      <header className="sticky top-0 z-50 bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-100 cursor-pointer" onClick={() => navigate('/profile')}>
            <img src={MOCK_USER.profilePic} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-800">Hello, {MOCK_USER.name}</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{MOCK_USER.upiId}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-600 hover:bg-gray-100 rounded-full transition-colors" onClick={() => handleGenericAction('Search')}>
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-600 hover:bg-gray-100 rounded-full transition-colors relative" onClick={() => handleGenericAction('Notifications')}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar">
        <Routes>
          <Route path="/" element={
            <div className="p-4 space-y-6">
              {/* Wallet/Bank Balance Overview */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-1">Combined Balance</p>
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl font-black tracking-tight tabular-nums">
                        {isBalanceVisible ? `₹${MOCK_BANKS.reduce((acc, b) => acc + b.balance, 0).toLocaleString('en-IN')}` : '₹ ••••••'}
                      </h2>
                      <button 
                        onClick={toggleBalance}
                        className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        {isBalanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm border border-white/10">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8 bg-black/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5 group active:bg-black/20 transition-colors cursor-pointer" onClick={() => handleGenericAction('Default Bank Details')}>
                  <div className="flex items-center gap-3">
                    <img src={MOCK_BANKS[0].logo} alt="bank" className="w-8 h-8 rounded-lg bg-white p-1" />
                    <div>
                      <p className="text-xs font-bold">{MOCK_BANKS[0].bankName}</p>
                      <p className="text-[10px] text-white/60">{MOCK_BANKS[0].accountNumber}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Fast Actions */}
              <ActionGrid onActionClick={onActionGridClick} />

              {/* Bills & Recharges */}
              <div>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="font-bold text-slate-800">Bills & Recharges</h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline" onClick={() => handleGenericAction('All Bills')}>View All</button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {MOCK_BILLS.slice(0, 4).map((bill) => (
                    <div key={bill.id} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => handleGenericAction(bill.name)}>
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all group-active:scale-95">
                        {BILL_ICON_MAP[bill.icon]}
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 text-center">{bill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="font-bold text-slate-800">Recent Transactions</h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline" onClick={() => navigate('/history')}>History</button>
                </div>
                <div className="space-y-1 bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
                  {MOCK_TRANSACTIONS.slice(0, 4).map((tx) => (
                    <TransactionItem key={tx.id} transaction={tx} />
                  ))}
                </div>
              </div>

              {/* Promotions / Rewards */}
              <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100 flex items-center justify-between shadow-sm group cursor-pointer active:scale-[0.98] transition-transform" onClick={() => navigate('/rewards')}>
                <div>
                  <h3 className="text-orange-900 font-bold mb-1">Get ₹500 Cashback</h3>
                  <p className="text-xs text-orange-800/70 font-medium">Refer your friend to join PayFast UPI</p>
                  <button className="mt-4 bg-orange-500 text-white text-[10px] font-black px-5 py-2 rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
                    INVITE NOW
                  </button>
                </div>
                <div className="bg-orange-100 p-5 rounded-full group-hover:rotate-12 transition-transform">
                  <Award className="w-12 h-12 text-orange-600" />
                </div>
              </div>
            </div>
          } />
          <Route path="/scan" element={<ScanScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/rewards" element={<RewardsScreen />} />
          <Route path="/profile" element={<ProfileScreen onLogout={() => handleGenericAction('Logout')} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <BottomNav />

      <PinModal 
        isOpen={showPin} 
        onClose={() => setShowPin(false)} 
        onSuccess={() => setIsBalanceVisible(true)}
        title="View Total Balance" 
      />

      <PaymentDrawer 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        type={activePaymentType}
        recipient={prefillRecipient}
      />

      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-bold uppercase tracking-wide">{showToast} Selected</span>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <MainApp />
    </HashRouter>
  );
};

export default App;
