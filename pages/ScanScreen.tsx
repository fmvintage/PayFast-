
import React, { useState } from 'react';
import { Camera, X, Image as ImageIcon, Flashlight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USER } from '../constants';
import PaymentDrawer from '../components/PaymentDrawer';

const ScanScreen: React.FC = () => {
  const [tab, setTab] = useState<'scan' | 'myqr'>('scan');
  const [scannedRecipient, setScannedRecipient] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleScanSimulation = () => {
    setScannedRecipient('store@payfast');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 animate-in fade-in duration-300">
      <header className="px-4 py-6 flex items-center justify-between z-10">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full text-white">
          <X className="w-6 h-6" />
        </button>
        <div className="flex bg-white/10 rounded-full p-1 border border-white/10">
          <button 
            onClick={() => setTab('scan')}
            className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${tab === 'scan' ? 'bg-white text-slate-900' : 'text-white/60'}`}
          >
            SCAN QR
          </button>
          <button 
            onClick={() => setTab('myqr')}
            className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${tab === 'myqr' ? 'bg-white text-slate-900' : 'text-white/60'}`}
          >
            MY CODE
          </button>
        </div>
        <div className="w-10"></div>
      </header>

      {tab === 'scan' ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <button 
            onClick={handleScanSimulation}
            className="relative w-64 h-64 border-2 border-white/20 rounded-3xl flex items-center justify-center overflow-hidden cursor-pointer active:scale-95 transition-transform"
          >
             {/* Simulating camera view */}
             <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                <Camera className="w-12 h-12 text-white/10" />
             </div>
             
             {/* Scan corners */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl"></div>
             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl"></div>
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl"></div>
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl"></div>

             {/* Animated scanning line */}
             <div className="absolute inset-x-0 h-0.5 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_infinite]"></div>
          </button>
          
          <p className="mt-12 text-white/60 text-sm text-center px-4 leading-relaxed">
            Position the QR code within the frame or <span className="text-white font-bold underline" onClick={handleScanSimulation}>tap the frame</span> to simulate scan
          </p>

          <div className="mt-auto mb-10 flex gap-10">
             <button className="flex flex-col items-center gap-2">
                <div className="p-4 bg-white/10 rounded-full text-white">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Gallery</span>
             </button>
             <button className="flex flex-col items-center gap-2">
                <div className="p-4 bg-white/10 rounded-full text-white">
                  <Flashlight className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Torch</span>
             </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-blue-600">
           <div className="bg-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center max-w-xs w-full">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-100 mb-4">
                 <img src={MOCK_USER.profilePic} alt="User" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-slate-800">{MOCK_USER.name}</h3>
              <p className="text-xs text-slate-500 mb-6">{MOCK_USER.upiId}</p>
              
              <div className="w-48 h-48 bg-slate-100 rounded-2xl flex items-center justify-center p-4">
                 {/* QR Placeholders */}
                 <div className="grid grid-cols-4 gap-2 opacity-10">
                    {Array.from({length: 16}).map((_, i) => (
                       <div key={i} className={`w-8 h-8 bg-slate-900 rounded ${i % 3 === 0 ? 'opacity-100' : 'opacity-40'}`}></div>
                    ))}
                 </div>
                 <div className="absolute flex items-center justify-center">
                    <ShieldCheck className="w-12 h-12 text-blue-600" />
                 </div>
              </div>
              
              <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">PayFast UPI Secure Code</p>
           </div>
           
           <button className="mt-10 bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-3 rounded-2xl transition-all">
              SHARE QR CODE
           </button>
        </div>
      )}

      {scannedRecipient && (
        <PaymentDrawer 
          isOpen={!!scannedRecipient}
          onClose={() => setScannedRecipient(null)}
          type="Pay Scanned Merchant"
          recipient={scannedRecipient}
        />
      )}

      <style>{`
        @keyframes scan {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
      `}</style>
    </div>
  );
};

export default ScanScreen;
