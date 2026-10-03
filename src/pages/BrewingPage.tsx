import React, { useState } from 'react';
import { brewingGuides, BrewingGuide } from '../data/brewingGuides';
import { useNavigate } from 'react-router-dom';

const BrewingPage: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<BrewingGuide | null>(null);
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back to shop</span>
      </button>

      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-3">Brewing Guides</h1>
        <p className="text-stone-400 max-w-2xl">
          Master the art of brewing with our step-by-step guides. From pour-over to cold brew, 
          discover the perfect method for your favorite coffee.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {brewingGuides.map((guide) => (
          <button
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
              selectedGuide?.id === guide.id
                ? 'border-amber-600 bg-amber-900/10 shadow-lg shadow-amber-900/20'
                : 'border-stone-700/50 bg-stone-800/30 hover:border-amber-700/50 hover:bg-stone-800/50'
            }`}
          >
            <span className="text-3xl mb-3 block">{guide.icon}</span>
            <h3 className="text-amber-100 font-semibold text-lg mb-1">{guide.title}</h3>
            <p className="text-stone-400 text-sm mb-3">{guide.method}</p>
            <div className="flex items-center gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {guide.time}
              </span>
              <span className={`px-2 py-0.5 rounded-full ${
                guide.difficulty === 'Beginner' ? 'bg-green-900/30 text-green-400' :
                guide.difficulty === 'Intermediate' ? 'bg-amber-900/30 text-amber-400' :
                'bg-red-900/30 text-red-400'
              }`}>
                {guide.difficulty}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Guide Detail */}
      {selectedGuide && (
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 sm:p-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{selectedGuide.icon}</span>
            <div>
              <h2 className="font-serif text-2xl text-amber-100">{selectedGuide.title}</h2>
              <p className="text-stone-400 text-sm">{selectedGuide.method}</p>
            </div>
          </div>

          <p className="text-stone-300 mb-6 leading-relaxed">{selectedGuide.description}</p>

          {/* Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3 bg-stone-800/50 rounded-xl border border-stone-700/30">
              <p className="text-stone-500 text-xs uppercase tracking-wider mb-1">Ratio</p>
              <p className="text-amber-200 text-sm font-medium">{selectedGuide.ratio}</p>
            </div>
            <div className="p-3 bg-stone-800/50 rounded-xl border border-stone-700/30">
              <p className="text-stone-500 text-xs uppercase tracking-wider mb-1">Grind Size</p>
              <p className="text-amber-200 text-sm font-medium">{selectedGuide.grindSize}</p>
            </div>
            <div className="p-3 bg-stone-800/50 rounded-xl border border-stone-700/30">
              <p className="text-stone-500 text-xs uppercase tracking-wider mb-1">Water Temp</p>
              <p className="text-amber-200 text-sm font-medium">{selectedGuide.waterTemp}</p>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-6">
            <h3 className="text-amber-200 font-medium text-sm uppercase tracking-wider mb-3">Steps</h3>
            <ol className="space-y-3">
              {selectedGuide.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center text-xs text-white font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-stone-300 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-amber-200 font-medium text-sm uppercase tracking-wider mb-3">Pro Tips</h3>
            <ul className="space-y-2">
              {selectedGuide.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-400 text-sm">
                  <span className="text-amber-500 mt-0.5">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrewingPage;
