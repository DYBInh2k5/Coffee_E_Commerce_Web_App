import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 sm:mb-8 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back to coffees</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-amber-900/30 text-amber-400 text-xs font-medium rounded-full border border-amber-800/30">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-stone-800 text-stone-300 text-xs font-medium rounded-full">
                {product.roast} Roast
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <span className="text-amber-400">★</span>
                <span className="text-amber-100 font-medium">{product.rating}</span>
              </div>
              <span className="text-stone-500">|</span>
              <span className="text-stone-400 text-sm">{product.origin}</span>
              <span className="text-stone-500">|</span>
              <span className="text-stone-400 text-sm">{product.weight}</span>
            </div>

            <p className="text-stone-300 leading-relaxed mb-6 text-sm sm:text-base">
              {product.description}
            </p>

            {/* Flavor Notes */}
            <div className="mb-8">
              <h3 className="text-amber-200 font-medium text-sm uppercase tracking-wider mb-3">
                Flavor Notes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span key={note} className="px-3 py-1.5 bg-stone-800 border border-stone-700 text-amber-200 text-sm rounded-full">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="mt-auto border-t border-stone-700/50 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-amber-400">
                  ${product.price.toFixed(2)}
                </span>
                
                {/* Quantity Selector */}
                <div className="flex items-center gap-3 bg-stone-800 rounded-xl border border-stone-700 px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:bg-stone-700 rounded-lg transition-colors"
                  >
                    −
                  </button>
                  <span className="text-amber-100 font-medium w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:bg-stone-700 rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => onAddToCart(product, quantity)}
                className="w-full py-3.5 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-900/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add {quantity} to Cart — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
