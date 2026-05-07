import { motion } from 'motion/react';
import { Camera, Plus } from 'lucide-react';
import { Post } from '../types';

interface DashboardProps {
  posts: Post[];
  onUploadClick: () => void;
}

export function Dashboard({ posts, onUploadClick }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 animate-fade-in">
      {/* Left rail - Profile & Stats */}
      <aside className="lg:col-span-3 space-y-8">
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-row lg:flex-col items-center gap-6 lg:gap-0">
          <img 
            src="/images/dashboard/gardener-profile.jpg" 
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-full mb-0 lg:mb-4 object-cover border-4 border-surface-container"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 lg:text-center">
            <h2 className="font-headline text-xl font-bold text-primary">Hi Brother</h2>
            <p className="text-[10px] text-outline uppercase tracking-widest mb-4 lg:mb-6">Chuyên gia làm vườn</p>
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="bg-surface-container-low p-3 lg:p-4 rounded-2xl text-center">
                <span className="block text-xl lg:text-2xl font-bold text-primary">12</span>
                <span className="text-[9px] lg:text-[10px] uppercase font-bold text-outline tracking-tighter">Cây trồng</span>
              </div>
              <div className="bg-surface-container-low p-3 lg:p-4 rounded-2xl text-center">
                <span className="block text-xl lg:text-2xl font-bold text-primary">95%</span>
                <span className="text-[9px] lg:text-[10px] uppercase font-bold text-outline tracking-tighter">Sức khỏe</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content - AI Banner & Feed */}
      <main className="lg:col-span-6 space-y-8">
        <section className="relative overflow-hidden rounded-3xl botanical-gradient p-10 text-on-primary">
          <div className="relative z-10 max-w-sm md:max-w-md">
            <h1 className="font-headline text-3xl md:text-4xl font-bold mb-4 leading-tight">Chẩn đoán triệu chứng trong tích tắc với AI thực vật.</h1>
            <p className="text-on-primary/80 mb-8 font-medium">Phân tích vân lá để phát hiện thiếu hụt dinh dưỡng và sâu bệnh ngay lập tức.</p>
            <button 
              onClick={onUploadClick}
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl w-full sm:w-auto justify-center"
            >
              <Camera className="h-5 w-5" />
              Chụp ảnh lá cây
            </button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 blur-sm translate-x-1/4 translate-y-1/4">
            <Plus className="w-64 h-64" />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="font-headline text-2xl font-bold text-primary">Lưu trữ cộng đồng</h3>
          {posts.map((post) => (
            <article key={post.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <img src={post.image} className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <img src={post.author.avatar} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                  <span className="text-sm font-bold text-primary">{post.author.name}</span>
                  <span className="text-xs text-outline">• {post.timestamp}</span>
                </div>
                <h4 className="font-headline text-2xl font-bold mb-2">{post.title}</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm line-clamp-2">{post.content}</p>
                <div className="mt-6 flex gap-4 text-outline border-t border-outline-variant/10 pt-4">
                   <button className="flex items-center gap-1 text-xs hover:text-primary">❤️ {post.likes}</button>
                   <button className="flex items-center gap-1 text-xs hover:text-primary">💬 {post.comments}</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Right rail - Market Deals */}
      <aside className="lg:col-span-3 space-y-8">
         <div className="bg-surface-container-high/30 p-8 rounded-3xl border border-outline-variant/10">
            <h3 className="font-headline text-xl font-bold mb-6 text-primary">Tiêu điểm thị trường</h3>
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden">
                     <img src="/images/dashboard/phan_no_tao_bien.jpg" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-primary">NỔI BẬT</p>
                     <p className="text-sm font-bold">Phân nở tảo biển</p>
                     <p className="text-xs text-outline">185.000đ</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden">
                     <img src="/images/dashboard/dat_trong_kieng_la.jpg" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-primary">ƯU TIÊN HÈ</p>
                     <p className="text-sm font-bold">Đất trồng kiểng lá</p>
                     <p className="text-xs text-outline">129.000đ</p>
                  </div>
               </div>
            </div>
         </div>
      </aside>
    </div>
  );
}
