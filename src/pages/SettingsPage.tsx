import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { showToast, theme, toggleTheme } = useApp();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    showToast('Cập nhật thông tin thành công', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Quay lại Dashboard</span>
      </button>

      <h1 className="font-serif text-3xl text-amber-100 mb-8">Cài đặt tài khoản</h1>

      {/* Profile */}
      <form onSubmit={handleSubmit} className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 mb-6">
        <h2 className="text-amber-200 font-medium mb-4">Thông tin cá nhân</h2>
        <div className="space-y-4">
          <div>
            <label className="text-stone-400 text-sm mb-1 block">Họ tên</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-600 transition-all"
            />
          </div>
          <div>
            <label className="text-stone-400 text-sm mb-1 block">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-600 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>

      {/* Preferences */}
      <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 mb-6">
        <h2 className="text-amber-200 font-medium mb-4">Tùy chọn hiển thị</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 font-medium">Chế độ tối</p>
              <p className="text-stone-500 text-sm">Chuyển đổi giữa giao diện sáng và tối</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-amber-600' : 'bg-stone-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6">
        <h2 className="text-amber-200 font-medium mb-4">Thông báo</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 font-medium">Email khuyến mãi</p>
              <p className="text-stone-500 text-sm">Nhận thông tin về ưu đãi và sản phẩm mới</p>
            </div>
            <button className="relative w-14 h-7 bg-amber-600 rounded-full transition-colors">
              <span className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full translate-x-7 transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 font-medium">Cập nhật đơn hàng</p>
              <p className="text-stone-500 text-sm">Nhận thông báo về trạng thái đơn hàng</p>
            </div>
            <button className="relative w-14 h-7 bg-amber-600 rounded-full transition-colors">
              <span className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full translate-x-7 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
