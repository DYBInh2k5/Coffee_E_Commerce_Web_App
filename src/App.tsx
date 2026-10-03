import React, { useState, useMemo } from 'react';
import { Product, CartItem } from './types';
import { products, categories } from './data/products';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

type View = 'shop' | 'detail' | 'checkout';

function App() {
  const [view, setView] = useState<View>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedToCartId, setAddedToCartId] = useState<number | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((note) => note.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setAddedToCartId(product.id);
    setTimeout(() => setAddedToCartId(null), 1500);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleBackToShop = () => {
    setView('shop');
    setSelectedProduct(null);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setView('shop');
    window.scrollTo(0, 0);
  };

  // Checkout View
  if (view === 'checkout') {
    return (
      <Checkout
        items={cartItems}
        onBack={() => { setView('shop'); setIsCartOpen(true); }}
        onComplete={handleOrderComplete}
      />
    );
  }

  // Product Detail View
  if (view === 'detail' && selectedProduct) {
    return (
      <>
        <Header
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
          onLogoClick={handleBackToShop}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ProductDetail
          product={selectedProduct}
          onBack={handleBackToShop}
          onAddToCart={addToCart}
        />
        <Cart
          items={cartItems}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={handleCheckout}
        />
      </>
    );
  }

  // Shop View
  return (
    <div className="min-h-screen bg-stone-900">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={handleBackToShop}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-stone-900 to-stone-900" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(217, 119, 6, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(180, 83, 9, 0.2) 0%, transparent 50%)`
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-amber-100 mb-4 leading-tight">
              Crafted with
              <span className="text-amber-400"> passion</span>,
              <br />roasted to perfection.
            </h1>
            <p className="text-stone-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Discover our curated selection of specialty coffees sourced from the world's finest growing regions.
            </p>
            <div className="flex items-center gap-4 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Ethically Sourced</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Freshly Roasted</span>
              </div>
              <div className="flex items-center gap-2 hidden sm:flex">
                <span className="w-2 h-2 bg-amber-600 rounded-full" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/30'
                    : 'bg-stone-800 text-stone-400 hover:text-amber-300 hover:bg-stone-700 border border-stone-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="text-stone-500 text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'coffee' : 'coffees'} found
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-stone-400 text-lg mb-2">No coffees found</p>
            <p className="text-stone-500 text-sm">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  onSelect={handleProductSelect}
                  onAddToCart={addToCart}
                />
                {addedToCartId === product.id && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-green-800/90 backdrop-blur-sm text-green-200 text-xs font-medium rounded-full border border-green-700/50 animate-bounce">
                    ✓ Added to cart
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
              <h4 className="text-amber-200 font-medium text-sm mb-3">Quick Links</h4>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li className="hover:text-amber-400 cursor-pointer transition-colors">Our Story</li>
                <li className="hover:text-amber-400 cursor-pointer transition-colors">Brewing Guides</li>
                <li className="hover:text-amber-400 cursor-pointer transition-colors">Subscription</li>
                <li className="hover:text-amber-400 cursor-pointer transition-colors">Wholesale</li>
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

      {/* Cart Drawer */}
      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;
