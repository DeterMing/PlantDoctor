import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, AlertTriangle, Leaf, Calendar } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherViewProps {
  weather: WeatherData;
}

export function WeatherView({ weather }: WeatherViewProps) {
  const actions = [
    {
      title: 'Di chuyển cây mẫn cảm vào trong nhà',
      desc: 'Dự báo có mưa bão nhiệt đới vào tối nay. Hãy bảo vệ các tán lá mỏng manh và tránh tình trạng úng nước cho đất.',
      priority: 'Cao',
      image: '/images/weather/move-indoors.jpg',
    },
    {
      title: 'Thời điểm lý tưởng để bón phân',
      desc: 'Nhiệt độ ổn định từ 22-26°C trong 48 giờ tới là điều kiện hoàn hảo để bộ rễ hấp thụ dinh dưỡng tốt nhất.',
      priority: 'Trung bình',
      icon: Leaf,
      timing: 'Sáng mai 07:00 AM'
    },
    {
      title: 'Tạm hoãn chu kỳ tưới nước',
      desc: 'Độ ẩm cao (82%) làm giảm tốc độ bay hơi. Hãy lùi lịch tưới cho các cây mọng nước thêm 24 giờ.',
      priority: 'Khuyến nghị',
      icon: Droplets,
      status: 'TẠM DỪNG'
    }
  ];

  return (
    <div className="py-12 px-2 max-w-7xl mx-auto animate-fade-in">
      {/* Hero Weather Section */}
      <section className="relative rounded-[40px] overflow-hidden mb-16 botanical-gradient text-white shadow-2xl p-12 min-h-[400px] flex flex-col justify-end">
        <div className="absolute inset-0 opacity-40">
          <img 
            alt="Misty skyline" 
            className="w-full h-full object-cover" 
            src="/images/weather/hero-hanoi.jpg" 
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80 flex items-center gap-2">
                Điều kiện khí quyển địa phương
              </h2>
              <h1 className="text-6xl md:text-8xl font-headline font-bold">{weather.city}</h1>
            </div>
            
            <div className="flex items-center gap-8">
              <span className="text-7xl font-sans font-light">{weather.temp}°C</span>
              <div className="h-16 w-px bg-white/20"></div>
              <div>
                <p className="text-2xl font-bold uppercase tracking-wide">{weather.condition}</p>
                <p className="text-sm opacity-70 flex items-center gap-4 mt-1 font-medium">
                  <span className="flex items-center gap-1"><Droplets className="h-3 w-3" />Độ ẩm: {weather.humidity}%</span>
                  <span className="flex items-center gap-1"><Wind className="h-3 w-3" />Gió: {weather.windSpeed}km/h</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 snap-x snap-mandatory">
            {weather.forecast.map((f) => (
              <div key={f.day} className="flex flex-col items-center bg-white/10 backdrop-blur-xl p-5 rounded-3xl min-w-[110px] lg:min-w-0 border border-white/10 snap-center">
                <span className="text-[10px] font-bold opacity-80 mb-3 tracking-widest uppercase">{f.day}</span>
                <Sun className="h-6 w-6 mb-3 text-secondary-container" />
                <span className="text-xl font-bold">{f.temp}°</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Botanical Actions Bento Grid */}
      <section className="space-y-10">
        <div className="flex items-baseline justify-between border-b border-outline-variant/20 pb-6">
          <h2 className="text-4xl font-headline text-primary font-bold">Hành động bảo vệ thực vật</h2>
          <span className="text-sm font-bold text-secondary uppercase tracking-widest px-4 py-1 bg-secondary-container rounded-full">Nhiệm vụ ưu tiên</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Action Card */}
          <div className="md:col-span-2 bg-surface-container-low rounded-[40px] p-10 flex flex-col md:flex-row gap-10 items-center border border-outline-variant/10 hover:border-primary/20 transition-all group">
            <div className="w-full md:w-2/5 aspect-square rounded-[32px] overflow-hidden shadow-2xl">
              <img src={actions[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-grow space-y-6">
              <div className="flex items-center gap-2 text-error">
                <AlertTriangle className="h-5 w-5 fill-error text-white" />
                <span className="text-xs font-bold uppercase tracking-widest">Cần thực hiện ngay</span>
              </div>
              <h3 className="text-3xl font-headline font-bold text-primary leading-tight">{actions[0].title}</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg font-medium">{actions[0].desc}</p>
              <div className="flex gap-4 pt-4">
                <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">Đã hoàn thành</button>
                <button className="text-primary px-8 py-3 rounded-xl font-bold text-sm bg-white border border-outline-variant hover:bg-surface-container transition-colors">Xem chi tiết</button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {actions.slice(1).map((action, idx) => {
              const Icon = action.icon!;
              return (
                <div key={idx} className="bg-surface-container-lowest rounded-[32px] p-8 space-y-6 border border-outline-variant/10 shadow-sm relative overflow-hidden group">
                  <div className="w-14 h-14 bg-secondary-container text-secondary flex items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary">{action.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{action.desc}</p>
                  <div className="pt-6 border-t border-outline-variant/10 flex items-center justify-between font-bold">
                    <span className="text-[10px] uppercase tracking-widest text-secondary">{action.timing || action.status}</span>
                    <button className="text-primary text-xs hover:underline flex items-center gap-1 group/btn">
                      Chi tiết <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="mt-24 text-center max-w-2xl mx-auto py-12 px-6 bg-surface-container-low rounded-[40px] border border-outline-variant/10">
        <p className="text-2xl font-headline italic text-primary leading-relaxed mb-6 font-medium">
          "Trong mỗi người làm vườn đều có một đứa trẻ tin vào Bà tiên hạt giống; và một nhà hiền triết luôn quan sát những đám mây."
        </p>
        <cite className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary not-italic opacity-60">
          — Đội ngũ Hi Brothers
        </cite>
      </section>
    </div>
  );
}
