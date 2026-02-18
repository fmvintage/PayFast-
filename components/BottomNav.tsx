
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, History, ScanLine, Award, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/history', icon: History, label: 'History' },
    { to: '/scan', icon: ScanLine, label: 'Scan', primary: true },
    { to: '/rewards', icon: Award, label: 'Rewards' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between z-50 max-w-md mx-auto">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => `
            flex flex-col items-center gap-1 transition-all
            ${link.primary ? 'relative -top-6 bg-blue-600 p-3.5 rounded-2xl shadow-lg shadow-blue-200 text-white' : ''}
            ${!link.primary && isActive ? 'text-blue-600' : 'text-slate-400'}
            ${!link.primary ? 'hover:text-blue-500' : 'hover:scale-105'}
          `}
        >
          <link.icon className={link.primary ? 'w-7 h-7' : 'w-5 h-5'} />
          {!link.primary && <span className="text-[10px] font-medium">{link.label}</span>}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
