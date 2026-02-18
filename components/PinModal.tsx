
import React, { useState } from 'react';
import { X, Delete, ShieldCheck } from 'lucide-react';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
}

const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose, onSuccess, title = "Enter UPI PIN" }) => {
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        // Mock PIN check
        if (newPin === "1234") {
          setTimeout(() => {
            onSuccess();
            setPin("");
            onClose();
          }, 500);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
            setPin("");
          }, 1000);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className={`flex gap-4 mb-10 ${error ? 'animate-bounce text-red-500' : ''}`}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  pin.length > i ? (error ? 'bg-red-500 border-red-500' : 'bg-blue-600 border-blue-600') : 'border-slate-200'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num)}
                className="w-16 h-16 rounded-full text-2xl font-bold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
              >
                {num}
              </button>
            ))}
            <div className="w-16 h-16" />
            <button
              onClick={() => handleKeyPress("0")}
              className="w-16 h-16 rounded-full text-2xl font-bold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="w-16 h-16 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              <Delete className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-8 text-xs text-slate-400 font-medium">Secured by PayFast UPI Encryption</p>
        </div>
      </div>
    </div>
  );
};

export default PinModal;
