import React, { useState } from 'react';

interface CoffeeCalculatorProps {
  onClose: () => void;
}

const CoffeeCalculator: React.FC<CoffeeCalculatorProps> = ({ onClose }) => {
  const [cups, setCups] = useState(2);
  const [ratio, setRatio] = useState(15);
  const [cupSize, setCupSize] = useState(240); // ml

  const waterAmount = cups * cupSize;
  const coffeeAmount = waterAmount / ratio;

  const ratios = [
    { value: 12, label: 'Mạnh (1:12)' },
    { value: 15, label: 'Cân bằng (1:15)' },
    { value: 17, label: 'Nhẹ (1:17)' },
    { value: 18, label: 'Rất nhẹ (1:18)' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-700/50 rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-amber-100">Coffee Calculator</h2>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Cups */}
          <div>
            <label className="text-stone-400 text-sm mb-2 block">Số tách cà phê</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCups(Math.max(1, cups - 1))}
                className="w-10 h-10 bg-stone-800 hover:bg-stone-700 text-amber-400 rounded-xl border border-stone-700 transition-colors flex items-center justify-center"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-3xl font-bold text-amber-100">{cups}</span>
                <span className="text-stone-400 text-sm ml-2">tách</span>
              </div>
              <button
                onClick={() => setCups(cups + 1)}
                className="w-10 h-10 bg-stone-800 hover:bg-stone-700 text-amber-400 rounded-xl border border-stone-700 transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Cup Size */}
          <div>
            <label className="text-stone-400 text-sm mb-2 block">Kích thước tách (ml)</label>
            <input
              type="range"
              min="150"
              max="350"
              step="10"
              value={cupSize}
              onChange={(e) => setCupSize(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
            <div className="flex justify-between text-xs text-stone-500 mt-1">
              <span>150ml</span>
              <span className="text-amber-400 font-medium">{cupSize}ml</span>
              <span>350ml</span>
            </div>
          </div>

          {/* Ratio */}
          <div>
            <label className="text-stone-400 text-sm mb-2 block">Tỷ lệ pha</label>
            <div className="grid grid-cols-2 gap-2">
              {ratios.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRatio(r.value)}
                  className={`p-2.5 rounded-xl text-sm transition-all ${
                    ratio === r.value
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border border-stone-700/50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-4">
            <h3 className="text-amber-200 font-medium mb-3 text-sm">Kết quả</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-400">{coffeeAmount.toFixed(1)}g</p>
                <p className="text-stone-400 text-sm">Cà phê</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-400">{waterAmount}ml</p>
                <p className="text-stone-400 text-sm">Nước</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-stone-700/30 text-center">
              <p className="text-stone-500 text-xs">
                Tổng lượng cà phê: {(coffeeAmount * cups).toFixed(1)}g cho {cups} tách
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCalculator;
