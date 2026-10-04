import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import ToastContainer from './components/Toast';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import BrewingPage from './pages/BrewingPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import LoyaltyPointsPage from './pages/LoyaltyPointsPage';
import GiftCardsPage from './pages/GiftCardsPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddressesPage from './pages/AddressesPage';
import WishlistPage from './pages/WishlistPage';
import SettingsPage from './pages/SettingsPage';
import ReferralProgramPage from './pages/ReferralProgramPage';
import TastingJournalPage from './pages/TastingJournalPage';
import CoffeeClubPage from './pages/CoffeeClubPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ReturnRefundPage from './pages/ReturnRefundPage';
import InvoicePage from './pages/InvoicePage';
import WholesalePortalPage from './pages/WholesalePortalPage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import EmailTemplatesPage from './pages/EmailTemplatesPage';
import SupportTicketsPage from './pages/SupportTicketsPage';
import LiveChat from './components/LiveChat';
import AbandonedCartReminder from './components/AbandonedCartReminder';

const AppContent: React.FC = () => {
  const { cartCount, theme } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Sync search to URL params for HomePage
  const updateSearch = (q: string) => {
    setSearchQuery(q);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const showHeader = location.pathname !== '/checkout';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-stone-900 text-amber-100' : 'bg-stone-50 text-stone-900'
    }`}>
      {showHeader && (
        <Header
          cartCount={cartCount}
          onCartClick={() => navigate('/cart')}
          onLogoClick={() => navigate('/')}
          searchQuery={searchQuery}
          onSearchChange={updateSearch}
        />
      )}

      {/* Nav Links */}
      {showHeader && (
        <nav className="border-b border-stone-800/50 bg-stone-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 h-10 overflow-x-auto">
              <NavLink to="/" label="Shop" />
              <NavLink to="/brewing" label="Brewing Guides" />
              <NavLink to="/about" label="Our Story" />
              <div className="ml-auto flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="animate-fade-in">
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} onSearchChange={setSearchQuery} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/brewing" element={<BrewingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/rewards" element={<LoyaltyPointsPage />} />
          <Route path="/gift-cards" element={<GiftCardsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/referral" element={<ReferralProgramPage />} />
          <Route path="/journal" element={<TastingJournalPage />} />
          <Route path="/club" element={<CoffeeClubPage />} />
          <Route path="/tracking" element={<OrderTrackingPage />} />
          <Route path="/returns" element={<ReturnRefundPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/wholesale" element={<WholesalePortalPage />} />
          <Route path="/analytics" element={<AnalyticsDashboardPage />} />
          <Route path="/emails" element={<EmailTemplatesPage />} />
          <Route path="/tickets" element={<SupportTicketsPage />} />
        </Routes>
      </main>

      {/* Footer */}
      {showHeader && <Footer />}

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Live Chat Widget */}
      <LiveChat />

      {/* Abandoned Cart Reminder */}
      <AbandonedCartReminder />
    </div>
  );
};

const NavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <button
      onClick={() => navigate(to)}
      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
        isActive
          ? 'text-amber-300 bg-amber-900/20'
          : 'text-stone-400 hover:text-amber-300 hover:bg-stone-800/50'
      }`}
    >
      {label}
    </button>
  );
};

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-stone-800 bg-stone-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">☕</span>
              <span className="font-serif text-amber-100 text-lg">Ember & Bloom</span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed">
              Specialty coffee roasters dedicated to bringing you the finest beans from around the world.
            </p>
          </div>
          <div>
            <h4 className="text-amber-200 font-medium text-sm mb-3">Shop</h4>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/')}>All Coffees</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/')}>Single Origin</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/')}>Blends</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/cart')}>Cart</li>
            </ul>
          </div>
          <div>
            <h4 className="text-amber-200 font-medium text-sm mb-3">Learn</h4>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/brewing')}>Brewing Guides</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/about')}>Our Story</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/faq')}>FAQ</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/contact')}>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-amber-200 font-medium text-sm mb-3">Services</h4>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/wholesale')}>Wholesale</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/referral')}>Referral Program</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/club')}>Coffee Club</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => navigate('/returns')}>Returns</li>
            </ul>
          </div>
          <div>
            <h4 className="text-amber-200 font-medium text-sm mb-3">Connect</h4>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Instagram</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Twitter</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Newsletter</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 mt-8 pt-6 text-center">
          <p className="text-stone-600 text-xs">
            © 2026 Ember & Bloom. All rights reserved. Crafted with love and caffeine.
          </p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
