import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { showToast } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          showToast('Đăng nhập thành công!', 'success');
          navigate('/dashboard');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          showToast('Mật khẩu không khớp', 'error');
          setLoading(false);
          return;
        }
        const success = await register(formData.name, formData.email, formData.password);
        if (success) {
          showToast('Đăng ký thành công!', 'success');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      showToast('Đã xảy ra lỗi', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">☕</span>
          <h1 className="font-serif text-3xl text-amber-100 mb-2">
            {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản'}
          </h1>
          <p className="text-stone-400">
            {isLogin ? 'Đăng nhập để tiếp tục mua sắm' : 'Tham gia cộng đồng Ember & Bloom'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Họ tên</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                placeholder="Nguyễn Văn A"
              />
            </div>
          )}

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

          <div>
            <label className="text-stone-400 text-sm mb-1 block">Mật khẩu</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Xác nhận mật khẩu</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-700 hover:bg-amber-600 disabled:bg-stone-700 disabled:text-stone-500 text-white font-semibold rounded-xl transition-all"
          >
            {loading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
            >
              {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
            </button>
          </div>
        </form>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-stone-400 hover:text-stone-300 text-sm transition-colors"
        >
          ← Quay lại cửa hàng
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
