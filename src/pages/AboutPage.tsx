import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

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

      <div className="text-center mb-12">
        <span className="text-5xl mb-4 block">☕</span>
        <h1 className="font-serif text-4xl sm:text-5xl text-amber-100 mb-4">Our Story</h1>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto">
          From a small roastery with a big dream to your cup — every bean tells a story.
        </p>
      </div>

      <div className="space-y-12">
        {/* Mission */}
        <section className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-amber-100 mb-4 flex items-center gap-2">
            <span>🌱</span> Our Mission
          </h2>
          <p className="text-stone-300 leading-relaxed">
            At Ember & Bloom, we believe that great coffee is more than a beverage — it's a connection. 
            A connection to the farmers who nurture each cherry, to the traditions of roasting passed down 
            through generations, and to the moments of joy each cup brings to your day.
          </p>
          <p className="text-stone-300 leading-relaxed mt-3">
            We partner directly with smallholder farmers across Ethiopia, Colombia, Kenya, Indonesia, 
            and Central America, ensuring fair prices and sustainable practices that benefit both 
            the land and the communities who call it home.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="font-serif text-2xl text-amber-100 mb-6 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-stone-800/30 border border-stone-700/30 rounded-xl text-center">
              <span className="text-3xl mb-3 block">🤝</span>
              <h3 className="text-amber-200 font-medium mb-2">Direct Trade</h3>
              <p className="text-stone-400 text-sm">We buy directly from farmers, ensuring they receive fair compensation for their exceptional work.</p>
            </div>
            <div className="p-5 bg-stone-800/30 border border-stone-700/30 rounded-xl text-center">
              <span className="text-3xl mb-3 block">🔥</span>
              <h3 className="text-amber-200 font-medium mb-2">Small Batch</h3>
              <p className="text-stone-400 text-sm">Every batch is roasted by hand in small quantities to ensure peak freshness and flavor development.</p>
            </div>
            <div className="p-5 bg-stone-800/30 border border-stone-700/30 rounded-xl text-center">
              <span className="text-3xl mb-3 block">🌍</span>
              <h3 className="text-amber-200 font-medium mb-2">Sustainability</h3>
              <p className="text-stone-400 text-sm">From compostable packaging to carbon-neutral shipping, we're committed to reducing our footprint.</p>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-amber-100 mb-4 flex items-center gap-2">
            <span>📖</span> Our Journey
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-16 text-right">
                <span className="text-amber-400 font-bold">2019</span>
              </div>
              <div className="border-l-2 border-amber-700/30 pl-4">
                <h4 className="text-amber-200 font-medium">The Spark</h4>
                <p className="text-stone-400 text-sm mt-1">Started in a garage with a second-hand roaster and a passion for exceptional coffee.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right">
                <span className="text-amber-400 font-bold">2021</span>
              </div>
              <div className="border-l-2 border-amber-700/30 pl-4">
                <h4 className="text-amber-200 font-medium">First Origins</h4>
                <p className="text-stone-400 text-sm mt-1">Established direct relationships with farmers in Ethiopia and Colombia.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right">
                <span className="text-amber-400 font-bold">2023</span>
              </div>
              <div className="border-l-2 border-amber-700/30 pl-4">
                <h4 className="text-amber-200 font-medium">The Roastery</h4>
                <p className="text-stone-400 text-sm mt-1">Moved into our dedicated roastery space with state-of-the-art equipment.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right">
                <span className="text-amber-400 font-bold">2026</span>
              </div>
              <div className="border-l-2 border-amber-700/30 pl-4">
                <h4 className="text-amber-200 font-medium">Going Online</h4>
                <p className="text-stone-400 text-sm mt-1">Launched our online store to share our passion with coffee lovers everywhere.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="text-center">
          <h2 className="font-serif text-2xl text-amber-100 mb-6">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="w-20 h-20 bg-amber-900/30 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                👨‍🍳
              </div>
              <h4 className="text-amber-100 font-medium">Alex Chen</h4>
              <p className="text-stone-500 text-sm">Head Roaster & Founder</p>
            </div>
            <div className="p-4">
              <div className="w-20 h-20 bg-amber-900/30 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                👩‍💼
              </div>
              <h4 className="text-amber-100 font-medium">Maria Santos</h4>
              <p className="text-stone-500 text-sm">Green Buyer & QC</p>
            </div>
            <div className="p-4">
              <div className="w-20 h-20 bg-amber-900/30 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                👨‍🔬
              </div>
              <h4 className="text-amber-100 font-medium">James Okafor</h4>
              <p className="text-stone-500 text-sm">Brew Specialist</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
