import React from 'react';

interface SizeOption {
  weight: string;
  price: number;
  popular?: boolean;
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSizeChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-stone-400 text-sm">Kích thước</label>
      <div className="grid grid-cols-3 gap-2">
        {sizes.map((size) => (
          <button
            key={size.weight}
            onClick={() => onSizeChange(size.weight)}
            className={`relative p-3 rounded-xl border text-center transition-all ${
              selectedSize === size.weight
                ? 'border-amber-600 bg-amber-900/10'
                : 'border-stone-700/50 bg-stone-800/30 hover:border-stone-600'
            }`}
          >
            {size.popular && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-700 text-white text-xs font-medium rounded-full">
                Phổ biến
              </span>
            )}
            <p className="text-amber-100 font-medium">{size.weight}</p>
            <p className="text-amber-400 text-sm font-bold mt-1">${size.price.toFixed(2)}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
