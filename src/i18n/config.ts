import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.shop': 'Shop',
      'nav.brewing': 'Brewing Guides',
      'nav.about': 'Our Story',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contact',
      'nav.cart': 'Cart',
      'nav.wishlist': 'Wishlist',
      'nav.account': 'Account',
      
      // Hero
      'hero.title1': 'Crafted with',
      'hero.title2': ' passion',
      'hero.title3': ', roasted to perfection.',
      'hero.subtitle': 'Discover our curated selection of specialty coffees sourced from the world\'s finest growing regions.',
      'hero.subscribe': 'Subscribe & Save',
      'hero.quiz': '🎯 Find Your Coffee',
      'hero.brewing': 'Brewing Guides',
      
      // Products
      'product.addToCart': 'Add to Cart',
      'product.addedToCart': '✓ Added to cart',
      'product.quickView': 'Quick View',
      'product.viewDetails': 'View Full Details',
      'product.reviews': 'Customer Reviews',
      'product.recentlyViewed': 'Recently Viewed',
      'product.recommendations': 'You Might Also Like',
      'product.personalized': 'Dành riêng cho bạn',
      
      // Filters
      'filter.all': 'All',
      'filter.singleOrigin': 'Single Origin',
      'filter.blend': 'Blend',
      'filter.sort': 'Sort',
      'filter.sortDefault': 'Sort: Default',
      'filter.sortPriceAsc': 'Price: Low to High',
      'filter.sortPriceDesc': 'Price: High to Low',
      'filter.sortRating': 'Highest Rated',
      'filter.sortName': 'Name A-Z',
      'filter.advanced': 'Advanced Filter',
      'filter.roast': 'Roast Level',
      'filter.origin': 'Origin',
      'filter.price': 'Price Range',
      'filter.flavor': 'Flavor Notes',
      'filter.clear': 'Clear Filters',
      'filter.apply': 'Apply',
      
      // Cart
      'cart.title': 'Your Cart',
      'cart.empty': 'Your cart is empty',
      'cart.emptyDesc': 'Add some specialty coffee to get started',
      'cart.subtotal': 'Subtotal',
      'cart.shipping': 'Shipping',
      'cart.free': 'Free',
      'cart.total': 'Total',
      'cart.checkout': 'Proceed to Checkout',
      'cart.promoCode': 'Promo code',
      'cart.apply': 'Apply',
      'cart.remove': 'Remove',
      
      // Checkout
      'checkout.title': 'Checkout',
      'checkout.contact': 'Contact Information',
      'checkout.shipping': 'Shipping Address',
      'checkout.payment': 'Payment Details',
      'checkout.placeOrder': 'Place Order',
      'checkout.processing': 'Processing your order...',
      'checkout.success': 'Order Confirmed!',
      'checkout.successDesc': 'Thank you for your purchase. Your specialty coffee is being prepared with care.',
      
      // Auth
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.name': 'Full Name',
      'auth.confirmPassword': 'Confirm Password',
      'auth.noAccount': 'Don\'t have an account? Sign up',
      'auth.hasAccount': 'Already have an account? Login',
      'auth.loginSuccess': 'Đăng nhập thành công!',
      'auth.registerSuccess': 'Đăng ký thành công!',
      
      // Dashboard
      'dashboard.welcome': 'Welcome back',
      'dashboard.orders': 'Orders',
      'dashboard.points': 'Points',
      'dashboard.cart': 'Cart',
      'dashboard.wishlist': 'Wishlist',
      'dashboard.quickActions': 'Quick Actions',
      'dashboard.recentActivity': 'Recent Activity',
      
      // Footer
      'footer.tagline': 'Specialty coffee roasters dedicated to bringing you the finest beans from around the world.',
      'footer.shop': 'Shop',
      'footer.allCoffees': 'All Coffees',
      'footer.learn': 'Learn',
      'footer.services': 'Services',
      'footer.rewards': 'Rewards',
      'footer.connect': 'Connect',
      'footer.rights': '© 2026 Ember & Bloom. All rights reserved. Crafted with love and caffeine.',
      
      // Common
      'common.loading': 'Loading...',
      'common.error': 'An error occurred',
      'common.retry': 'Retry',
      'common.cancel': 'Cancel',
      'common.save': 'Save',
      'common.edit': 'Edit',
      'common.delete': 'Delete',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.previous': 'Previous',
      'common.submit': 'Submit',
      'common.search': 'Search...',
      'common.noResults': 'No results found',
    }
  },
  vi: {
    translation: {
      // Navigation
      'nav.shop': 'Cửa hàng',
      'nav.brewing': 'Hướng dẫn pha chế',
      'nav.about': 'Câu chuyện',
      'nav.faq': 'Câu hỏi thường gặp',
      'nav.contact': 'Liên hệ',
      'nav.cart': 'Giỏ hàng',
      'nav.wishlist': 'Yêu thích',
      'nav.account': 'Tài khoản',
      
      // Hero
      'hero.title1': 'Được tạo ra với',
      'hero.title2': ' đam mê',
      'hero.title3': ', rang xay hoàn hảo.',
      'hero.subtitle': 'Khám phá bộ sưu tập cà phê đặc sản được chọn lọc từ những vùng trồng cà phê tốt nhất thế giới.',
      'hero.subscribe': 'Đăng ký & Tiết kiệm',
      'hero.quiz': '🎯 Tìm cà phê của bạn',
      'hero.brewing': 'Hướng dẫn pha chế',
      
      // Products
      'product.addToCart': 'Thêm vào giỏ',
      'product.addedToCart': '✓ Đã thêm vào giỏ',
      'product.quickView': 'Xem nhanh',
      'product.viewDetails': 'Xem chi tiết',
      'product.reviews': 'Đánh giá khách hàng',
      'product.recentlyViewed': 'Đã xem gần đây',
      'product.recommendations': 'Có thể bạn thích',
      'product.personalized': 'Dành riêng cho bạn',
      
      // Filters
      'filter.all': 'Tất cả',
      'filter.singleOrigin': 'Đơn nguồn gốc',
      'filter.blend': 'Phối trộn',
      'filter.sort': 'Sắp xếp',
      'filter.sortDefault': 'Mặc định',
      'filter.sortPriceAsc': 'Giá: Thấp đến Cao',
      'filter.sortPriceDesc': 'Giá: Cao đến Thấp',
      'filter.sortRating': 'Đánh giá cao nhất',
      'filter.sortName': 'Tên A-Z',
      'filter.advanced': 'Lọc nâng cao',
      'filter.roast': 'Độ rang',
      'filter.origin': 'Nguồn gốc',
      'filter.price': 'Khoảng giá',
      'filter.flavor': 'Hương vị',
      'filter.clear': 'Xóa bộ lọc',
      'filter.apply': 'Áp dụng',
      
      // Cart
      'cart.title': 'Giỏ hàng của bạn',
      'cart.empty': 'Giỏ hàng trống',
      'cart.emptyDesc': 'Thêm cà phê đặc sản để bắt đầu',
      'cart.subtotal': 'Tạm tính',
      'cart.shipping': 'Phí vận chuyển',
      'cart.free': 'Miễn phí',
      'cart.total': 'Tổng cộng',
      'cart.checkout': 'Thanh toán',
      'cart.promoCode': 'Mã khuyến mãi',
      'cart.apply': 'Áp dụng',
      'cart.remove': 'Xóa',
      
      // Checkout
      'checkout.title': 'Thanh toán',
      'checkout.contact': 'Thông tin liên hệ',
      'checkout.shipping': 'Địa chỉ giao hàng',
      'checkout.payment': 'Thông tin thanh toán',
      'checkout.placeOrder': 'Đặt hàng',
      'checkout.processing': 'Đang xử lý đơn hàng...',
      'checkout.success': 'Đặt hàng thành công!',
      'checkout.successDesc': 'Cảm ơn bạn đã mua hàng. Cà phê đặc sản của bạn đang được chuẩn bị cẩn thận.',
      
      // Auth
      'auth.login': 'Đăng nhập',
      'auth.register': 'Đăng ký',
      'auth.email': 'Email',
      'auth.password': 'Mật khẩu',
      'auth.name': 'Họ tên',
      'auth.confirmPassword': 'Xác nhận mật khẩu',
      'auth.noAccount': 'Chưa có tài khoản? Đăng ký ngay',
      'auth.hasAccount': 'Đã có tài khoản? Đăng nhập',
      'auth.loginSuccess': 'Đăng nhập thành công!',
      'auth.registerSuccess': 'Đăng ký thành công!',
      
      // Dashboard
      'dashboard.welcome': 'Chào mừng trở lại',
      'dashboard.orders': 'Đơn hàng',
      'dashboard.points': 'Điểm thưởng',
      'dashboard.cart': 'Giỏ hàng',
      'dashboard.wishlist': 'Yêu thích',
      'dashboard.quickActions': 'Thao tác nhanh',
      'dashboard.recentActivity': 'Hoạt động gần đây',
      
      // Footer
      'footer.tagline': 'Nhà rang xay cà phê đặc sản, mang đến những hạt cà phê tốt nhất từ khắp nơi trên thế giới.',
      'footer.shop': 'Cửa hàng',
      'footer.allCoffees': 'Tất cả cà phê',
      'footer.learn': 'Học hỏi',
      'footer.services': 'Dịch vụ',
      'footer.rewards': 'Phần thưởng',
      'footer.connect': 'Kết nối',
      'footer.rights': '© 2026 Ember & Bloom. Bảo lưu mọi quyền. Được tạo với tình yêu và caffeine.',
      
      // Common
      'common.loading': 'Đang tải...',
      'common.error': 'Đã xảy ra lỗi',
      'common.retry': 'Thử lại',
      'common.cancel': 'Hủy',
      'common.save': 'Lưu',
      'common.edit': 'Sửa',
      'common.delete': 'Xóa',
      'common.back': 'Quay lại',
      'common.next': 'Tiếp theo',
      'common.previous': 'Trước',
      'common.submit': 'Gửi',
      'common.search': 'Tìm kiếm...',
      'common.noResults': 'Không tìm thấy kết quả',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
