import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const GiftCardsPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [purchased, setPurchased] = useState(false);

  const amounts = [25, 50, 75, 100, 150, 200];

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || Number(customAmount);
    if (amount > 0 && recipientEmail) {
      setPurchased(true);
      showToast('Gift card sent successfully!', 'success');
    }
  };

  if (purchased) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-700/30">
          <span className="text-3xl">🎁</span>
        </div>
        <h2 className="font-serif text-2xl text-amber-100 mb-2">Gift Card Sent!</h2>
        <p className="text-stone-400 mb-6">
          Your gift card has been sent to {recipientName || 'the recipient'}. They'll receive it via email shortly.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => { setPurchased(false); setSelectedAmount(null); setCustomAmount(''); setRecipientEmail(''); setRecipientName(''); setMessage(''); }}
            className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-amber-200 font-medium rounded-xl border border-stone-700 transition-colors"
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back to shop</span>
      </button>

      <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-3">Gift Cards</h1>
      <p className="text-stone-400 mb-8">Give the gift of exceptional coffee. Delivered instantly via email.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gift Card Preview */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm aspect-[1.6/1] bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-2xl p-6 shadow-2xl shadow-amber-900/30 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl">☕</div>
            </div>
            <div className="relative h-full flex flex-col justify-between">
              <div>
                <p className="text-amber-200/80 text-xs uppercase tracking-wider">Ember & Bloom</p>
                <p className="text-white font-serif text-xl mt-1">Gift Card</p>
              </div>
              <div>
                <p className="text-amber-200 text-sm">
                  {recipientName ? `For: ${recipientName}` : 'To: Coffee Lover'}
                </p>
                <p className="text-white text-3xl font-bold mt-2">
                  ${selectedAmount || customAmount || '___'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <form onSubmit={handlePurchase} className="space-y-4">
          <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-5 sm:p-6">
            <h3 className="text-amber-200 font-medium mb-4">Choose Amount</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                  className={`py-2.5 rounded-xl font-medium transition-all ${
                    selectedAmount === amount
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700/50'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
              min="10"
              max="500"
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
            />
          </div>

          <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-5 sm:p-6 space-y-3">
            <h3 className="text-amber-200 font-medium mb-2">Recipient Details</h3>
            <input
              type="text"
              placeholder="Recipient name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
            />
            <input
              type="email"
              placeholder="Recipient email"
              required
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
            />
            <textarea
              placeholder="Personal message (optional)"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedAmount && !customAmount}
            className="w-full py-3 bg-amber-700 hover:bg-amber-600 disabled:bg-stone-700 disabled:text-stone-500 text-white font-semibold rounded-xl transition-all"
          >
            Purchase Gift Card — ${selectedAmount || customAmount || '0'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GiftCardsPage;
