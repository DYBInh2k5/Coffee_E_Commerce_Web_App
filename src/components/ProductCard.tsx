import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onAddToCart }) => {
  return (
    <div className="group bg-stone-800/50 border border-stone-700/50 rounded-2xl overflow-hidden hover:border-amber-700/50 hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-stone-900/80 backdrop-blur-sm text-amber-300 text-xs font-medium rounded-full border border-amber-800/30">
            {product.roast} Roast
          </span>
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
            ${product.price.toFixed(2)}
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
          onClick={() => onAddToCart(product)}
          className="w-full py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors duration-200 text-sm flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
