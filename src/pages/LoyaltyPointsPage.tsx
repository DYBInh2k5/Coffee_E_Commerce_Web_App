import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LoyaltyPointsPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartTotal } = useApp();

  // Simulated loyalty data
  const points = 1250;
  const tier = 'Gold';
  const nextTier = 'Platinum';
  const pointsToNext = 750;
  const progress = (points / (points + pointsToNext)) * 100;

  const rewards = [
    { points: 500, name: '$5 Off', description: 'Save $5 on your next order' },
    { points: 1000, name: '$12 Off', description: 'Save $12 on your next order' },
    { points: 2000, name: 'Free Bag', description: 'Get a free 250g bag of coffee' },
    { points: 5000, name: 'Exclusive Access', description: 'Early access to limited releases' },
  ];

  const benefits = [
    { icon: '⭐', title: 'Earn Points', desc: '1 point per $1 spent' },
    { icon: '🎁', title: 'Birthday Reward', desc: 'Special gift on your birthday' },
    { icon: '🚀', title: 'Early Access', desc: 'First dibs on new releases' },
    { icon: '💎', title: 'Exclusive Blends', desc: 'Members-only coffees' },
  ];

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

      <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-3">Loyalty Rewards</h1>
      <p className="text-stone-400 mb-8">Earn points with every purchase and unlock exclusive rewards.</p>

      {/* Points Overview */}
      <div className="bg-gradient-to-br from-amber-900/20 to-stone-800/50 border border-amber-700/30 rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-stone-400 text-sm">Your Points</p>
            <p className="text-4xl font-bold text-amber-400">{points.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-stone-400 text-sm">Current Tier</p>
            <p className="text-2xl font-bold text-amber-100">{tier}</p>
          </div>
        </div>

        {/* Progress to next tier */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-stone-400">Progress to {nextTier}</span>
            <span className="text-amber-400">{pointsToNext} points to go</span>
          </div>
          <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-stone-500 text-sm">
          💡 Earn 1 point for every $1 spent. Redeem points for discounts and exclusive rewards!
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl text-center">
            <span className="text-2xl mb-2 block">{benefit.icon}</span>
            <h3 className="text-amber-100 text-sm font-medium mb-1">{benefit.title}</h3>
            <p className="text-stone-500 text-xs">{benefit.desc}</p>
          </div>
        ))}
      </div>

      {/* Available Rewards */}
      <h2 className="font-serif text-xl text-amber-100 mb-4">Available Rewards</h2>
      <div className="space-y-3">
        {rewards.map((reward) => {
          const canRedeem = points >= reward.points;
          return (
            <div
              key={reward.points}
              className={`p-4 rounded-xl border transition-all ${
                canRedeem
                  ? 'bg-amber-900/10 border-amber-700/30 hover:border-amber-600'
                  : 'bg-stone-800/30 border-stone-700/30 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-amber-100 font-medium">{reward.name}</h3>
                  <p className="text-stone-400 text-sm">{reward.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 font-bold">{reward.points.toLocaleString()} pts</p>
                  {canRedeem && (
                    <button className="mt-1 px-3 py-1 bg-amber-700 hover:bg-amber-600 text-white text-xs font-medium rounded-lg transition-colors">
                      Redeem
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoyaltyPointsPage;
