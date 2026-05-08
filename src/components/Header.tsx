import { Search, Bell, User, CloudSun, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { NotificationPopover } from './NotificationPopover';
import { CartPopover } from './CartPopover';
import { Notification, CartItem } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: Notification[];
  cartItems: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export function Header({ 
  activeTab, 
  setActiveTab, 
  notifications, 
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
  onCheckout
}: HeaderProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Tổng quan' },
    { id: 'diagnostic', label: 'Bác sĩ' },
    { id: 'weather', label: 'Thời tiết' },
    { id: 'market', label: 'Cửa hàng' },
    { id: 'myplants', label: 'Vườn của tôi' },
  ];

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-outline-variant/30 px-4 md:px-6 py-3 md:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <button
            type="button"
            className="font-headline flex items-center gap-1 md:gap-1.5 cursor-pointer transition-transform active:scale-95"
            onClick={() => setActiveTab('dashboard')}
          >
            <img
              src="/images/dashboard/logo.png"
              alt=""
              className="h-9 w-9 md:h-10 md:w-10 shrink-0 object-contain"
              width={40}
              height={40}
            />
            <span className="text-xl md:text-2xl font-bold italic text-primary">
              Plant Doctor
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-48 lg:w-64 rounded-full bg-surface-container-highest border-none py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`rounded-full p-2.5 transition-colors relative ${isNotifOpen ? 'bg-secondary-container text-primary' : 'text-primary hover:bg-surface-container-high'}`}
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-white"></span>
              )}
            </button>
            <NotificationPopover 
              notifications={notifications} 
              isOpen={isNotifOpen} 
              onClose={() => setIsNotifOpen(false)} 
            />
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className={`rounded-full p-2.5 transition-colors relative ${isCartOpen ? 'bg-secondary-container text-primary' : 'text-primary hover:bg-surface-container-high'}`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full border border-white flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <CartPopover 
              items={cartItems}
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onRemove={onRemoveFromCart}
              onUpdateQuantity={onUpdateQuantity}
              onCheckout={() => {
                onCheckout();
                setIsCartOpen(false);
              }}
            />
          </div>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`rounded-full p-2.5 transition-colors ${activeTab === 'settings' ? 'bg-secondary-container text-primary' : 'text-primary hover:bg-surface-container-high'}`}
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
