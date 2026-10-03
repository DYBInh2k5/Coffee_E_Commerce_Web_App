import React from 'react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface ProductComparisonProps {
  products: Product[];
  onClose: () => void;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ products, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useApp();

  if (products.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-700/50 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl text-amber-100">So sánh sản phẩm</h2>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square rounded-lg object-cover mb-3 cursor-pointer"
                  onClick={() => {
                    onClose();
                    navigate(`/product/${product.id}`);
                  }}
                />
                <h3 className="text-amber-100 font-medium mb-2">{product.name}</h3>
                <p className="text-amber-400 text-xl font-bold mb-3">${product.price.toFixed(2)}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Nguồn gốc:</span>
                    <span className="text-amber-100">{product.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Độ rang:</span>
                    <span className="text-amber-100">{product.roast}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Trọng lượng:</span>
                    <span className="text-amber-100">{product.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Đánh giá:</span>
                    <span className="text-amber-400">★ {product.rating}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-1">Hương vị:</span>
                    <div className="flex flex-wrap gap-1">
                      {product.notes.map(note => (
                        <span key={note} className="px-2 py-0.5 bg-stone-700/50 text-stone-300 text-xs rounded-full">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="w-full mt-4 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors text-sm"
                >
                  Thêm vào giỏ
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
