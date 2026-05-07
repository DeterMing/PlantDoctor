import { Search, Bell, User, CloudSun } from 'lucide-react';
import { useState } from 'react';
import { NotificationPopover } from './NotificationPopover';
import { Notification } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: Notification[];
}

export function Header({ activeTab, setActiveTab, notifications }: HeaderProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Bảng điều khiển' },
    { id: 'diagnostic', label: 'Bác sĩ' },
    { id: 'weather', label: 'Thời tiết' },
    { id: 'market', label: 'Cửa hàng' },
    { id: 'myplants', label: 'Vườn của tôi' },
  ];

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-outline-variant/30 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <span 
            className="font-headline text-2xl font-bold italic text-primary cursor-pointer"
            onClick={() => setActiveTab('dashboard')}
          >
            PlantDoctor
          </span>
          <nav className="hidden md:flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 text-sm font-medium transition-all flex items-center gap-2 ${
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

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
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
              className={`rounded-full p-2 transition-colors relative ${isNotifOpen ? 'bg-secondary-container text-primary' : 'text-primary hover:bg-surface-container-high'}`}
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border border-white"></span>
              )}
            </button>
            <NotificationPopover 
              notifications={notifications} 
              isOpen={isNotifOpen} 
              onClose={() => setIsNotifOpen(false)} 
            />
          </div>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`rounded-full p-2 transition-colors ${activeTab === 'settings' ? 'bg-secondary-container text-primary' : 'text-primary hover:bg-surface-container-high'}`}
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
