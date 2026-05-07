import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { DiagnosticView } from './components/DiagnosticView';
import { MarketView } from './components/MarketView';
import { MyPlantsView } from './components/MyPlantsView';
import { SettingsView } from './components/SettingsView';
import { WeatherView } from './components/WeatherView';
import { CheckoutView } from './components/CheckoutView';
import { Plant, Product, Post, WeatherData, Notification, CartItem } from './types';
import { AnimatePresence, motion } from 'motion/react';
import { Camera } from 'lucide-react';

const MOCK_PLANTS: Plant[] = [
  {
    id: '1',
    name: 'Cây Hoa Giấy',
    scientificName: 'Bougainvillea glabra',
    image: '/images/plants/cay_hoa_giay.png',
    status: 'Xanh tốt',
    nextCare: 'Sáng mai',
    careType: 'Cắt tỉa',
    location: 'Ban công đón nắng',
  },
  {
    id: '2',
    name: 'Phong Lá Đỏ',
    scientificName: 'Acer Palmatum',
    image: '/images/plants/cay_kim_tien.jpg',
    status: 'Cần nước',
    nextCare: 'Chiều nay',
    careType: 'Tưới nước',
    location: 'Phòng khách',
  },
  {
    id: '3',
    name: 'Sen đá nâu',
    scientificName: 'Graptopetalum paraguayense',
    image: '/images/plants/fiddleleaf.jpg',
    status: 'Ổn định',
    nextCare: '3 ngày nữa',
    careType: 'Bón phân',
    location: 'Bệ cửa sổ bếp',
  },
  {
    id: '4',
    name: 'Hoa giấy Thái',
    scientificName: 'Bougainvillea glabra',
    image: '/images/plants/olive.jpg',
    status: 'Cần nước',
    nextCare: 'Tối nay',
    careType: 'Cắt tỉa',
    location: 'Cổng trước nhà',
  },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Sen Đá Kim Cương",
    category: 'Cây cảnh',
    region: 'Bắc',
    price: 85000,
    image: '/images/products/sen_da_kim_cuong.png',
    rating: 4.8,
    reviews: 48,
    tag: 'Dễ chăm sóc',
    description: 'Sen đá kim cương với vẻ đẹp trong suốt.',
  },
  {
    id: '2',
    name: 'Hoa Lan Hồ Điệp Phấn',
    category: 'Cây cảnh',
    region: 'Trung',
    price: 250000,
    image: '/images/products/lan_ho_diep.png',
    rating: 4.9,
    reviews: 112,
    tag: 'Bán chạy',
    description: 'Lan hồ điệp màu hồng phấn sang trọng.',
  },
  {
    id: '3',
    name: 'Sen Đá Thạch Ngọc',
    category: 'Cây cảnh',
    region: 'Nam',
    price: 45000,
    image: '/images/products/succulent-2.jpg',
    rating: 5.0,
    reviews: 204,
    description: 'Sen đá thạch ngọc nhỏ nhắn, đáng yêu.',
  },
  {
    id: '4',
    name: 'Lan Vũ Nữ Vàng',
    category: 'Cây cảnh',
    region: 'Bắc',
    price: 180000,
    image: '/images/products/lan_vu_nu_vang.png',
    rating: 4.5,
    reviews: 56,
    description: 'Hoa lan vũ nữ với sắc vàng rực rỡ.',
  },
  {
    id: '5',
    name: 'Phân Bón Sen Đá Chuyên Dụng',
    category: 'Phân bón',
    region: 'Nam',
    price: 35000,
    image: '/images/products/phan_bon_chuyen_dung_cho_sen_da.jpg',
    rating: 4.7,
    reviews: 88,
    description: 'Cung cấp đầy đủ dưỡng chất cho sen đá.',
  },
];

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: {
      name: 'Elena Rose',
      avatar: '/images/community/elena.jpg',
      role: 'Quản trị viên',
    },
    title: 'Làm sao để Monstera xẻ lá đẹp?',
    content: 'Đảm bảo Monstera của bạn nhận được ánh sáng tán xạ mạnh để khuyến khích việc xẻ lá. Ánh sáng yếu sẽ làm lá bị đặc...',
    image: '/images/community/post-monstera.jpg',
    likes: 124,
    comments: 18,
    timestamp: '2 giờ trước',
    tag: 'Mẹo chuyên gia',
  },
  {
    id: '2',
    author: {
      name: 'Julian Green',
      avatar: '/images/community/julian.jpg',
      role: 'Chuyên gia cây cảnh',
    },
    title: 'Quy tắc tưới nước mùa đông',
    content: 'Hãy nhớ giảm tần suất tưới nước khi cây phát triển chậm lại trong những tháng lạnh. Kiểm tra độ ẩm đất sâu 2 inch...',
    image: '/images/community/post-winter.jpg',
    likes: 89,
    comments: 12,
    timestamp: '5 giờ trước',
  },
];

const MOCK_WEATHER: WeatherData = {
  city: 'Hà Nội, VN',
  temp: 24,
  condition: 'Nhiều mây',
  humidity: 82,
  windSpeed: 12,
  forecast: [
    { day: 'T2', temp: 25, icon: 'cloudy' },
    { day: 'T3', temp: 22, icon: 'rainy' },
    { day: 'T4', temp: 26, icon: 'partly_cloudy' },
    { day: 'T5', temp: 28, icon: 'sunny' },
    { day: 'T6', temp: 29, icon: 'sunny' },
  ]
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Lịch tưới cây quá hạn',
    message: 'Cây Phong Lá Đỏ và Cây Ô Liu cần được tưới nước ngay lập tức.',
    type: 'care',
    timestamp: '15 phút trước'
  },
  {
    id: '2',
    title: 'Cảnh báo thời tiết',
    message: 'Dự báo có mưa bão đêm nay. Hãy đưa các cây nhạy cảm vào nơi che chắn.',
    type: 'weather',
    timestamp: '1 giờ trước'
  },
  {
    id: '3',
    title: 'Báo cáo chẩn đoán AI',
    message: 'Phân tích mới cho Bàng Singapore đã hoàn tất. Xem kết quả ngay.',
    type: 'system',
    timestamp: '3 giờ trước'
  }
];

export default function App() {
  const [activeTab, setActiveTab ] = useState('dashboard');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { id: Math.random().toString(36).substr(2, 9), product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard posts={MOCK_POSTS} onUploadClick={() => setActiveTab('diagnostic')} />;
      case 'diagnostic':
        return <DiagnosticView onBack={() => setActiveTab('dashboard')} />;
      case 'weather':
        return <WeatherView weather={MOCK_WEATHER} />;
      case 'market':
        return <MarketView products={MOCK_PRODUCTS} onAddToCart={handleAddToCart} />;
      case 'myplants':
        return <MyPlantsView plants={MOCK_PLANTS} />;
      case 'settings':
        return <SettingsView onBack={() => setActiveTab('dashboard')} />;
      case 'checkout':
        return (
          <CheckoutView 
            items={cartItems} 
            onBack={() => setActiveTab('market')} 
            onComplete={() => {
              setCartItems([]);
              setActiveTab('dashboard');
            }}
          />
        );
      default:
        return <Dashboard posts={MOCK_POSTS} onUploadClick={() => setActiveTab('diagnostic')} />;
    }
  };

  return (
    <div className="min-h-screen selection-green bg-surface overflow-x-hidden">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        notifications={MOCK_NOTIFICATIONS}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => setActiveTab('checkout')}
      />
      
      <main className="mx-auto max-w-7xl px-4 md:px-6 pb-32 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Action Button for Mobile */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActiveTab('diagnostic')}
        className="md:hidden fixed right-6 bottom-24 z-50 botanical-gradient text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20 active:opacity-90"
      >
        <Camera className="h-8 w-8" />
      </motion.button>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Visual background layers */}
      <div className="fixed inset-0 -z-10 bg-surface pointer-events-none" />
      <div className="fixed top-0 right-0 w-1/3 h-screen bg-surface-container-low/30 -z-10 pointer-events-none hidden lg:block" />
    </div>
  );
}
