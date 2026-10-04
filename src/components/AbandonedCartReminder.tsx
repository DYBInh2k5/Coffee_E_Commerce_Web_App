import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

const AbandonedCartReminder: React.FC = () => {
  const { cartItems, showToast } = useApp();

  useEffect(() => {
    // Check if cart has items and show reminder after 5 minutes
    if (cartItems.length > 0) {
      const timer = setTimeout(() => {
        const hasSeenReminder = sessionStorage.getItem('abandonedCartReminder');
        if (!hasSeenReminder) {
          showToast('🛒 Giỏ hàng của bạn đang chờ! Hoàn tất đơn hàng để nhận free shipping.', 'info');
          sessionStorage.setItem('abandonedCartReminder', 'true');
        }
      }, 300000); // 5 minutes

      return () => clearTimeout(timer);
    }
  }, [cartItems, showToast]);

  return null; // This component doesn't render anything
};

export default AbandonedCartReminder;
