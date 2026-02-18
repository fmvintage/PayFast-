
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, AlertCircle } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isSent = transaction.type === 'sent';
  const isFailed = transaction.status === 'failed';

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-50">
      <div className="flex items-center gap-3">
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center
          ${isFailed ? 'bg-red-50 text-red-500' : isSent ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}
        `}>
          {isFailed ? <AlertCircle className="w-5 h-5" /> : isSent ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{transaction.title}</h4>
          <p className="text-[10px] text-slate-500">{new Date(transaction.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${isFailed ? 'text-slate-400' : isSent ? 'text-slate-800' : 'text-green-600'}`}>
          {isSent ? '-' : '+'} ₹{transaction.amount.toLocaleString('en-IN')}
        </p>
        <p className={`text-[10px] font-medium uppercase tracking-tighter ${isFailed ? 'text-red-500' : 'text-slate-400'}`}>
          {transaction.status}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
