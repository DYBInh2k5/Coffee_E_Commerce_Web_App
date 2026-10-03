import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import Reviews from '../components/Reviews';
import WishlistButton from '../components/WishlistButton';
import RecentlyViewed, { useRecentlyViewed } from '../components/RecentlyViewed';
import { ProductDetailSkeleton } from '../components/Skeleton';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const { addViewed } = useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const product = products.find(p => p.id === Number(id));

  // Get recommendations (same category or similar roast, excluding current product)
  const recommendations: Product[] = product
    ? products
        .filter(p => p.id !== product.id)
        .map(p => ({
          product: p,
          score: (p.category === product.category ? 2 : 0) +
                 (p.roast === product.roast ? 1 : 0) +
                 p.notes.filter(n => product.notes.includes(n)).length
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(r => r.product)
    : [];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    window.scrollTo(0, 0);
    if (product) addViewed(product.id);
    return () => clearTimeout(timer);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl mb-4 block">☕</span>
          <h2 className="text-2xl font-serif text-amber-100 mb-2">Coffee not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            Back to shop
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProductDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
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
          <div className="absolute top-4 right-4">
            <WishlistButton productId={product.id} className="bg-stone-900/50 backdrop-blur-sm" />
          </div>
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
              onClick={() => addToCart(product, quantity)}
              className="w-full py-3.5 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-900/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add {quantity} to Cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>

          {/* Reviews */}
          <Reviews productId={product.id} />
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-12">
          <h3 className="font-serif text-xl text-amber-100 mb-4">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <button
                key={rec.id}
                onClick={() => navigate(`/product/${rec.id}`)}
                className="group p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl text-left hover:border-amber-700/50 transition-all"
              >
                <img src={rec.image} alt={rec.name} className="w-full aspect-square rounded-lg object-cover mb-3" />
                <h4 className="text-amber-100 font-medium group-hover:text-amber-300 transition-colors">{rec.name}</h4>
                <p className="text-stone-400 text-sm mt-1">{rec.origin} • {rec.roast}</p>
                <p className="text-amber-400 font-bold mt-2">${rec.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      <RecentlyViewed />
    </div>
  );
};

export default ProductPage;
