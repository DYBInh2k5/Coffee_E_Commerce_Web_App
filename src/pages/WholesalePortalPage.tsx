import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const WholesalePortalPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    monthlyVolume: '',
    message: '',
  });

  const benefits = [
    { icon: '💰', title: 'Giá sỉ ưu đãi', desc: 'Giảm 20-40% so với giá lẻ' },
    { icon: '🚚', title: 'Giao hàng miễn phí', desc: 'Cho đơn từ 50kg' },
    { icon: '🎨', title: 'White Label', desc: 'Đóng gói theo thương hiệu của bạn' },
    { icon: '📞', title: 'Hỗ trợ riêng', desc: 'Account manager chuyên biệt' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Đăng ký thành công! Chúng tôi sẽ liên hệ trong 24h.', 'success');
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Quay lại cửa hàng</span>
      </button>

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-amber-100 mb-4">Chương trình Đại lý</h1>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto">
          Hợp tác cùng Ember & Bloom để mang cà phê đặc sản đến khách hàng của bạn
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-4 text-center">
            <span className="text-3xl mb-2 block">{benefit.icon}</span>
            <h3 className="text-amber-100 font-medium text-sm mb-1">{benefit.title}</h3>
            <p className="text-stone-500 text-xs">{benefit.desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing Tiers */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl text-amber-100 mb-6 text-center">Bảng giá sỉ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6">
            <h3 className="text-amber-100 font-semibold text-lg mb-2">Silver</h3>
            <p className="text-amber-400 text-3xl font-bold mb-4">-20%</p>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>✓ Đơn tối thiểu 10kg/tháng</li>
              <li>✓ Giao hàng miễn phí</li>
              <li>✓ Hỗ trợ qua email</li>
            </ul>
          </div>
          <div className="bg-amber-900/10 border border-amber-700/30 rounded-2xl p-6 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-700 text-white text-xs font-medium rounded-full">
              Phổ biến
            </span>
            <h3 className="text-amber-100 font-semibold text-lg mb-2">Gold</h3>
            <p className="text-amber-400 text-3xl font-bold mb-4">-30%</p>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>✓ Đơn tối thiểu 30kg/tháng</li>
              <li>✓ Giao hàng miễn phí</li>
              <li>✓ Account manager</li>
              <li>✓ White Label option</li>
            </ul>
          </div>
          <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6">
            <h3 className="text-amber-100 font-semibold text-lg mb-2">Platinum</h3>
            <p className="text-amber-400 text-3xl font-bold mb-4">-40%</p>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>✓ Đơn tối thiểu 100kg/tháng</li>
              <li>✓ Giao hàng miễn phí</li>
              <li>✓ Account manager riêng</li>
              <li>✓ White Label + Custom blend</li>
              <li>✓ Đào tạo barista</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 sm:p-8">
        <h2 className="font-serif text-2xl text-amber-100 mb-6 text-center">Đăng ký đại lý</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Tên doanh nghiệp</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Người liên hệ</label>
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Số điện thoại</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Loại hình kinh doanh</label>
              <select
                required
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-600 transition-all"
              >
                <option value="">Chọn loại hình</option>
                <option value="cafe">Quán cà phê</option>
                <option value="restaurant">Nhà hàng</option>
                <option value="hotel">Khách sạn</option>
                <option value="retail">Cửa hàng bán lẻ</option>
                <option value="office">Văn phòng</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Sản lượng dự kiến (kg/tháng)</label>
              <select
                required
                value={formData.monthlyVolume}
                onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-600 transition-all"
              >
                <option value="">Chọn sản lượng</option>
                <option value="10-30">10-30 kg</option>
                <option value="30-100">30-100 kg</option>
                <option value="100+">Trên 100 kg</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-stone-400 text-sm mb-1 block">Ghi chú thêm</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              placeholder="Thông tin bổ sung về nhu cầu của bạn..."
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
          >
            Gửi đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default WholesalePortalPage;
