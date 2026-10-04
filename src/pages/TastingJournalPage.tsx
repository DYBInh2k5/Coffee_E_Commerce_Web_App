import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

interface TastingNote {
  id: string;
  productId: number;
  productName: string;
  date: string;
  rating: number;
  aroma: string;
  flavor: string;
  body: string;
  aftertaste: string;
  notes: string;
  brewMethod: string;
}

const TastingJournalPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useApp();
  const [entries, setEntries] = useState<TastingNote[]>(() => {
    const stored = localStorage.getItem('tastingNotes');
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TastingNote>>({
    productId: 0,
    rating: 4,
    aroma: '',
    flavor: '',
    body: '',
    aftertaste: '',
    notes: '',
    brewMethod: 'Pour Over',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find(p => p.id === formData.productId);
    
    const entry: TastingNote = {
      id: editingId || Date.now().toString(),
      productId: formData.productId!,
      productName: product?.name || '',
      date: new Date().toISOString().split('T')[0],
      rating: formData.rating!,
      aroma: formData.aroma!,
      flavor: formData.flavor!,
      body: formData.body!,
      aftertaste: formData.aftertaste!,
      notes: formData.notes!,
      brewMethod: formData.brewMethod!,
    };

    if (editingId) {
      setEntries(entries.map(e => e.id === editingId ? entry : e));
      showToast('Đã cập nhật ghi chú', 'success');
    } else {
      setEntries([entry, ...entries]);
      showToast('Đã thêm ghi chú mới', 'success');
    }

    localStorage.setItem('tastingNotes', JSON.stringify(entries));
    setShowForm(false);
    setEditingId(null);
    setFormData({
      productId: 0,
      rating: 4,
      aroma: '',
      flavor: '',
      body: '',
      aftertaste: '',
      notes: '',
      brewMethod: 'Pour Over',
    });
  };

  const handleEdit = (entry: TastingNote) => {
    setFormData(entry);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa ghi chú này?')) {
      setEntries(entries.filter(e => e.id !== id));
      localStorage.setItem('tastingNotes', JSON.stringify(entries.filter(e => e.id !== id)));
      showToast('Đã xóa ghi chú', 'success');
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
          <h1 className="font-serif text-3xl text-amber-100">Nhật ký nếm thử</h1>
          <p className="text-stone-400 text-sm mt-1">Ghi lại trải nghiệm cà phê của bạn</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              productId: 0,
              rating: 4,
              aroma: '',
              flavor: '',
              body: '',
              aftertaste: '',
              notes: '',
              brewMethod: 'Pour Over',
            });
          }}
          className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors text-sm"
        >
          + Thêm ghi chú
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 mb-6 animate-fade-in">
          <h3 className="text-amber-200 font-medium mb-4">
            {editingId ? 'Chỉnh sửa ghi chú' : 'Ghi chú mới'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Sản phẩm</label>
              <select
                required
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-600 transition-all"
              >
                <option value={0}>Chọn sản phẩm</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-stone-400 text-sm mb-1 block">Phương pháp pha</label>
              <select
                value={formData.brewMethod}
                onChange={(e) => setFormData({ ...formData, brewMethod: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-600 transition-all"
              >
                <option>Pour Over</option>
                <option>French Press</option>
                <option>Espresso</option>
                <option>AeroPress</option>
                <option>Cold Brew</option>
                <option>Moka Pot</option>
              </select>
            </div>

            <div>
              <label className="text-stone-400 text-sm mb-2 block">Đánh giá</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`text-3xl transition-colors ${
                      star <= (formData.rating || 0) ? 'text-amber-400' : 'text-stone-600'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-stone-400 text-sm mb-1 block">Hương thơm</label>
                <input
                  type="text"
                  required
                  value={formData.aroma}
                  onChange={(e) => setFormData({ ...formData, aroma: e.target.value })}
                  placeholder="Ví dụ: Hoa nhài, trái cây..."
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
                />
              </div>
              <div>
                <label className="text-stone-400 text-sm mb-1 block">Hương vị</label>
                <input
                  type="text"
                  required
                  value={formData.flavor}
                  onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                  placeholder="Ví dụ: Việt quất, caramel..."
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
                />
              </div>
              <div>
                <label className="text-stone-400 text-sm mb-1 block">Độ đậm</label>
                <input
                  type="text"
                  required
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Ví dụ: Nhẹ, trung bình, đậm..."
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
                />
              </div>
              <div>
                <label className="text-stone-400 text-sm mb-1 block">Hậu vị</label>
                <input
                  type="text"
                  required
                  value={formData.aftertaste}
                  onChange={(e) => setFormData({ ...formData, aftertaste: e.target.value })}
                  placeholder="Ví dụ: Dài, ngọt, đắng..."
                  className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-stone-400 text-sm mb-1 block">Ghi chú thêm</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Nhận xét chung về trải nghiệm..."
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
              >
                {editingId ? 'Cập nhật' : 'Lưu'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl border border-stone-700 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Entries List */}
      {entries.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">📝</span>
          <h2 className="text-xl text-amber-100 mb-2">Chưa có ghi chú nào</h2>
          <p className="text-stone-400">Bắt đầu ghi lại trải nghiệm cà phê của bạn</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-stone-800/30 border border-stone-700/30 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-amber-100 font-medium">{entry.productName}</h3>
                  <p className="text-stone-500 text-sm">{entry.date} • {entry.brewMethod}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < entry.rating ? 'text-amber-400' : 'text-stone-600'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <span className="text-stone-400">Hương thơm:</span>
                  <p className="text-amber-200">{entry.aroma}</p>
                </div>
                <div>
                  <span className="text-stone-400">Hương vị:</span>
                  <p className="text-amber-200">{entry.flavor}</p>
                </div>
                <div>
                  <span className="text-stone-400">Độ đậm:</span>
                  <p className="text-amber-200">{entry.body}</p>
                </div>
                <div>
                  <span className="text-stone-400">Hậu vị:</span>
                  <p className="text-amber-200">{entry.aftertaste}</p>
                </div>
              </div>

              {entry.notes && (
                <p className="text-stone-300 text-sm mb-3">{entry.notes}</p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(entry)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded-lg border border-stone-700 transition-colors"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="px-3 py-1.5 bg-red-900/30 hover:bg-red-900/50 text-red-400 text-xs rounded-lg border border-red-700/30 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TastingJournalPage;
