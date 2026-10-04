import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount, wishlist } = useApp();

  if (!user) {
    navigate('/login');
    return null;
  }

  const stats = [
    { label: 'Đơn hàng', value: user.orderHistory.length, icon: '📦' },
    { label: 'Điểm thưởng', value: user.loyaltyPoints, icon: '⭐' },
    { label: 'Giỏ hàng', value: cartCount, icon: '🛒' },
    { label: 'Yêu thích', value: wishlist.length, icon: '❤️' },
  ];

  const quickActions = [
    { label: 'Đơn hàng của tôi', icon: '📦', path: '/orders', desc: 'Theo dõi đơn hàng' },
    { label: 'Địa chỉ giao hàng', icon: '📍', path: '/addresses', desc: 'Quản lý địa chỉ' },
    { label: 'Điểm thưởng', icon: '⭐', path: '/rewards', desc: 'Xem điểm và đổi quà' },
    { label: 'Danh sách yêu thích', icon: '❤️', path: '/wishlist', desc: 'Sản phẩm đã lưu' },
    { label: 'Nhật ký nếm thử', icon: '📝', path: '/journal', desc: 'Ghi chú cà phê' },
    { label: 'Giới thiệu bạn bè', icon: '🎯', path: '/referral', desc: 'Nhận điểm thưởng' },
    { label: 'Coffee Club', icon: '☕', path: '/club', desc: 'Sự kiện & cộng đồng' },
    { label: 'Hỗ trợ', icon: '🎫', path: '/tickets', desc: 'Tạo ticket hỗ trợ' },
    { label: 'Thẻ quà tặng', icon: '🎁', path: '/gift-cards', desc: 'Mua và quản lý' },
    { label: 'Cài đặt tài khoản', icon: '⚙️', path: '/settings', desc: 'Cập nhật thông tin' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-3xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-amber-100">
              Xin chào, {user.name}!
            </h1>
            <p className="text-stone-400 text-sm">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl border border-stone-700 transition-colors text-sm"
        >
          Đăng xuất
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-4 text-center">
            <span className="text-3xl mb-2 block">{stat.icon}</span>
            <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
            <p className="text-stone-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="font-serif text-xl text-amber-100 mb-4">Thao tác nhanh</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="group p-5 bg-stone-800/30 border border-stone-700/30 rounded-xl text-left hover:border-amber-700/50 hover:bg-stone-800/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{action.icon}</span>
              <div>
                <h3 className="text-amber-100 font-medium group-hover:text-amber-300 transition-colors">
                  {action.label}
                </h3>
                <p className="text-stone-500 text-sm mt-1">{action.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6">
        <h2 className="font-serif text-xl text-amber-100 mb-4">Hoạt động gần đây</h2>
        {user.orderHistory.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-3 block">📦</span>
            <p className="text-stone-400 mb-4">Chưa có đơn hàng nào</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
            >
              Bắt đầu mua sắm
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {user.orderHistory.slice(0, 3).map((orderId, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-stone-800/50 rounded-lg">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Đơn hàng #{orderId}</p>
                  <p className="text-stone-500 text-xs">Đang xử lý</p>
                </div>
                <button className="text-amber-400 hover:text-amber-300 text-sm transition-colors">
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
