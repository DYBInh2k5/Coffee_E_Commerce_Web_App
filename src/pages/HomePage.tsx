import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import { products, categories } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import Subscription from '../components/Subscription';
import { ProductCardSkeleton } from '../components/Skeleton';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ searchQuery, onSearchChange }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showSubscription, setShowSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((note) => note.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleProductSelect = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-stone-900 to-stone-900" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(217, 119, 6, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(180, 83, 9, 0.2) 0%, transparent 50%)`
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-amber-100 mb-4 leading-tight">
              Crafted with
              <span className="text-amber-400"> passion</span>,
              <br />roasted to perfection.
            </h1>
            <p className="text-stone-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Discover our curated selection of specialty coffees sourced from the world's finest growing regions.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Ethically Sourced</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Freshly Roasted</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Free Shipping</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowSubscription(true)}
                className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
              >
                Subscribe & Save
              </button>
              <button
                onClick={() => navigate('/brewing')}
                className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-amber-200 font-medium rounded-xl border border-stone-700 transition-colors"
              >
                Brewing Guides
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/30'
                    : 'bg-stone-800 text-stone-400 hover:text-amber-300 hover:bg-stone-700 border border-stone-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="text-stone-500 text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'coffee' : 'coffees'} found
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-stone-400 text-lg mb-2">No coffees found</p>
            <p className="text-stone-500 text-sm">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleProductSelect}
              />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 sm:p-8">
          <Newsletter />
        </div>
      </section>

      {/* Subscription Modal */}
      {showSubscription && <Subscription onClose={() => setShowSubscription(false)} />}
    </div>
  );
};

export default HomePage;
