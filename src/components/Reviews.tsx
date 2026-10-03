import React, { useState } from 'react';
import { reviews } from '../data/reviews';

interface ReviewsProps {
  productId: number;
}

const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
  const [showAll, setShowAll] = useState(false);
  const productReviews = reviews.filter(r => r.productId === productId);
  const displayedReviews = showAll ? productReviews : productReviews.slice(0, 3);
  const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;

  return (
    <div className="mt-8">
      <h3 className="font-serif text-xl text-amber-100 mb-4">Customer Reviews</h3>
      
      {/* Rating Summary */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-stone-800/50 rounded-xl border border-stone-700/30">
        <div className="text-center">
          <p className="text-3xl font-bold text-amber-400">{avgRating.toFixed(1)}</p>
          <div className="flex text-amber-400 text-sm">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.round(avgRating) ? '★' : '☆'}</span>
            ))}
          </div>
          <p className="text-stone-500 text-xs mt-1">{productReviews.length} reviews</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="p-4 bg-stone-800/30 rounded-xl border border-stone-700/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-900/30 rounded-full flex items-center justify-center text-amber-400 text-sm font-medium">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="text-amber-100 text-sm font-medium">{review.author}</p>
                  <p className="text-stone-500 text-xs">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < review.rating ? 'text-amber-400' : 'text-stone-600'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">{review.comment}</p>
            {review.verified && (
              <span className="inline-flex items-center gap-1 mt-2 text-xs text-green-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified purchase
              </span>
            )}
          </div>
        ))}
      </div>

      {productReviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
        >
          {showAll ? 'Show less' : `Show all ${productReviews.length} reviews`}
        </button>
      )}
    </div>
  );
};

export default Reviews;
