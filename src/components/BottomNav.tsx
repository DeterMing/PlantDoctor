import { LayoutDashboard, ShieldPlus, ShoppingBasket, Leaf, CloudSun, MapPinned } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const items = [
    { id: 'dashboard', label: 'Trang chủ', icon: LayoutDashboard },
    { id: 'diagnostic', label: 'Bác sĩ', icon: ShieldPlus },
    { id: 'weather', label: 'Thời tiết', icon: CloudSun },
    { id: 'communitymap', label: 'Cộng đồng', icon: MapPinned },
    { id: 'market', label: 'Cửa hàng', icon: ShoppingBasket },
    { id: 'myplants', label: 'Cây của tôi', icon: Leaf },
  ];

  return (
    <nav className="glass-nav fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-outline-variant/30 px-4 pb-[env(safe-area-inset-bottom,24px)] pt-3 md:hidden rounded-t-[32px] shadow-[0_-8px_30px_rgb(0,0,0,0.08)]">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all flex-1 py-1 ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <div className={`relative rounded-2xl p-2 transition-all duration-300 ${isActive ? 'bg-secondary-container scale-110' : 'hover:bg-surface-container'}`}>
              <Icon className={`h-6 w-6 transition-transform ${isActive ? 'scale-110' : ''}`} />
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute inset-0 bg-secondary-container -z-10 rounded-2xl"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                />
              )}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-all ${isActive ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-0.5'}`}>
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}
