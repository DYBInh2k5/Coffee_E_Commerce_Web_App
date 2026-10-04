import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const EmailTemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const templates = [
    {
      name: 'Chào mừng thành viên mới',
      subject: 'Chào mừng bạn đến với Ember & Bloom!',
      preview: 'Cảm ơn bạn đã đăng ký. Đây là mã giảm giá 10% cho đơn hàng đầu tiên...',
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #92400e;">Chào mừng đến với Ember & Bloom!</h1>
          <p>Xin chào [Tên khách hàng],</p>
          <p>Cảm ơn bạn đã đăng ký nhận tin từ Ember & Bloom. Chúng tôi rất vui được đồng hành cùng bạn trong hành trình khám phá cà phê đặc sản.</p>
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Mã giảm giá 10% cho đơn hàng đầu tiên:</strong></p>
            <p style="font-size: 24px; color: #92400e; margin: 10px 0;"><strong>WELCOME10</strong></p>
          </div>
          <p>Hãy khám phá bộ sưu tập cà phê đặc sản của chúng tôi và tìm ra hương vị yêu thích của bạn.</p>
          <a href="#" style="display: inline-block; background: #b45309; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px;">Mua sắm ngay</a>
        </div>
      `,
    },
    {
      name: 'Đơn hàng đã giao',
      subject: 'Đơn hàng #EB-2026-001 đã được giao thành công',
      preview: 'Đơn hàng của bạn đã được giao. Hãy đánh giá trải nghiệm...',
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #92400e;">Đơn hàng đã giao thành công!</h1>
          <p>Xin chào [Tên khách hàng],</p>
          <p>Đơn hàng <strong>#EB-2026-001</strong> của bạn đã được giao thành công.</p>
          <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #065f46;"><strong>✓ Đã giao hàng</strong></p>
          </div>
          <p>Chúng tôi hy vọng bạn sẽ thích cà phê của mình. Hãy dành vài phút để đánh giá trải nghiệm:</p>
          <a href="#" style="display: inline-block; background: #b45309; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px;">Đánh giá ngay</a>
        </div>
      `,
    },
    {
      name: 'Giỏ hàng bị bỏ quên',
      subject: 'Giỏ hàng của bạn đang chờ!',
      preview: 'Bạn vẫn còn sản phẩm trong giỏ hàng. Hoàn tất đơn hàng ngay...',
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #92400e;">Giỏ hàng của bạn đang chờ!</h1>
          <p>Xin chào [Tên khách hàng],</p>
          <p>Chúng tôi nhận thấy bạn vẫn còn sản phẩm trong giỏ hàng. Đừng bỏ lỡ cơ hội thưởng thức cà phê đặc sản!</p>
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Ưu đãi đặc biệt:</strong> Miễn phí vận chuyển cho đơn hàng hoàn tất trong 24h tới!</p>
          </div>
          <a href="#" style="display: inline-block; background: #b45309; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px;">Hoàn tất đơn hàng</a>
        </div>
      `,
    },
    {
      name: 'Khuyến mãi đặc biệt',
      subject: '🎉 Flash Sale: Giảm 25% toàn bộ cửa hàng!',
      preview: 'Chỉ trong 48 giờ! Giảm 25% cho tất cả cà phê...',
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #92400e;">🎉 Flash Sale: Giảm 25%!</h1>
          <p>Xin chào [Tên khách hàng],</p>
          <p>Chỉ trong <strong>48 giờ</strong>, giảm 25% cho toàn bộ cà phê tại Ember & Bloom!</p>
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="font-size: 36px; color: #92400e; margin: 0;"><strong>25% OFF</strong></p>
            <p style="margin: 10px 0 0 0;">Mã: <strong>FLASH25</strong></p>
          </div>
          <p>Đừng bỏ lỡ cơ hội thưởng thức cà phê đặc sản với giá ưu đãi!</p>
          <a href="#" style="display: inline-block; background: #b45309; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px;">Mua sắm ngay</a>
        </div>
      `,
    },
  ];

  const handleSend = () => {
    showToast('Email đã được gửi thành công!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Quay lại Dashboard</span>
      </button>

      <h1 className="font-serif text-3xl text-amber-100 mb-2">Email Templates</h1>
      <p className="text-stone-400 mb-8">Quản lý và gửi email marketing</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-amber-200 font-medium mb-3">Mẫu email</h2>
          {templates.map((template, index) => (
            <button
              key={index}
              onClick={() => setSelectedTemplate(index)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                selectedTemplate === index
                  ? 'bg-amber-900/10 border-amber-700/30 border'
                  : 'bg-stone-800/30 border-stone-700/30 border hover:border-stone-600'
              }`}
            >
              <h3 className="text-amber-100 font-medium text-sm mb-1">{template.name}</h3>
              <p className="text-stone-400 text-xs line-clamp-2">{template.preview}</p>
            </button>
          ))}
        </div>

        {/* Email Preview */}
        <div className="lg:col-span-2">
          <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-amber-200 font-medium">Xem trước email</h2>
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Gửi test
              </button>
            </div>

            {/* Email Header */}
            <div className="bg-stone-900 rounded-xl p-4 mb-4 space-y-2">
              <div className="flex gap-2">
                <span className="text-stone-400 text-sm min-w-[60px]">Từ:</span>
                <span className="text-amber-100 text-sm">hello@emberandbloom.com</span>
              </div>
              <div className="flex gap-2">
                <span className="text-stone-400 text-sm min-w-[60px]">Đến:</span>
                <span className="text-amber-100 text-sm">[customer@email.com]</span>
              </div>
              <div className="flex gap-2">
                <span className="text-stone-400 text-sm min-w-[60px]">Chủ đề:</span>
                <span className="text-amber-100 text-sm font-medium">{templates[selectedTemplate].subject}</span>
              </div>
            </div>

            {/* Email Content */}
            <div className="bg-white rounded-xl p-6 overflow-auto max-h-[500px]">
              <div dangerouslySetInnerHTML={{ __html: templates[selectedTemplate].content }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatesPage;
