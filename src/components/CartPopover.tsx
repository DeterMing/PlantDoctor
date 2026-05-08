import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartPopoverProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export function CartPopover({ items, isOpen, onClose, onRemove, onUpdateQuantity, onCheckout }: CartPopoverProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[1190] bg-black/20 backdrop-blur-sm md:hidden" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed left-3 right-3 top-20 z-[1200] w-auto md:absolute md:left-auto md:right-0 md:top-full md:mt-4 md:w-96 bg-white rounded-3xl shadow-2xl border border-outline-variant/20 overflow-hidden font-body"
          >
            <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <h3 className="font-headline text-lg font-bold text-primary">Giỏ hàng ({items.length})</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-surface-container rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-outline" />
              </button>
            </div>

            <div className="max-h-[62vh] md:max-h-[60vh] overflow-y-auto p-4 space-y-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto opacity-50">
                    <ShoppingCart className="h-8 w-8 text-outline" />
                  </div>
                  <p className="text-outline font-medium italic">Giỏ hàng của bạn đang trống</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-2 rounded-2xl hover:bg-surface-container-low transition-colors group">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-20 h-20 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-bold text-primary text-sm line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-outline font-medium">{item.product.price.toLocaleString('vi-VN')}đ</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-surface-container rounded-lg px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-0.5 hover:text-primary transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-0.5 hover:text-primary transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="p-1.5 text-error opacity-0 group-hover:opacity-100 transition-opacity rounded-lg hover:bg-error/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-surface-container-low space-y-4">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-primary">Tổng cộng:</span>
                  <span className="text-xl text-primary">{total.toLocaleString('vi-VN')}đ</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full botanical-gradient text-on-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                >
                  Thanh toán ngay
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
