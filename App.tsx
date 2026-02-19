
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { 
  Search,
  Bell,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle,
  PlusCircle,
  ShieldCheck,
  Landmark
} from 'lucide-react';

// Components
import BottomNav from './components/BottomNav.tsx';
import TransactionItem from './components/TransactionItem.tsx';
import ActionGrid from './components/ActionGrid.tsx';
import ScanScreen from './pages/ScanScreen.tsx';
import HistoryScreen from './pages/HistoryScreen.tsx';
import ProfileScreen from './pages/ProfileScreen.tsx';
import RewardsScreen from './pages/RewardsScreen.tsx';
import PinModal from './components/PinModal.tsx';
import PaymentDrawer from './components/PaymentDrawer.tsx';
import AddBankDrawer from './components/AddBankDrawer.tsx';
import LoginScreen from './pages/LoginScreen.tsx';

// Types and Mocks
import { MOCK_USER, MOCK_TRANSACTIONS, MOCK_BILLS, BILL_ICON_MAP } from './constants.tsx';
import { BankAccount } from './types.ts';

const MainApp: React.FC = () => {
  const navigate = useNavigate();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('payfast_logged_in') === 'true');
  
  // Bank State Management
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);

  // Payment States
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activePaymentType, setActivePaymentType] = useState('');
  const [prefillRecipient, setPrefillRecipient] = useState('');

  useEffect(() => {
    const savedBanks = localStorage.getItem('payfast_banks');
    if (savedBanks) {
      setBanks(JSON.parse(savedBanks));
    }
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => {
      setIsLoggedIn(true);
      localStorage.setItem('payfast_logged_in', 'true');
    }} />;
  }

  const handleAddBank = (bankName: string, logo: string) => {
    const newBank: BankAccount = {
      id: `b${Date.now()}`,
      bankName,
      logo,
      accountNumber: `XXXX ${Math.floor(1000 + Math.random() * 9000)}`,
      balance: Math.floor(Math.random() * 50000) + 1000,
      isDefault: banks.length === 0,
    };
    const updatedBanks = [...banks, newBank];
    setBanks(updatedBanks);
    localStorage.setItem('payfast_banks', JSON.stringify(updatedBanks));
    setShowToast(`Linked ${bankName}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('payfast_logged_in');
    setIsLoggedIn(false);
  };

  const toggleBalance = () => {
    if (isBalanceVisible) {
      setIsBalanceVisible(false);
    } else {
      setShowPin(true);
    }
  };

  const handleGenericAction = (name: string) => {
    if (name.includes('Bill') || name.includes('Recharge')) {
      setActivePaymentType(`Bill: ${name}`);
      setPrefillRecipient(`${name.toLowerCase()}@payfast`);
      setIsPaymentOpen(true);
    } else {
      setShowToast(name);
      setTimeout(() => setShowToast(null), 2000);
    }
  };

  const onActionGridClick = (label: string) => {
    if (label === 'Scan QR') {
      navigate('/scan');
    } else {
      if (banks.length === 0) {
        setIsAddBankOpen(true);
      } else {
        setActivePaymentType(label);
        setPrefillRecipient('');
        setIsPaymentOpen(true);
      }
    }
  };

  const defaultBank = banks.find(b => b.isDefault) || banks[0];

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
          <button className="p-2 text-slate-600 hover:bg-gray-100 rounded-full relative" onClick={() => handleGenericAction('Notifications')}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar">
        <Routes>
          <Route path="/" element={
            <div className="p-4 space-y-6">
              {/* Balance Card / Bank Setup Card */}
              {banks.length > 0 ? (
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-1">Total Balance</p>
                      <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-black tracking-tight tabular-nums">
                          {isBalanceVisible ? `₹${banks.reduce((acc, b) => acc + b.balance, 0).toLocaleString('en-IN')}` : '₹ ••••••'}
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
                  <div className="flex items-center justify-between mt-8 bg-black/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5 group active:bg-black/20 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <img src={defaultBank.logo} alt="bank" className="w-8 h-8 rounded-lg bg-white p-1" />
                      <div>
                        <p className="text-xs font-bold">{defaultBank.bankName}</p>
                        <p className="text-[10px] text-white/60">{defaultBank.accountNumber}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-blue-200 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                    <Landmark className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg uppercase tracking-tight">Setup Bank Account</h3>
                    <p className="text-xs text-slate-500 font-medium px-4 mt-1 leading-relaxed">
                      Link your bank account with secured SIM verification to start payments.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsAddBankOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-blue-100 active:scale-95 transition-all text-xs"
                  >
                    <PlusCircle className="w-4 h-4" /> LINK NOW
                  </button>
                </div>
              )}

              <ActionGrid onActionClick={onActionGridClick} />

              <div>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="font-bold text-slate-800">Bills & Recharges</h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
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
            </div>
          } />
          <Route path="/scan" element={<ScanScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/rewards" element={<RewardsScreen />} />
          <Route path="/profile" element={<ProfileScreen onLogout={handleLogout} onAddBank={() => setIsAddBankOpen(true)} banks={banks} />} />
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
        banks={banks}
      />

      <AddBankDrawer 
        isOpen={isAddBankOpen}
        onClose={() => setIsAddBankOpen(false)}
        onBankAdded={handleAddBank}
      />

      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-bold uppercase tracking-wide">{showToast}</span>
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
