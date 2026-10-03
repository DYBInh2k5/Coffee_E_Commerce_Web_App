import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PromoCode from '../components/PromoCode';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeItem, cartTotal, promoDiscount } = useApp();
  const navigate = useNavigate();

  const discount = cartTotal * (promoDiscount / 100);
  const finalTotal = cartTotal - discount;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <span className="text-6xl mb-4 block">☕</span>
        <h2 className="font-serif text-2xl text-amber-100 mb-2">Your cart is empty</h2>
        <p className="text-stone-400 mb-6">Add some specialty coffee to get started</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
        >
          Browse Coffees
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Continue shopping</span>
      </button>

      <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex gap-4 bg-stone-800/50 rounded-xl p-4 border border-stone-700/30">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover flex-shrink-0 cursor-pointer"
                onClick={() => navigate(`/product/${item.product.id}`)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-amber-100 font-medium cursor-pointer hover:text-amber-300 transition-colors"
                      onClick={() => navigate(`/product/${item.product.id}`)}>
                      {item.product.name}
                    </h3>
                    <p className="text-stone-400 text-sm mt-0.5">
                      {item.product.weight} • {item.product.roast} Roast
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-stone-700/50 rounded-lg px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-amber-400 hover:text-amber-300 rounded transition-colors"
                    >
                      −
                    </button>
                    <span className="text-amber-100 font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-amber-400 hover:text-amber-300 rounded transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-amber-400 font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-stone-800/50 rounded-2xl p-5 sm:p-6 border border-stone-700/30 sticky top-24">
            <h3 className="text-amber-200 font-medium mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-stone-400">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-amber-100">${cartTotal.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Discount ({promoDiscount}%)</span>
                  <span className="text-green-400">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-stone-400">Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-4">
              <PromoCode />
            </div>

            <div className="border-t border-stone-700/50 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-amber-100 font-semibold text-lg">Total</span>
                <span className="text-amber-400 font-bold text-xl">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-900/30"
            >
              Proceed to Checkout
            </button>

            <p className="text-stone-500 text-xs text-center mt-3">
              Try promo codes: COFFEE10, BLOOM20, EMBER15
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
