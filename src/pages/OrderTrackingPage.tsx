import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TrackingStep {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

const OrderTrackingPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock tracking data
  const order = {
    id: 'EB-2026-002',
    date: '2026-01-20',
    estimatedDelivery: '2026-01-25',
    carrier: 'Giao hàng nhanh',
    trackingNumber: 'VN123456789',
    items: [
      { name: 'Kenyan AA Peaberry', quantity: 1, price: 22.00 },
    ],
    total: 22.00,
    status: 'shipped',
  };

  const trackingSteps: TrackingStep[] = [
    {
      status: 'Đơn hàng đã được xác nhận',
      location: 'Ember & Bloom Roastery',
      timestamp: '20/01/2026 - 10:30',
      completed: true,
    },
    {
      status: 'Đang đóng gói',
      location: 'Kho hàng Portland',
      timestamp: '20/01/2026 - 14:15',
      completed: true,
    },
    {
      status: 'Đã giao cho đơn vị vận chuyển',
      location: 'Kho hàng Portland',
      timestamp: '21/01/2026 - 09:00',
      completed: true,
    },
    {
      status: 'Đang vận chuyển',
      location: 'Trung tâm phân phối Hà Nội',
      timestamp: '22/01/2026 - 16:45',
      completed: true,
      current: true,
    },
    {
      status: 'Đang giao hàng',
      location: 'Đang trên đường giao',
      timestamp: 'Dự kiến: 25/01/2026',
      completed: false,
    },
    {
      status: 'Đã giao hàng',
      location: 'Địa chỉ người nhận',
      timestamp: '',
      completed: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Quay lại đơn hàng</span>
      </button>

      <h1 className="font-serif text-3xl text-amber-100 mb-2">Theo dõi đơn hàng</h1>
      <p className="text-stone-400 mb-8">Đơn hàng #{order.id}</p>

      {/* Order Info */}
      <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-stone-400 text-sm">Trạng thái</p>
            <p className="text-amber-400 font-semibold text-lg">Đang vận chuyển</p>
          </div>
          <div className="text-right">
            <p className="text-stone-400 text-sm">Dự kiến giao</p>
            <p className="text-amber-100 font-medium">{order.estimatedDelivery}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-stone-400">Đơn vị vận chuyển</p>
            <p className="text-amber-100">{order.carrier}</p>
          </div>
          <div>
            <p className="text-stone-400">Mã vận đơn</p>
            <p className="text-amber-100 font-mono">{order.trackingNumber}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-stone-400 text-sm">Tiến độ giao hàng</span>
          <span className="text-amber-400 font-medium">67%</span>
        </div>
        <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all" style={{ width: '67%' }} />
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6">
        <h2 className="text-amber-200 font-medium mb-6">Lịch sử đơn hàng</h2>
        <div className="space-y-0">
          {trackingSteps.map((step, index) => (
            <div key={index} className="flex gap-4 relative">
              {/* Timeline line */}
              {index < trackingSteps.length - 1 && (
                <div className={`absolute left-[15px] top-[32px] w-0.5 h-full ${
                  step.completed ? 'bg-amber-600' : 'bg-stone-700'
                }`} />
              )}
              
              {/* Icon */}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.completed
                  ? step.current
                    ? 'bg-amber-600 ring-4 ring-amber-600/20'
                    : 'bg-amber-700'
                  : 'bg-stone-700'
              }`}>
                {step.completed ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 bg-stone-500 rounded-full" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <p className={`font-medium ${step.completed ? 'text-amber-100' : 'text-stone-500'}`}>
                  {step.status}
                </p>
                <p className="text-stone-400 text-sm mt-0.5">{step.location}</p>
                {step.timestamp && (
                  <p className="text-stone-500 text-xs mt-1">{step.timestamp}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium rounded-xl border border-stone-700 transition-colors">
          Liên hệ hỗ trợ
        </button>
        <button className="flex-1 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors">
          Xem chi tiết đơn hàng
        </button>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
