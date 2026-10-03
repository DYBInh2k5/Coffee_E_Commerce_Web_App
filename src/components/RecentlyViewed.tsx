import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';

const RecentlyViewed: React.FC = () => {
  const [viewedIds, setViewedIds] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setViewedIds(JSON.parse(stored));
    }
  }, []);

  const addViewed = (productId: number) => {
    const updated = [productId, ...viewedIds.filter(id => id !== productId)].slice(0, 6);
    setViewedIds(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  const viewedProducts = products.filter(p => viewedIds.includes(p.id));

  if (viewedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="font-serif text-xl text-amber-100 mb-4">Recently Viewed</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {viewedProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group text-left"
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-stone-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-amber-100 text-xs font-medium truncate group-hover:text-amber-300 transition-colors">
              {product.name}
            </p>
            <p className="text-amber-400 text-xs">${product.price.toFixed(2)}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export const useRecentlyViewed = () => {
  const addViewed = (productId: number) => {
    const stored = localStorage.getItem('recentlyViewed');
    const viewedIds = stored ? JSON.parse(stored) : [];
    const updated = [productId, ...viewedIds.filter((id: number) => id !== productId)].slice(0, 6);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  return { addViewed };
};

export default RecentlyViewed;
