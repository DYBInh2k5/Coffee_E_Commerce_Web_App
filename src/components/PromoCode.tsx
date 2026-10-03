import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const PromoCode: React.FC = () => {
  const [code, setCode] = useState('');
  const { promoCode, promoDiscount, applyPromo, removePromo } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      applyPromo(code.trim());
      setCode('');
    }
  };

  if (promoCode) {
    return (
      <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-700/30 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-green-400">🎉</span>
          <div>
            <p className="text-green-300 text-sm font-medium">{promoCode}</p>
            <p className="text-green-400/70 text-xs">{promoDiscount}% off applied</p>
          </div>
        </div>
        <button
          onClick={removePromo}
          className="text-stone-400 hover:text-red-400 transition-colors text-xs"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Promo code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-stone-700 hover:bg-stone-600 text-amber-200 text-sm font-medium rounded-lg transition-colors"
      >
        Apply
      </button>
    </form>
  );
};

export default PromoCode;
