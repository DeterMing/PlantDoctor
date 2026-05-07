import { Bell, Droplets, CloudRain, ShieldCheck, X } from 'lucide-react';
import { Notification } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationPopoverProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPopover({ notifications, isOpen, onClose }: NotificationPopoverProps) {
  const icons = {
    care: Droplets,
    weather: CloudRain,
    system: ShieldCheck,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={onClose}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute right-0 top-16 z-[70] w-96 bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/20 overflow-hidden"
          >
            <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
              <h3 className="font-headline text-xl font-bold text-primary">Thông báo</h3>
              <button 
                onClick={onClose}
                className="text-outline hover:text-primary p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="max-h-[480px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif) => {
                  const Icon = icons[notif.type] || ShieldCheck;
                  return (
                    <div key={notif.id} className="p-5 border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors cursor-pointer group">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 group-hover:bg-secondary-container transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-primary">{notif.title}</h4>
                          <p className="text-xs text-on-surface-variant leading-relaxed font-medium">{notif.message}</p>
                          <span className="text-[10px] text-outline font-bold uppercase tracking-widest block pt-1">{notif.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center space-y-4">
                   <Bell className="h-12 w-12 text-outline/20 mx-auto" />
                   <p className="text-outline font-bold">Không có thông báo mới</p>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-surface-container-low text-center">
              <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Đánh dấu tất cả đã đọc</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
