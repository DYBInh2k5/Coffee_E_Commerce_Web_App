import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'cupping' | 'workshop' | 'meetup';
  description: string;
  spots: number;
  totalSpots: number;
  icon: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Ethiopian Coffee Cupping',
    date: '2026-02-15',
    time: '10:00 AM',
    type: 'cupping',
    description: 'Khám phá 5 loại cà phê Ethiopia khác nhau cùng Q-grader chuyên nghiệp.',
    spots: 8,
    totalSpots: 12,
    icon: '🫖',
  },
  {
    id: 2,
    title: 'Latte Art Workshop',
    date: '2026-02-20',
    time: '2:00 PM',
    type: 'workshop',
    description: 'Học cách tạo hình nghệ thuật trên ly latte với barista hàng đầu.',
    spots: 3,
    totalSpots: 8,
    icon: '🎨',
  },
  {
    id: 3,
    title: 'Home Brewing Meetup',
    date: '2026-02-25',
    time: '6:00 PM',
    type: 'meetup',
    description: 'Gặp gỡ cộng đồng yêu cà phê, chia sẻ kinh nghiệm pha chế tại nhà.',
    spots: 15,
    totalSpots: 20,
    icon: '👥',
  },
];

const CoffeeClubPage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    { icon: '🎟️', title: 'Sự kiện độc quyền', desc: 'Tham gia cupping, workshop miễn phí' },
    { icon: '📚', title: 'Kiến thức chuyên sâu', desc: 'Học về cà phê từ chuyên gia' },
    { icon: '🤝', title: 'Cộng đồng', desc: 'Kết nối với người yêu cà phê' },
    { icon: '🎁', title: 'Quà tặng đặc biệt', desc: 'Nhận sample cà phê mới' },
  ];

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
        <span className="text-5xl mb-4 block">☕</span>
        <h1 className="font-serif text-4xl sm:text-5xl text-amber-100 mb-4">Coffee Club</h1>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto">
          Tham gia cộng đồng những người yêu cà phê. Sự kiện, workshop, và kết nối.
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

      {/* Events */}
      <h2 className="font-serif text-2xl text-amber-100 mb-6">Sự kiện sắp tới</h2>
      <div className="space-y-4 mb-12">
        {events.map((event) => {
          const progress = ((event.totalSpots - event.spots) / event.totalSpots) * 100;
          return (
            <div key={event.id} className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 hover:border-amber-700/50 transition-all">
              <div className="flex flex-wrap items-start gap-4">
                <span className="text-4xl">{event.icon}</span>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      event.type === 'cupping' ? 'bg-purple-900/30 text-purple-400' :
                      event.type === 'workshop' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-green-900/30 text-green-400'
                    }`}>
                      {event.type === 'cupping' ? 'Cupping' : event.type === 'workshop' ? 'Workshop' : 'Meetup'}
                    </span>
                  </div>
                  <h3 className="text-amber-100 font-semibold text-lg mb-1">{event.title}</h3>
                  <p className="text-stone-400 text-sm mb-3">{event.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <p className="text-amber-400 font-bold">{event.spots}</p>
                    <p className="text-stone-500 text-xs">chỗ trống</p>
                  </div>
                  <div className="w-24 h-1.5 bg-stone-700 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-amber-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <button className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium rounded-xl transition-colors">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Join CTA */}
      <div className="bg-gradient-to-br from-amber-900/20 to-stone-800/50 border border-amber-700/30 rounded-2xl p-8 text-center">
        <h2 className="font-serif text-2xl text-amber-100 mb-3">Sẵn sàng tham gia?</h2>
        <p className="text-stone-400 mb-6 max-w-md mx-auto">
          Đăng ký thành viên Coffee Club để nhận thông báo về sự kiện mới và ưu đãi đặc biệt.
        </p>
        <button className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors">
          Tham gia miễn phí
        </button>
      </div>
    </div>
  );
};

export default CoffeeClubPage;
