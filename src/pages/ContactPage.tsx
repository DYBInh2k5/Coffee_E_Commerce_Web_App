import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message sent! We\'ll get back to you within 24 hours.', 'success');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-700/30">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl text-amber-100 mb-2">Message Sent!</h2>
        <p className="text-stone-400 mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
        >
          Back to Shop
        </button>
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

      <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-3">Get in Touch</h1>
      <p className="text-stone-400 mb-8">Have a question? We'd love to hear from you.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <div className="p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📧</span>
              <h3 className="text-amber-200 font-medium">Email</h3>
            </div>
            <p className="text-stone-400 text-sm">hello@emberandbloom.com</p>
            <p className="text-stone-500 text-xs mt-1">We reply within 24 hours</p>
          </div>
          <div className="p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">📍</span>
              <h3 className="text-amber-200 font-medium">Roastery</h3>
            </div>
            <p className="text-stone-400 text-sm">123 Coffee Lane<br />Portland, OR 97201</p>
          </div>
          <div className="p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🕐</span>
              <h3 className="text-amber-200 font-medium">Hours</h3>
            </div>
            <p className="text-stone-400 text-sm">Mon-Fri: 7am - 6pm<br />Sat-Sun: 8am - 4pm</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
          <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-stone-400 text-sm mb-1 block">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-stone-400 text-sm mb-1 block">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
              >
                <option value="">Select a topic</option>
                <option value="order">Order Question</option>
                <option value="product">Product Inquiry</option>
                <option value="subscription">Subscription</option>
                <option value="wholesale">Wholesale</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all resize-none"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
