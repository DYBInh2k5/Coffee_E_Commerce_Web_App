import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';

const PersonalizedRecommendations: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, wishlist } = useApp();

  const recommendations = useMemo(() => {
    // Get user preferences from cart and wishlist
    const viewedProducts = [...cartItems.map(item => item.product), ...products.filter(p => wishlist.includes(p.id))];
    
    if (viewedProducts.length === 0) {
      // Return top rated products if no history
      return products.sort((a, b) => b.rating - a.rating).slice(0, 4);
    }

    // Calculate scores based on user preferences
    const scored = products.map(product => {
      let score = 0;
      
      // Check if similar to viewed products
      viewedProducts.forEach(viewed => {
        if (viewed.id === product.id) return;
        
        // Same category
        if (viewed.category === product.category) score += 3;
        
        // Same roast level
        if (viewed.roast === product.roast) score += 2;
        
        // Similar flavor notes
        const commonNotes = product.notes.filter(note => viewed.notes.includes(note));
        score += commonNotes.length * 2;
      });

      // Add rating bonus
      score += product.rating;

      return { product, score };
    });

    // Sort by score and return top 4
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(item => item.product);
  }, [cartItems, wishlist]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl text-amber-100">Dành riêng cho bạn</h3>
        <span className="text-stone-500 text-xs">Dựa trên sở thích của bạn</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <button
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group text-left bg-stone-800/30 border border-stone-700/30 rounded-xl p-3 hover:border-amber-700/50 transition-all"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square rounded-lg object-cover mb-2 group-hover:scale-105 transition-transform"
            />
            <h4 className="text-amber-100 text-sm font-medium truncate group-hover:text-amber-300 transition-colors">
              {product.name}
            </h4>
            <p className="text-stone-400 text-xs mt-1">{product.roast} • {product.weight}</p>
            <p className="text-amber-400 font-bold text-sm mt-2">${product.price.toFixed(2)}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
