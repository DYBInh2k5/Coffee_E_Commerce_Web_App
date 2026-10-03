import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, onClose }) => {
  const { addToCart } = useApp();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-700/50 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-stone-900/80 backdrop-blur-sm text-stone-300 hover:text-white rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-amber-900/30 text-amber-400 text-xs font-medium rounded-full border border-amber-800/30">
                {product.category}
              </span>
              <span className="px-2.5 py-1 bg-stone-800 text-stone-300 text-xs font-medium rounded-full">
                {product.roast}
              </span>
            </div>

            <h2 className="font-serif text-2xl text-amber-100 mb-2">{product.name}</h2>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-amber-400">★</span>
                <span className="text-amber-100 text-sm">{product.rating}</span>
              </div>
              <span className="text-stone-500">|</span>
              <span className="text-stone-400 text-sm">{product.origin}</span>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed mb-4">
              {product.description}
            </p>

            <div className="mb-4">
              <h4 className="text-amber-200 text-xs uppercase tracking-wider mb-2">Flavor Notes</h4>
              <div className="flex flex-wrap gap-1.5">
                {product.notes.map((note) => (
                  <span key={note} className="px-2 py-1 bg-stone-800 text-amber-200 text-xs rounded-full">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-amber-400">${product.price.toFixed(2)}</span>
                <span className="text-stone-400 text-sm">{product.weight}</span>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate(`/product/${product.id}`);
                }}
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-amber-200 font-medium rounded-xl border border-stone-700 transition-colors text-sm"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
