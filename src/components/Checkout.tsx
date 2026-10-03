import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack, onComplete }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-700/30">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-amber-100 mb-3">Order Confirmed!</h2>
          <p className="text-stone-400 mb-2">Thank you for your purchase.</p>
          <p className="text-stone-500 text-sm mb-8">
            Your specialty coffee is being prepared with care. You'll receive a confirmation email shortly.
          </p>
          <div className="bg-stone-800/50 rounded-xl p-4 border border-stone-700/30 mb-8">
            <p className="text-stone-400 text-sm mb-1">Order Total</p>
            <p className="text-amber-400 text-2xl font-bold">${total.toFixed(2)}</p>
          </div>
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="font-serif text-2xl text-amber-100 mb-2">Processing your order...</h2>
          <p className="text-stone-400 text-sm">Please wait while we prepare your coffee.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 sm:mb-8 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back to cart</span>
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            {/* Contact */}
            <div className="bg-stone-800/50 rounded-2xl p-5 sm:p-6 border border-stone-700/30">
              <h3 className="text-amber-200 font-medium mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center text-xs text-white font-bold">1</span>
                Contact Information
              </h3>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                />
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                />
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-stone-800/50 rounded-2xl p-5 sm:p-6 border border-stone-700/30">
              <h3 className="text-amber-200 font-medium mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center text-xs text-white font-bold">2</span>
                Shipping Address
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Street address"
                  required
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="ZIP code"
                    required
                    value={formData.zip}
                    onChange={(e) => handleChange('zip', e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-stone-800/50 rounded-2xl p-5 sm:p-6 border border-stone-700/30">
              <h3 className="text-amber-200 font-medium mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center text-xs text-white font-bold">3</span>
                Payment Details
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card number"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => handleChange('cardNumber', e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    value={formData.expiry}
                    onChange={(e) => handleChange('expiry', e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    required
                    value={formData.cvv}
                    onChange={(e) => handleChange('cvv', e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-900/30 text-base"
            >
              Place Order — ${total.toFixed(2)}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-stone-800/50 rounded-2xl p-5 sm:p-6 border border-stone-700/30 sticky top-24">
              <h3 className="text-amber-200 font-medium mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-amber-100 text-sm truncate">{item.product.name}</p>
                      <p className="text-stone-400 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-amber-400 text-sm font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-700/50 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400">Subtotal</span>
                  <span className="text-amber-100">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400">Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-700/50">
                  <span className="text-amber-100 font-semibold">Total</span>
                  <span className="text-amber-400 font-bold text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
