import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, isOpen, onClose, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-stone-900 border-l border-stone-700/50 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-700/50">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-serif text-amber-100">Your Cart</h2>
            <span className="px-2 py-0.5 bg-amber-900/30 text-amber-400 text-xs font-medium rounded-full">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-5xl mb-4">☕</span>
              <p className="text-stone-400 text-lg mb-2">Your cart is empty</p>
              <p className="text-stone-500 text-sm">Add some specialty coffee to get started</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-stone-800/50 rounded-xl p-3 border border-stone-700/30">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-amber-100 font-medium text-sm truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-stone-400 text-xs mt-0.5">
                    {item.product.weight} • {item.product.roast}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-stone-700/50 rounded-lg px-1 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-amber-400 hover:text-amber-300 text-sm rounded transition-colors"
                      >
                        −
                      </button>
                      <span className="text-amber-100 text-sm font-medium w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-amber-400 hover:text-amber-300 text-sm rounded transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-amber-400 font-semibold text-sm">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="self-start p-1 text-stone-500 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-700/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Subtotal</span>
              <span className="text-amber-100 font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-400">Shipping</span>
              <span className="text-green-400 font-medium text-sm">Free</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-stone-700/50">
              <span className="text-amber-100 font-semibold text-lg">Total</span>
              <span className="text-amber-400 font-bold text-xl">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-900/30"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
