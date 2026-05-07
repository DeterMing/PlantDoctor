import { LayoutDashboard, ShieldPlus, ShoppingBasket, Leaf, CloudSun } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const items = [
    { id: 'dashboard', label: 'Trang chủ', icon: LayoutDashboard },
    { id: 'diagnostic', label: 'Bác sĩ', icon: ShieldPlus },
    { id: 'weather', label: 'Thời tiết', icon: () => null },
    { id: 'market', label: 'Cửa hàng', icon: ShoppingBasket },
    { id: 'myplants', label: 'Cây của tôi', icon: Leaf },
  ];

  return (
    <nav className="glass-nav fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-outline-variant/30 px-4 pb-6 pt-3 md:hidden rounded-t-2xl shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <div className={`rounded-xl p-2 transition-colors ${isActive ? 'bg-secondary-container' : ''}`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
