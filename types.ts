
export type TransactionStatus = 'success' | 'failed' | 'pending';
export type TransactionType = 'sent' | 'received';

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  type: TransactionType;
  upiId?: string;
  category: 'food' | 'shopping' | 'bills' | 'transfer' | 'other';
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  balance: number;
  isDefault: boolean;
  logo: string;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  upiId: string;
  profilePic?: string;
}

export interface Bill {
  id: string;
  name: string;
  icon: string;
  provider: string;
}
