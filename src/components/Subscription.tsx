import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface SubscriptionProps {
  onClose: () => void;
}

const Subscription: React.FC<SubscriptionProps> = ({ onClose }) => {
  const { showToast } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const plans = [
    {
      id: 1,
      name: 'Explorer',
      price: 24,
      frequency: 'Every 2 weeks',
      bags: '1 bag (250g)',
      description: 'Perfect for trying new coffees regularly',
      features: ['Curated selection', 'Free shipping', 'Cancel anytime', '10% discount'],
      popular: false,
    },
    {
      id: 2,
      name: 'Enthusiast',
      price: 42,
      frequency: 'Monthly',
      bags: '2 bags (250g each)',
      description: 'For the daily coffee lover who wants variety',
      features: ['Premium selection', 'Free shipping', 'Cancel anytime', '15% discount', 'Early access to new arrivals'],
      popular: true,
    },
    {
      id: 3,
      name: 'Connoisseur',
      price: 75,
      frequency: 'Monthly',
      bags: '3 bags (250g each)',
      description: 'The ultimate coffee experience for true aficionados',
      features: ['Exclusive micro-lots', 'Free shipping', 'Cancel anytime', '20% discount', 'Early access', 'Tasting notes journal'],
      popular: false,
    },
  ];

  const handleSubscribe = () => {
    if (selectedPlan) {
      setSubscribed(true);
      showToast('Subscription activated! Your first box ships soon.', 'success');
    }
  };

  if (subscribed) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-stone-900 border border-stone-700/50 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-700/30">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl text-amber-100 mb-2">Welcome aboard!</h3>
          <p className="text-stone-400 mb-6">Your coffee subscription is active. First delivery coming soon!</p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-700/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-amber-100">Coffee Subscription</h2>
              <p className="text-stone-400 text-sm mt-1">Freshly roasted coffee delivered to your door</p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-5 rounded-xl border text-left transition-all ${
                  selectedPlan === plan.id
                    ? 'border-amber-600 bg-amber-900/10 shadow-lg shadow-amber-900/20'
                    : 'border-stone-700/50 bg-stone-800/30 hover:border-stone-600'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-amber-700 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-amber-100 font-semibold text-lg">{plan.name}</h3>
                <p className="text-amber-400 text-2xl font-bold mt-2">
                  ${plan.price}<span className="text-sm text-stone-400 font-normal">/mo</span>
                </p>
                <p className="text-stone-400 text-sm mt-1">{plan.bags}</p>
                <p className="text-stone-500 text-xs">{plan.frequency}</p>
                <ul className="mt-4 space-y-1.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-stone-300 text-xs">
                      <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <button
            onClick={handleSubscribe}
            disabled={!selectedPlan}
            className="w-full py-3 bg-amber-700 hover:bg-amber-600 disabled:bg-stone-700 disabled:text-stone-500 text-white font-semibold rounded-xl transition-all"
          >
            {selectedPlan ? 'Start Subscription' : 'Select a plan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
