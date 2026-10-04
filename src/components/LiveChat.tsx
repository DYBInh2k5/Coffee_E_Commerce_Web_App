import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LiveChat: React.FC = () => {
  const { showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! Tôi là trợ lý ảo của Ember & Bloom. Tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    'Theo dõi đơn hàng',
    'Chính sách đổi trả',
    'Hướng dẫn pha chế',
    'Tư vấn sản phẩm',
  ];

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = 'Cảm ơn bạn đã liên hệ. Đội ngũ hỗ trợ sẽ phản hồi trong ít phút.';
      
      if (messageText.toLowerCase().includes('đơn hàng')) {
        botResponse = 'Bạn có thể theo dõi đơn hàng tại trang "Đơn hàng của tôi" trong Dashboard. Đơn hàng thường được giao trong 3-5 ngày làm việc.';
      } else if (messageText.toLowerCase().includes('đổi trả')) {
        botResponse = 'Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm có vấn đề. Vui lòng liên hệ email: support@emberandbloom.com';
      } else if (messageText.toLowerCase().includes('pha')) {
        botResponse = 'Chúng tôi có hướng dẫn chi tiết cho 6 phương pháp pha chế. Bạn có thể xem tại trang "Brewing Guides" trong menu.';
      } else if (messageText.toLowerCase().includes('tư vấn') || messageText.toLowerCase().includes('chọn')) {
        botResponse = 'Tôi khuyên bạn nên thử quiz "Find Your Coffee" để tìm loại cà phê phù hợp với sở thích của bạn!';
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-amber-700 hover:bg-amber-600 text-white rounded-full shadow-lg shadow-amber-900/30 flex items-center justify-center transition-all z-40 group"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-stone-900 animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-stone-900 border border-stone-700/50 rounded-2xl shadow-2xl z-40 flex flex-col animate-slide-in-up">
          {/* Header */}
          <div className="p-4 border-b border-stone-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-lg">
                ☕
              </div>
              <div>
                <h3 className="text-amber-100 font-medium">Hỗ trợ trực tuyến</h3>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Đang hoạt động
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-amber-700 text-white rounded-br-sm'
                      : 'bg-stone-800 text-stone-200 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-stone-700/50">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded-full border border-stone-700/50 transition-colors whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-stone-700/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-2 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
              <button
                onClick={() => handleSend()}
                className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
