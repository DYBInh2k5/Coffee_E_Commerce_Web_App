import React from 'react';
import { useApp } from '../context/AppContext';

interface WishlistButtonProps {
  productId: number;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ productId, className = '' }) => {
  const { isInWishlist, toggleWishlist } = useApp();
  const isWishlisted = isInWishlist(productId);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={`p-2 rounded-full transition-all duration-200 ${
        isWishlisted
          ? 'text-red-400 bg-red-900/30 hover:bg-red-900/50'
          : 'text-stone-400 hover:text-red-400 hover:bg-stone-700/50'
      } ${className}`}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        className="w-5 h-5"
        fill={isWishlisted ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};

export default WishlistButton;
