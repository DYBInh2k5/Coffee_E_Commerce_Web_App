import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdated: string;
  messages: { sender: 'user' | 'support'; text: string; timestamp: string }[];
}

const SupportTicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useApp();
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const stored = localStorage.getItem('supportTickets');
    return stored ? JSON.parse(stored) : [];
  });
  const [formData, setFormData] = useState({
    subject: '',
    category: 'order',
    priority: 'medium' as 'low' | 'medium' | 'high',
    message: '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: `TK-${Date.now().toString().slice(-6)}`,
      subject: formData.subject,
      category: formData.category,
      status: 'open',
      priority: formData.priority,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      messages: [{
        sender: 'user',
        text: formData.message,
        timestamp: new Date().toISOString(),
      }],
    };
    const updated = [newTicket, ...tickets];
    setTickets(updated);
    localStorage.setItem('supportTickets', JSON.stringify(updated));
    setShowNewTicket(false);
    setFormData({ subject: '', category: 'order', priority: 'medium', message: '' });
    showToast('Ticket đã được tạo thành công!', 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-amber-900/30 text-amber-400 border-amber-700/30';
      case 'in-progress': return 'bg-blue-900/30 text-blue-400 border-blue-700/30';
      case 'resolved': return 'bg-green-900/30 text-green-400 border-green-700/30';
      default: return 'bg-stone-800 text-stone-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-stone-400';
      default: return 'text-stone-400';
    }
  };

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

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-amber-100">Hỗ trợ khách hàng</h1>
          <p className="text-stone-400 text-sm mt-1">Quản lý yêu cầu hỗ trợ của bạn</p>
        </div>
        <button
          onClick={() => setShowNewTicket(true)}
          className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors text-sm"
        >
          + Tạo ticket mới
        </button>
      </div>

      {/* New Ticket Form */}
      {showNewTicket && (
        <form onSubmit={handleSubmit} className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 mb-6 animate-fade-in">
          <h3 className="text-amber-200 font-medium mb-4">Tạo ticket mới</h3>
          <div className="space-y-4">
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Chủ đề</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
                placeholder="Mô tả ngắn gọn vấn đề"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-stone-400 text-sm mb-1 block">Danh mục</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-600 transition-all"
                >
                  <option value="order">Đơn hàng</option>
                  <option value="product">Sản phẩm</option>
                  <option value="shipping">Vận chuyển</option>
                  <option value="payment">Thanh toán</option>
                  <option value="account">Tài khoản</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div>
                <label className="text-stone-400 text-sm mb-1 block">Mức độ ưu tiên</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-600 transition-all"
                >
                  <option value="low">Thấp</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Mô tả chi tiết</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all resize-none"
                placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors">
                Gửi ticket
              </button>
              <button type="button" onClick={() => setShowNewTicket(false)} className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl border border-stone-700 transition-colors">
                Hủy
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tickets List */}
      {tickets.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">🎫</span>
          <h2 className="text-xl text-amber-100 mb-2">Chưa có ticket nào</h2>
          <p className="text-stone-400">Tạo ticket mới khi bạn cần hỗ trợ</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-5 hover:border-stone-600 transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-400 font-mono text-sm">#{ticket.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                      {ticket.status === 'open' ? 'Mở' : ticket.status === 'in-progress' ? 'Đang xử lý' : 'Đã giải quyết'}
                    </span>
                  </div>
                  <h3 className="text-amber-100 font-medium">{ticket.subject}</h3>
                </div>
                <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority === 'high' ? '⬆ Cao' : ticket.priority === 'medium' ? '⬆ Trung bình' : '⬆ Thấp'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-stone-500">
                <span>Tạo: {new Date(ticket.createdAt).toLocaleDateString('vi-VN')}</span>
                <span>Cập nhật: {new Date(ticket.lastUpdated).toLocaleDateString('vi-VN')}</span>
                <span>{ticket.messages.length} tin nhắn</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportTicketsPage;
