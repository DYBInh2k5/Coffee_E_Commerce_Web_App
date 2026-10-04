import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

interface Bundle {
  id: number;
  name: string;
  description: string;
  products: number[];
  originalPrice: number;
  bundlePrice: number;
  discount: number;
  icon: string;
}

const bundles: Bundle[] = [
  {
    id: 1,
    name: 'Starter Pack',
    description: 'Perfect for beginners - 3 popular single origins',
    products: [1, 2, 4],
    originalPrice: 56.50,
    bundlePrice: 45.00,
    discount: 20,
    icon: '🌱',
  },
  {
    id: 2,
    name: 'Dark Roast Lover',
    description: 'For those who love bold, intense flavors',
    products: [3, 6],
    originalPrice: 34.00,
    bundlePrice: 28.00,
    discount: 18,
    icon: '🌑',
  },
  {
    id: 3,
    name: 'World Tour',
    description: 'Explore coffees from 4 different continents',
    products: [1, 2, 4, 6],
    originalPrice: 75.50,
    bundlePrice: 59.00,
    discount: 22,
    icon: '🌍',
  },
  {
    id: 4,
    name: 'Morning Ritual',
    description: 'Your perfect morning companion',
    products: [2, 5],
    originalPrice: 30.50,
    bundlePrice: 25.00,
    discount: 18,
    icon: '☀️',
  },
];

const BundleDeals: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addToCart, showToast } = useApp();
  const navigate = useNavigate();

  const handleAddBundle = (bundle: Bundle) => {
    bundle.products.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) addToCart(product);
    });
    showToast(`Đã thêm ${bundle.name} vào giỏ hàng!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-700/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl text-amber-100">Combo ưu đãi</h2>
              <p className="text-stone-400 text-sm mt-1">Tiết kiệm hơn khi mua theo combo</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bundles.map((bundle) => {
              const bundleProducts = bundle.products.map(id => products.find(p => p.id === id)!);
              return (
                <div key={bundle.id} className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-5 hover:border-amber-700/50 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-4xl">{bundle.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-amber-100 font-semibold text-lg">{bundle.name}</h3>
                      <p className="text-stone-400 text-sm">{bundle.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {bundleProducts.map(product => (
                      <div key={product.id} className="flex items-center gap-2 text-sm">
                        <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                        <span className="text-stone-300 flex-1">{product.name}</span>
                        <span className="text-stone-500">${product.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-stone-700/30 pt-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-stone-400 text-sm">Giá gốc:</span>
                      <span className="text-stone-500 line-through">${bundle.originalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-100 font-medium">Giá combo:</span>
                      <div className="text-right">
                        <span className="text-amber-400 font-bold text-xl">${bundle.bundlePrice.toFixed(2)}</span>
                        <span className="ml-2 px-2 py-0.5 bg-green-900/30 text-green-400 text-xs font-medium rounded-full">
                          -{bundle.discount}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddBundle(bundle)}
                    className="w-full py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors text-sm"
                  >
                    Thêm combo vào giỏ
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleDeals;
