import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const AddressesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { showToast } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'Vietnam',
    phone: '',
    isDefault: false,
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAddress(editingId, formData);
      showToast('Cập nhật địa chỉ thành công', 'success');
    } else {
      addAddress(formData);
      showToast('Thêm địa chỉ thành công', 'success');
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'Vietnam',
      phone: '',
      isDefault: false,
    });
  };

  const handleEdit = (address: any) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
      deleteAddress(id);
      showToast('Đã xóa địa chỉ', 'success');
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
        <h1 className="font-serif text-3xl text-amber-100">Địa chỉ giao hàng</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              name: '',
              street: '',
              city: '',
              state: '',
              zip: '',
              country: 'Vietnam',
              phone: '',
              isDefault: false,
            });
          }}
          className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors text-sm"
        >
          + Thêm địa chỉ
        </button>
      </div>

      {/* Address Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-stone-800/30 border border-stone-700/30 rounded-2xl p-6 mb-6 animate-fade-in">
          <h3 className="text-amber-200 font-medium mb-4">
            {editingId ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Người nhận</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Số điện thoại</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-stone-400 text-sm mb-1 block">Địa chỉ</label>
              <input
                type="text"
                required
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Thành phố</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Tỉnh/Thành</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Mã bưu điện</label>
              <input
                type="text"
                required
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm mb-1 block">Quốc gia</label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-amber-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-600 transition-all"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
            >
              {editingId ? 'Cập nhật' : 'Thêm'}
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
        </form>
      )}

      {/* Address List */}
      {user.addresses.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">📍</span>
          <h2 className="text-xl text-amber-100 mb-2">Chưa có địa chỉ nào</h2>
          <p className="text-stone-400">Thêm địa chỉ để thanh toán nhanh hơn</p>
        </div>
      ) : (
        <div className="space-y-4">
          {user.addresses.map((address) => (
            <div
              key={address.id}
              className={`p-5 rounded-xl border transition-all ${
                address.isDefault
                  ? 'bg-amber-900/10 border-amber-700/30'
                  : 'bg-stone-800/30 border-stone-700/30'
              }`}
            >
              {address.isDefault && (
                <span className="inline-block px-2 py-0.5 bg-amber-700 text-white text-xs font-medium rounded-full mb-2">
                  Mặc định
                </span>
              )}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-amber-100 font-medium">{address.name}</p>
                  <p className="text-stone-400 text-sm mt-1">{address.phone}</p>
                  <p className="text-stone-300 text-sm mt-2">
                    {address.street}<br />
                    {address.city}, {address.state} {address.zip}<br />
                    {address.country}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(address.id)}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded-lg border border-stone-700 transition-colors"
                    >
                      Đặt mặc định
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(address)}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded-lg border border-stone-700 transition-colors"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="px-3 py-1.5 bg-red-900/30 hover:bg-red-900/50 text-red-400 text-xs rounded-lg border border-red-700/30 transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesPage;
