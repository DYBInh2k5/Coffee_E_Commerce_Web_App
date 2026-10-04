import React, { useState } from 'react';

interface ShippingOption {
  name: string;
  price: number;
  days: string;
  description: string;
}

const ShippingCalculator: React.FC = () => {
  const [weight, setWeight] = useState(0.5); // kg
  const [destination, setDestination] = useState('hanoi');
  const [showResults, setShowResults] = useState(false);

  const destinations = [
    { value: 'hanoi', label: 'Hà Nội', zone: 1 },
    { value: 'hcm', label: 'TP. Hồ Chí Minh', zone: 2 },
    { value: 'central', label: 'Miền Trung', zone: 2 },
    { value: 'north', label: 'Miền Bắc (khác HN)', zone: 1 },
    { value: 'south', label: 'Miền Nam (khác HCM)', zone: 2 },
    { value: 'highland', label: 'Tây Nguyên', zone: 3 },
    { value: 'remote', label: 'Vùng sâu vùng xa', zone: 3 },
  ];

  const calculateShipping = (): ShippingOption[] => {
    const dest = destinations.find(d => d.value === destination);
    if (!dest) return [];

    const basePrice = dest.zone === 1 ? 25000 : dest.zone === 2 ? 35000 : 50000;
    const weightFee = Math.ceil(weight) * 5000;

    return [
      {
        name: 'Tiêu chuẩn',
        price: basePrice + weightFee,
        days: '3-5 ngày',
        description: 'Giao hàng tiêu chuẩn, có theo dõi',
      },
      {
        name: 'Nhanh',
        price: basePrice + weightFee + 15000,
        days: '1-2 ngày',
        description: 'Giao hàng nhanh, ưu tiên xử lý',
      },
      {
        name: 'Hỏa tốc',
        price: basePrice + weightFee + 35000,
        days: 'Trong ngày',
        description: 'Giao hàng trong ngày (nội thành)',
      },
    ];
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <h1 className="font-serif text-3xl text-amber-100 mb-2">Tính phí vận chuyển</h1>
      <p className="text-stone-400 mb-8">Ước tính phí giao hàng đến địa chỉ của bạn</p>

      <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 space-y-6">
        {/* Weight */}
        <div>
          <label className="text-stone-400 text-sm mb-2 block">Khối lượng đơn hàng</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="flex-1 accent-amber-600"
            />
            <span className="text-amber-400 font-medium min-w-[60px] text-right">
              {weight.toFixed(1)} kg
            </span>
          </div>
          <div className="flex justify-between text-xs text-stone-500 mt-1">
            <span>0.1kg</span>
            <span>5kg</span>
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="text-stone-400 text-sm mb-2 block">Khu vực giao hàng</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-600 transition-all"
          >
            {destinations.map(dest => (
              <option key={dest.value} value={dest.value}>{dest.label}</option>
            ))}
          </select>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
        >
          Tính phí vận chuyển
        </button>

        {/* Results */}
        {showResults && (
          <div className="space-y-3 pt-4 border-t border-stone-700/30 animate-fade-in">
            <h3 className="text-amber-200 font-medium">Các phương thức giao hàng</h3>
            {calculateShipping().map((option, index) => (
              <div
                key={index}
                className="p-4 bg-stone-800/50 border border-stone-700/30 rounded-xl hover:border-amber-700/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-amber-100 font-medium">{option.name}</h4>
                    <p className="text-stone-400 text-sm">{option.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400 font-bold">{formatPrice(option.price)}</p>
                    <p className="text-stone-500 text-xs">{option.days}</p>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-stone-500 text-xs text-center mt-4">
              * Miễn phí vận chuyển cho đơn hàng từ 500.000₫
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingCalculator;
