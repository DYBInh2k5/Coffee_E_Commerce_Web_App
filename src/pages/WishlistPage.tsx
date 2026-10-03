import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useApp();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Tiếp tục mua sắm</span>
      </button>

      <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-3">Danh sách yêu thích</h1>
      <p className="text-stone-400 mb-8">{wishlistProducts.length} sản phẩm đã lưu</p>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl mb-4 block">❤️</span>
          <h2 className="text-xl text-amber-100 mb-2">Danh sách trống</h2>
          <p className="text-stone-400 mb-6">Thêm sản phẩm vào danh sách yêu thích để theo dõi</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
          >
            Khám phá cà phê
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="group bg-stone-800/50 border border-stone-700/50 rounded-2xl overflow-hidden hover:border-amber-700/50 transition-all">
              <div
                className="relative overflow-hidden aspect-square cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-stone-900/80 backdrop-blur-sm text-red-400 rounded-full hover:bg-stone-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3
                  className="font-serif text-lg text-amber-100 cursor-pointer hover:text-amber-300 transition-colors"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-stone-400 text-sm mt-1">{product.origin} • {product.roast}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-amber-400 font-bold text-lg">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
