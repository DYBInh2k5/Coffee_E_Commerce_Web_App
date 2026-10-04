import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const currencies = [
    { code: 'USD' as const, label: 'USD', symbol: '$' },
    { code: 'VND' as const, label: 'VND', symbol: '₫' },
    { code: 'EUR' as const, label: 'EUR', symbol: '€' }
  ];

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as any)}
      className="px-2 py-1 text-xs bg-stone-800 border border-stone-700 rounded text-stone-300 focus:outline-none focus:border-amber-600 transition-all"
    >
      {currencies.map((curr) => (
        <option key={curr.code} value={curr.code}>
          {curr.symbol} {curr.label}
        </option>
      ))}
    </select>
  );
};

export default CurrencySwitcher;
