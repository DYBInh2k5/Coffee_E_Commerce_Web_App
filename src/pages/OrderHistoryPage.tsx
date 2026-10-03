import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped';
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

// Simulated order history
const mockOrders: Order[] = [
  {
    id: 'EB-2026-001',
    date: '2026-01-15',
    status: 'delivered',
    items: [
      { name: 'Ethiopian Yirgacheffe', quantity: 2, price: 18.50 },
      { name: 'Morning Ritual Blend', quantity: 1, price: 14.50 },
    ],
    total: 51.50,
  },
  {
    id: 'EB-2026-002',
    date: '2026-01-20',
    status: 'shipped',
    items: [
      { name: 'Kenyan AA Peaberry', quantity: 1, price: 22.00 },
    ],
    total: 22.00,
  },
];

const OrderHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-900/30 text-green-400 border-green-700/30';
      case 'shipped': return 'bg-blue-900/30 text-blue-400 border-blue-700/30';
      case 'processing': return 'bg-amber-900/30 text-amber-400 border-amber-700/30';
      default: return 'bg-stone-800 text-stone-400';
    }
  };

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

      <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-3">Order History</h1>
      <p className="text-stone-400 mb-8">Track your orders and view past purchases.</p>

      {mockOrders.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">📦</span>
          <h2 className="text-xl text-amber-100 mb-2">No orders yet</h2>
          <p className="text-stone-400 mb-6">Start shopping to see your orders here.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
          >
            Browse Coffees
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-amber-100 font-medium">Order #{order.id}</p>
                  <p className="text-stone-500 text-sm">{order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-stone-300">{item.name} × {item.quantity}</span>
                    <span className="text-amber-400">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-700/30">
                <span className="text-stone-400 text-sm">Total</span>
                <span className="text-amber-400 font-bold text-lg">${order.total.toFixed(2)}</span>
              </div>

              {order.status === 'delivered' && (
                <button className="mt-4 w-full py-2 bg-stone-800 hover:bg-stone-700 text-amber-200 text-sm font-medium rounded-xl border border-stone-700 transition-colors">
                  Reorder
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
