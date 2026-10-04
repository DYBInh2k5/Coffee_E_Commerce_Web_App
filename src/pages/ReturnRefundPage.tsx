import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ReturnRefundPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    orderId: '',
    reason: '',
    description: '',
    refundMethod: 'original',
  });

  const reasons = [
    { value: 'damaged', label: 'Sản phẩm bị hư hỏng' },
    { value: 'wrong', label: 'Nhận sai sản phẩm' },
    { value: 'quality', label: 'Chất lượng không như mô tả' },
    { value: 'late', label: 'Giao hàng quá trễ' },
    { value: 'other', label: 'Lý do khác' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      showToast('Yêu cầu đổi trả đã được gửi thành công!', 'success');
      navigate('/orders');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Quay lại đơn hàng</span>
      </button>

      <h1 className="font-serif text-3xl text-amber-100 mb-2">Yêu cầu đổi trả</h1>
      <p className="text-stone-400 mb-8">Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày</p>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                s <= step ? 'bg-amber-700 text-white' : 'bg-stone-700 text-stone-500'
              }`}>
                {s}
              </div>
              <span className={`text-sm hidden sm:block ${s <= step ? 'text-amber-100' : 'text-stone-500'}`}>
                {s === 1 ? 'Thông tin' : s === 2 ? 'Lý do' : 'Xác nhận'}
              </span>
            </div>
            {s < 3 && (
              <div className={`flex-1 h-0.5 mx-2 ${s < step ? 'bg-amber-700' : 'bg-stone-700'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Order Info */}
        {step === 1 && (
          <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 space-y-4 animate-fade-in">
            <h2 className="text-amber-200 font-medium mb-4">Thông tin đơn hàng</h2>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Mã đơn hàng</label>
              <input
                type="text"
                required
                value={formData.orderId}
                onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                placeholder="VD: EB-2026-001"
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
            >
              Tiếp tục
            </button>
          </div>
        )}

        {/* Step 2: Reason */}
        {step === 2 && (
          <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 space-y-4 animate-fade-in">
            <h2 className="text-amber-200 font-medium mb-4">Lý do đổi trả</h2>
            <div>
              <label className="text-stone-400 text-sm mb-2 block">Chọn lý do</label>
              <div className="space-y-2">
                {reasons.map((reason) => (
                  <label key={reason.value} className="flex items-center gap-3 p-3 bg-stone-800/50 rounded-xl cursor-pointer hover:bg-stone-800 transition-colors">
                    <input
                      type="radio"
                      name="reason"
                      value={reason.value}
                      checked={formData.reason === reason.value}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="w-4 h-4 text-amber-600"
                    />
                    <span className="text-amber-100 text-sm">{reason.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Mô tả chi tiết</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Vui lòng mô tả vấn đề bạn gặp phải..."
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium rounded-xl border border-stone-700 transition-colors"
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 space-y-4 animate-fade-in">
            <h2 className="text-amber-200 font-medium mb-4">Xác nhận yêu cầu</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-stone-400">Mã đơn hàng:</span>
                <span className="text-amber-100 font-mono">{formData.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-400">Lý do:</span>
                <span className="text-amber-100">{reasons.find(r => r.value === formData.reason)?.label}</span>
              </div>
              <div>
                <span className="text-stone-400 text-sm block mb-1">Mô tả:</span>
                <p className="text-stone-300 text-sm bg-stone-800/50 p-3 rounded-lg">{formData.description}</p>
              </div>
            </div>
            <div className="bg-amber-900/10 border border-amber-700/30 rounded-xl p-4">
              <p className="text-amber-200 text-sm">
                <strong>Chính sách đổi trả:</strong> Sau khi yêu cầu được duyệt, bạn sẽ nhận được hướng dẫn gửi trả sản phẩm qua email. Hoàn tiền sẽ được xử lý trong 5-7 ngày làm việc.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium rounded-xl border border-stone-700 transition-colors"
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
              >
                Gửi yêu cầu
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReturnRefundPage;
