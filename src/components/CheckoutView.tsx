import { CreditCard, Truck, MapPin, ChevronLeft, CheckCircle2, Ticket } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../types';
import { useState } from 'react';

interface CheckoutViewProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export function CheckoutView({ items, onBack, onComplete }: CheckoutViewProps) {
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 30000;
  const total = subtotal + shipping;

  if (isCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto py-20 px-6 text-center space-y-8 font-body"
      >
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <div>
          <h1 className="font-headline text-4xl font-bold text-primary mb-4">Đặt hàng thành công!</h1>
          <p className="text-on-surface-variant text-lg">Cảm ơn bạn đã tin tưởng PlantDoctor. Mã đơn hàng của bạn là <span className="font-bold text-primary">#PD-88291</span>. Chúng tôi sẽ sớm liên hệ xác nhận.</p>
        </div>
        <button 
          onClick={onComplete}
          className="botanical-gradient text-on-primary px-10 py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
        >
          Quay lại trang chủ
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6 font-body">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-outline hover:text-primary transition-colors mb-8 font-bold text-sm uppercase tracking-widest"
      >
        <ChevronLeft className="h-4 w-4" />
        Quay lại giỏ hàng
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left column: Form */}
        <div className="lg:col-span-7 space-y-10">
          <section className="space-y-6">
            <h2 className="font-headline text-3xl font-bold text-primary flex items-center gap-3">
              <MapPin className="h-7 w-7" />
              Thông tin giao hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Họ và tên" className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl p-4 focus:border-primary focus:ring-0 transition-all" />
              <input type="tel" placeholder="Số điện thoại" className="w-full bg-surface-container-low border-2 border-outline-variant/20 rounded-xl p-4 focus:border-primary focus:ring-0 transition-all" />
              <input type="email" placeholder="Email" className="w-full md:col-span-2 bg-surface-container-low border-2 border-outline-variant/20 rounded-xl p-4 focus:border-primary focus:ring-0 transition-all" />
              <input type="text" placeholder="Địa chỉ chi tiết (Số nhà, tên đường)" className="w-full md:col-span-2 bg-surface-container-low border-2 border-outline-variant/20 rounded-xl p-4 focus:border-primary focus:ring-0 transition-all" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="font-headline text-3xl font-bold text-primary flex items-center gap-3">
              <Truck className="h-7 w-7" />
              Phương thức vận chuyển
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border-2 border-primary cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-4 border-primary" />
                  <div>
                    <p className="font-bold">Giao hàng nhanh</p>
                    <p className="text-xs text-outline">Dự kiến 1-2 ngày</p>
                  </div>
                </div>
                <span className="font-bold">30.000đ</span>
              </label>
              <label className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border-2 border-outline-variant/10 opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-outline-variant" />
                  <div>
                    <p className="font-bold">Hỏa tốc (2H)</p>
                    <p className="text-xs text-outline">Chưa hỗ trợ khu vực này</p>
                  </div>
                </div>
                <span className="font-bold">--</span>
              </label>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="font-headline text-3xl font-bold text-primary flex items-center gap-3">
              <CreditCard className="h-7 w-7" />
              Thanh toán
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl border-2 border-primary cursor-pointer">
                <div className="w-4 h-4 rounded-full border-4 border-primary" />
                <p className="font-bold">Thanh toán khi nhận hàng (COD)</p>
              </label>
              <label className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl border-2 border-outline-variant/10 cursor-pointer">
                <div className="w-4 h-4 rounded-full border-2 border-outline-variant" />
                <p className="font-bold">Chuyển khoản ngân hàng</p>
              </label>
              <label className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl border-2 border-outline-variant/10 cursor-pointer">
                <div className="w-4 h-4 rounded-full border-2 border-outline-variant" />
                <p className="font-bold">Ví điện tử MoMo / ZaloPay</p>
              </label>
            </div>
          </section>
        </div>

        {/* Right column: Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            <div className="bg-surface-container p-8 rounded-[32px] shadow-sm space-y-6">
              <h3 className="font-headline text-2xl font-bold text-primary">Tóm tắt đơn hàng</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.product.image} className="w-16 h-16 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-bold text-sm line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-outline font-medium">SL: {item.quantity} x {item.product.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative">
                <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-outline" />
                <input type="text" placeholder="Nhập mã giảm giá" className="w-full bg-white border-2 border-outline-variant/30 rounded-xl p-3 pl-10 text-sm focus:ring-0 focus:border-primary transition-all" />
              </div>

              <div className="space-y-3 pt-6 border-t border-outline-variant/20 italic font-medium">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Tạm tính:</span>
                  <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Phí vận chuyển:</span>
                  <span>{shipping.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between items-center text-primary font-bold text-xl pt-3 not-italic">
                  <span>Tổng tiền:</span>
                  <span>{total.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <button 
                onClick={() => setIsCompleted(true)}
                className="w-full botanical-gradient text-on-primary py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Đặt hàng ngay ({total.toLocaleString('vi-VN')}đ)
              </button>
              
              <p className="text-[10px] text-center text-outline px-4">Bằng cách nhấp vào "Đặt hàng ngay", bạn đồng ý với Điều khoản & Chính sách của PlantDoctor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
