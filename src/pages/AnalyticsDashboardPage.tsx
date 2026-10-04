import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnalyticsDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock analytics data
  const stats = {
    totalRevenue: 125680,
    totalOrders: 342,
    averageOrderValue: 367.49,
    conversionRate: 3.8,
    topProducts: [
      { name: 'Ethiopian Yirgacheffe', sold: 89, revenue: 1646.50 },
      { name: 'Colombian Supremo', sold: 76, revenue: 1216.00 },
      { name: 'Morning Ritual Blend', sold: 68, revenue: 986.00 },
    ],
    recentOrders: [
      { id: 'EB-001', customer: 'Nguyễn Văn A', total: 51.50, status: 'delivered' },
      { id: 'EB-002', customer: 'Trần Thị B', total: 22.00, status: 'shipped' },
      { id: 'EB-003', customer: 'Lê Văn C', total: 37.00, status: 'processing' },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount * 23000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-amber-100">Analytics Dashboard</h1>
          <p className="text-stone-400 text-sm mt-1">Tổng quan hiệu suất kinh doanh</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl border border-stone-700 transition-colors text-sm"
        >
          Quay lại Dashboard
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-5">
          <p className="text-stone-400 text-sm mb-1">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-amber-400">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-green-400 text-xs mt-2">↑ 12% so với tháng trước</p>
        </div>
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-5">
          <p className="text-stone-400 text-sm mb-1">Tổng đơn hàng</p>
          <p className="text-2xl font-bold text-amber-400">{stats.totalOrders}</p>
          <p className="text-green-400 text-xs mt-2">↑ 8% so với tháng trước</p>
        </div>
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-5">
          <p className="text-stone-400 text-sm mb-1">Giá trị đơn trung bình</p>
          <p className="text-2xl font-bold text-amber-400">${stats.averageOrderValue.toFixed(2)}</p>
          <p className="text-green-400 text-xs mt-2">↑ 5% so với tháng trước</p>
        </div>
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-5">
          <p className="text-stone-400 text-sm mb-1">Tỷ lệ chuyển đổi</p>
          <p className="text-2xl font-bold text-amber-400">{stats.conversionRate}%</p>
          <p className="text-red-400 text-xs mt-2">↓ 0.2% so với tháng trước</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6">
          <h2 className="text-amber-200 font-medium mb-4">Sản phẩm bán chạy</h2>
          <div className="space-y-3">
            {stats.topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-stone-800/50 rounded-xl">
                <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-amber-100 font-medium text-sm">{product.name}</p>
                  <p className="text-stone-400 text-xs">{product.sold} đã bán</p>
                </div>
                <p className="text-amber-400 font-bold">${product.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6">
          <h2 className="text-amber-200 font-medium mb-4">Đơn hàng gần đây</h2>
          <div className="space-y-3">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-stone-800/50 rounded-xl">
                <div>
                  <p className="text-amber-100 font-medium text-sm">#{order.id}</p>
                  <p className="text-stone-400 text-xs">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 font-bold text-sm">${order.total.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-900/30 text-green-400' :
                    order.status === 'shipped' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-amber-900/30 text-amber-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button className="p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl hover:border-amber-700/50 transition-all text-center">
          <span className="text-2xl mb-2 block">📊</span>
          <p className="text-amber-100 text-sm font-medium">Xem báo cáo</p>
        </button>
        <button className="p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl hover:border-amber-700/50 transition-all text-center">
          <span className="text-2xl mb-2 block">📧</span>
          <p className="text-amber-100 text-sm font-medium">Gửi email</p>
        </button>
        <button className="p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl hover:border-amber-700/50 transition-all text-center">
          <span className="text-2xl mb-2 block">🎯</span>
          <p className="text-amber-100 text-sm font-medium">Khuyến mãi</p>
        </button>
        <button className="p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl hover:border-amber-700/50 transition-all text-center">
          <span className="text-2xl mb-2 block">⚙️</span>
          <p className="text-amber-100 text-sm font-medium">Cài đặt</p>
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboardPage;
