
import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, CheckCircle, Loader2 } from 'lucide-react';
import TransactionItem from '../components/TransactionItem';
import { MOCK_TRANSACTIONS } from '../constants';

const HistoryScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'sent' | 'received'>('all');
  const [downloading, setDownloading] = useState(false);

  const filteredTransactions = MOCK_TRANSACTIONS.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || tx.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
    }, 2000);
  };

  return (
    <div className="p-4 bg-gray-50 flex-1 relative">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">History</h2>
        <button 
          onClick={handleDownload}
          disabled={downloading}
          className="p-2.5 bg-white rounded-xl border border-gray-100 text-slate-600 shadow-sm active:bg-gray-50 disabled:opacity-50 transition-all"
        >
          {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-medium text-slate-700"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {['all', 'sent', 'received'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f as any)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black transition-all whitespace-nowrap border ${
                activeFilter === f 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                  : 'bg-white border-gray-100 text-slate-600'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
          <button className="px-6 py-2.5 rounded-full text-[10px] font-black bg-white border border-gray-100 text-slate-600 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            DATE RANGE
          </button>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className="active:bg-slate-50 transition-colors cursor-pointer" onClick={() => alert(`Showing receipt for ${tx.title}`)}>
                <TransactionItem transaction={tx} />
              </div>
            ))
          ) : (
            <div className="p-16 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-slate-200" />
              </div>
              <p className="text-slate-500 font-bold mb-2">No transactions found</p>
              <p className="text-xs text-slate-400 mb-6">Try adjusting your filters or search terms</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveFilter('all')}}
                className="text-blue-600 text-xs font-black uppercase tracking-widest"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {downloading && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl animate-in fade-in zoom-in duration-200">
            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
            <span className="text-sm font-bold uppercase tracking-wide">Generating Statement...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;
