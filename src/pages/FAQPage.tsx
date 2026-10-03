import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Shipping',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping (2-3 days) is available for $7.99. All orders over $35 ship free!',
  },
  {
    category: 'Shipping',
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship within the continental US only. International shipping coming soon!',
  },
  {
    category: 'Coffee',
    question: 'How fresh is your coffee?',
    answer: 'We roast in small batches weekly. Your coffee ships within 2-3 days of roasting, ensuring peak freshness. Check the roast date on every bag!',
  },
  {
    category: 'Coffee',
    question: 'What grind size should I choose?',
    answer: 'We offer whole bean (recommended for freshness), and pre-ground options for drip, espresso, French press, and cold brew. Check our Brewing Guides for detailed recommendations.',
  },
  {
    category: 'Subscription',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Absolutely! No commitments, no cancellation fees. Manage your subscription from your account dashboard or email us.',
  },
  {
    category: 'Subscription',
    question: 'How do subscription discounts work?',
    answer: 'Subscribers get 10-20% off depending on the plan, plus free shipping. Discounts apply automatically to each delivery.',
  },
  {
    category: 'Orders',
    question: 'Can I modify or cancel my order?',
    answer: 'Orders can be modified or cancelled within 1 hour of placing. After that, they enter our fulfillment process. Contact us ASAP if you need changes.',
  },
  {
    category: 'Orders',
    question: 'What if I\'m not satisfied?',
    answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy with your coffee, we\'ll replace it or refund you—no questions asked.',
  },
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back to shop</span>
      </button>

      <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-3">Frequently Asked Questions</h1>
      <p className="text-stone-400 mb-8">Everything you need to know about our coffee and services.</p>

      {/* Categories */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              activeCategory === cat
                ? 'bg-amber-700 text-white'
                : 'bg-stone-800 text-stone-400 hover:text-amber-300 border border-stone-700/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {filtered.map((faq, index) => (
          <div
            key={index}
            className="bg-stone-800/30 border border-stone-700/30 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-800/50 transition-colors"
            >
              <div>
                <span className="text-amber-600 text-xs font-medium uppercase tracking-wider">{faq.category}</span>
                <h3 className="text-amber-100 font-medium mt-1">{faq.question}</h3>
              </div>
              <svg
                className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 animate-fade-in">
                <p className="text-stone-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-10 text-center p-6 bg-stone-800/30 border border-stone-700/30 rounded-2xl">
        <p className="text-stone-400 mb-3">Still have questions?</p>
        <button
          onClick={() => navigate('/contact')}
          className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default FAQPage;
