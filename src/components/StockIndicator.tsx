import React from 'react';

interface StockIndicatorProps {
  stock: number;
}

const StockIndicator: React.FC<StockIndicatorProps> = ({ stock }) => {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-900/30 text-red-400 text-xs font-medium rounded-full border border-red-700/30">
        <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
        Hết hàng
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-900/30 text-amber-400 text-xs font-medium rounded-full border border-amber-700/30 animate-pulse-gentle">
        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
        Chỉ còn {stock} túi
      </span>
    );
  }

  if (stock <= 15) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-900/30 text-blue-400 text-xs font-medium rounded-full border border-blue-700/30">
        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
        Sắp hết hàng
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-900/30 text-green-400 text-xs font-medium rounded-full border border-green-700/30">
      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
      Còn hàng
    </span>
  );
};

export default StockIndicator;
