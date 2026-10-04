import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'VND' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;
}

const exchangeRates: Record<Currency, number> = {
  USD: 1,
  VND: 23000,
  EUR: 0.92
};

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  VND: '₫',
  EUR: '€'
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const stored = localStorage.getItem('currency');
    return (stored as Currency) || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  };

  const convertPrice = (price: number): number => {
    return price * exchangeRates[currency];
  };

  const formatPrice = (price: number): string => {
    const converted = convertPrice(price);
    const symbol = currencySymbols[currency];
    
    if (currency === 'VND') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    
    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
