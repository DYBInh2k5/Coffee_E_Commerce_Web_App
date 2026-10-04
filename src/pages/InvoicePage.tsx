import React from 'react';
import { useNavigate } from 'react-router-dom';

const InvoicePage: React.FC = () => {
  const navigate = useNavigate();

  // Mock invoice data
  const invoice = {
    id: 'INV-2026-001',
    date: '2026-01-20',
    dueDate: '2026-01-20',
    customer: {
      name: 'Nguyễn Văn A',
      email: 'customer@example.com',
      address: '123 Đường ABC, Quận 1, TP.HCM',
    },
    items: [
      { name: 'Ethiopian Yirgacheffe', quantity: 2, price: 18.50, total: 37.00 },
      { name: 'Morning Ritual Blend', quantity: 1, price: 14.50, total: 14.50 },
    ],
    subtotal: 51.50,
    shipping: 0,
    discount: 5.15,
    total: 46.35,
    paymentMethod: 'Visa **** 4242',
    status: 'paid',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Quay lại</span>
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          In hóa đơn
        </button>
      </div>

      {/* Invoice */}
      <div className="bg-white text-stone-900 rounded-2xl p-8 sm:p-12 print:shadow-none shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-amber-600">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">☕</span>
              <h1 className="text-2xl font-bold text-amber-800">Ember & Bloom</h1>
            </div>
            <p className="text-sm text-stone-600">Specialty Coffee Roasters</p>
            <p className="text-sm text-stone-600">123 Coffee Lane, Portland, OR</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-amber-800 mb-2">HÓA ĐƠN</h2>
            <p className="text-sm text-stone-600">#{invoice.id}</p>
            <p className="text-sm text-stone-600">Ngày: {invoice.date}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-stone-700 mb-2">KHÁCH HÀNG</h3>
          <p className="text-stone-900 font-medium">{invoice.customer.name}</p>
          <p className="text-sm text-stone-600">{invoice.customer.email}</p>
          <p className="text-sm text-stone-600">{invoice.customer.address}</p>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-stone-300">
              <th className="text-left py-2 text-sm font-semibold text-stone-700">Sản phẩm</th>
              <th className="text-center py-2 text-sm font-semibold text-stone-700">SL</th>
              <th className="text-right py-2 text-sm font-semibold text-stone-700">Đơn giá</th>
              <th className="text-right py-2 text-sm font-semibold text-stone-700">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b border-stone-200">
                <td className="py-3 text-stone-900">{item.name}</td>
                <td className="py-3 text-center text-stone-700">{item.quantity}</td>
                <td className="py-3 text-right text-stone-700">${item.price.toFixed(2)}</td>
                <td className="py-3 text-right text-stone-900 font-medium">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Tạm tính:</span>
              <span className="text-stone-900">${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Phí vận chuyển:</span>
              <span className="text-green-600">Miễn phí</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Giảm giá (10%):</span>
              <span className="text-red-600">-${invoice.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-stone-300">
              <span className="text-stone-900">Tổng cộng:</span>
              <span className="text-amber-800">${invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-8 p-4 bg-stone-100 rounded-lg">
          <h3 className="text-sm font-semibold text-stone-700 mb-2">THÔNG TIN THANH TOÁN</h3>
          <p className="text-sm text-stone-600">Phương thức: {invoice.paymentMethod}</p>
          <p className="text-sm text-stone-600">Trạng thái: <span className="text-green-600 font-medium">Đã thanh toán</span></p>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-stone-300">
          <p className="text-sm text-stone-600 mb-2">Cảm ơn bạn đã mua hàng!</p>
          <p className="text-xs text-stone-500">Mọi thắc mắc xin liên hệ: support@emberandbloom.com</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
