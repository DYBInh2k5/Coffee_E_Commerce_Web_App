import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const ReferralProgramPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const referralCode = `EMBER-${user.id.slice(-6).toUpperCase()}`;
  const referralLink = `https://emberandbloom.com?ref=${referralCode}`;

  // Mock referral stats
  const stats = {
    totalReferrals: 8,
    successfulSignups: 5,
    pointsEarned: 500,
    pendingRewards: 150,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showToast('Đã sao chép link giới thiệu!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const rewards = [
    { referrals: 1, reward: '50 điểm', icon: '🎁' },
    { referrals: 3, reward: '200 điểm + Free shipping', icon: '🚚' },
    { referrals: 5, reward: '500 điểm + $10 voucher', icon: '💰' },
    { referrals: 10, reward: '1500 điểm + Exclusive blend', icon: '⭐' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Quay lại Dashboard</span>
      </button>

      <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-3">Chương trình giới thiệu</h1>
      <p className="text-stone-400 mb-8">Mời bạn bè và nhận điểm thưởng cho mỗi người đăng ký thành công!</p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-amber-400">{stats.totalReferrals}</p>
          <p className="text-stone-400 text-sm">Lời mời đã gửi</p>
        </div>
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-400">{stats.successfulSignups}</p>
          <p className="text-stone-400 text-sm">Đăng ký thành công</p>
        </div>
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-amber-400">{stats.pointsEarned}</p>
          <p className="text-stone-400 text-sm">Điểm đã nhận</p>
        </div>
        <div className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-400">{stats.pendingRewards}</p>
          <p className="text-stone-400 text-sm">Điểm chờ nhận</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-gradient-to-br from-amber-900/20 to-stone-800/50 border border-amber-700/30 rounded-2xl p-6 mb-8">
        <h2 className="text-amber-200 font-medium mb-4">Link giới thiệu của bạn</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm"
          />
          <button
            onClick={handleCopyLink}
            className={`px-6 py-2.5 font-medium rounded-xl transition-all ${
              copied
                ? 'bg-green-700 text-white'
                : 'bg-amber-700 hover:bg-amber-600 text-white'
            }`}
          >
            {copied ? '✓ Đã sao chép' : 'Sao chép'}
          </button>
        </div>
        <p className="text-stone-400 text-sm">
          Mã giới thiệu: <span className="text-amber-400 font-mono font-bold">{referralCode}</span>
        </p>
      </div>

      {/* Rewards Tiers */}
      <h2 className="font-serif text-xl text-amber-100 mb-4">Phần thưởng theo cấp độ</h2>
      <div className="space-y-3 mb-8">
        {rewards.map((tier, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border transition-all ${
              stats.successfulSignups >= tier.referrals
                ? 'bg-green-900/10 border-green-700/30'
                : 'bg-stone-800/30 border-stone-700/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{tier.icon}</span>
                <div>
                  <p className="text-amber-100 font-medium">
                    {tier.referrals} {tier.referrals === 1 ? 'người' : 'người'} giới thiệu
                  </p>
                  <p className="text-stone-400 text-sm">{tier.reward}</p>
                </div>
              </div>
              {stats.successfulSignups >= tier.referrals && (
                <span className="px-3 py-1 bg-green-700 text-white text-xs font-medium rounded-full">
                  ✓ Đã đạt
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6">
        <h2 className="text-amber-200 font-medium mb-4">Cách hoạt động</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-sm text-white font-bold flex-shrink-0">1</span>
            <div>
              <p className="text-amber-100 font-medium">Chia sẻ link</p>
              <p className="text-stone-400 text-sm">Gửi link giới thiệu cho bạn bè qua email, messenger, hoặc mạng xã hội</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-sm text-white font-bold flex-shrink-0">2</span>
            <div>
              <p className="text-amber-100 font-medium">Bạn bè đăng ký</p>
              <p className="text-stone-400 text-sm">Khi bạn bè đăng ký và mua hàng lần đầu, họ nhận 10% giảm giá</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-sm text-white font-bold flex-shrink-0">3</span>
            <div>
              <p className="text-amber-100 font-medium">Nhận điểm thưởng</p>
              <p className="text-stone-400 text-sm">Bạn nhận 100 điểm cho mỗi người đăng ký thành công</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgramPage;
