
import React from 'react';
import { 
  Transaction, 
  BankAccount, 
  Bill 
} from './types';
import { 
  Smartphone, 
  Zap, 
  Droplets, 
  Tv, 
  Wifi, 
  CreditCard 
} from 'lucide-react';

export const MOCK_USER = {
  id: 'u1',
  name: 'Alex Johnson',
  mobile: '+91 9876543210',
  upiId: 'alex@payfast',
  profilePic: 'https://picsum.photos/seed/alex/200'
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    title: 'Starbucks Coffee',
    subtitle: 'Paid to starbucks@upi',
    amount: 350.00,
    date: '2023-11-20T10:30:00Z',
    status: 'success',
    type: 'sent',
    upiId: 'starbucks@upi',
    category: 'food'
  },
  {
    id: 't2',
    title: 'Sarah Miller',
    subtitle: 'Received from sarah@upi',
    amount: 1200.00,
    date: '2023-11-19T14:45:00Z',
    status: 'success',
    type: 'received',
    upiId: 'sarah@upi',
    category: 'transfer'
  },
  {
    id: 't3',
    title: 'Airtel Recharge',
    subtitle: 'Mobile Bill Payment',
    amount: 799.00,
    date: '2023-11-18T09:15:00Z',
    status: 'success',
    type: 'sent',
    upiId: 'airtel@paytm',
    category: 'bills'
  },
  {
    id: 't4',
    title: 'Zomato Order',
    subtitle: 'Payment failed',
    amount: 450.00,
    date: '2023-11-17T20:00:00Z',
    status: 'failed',
    type: 'sent',
    upiId: 'zomato@upi',
    category: 'food'
  },
  {
    id: 't5',
    title: 'Salary Credit',
    subtitle: 'Corporate Payout',
    amount: 45000.00,
    date: '2023-11-01T08:00:00Z',
    status: 'success',
    type: 'received',
    upiId: 'office@hdfc',
    category: 'transfer'
  }
];

export const MOCK_BANKS: BankAccount[] = [
  {
    id: 'b1',
    bankName: 'HDFC Bank',
    accountNumber: 'XXXX 4455',
    balance: 52430.50,
    isDefault: true,
    logo: 'https://picsum.photos/seed/hdfc/40'
  },
  {
    id: 'b2',
    bankName: 'ICICI Bank',
    accountNumber: 'XXXX 1122',
    balance: 12100.25,
    isDefault: false,
    logo: 'https://picsum.photos/seed/icici/40'
  }
];

export const MOCK_BILLS: Bill[] = [
  { id: 'bill1', name: 'Mobile Recharge', icon: 'smartphone', provider: 'Recharge any number' },
  { id: 'bill2', name: 'Electricity', icon: 'zap', provider: 'State Boards' },
  { id: 'bill3', name: 'Water Bill', icon: 'droplets', provider: 'Municipalities' },
  { id: 'bill4', name: 'DTH', icon: 'tv', provider: 'Tata Sky, Dish TV' },
  { id: 'bill5', name: 'Broadband', icon: 'wifi', provider: 'Airtel, Jio' },
  { id: 'bill6', name: 'Credit Card', icon: 'credit-card', provider: 'Pay CC Bills' }
];

export const BILL_ICON_MAP: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="w-6 h-6 text-blue-600" />,
  zap: <Zap className="w-6 h-6 text-yellow-500" />,
  droplets: <Droplets className="w-6 h-6 text-cyan-500" />,
  tv: <Tv className="w-6 h-6 text-red-500" />,
  wifi: <Wifi className="w-6 h-6 text-indigo-500" />,
  'credit-card': <CreditCard className="w-6 h-6 text-purple-600" />
};
