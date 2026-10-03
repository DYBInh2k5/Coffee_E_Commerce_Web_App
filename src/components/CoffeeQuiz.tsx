import React, { useState } from 'react';
import { products } from '../data/products';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface QuizState {
  step: number;
  answers: Record<string, string>;
  result: Product | null;
  completed: boolean;
}

const CoffeeQuiz: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addToCart } = useApp();
  const navigate = useNavigate();
  const [state, setState] = useState<QuizState>({
    step: 0,
    answers: {},
    result: null,
    completed: false,
  });

  const questions = [
    {
      id: 'roast',
      question: 'How do you like your roast?',
      options: [
        { label: '☀️ Light & Bright', value: 'light', desc: 'Fruity, floral, acidic' },
        { label: '🌤️ Medium Balanced', value: 'medium', desc: 'Smooth, versatile' },
        { label: '🌑 Dark & Bold', value: 'dark', desc: 'Rich, smoky, intense' },
      ],
    },
    {
      id: 'flavor',
      question: 'What flavors excite you?',
      options: [
        { label: '🫐 Fruity & Floral', value: 'fruity', desc: 'Berry, jasmine, citrus' },
        { label: '🍫 Chocolate & Nutty', value: 'chocolate', desc: 'Cocoa, caramel, almond' },
        { label: '🌿 Earthy & Spicy', value: 'earthy', desc: 'Cedar, tobacco, cocoa' },
      ],
    },
    {
      id: 'brew',
      question: 'How do you usually brew?',
      options: [
        { label: '🫖 Pour Over / Drip', value: 'pourover', desc: 'Clean, nuanced cup' },
        { label: '⚡ Espresso / Moka', value: 'espresso', desc: 'Concentrated, intense' },
        { label: '☕ French Press / Any', value: 'immersion', desc: 'Full-bodied, rich' },
      ],
    },
    {
      id: 'budget',
      question: 'What\'s your budget per bag?',
      options: [
        { label: '💰 Under $16', value: 'budget', desc: 'Great value picks' },
        { label: '💰💰 $16-$20', value: 'mid', desc: 'Premium selections' },
        { label: '💰💰💰 $20+', value: 'premium', desc: 'Exclusive micro-lots' },
      ],
    },
  ];

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...state.answers, [questionId]: value };
    const nextStep = state.step + 1;

    if (nextStep >= questions.length) {
      // Calculate result
      const result = calculateResult(newAnswers);
      setState({ step: nextStep, answers: newAnswers, result, completed: true });
    } else {
      setState({ ...state, step: nextStep, answers: newAnswers });
    }
  };

  const calculateResult = (answers: Record<string, string>): Product => {
    let scored = products.map(p => ({ product: p, score: 0 }));

    // Roast preference
    if (answers.roast === 'light') {
      scored = scored.map(s => ({ ...s, score: s.score + (s.product.roast === 'Light' ? 3 : s.product.roast === 'Medium-Light' ? 2 : 0) }));
    } else if (answers.roast === 'medium') {
      scored = scored.map(s => ({ ...s, score: s.score + (s.product.roast === 'Medium' ? 3 : s.product.roast === 'Medium-Light' ? 2 : 0) }));
    } else {
      scored = scored.map(s => ({ ...s, score: s.score + (s.product.roast === 'Dark' ? 3 : 0) }));
    }

    // Flavor preference
    if (answers.flavor === 'fruity') {
      scored = scored.map(s => ({
        ...s,
        score: s.score + s.product.notes.filter((n: string) => ['Blueberry', 'Jasmine', 'Bergamot', 'Blackcurrant', 'Grapefruit', 'Peach', 'Citrus Zest'].includes(n)).length * 2
      }));
    } else if (answers.flavor === 'chocolate') {
      scored = scored.map(s => ({
        ...s,
        score: s.score + s.product.notes.filter((n: string) => ['Caramel', 'Milk Chocolate', 'Dark Chocolate', 'Brown Sugar', 'Toasted Almond', 'Honey'].includes(n)).length * 2
      }));
    } else {
      scored = scored.map(s => ({
        ...s,
        score: s.score + s.product.notes.filter((n: string) => ['Cedar', 'Tobacco', 'Earthy', 'Smoky', 'Dark Cocoa'].includes(n)).length * 2
      }));
    }

    // Budget
    if (answers.budget === 'budget') {
      scored = scored.map(s => ({ ...s, score: s.score + (s.product.price < 16 ? 3 : 0) }));
    } else if (answers.budget === 'mid') {
      scored = scored.map(s => ({ ...s, score: s.score + (s.product.price >= 16 && s.product.price <= 20 ? 3 : 1) }));
    } else {
      scored = scored.map(s => ({ ...s, score: s.score + (s.product.price >= 20 ? 3 : 0) }));
    }

    scored.sort((a, b) => b.score - a.score);
    return scored[0].product;
  };

  if (state.completed && state.result) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-stone-900 border border-stone-700/50 rounded-2xl max-w-lg w-full p-6 sm:p-8 text-center">
          <span className="text-5xl mb-4 block">🎉</span>
          <h2 className="font-serif text-2xl text-amber-100 mb-2">Your Perfect Match!</h2>
          <p className="text-stone-400 text-sm mb-6">Based on your preferences, we recommend:</p>
          
          <div className="bg-stone-800/50 rounded-xl p-4 border border-stone-700/30 mb-6">
            <img src={state.result.image} alt={state.result.name} className="w-32 h-32 rounded-xl object-cover mx-auto mb-3" />
            <h3 className="font-serif text-xl text-amber-100">{state.result.name}</h3>
            <p className="text-stone-400 text-sm mt-1">{state.result.origin} • {state.result.roast} Roast</p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
              {state.result.notes.map(n => (
                <span key={n} className="px-2 py-0.5 bg-stone-700/50 text-stone-300 text-xs rounded-full">{n}</span>
              ))}
            </div>
            <p className="text-amber-400 text-xl font-bold mt-3">${state.result.price.toFixed(2)}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { addToCart(state.result!); onClose(); }}
              className="flex-1 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() => { onClose(); navigate(`/product/${state.result!.id}`); }}
              className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-amber-200 font-medium rounded-xl border border-stone-700 transition-colors"
            >
              View Details
            </button>
          </div>
          <button onClick={onClose} className="mt-4 text-stone-500 hover:text-stone-300 text-sm transition-colors">
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[state.step];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-700/50 rounded-2xl max-w-lg w-full p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl text-amber-100">Find Your Coffee</h2>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-amber-300 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {questions.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= state.step ? 'bg-amber-600' : 'bg-stone-700'}`} />
          ))}
        </div>

        <p className="text-stone-500 text-xs mb-2">Question {state.step + 1} of {questions.length}</p>
        <h3 className="text-amber-100 text-lg font-medium mb-4">{currentQ.question}</h3>

        <div className="space-y-3">
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQ.id, option.value)}
              className="w-full p-4 bg-stone-800/50 border border-stone-700/50 rounded-xl text-left hover:border-amber-600 hover:bg-amber-900/10 transition-all group"
            >
              <p className="text-amber-100 font-medium group-hover:text-amber-300 transition-colors">{option.label}</p>
              <p className="text-stone-500 text-sm mt-0.5">{option.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoffeeQuiz;
