import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('Welcome! Check your inbox for a special offer.', 'success');
      setEmail('');
    }
  };

  if (subscribed) {
    return (
      <div className="text-center p-4">
        <span className="text-3xl mb-2 block">✉️</span>
        <p className="text-amber-100 font-medium">You're subscribed!</p>
        <p className="text-stone-400 text-sm mt-1">Watch your inbox for brewing tips and exclusive offers.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-serif text-xl text-amber-100 mb-2">Stay in the loop</h3>
      <p className="text-stone-400 text-sm mb-4">Get brewing tips, new arrivals, and 10% off your first order.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors text-sm whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
