import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { useCurrency } from '../context/CurrencyContext';
import WishlistButton from './WishlistButton';
import QuickView from './QuickView';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useApp();
  const { formatPrice } = useCurrency();
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <div className="group bg-stone-800/50 border border-stone-700/50 rounded-2xl overflow-hidden hover:border-amber-700/50 hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-stone-900/80 backdrop-blur-sm text-amber-300 text-xs font-medium rounded-full border border-amber-800/30">
            {product.roast} Roast
          </span>
        </div>
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <WishlistButton productId={product.id} className="bg-stone-900/50 backdrop-blur-sm" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickView(true);
            }}
            className="p-2 bg-stone-900/50 backdrop-blur-sm text-stone-300 hover:text-amber-300 rounded-full transition-colors"
            title="Quick View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-sm">★</span>
            <span className="text-amber-100 text-sm font-medium">{product.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-serif text-lg text-amber-100 group-hover:text-amber-300 transition-colors cursor-pointer leading-tight"
            onClick={() => onSelect(product)}
          >
            {product.name}
          </h3>
          <span className="text-amber-400 font-bold text-lg whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-stone-400 text-xs">{product.origin}</span>
          <span className="text-stone-600">•</span>
          <span className="text-stone-400 text-xs">{product.weight}</span>
          <span className="text-stone-600">•</span>
          <span className="text-stone-400 text-xs">{product.category}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span key={note} className="px-2 py-0.5 bg-stone-700/50 text-stone-300 text-xs rounded-full">
              {note}
            </span>
          ))}
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors duration-200 text-sm flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add to Cart
        </button>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickView product={product} onClose={() => setShowQuickView(false)} />
      )}
    </div>
  );
};

export default ProductCard;
