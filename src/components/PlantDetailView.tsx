import { useState } from 'react';
import { X, Thermometer, Sun, Droplets, History, Edit2, Sparkles, Calendar, Clock, FileText, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { Plant, DiagnosticReport } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface PlantDetailViewProps {
  plant: Plant;
  onClose: () => void;
}

export function PlantDetailView({ plant, onClose }: PlantDetailViewProps) {
  const [selectedReport, setSelectedReport] = useState<DiagnosticReport | null>(null);

  // Sample data for reports if not provided
  const reports: DiagnosticReport[] = plant.reports || [
    {
      id: 'r1',
      date: '20 Tháng 04, 2026',
      diagnosis: 'Cháy bìa lá (Leaf Scorch) - Giai đoạn 2',
      status: 'Nguy kịch',
      summary: 'Biểu hiện cháy sém mép lá lan rộng trên 4 lá già.',
      details: {
        causes: [{ title: 'Thiếu Kali', items: ['Mép lá chuyển nâu giòn'] }],
        actions: ['Cắt tỉa lá bệnh', 'Bón phân Kali Sunfat']
      },
      notes: 'Đã di chuyển vào nơi mát hơn.'
    },
    {
      id: 'r2',
      date: '05 Tháng 03, 2026',
      diagnosis: 'Tình trạng ổn định',
      status: 'Xanh tốt',
      summary: 'Cây phát triển bình thường, lá mới xẻ đều.',
      details: {
        causes: [],
        actions: ['Duy trì chế độ chăm sóc']
      }
    }
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 z-[60] w-full max-w-2xl bg-surface-container-lowest shadow-2xl overflow-y-auto font-body"
    >
      <div className="relative">
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 z-10 bg-white/80 backdrop-blur p-2 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <X className="h-5 w-5 text-primary" />
        </button>

        <div className="h-96 relative overflow-hidden">
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent"></div>
        </div>

        <div className="px-12 -mt-24 relative z-20 pb-32 space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm font-headline ${plant.status === 'Nguy kịch' ? 'bg-error' : 'bg-emerald-500'}`}>
                  {plant.status}
                </span>
                <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Hồ sơ #00{plant.id}</span>
              </div>
              <h2 className="text-5xl font-headline text-primary font-bold tracking-tight">{plant.name}</h2>
              <p className="text-secondary italic text-xl font-headline">{plant.scientificName}</p>
            </div>
            <button className="bg-primary text-on-primary w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all">
              <Edit2 className="h-6 w-6" />
            </button>
          </div>

          {/* Chỉ số sức khỏe */}
          <section className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-outline flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Điều kiện sinh trưởng lý tưởng
            </h4>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-surface-container-low p-6 rounded-[32px] border border-outline-variant/10 text-center space-y-2">
                <Thermometer className="text-secondary mx-auto h-6 w-6" />
                <span className="block text-[10px] uppercase font-bold text-outline">Nhiệt độ</span>
                <span className="text-xl font-bold text-primary">18-24°C</span>
              </div>
              <div className="bg-surface-container-low p-6 rounded-[32px] border border-outline-variant/10 text-center space-y-2">
                <Sun className="text-secondary mx-auto h-6 w-6" />
                <span className="block text-[10px] uppercase font-bold text-outline">Ánh sáng</span>
                <span className="text-xl font-bold text-primary">Bán râm</span>
              </div>
              <div className="bg-surface-container-low p-6 rounded-[32px] border border-outline-variant/10 text-center space-y-2">
                <Droplets className="text-secondary mx-auto h-6 w-6" />
                <span className="block text-[10px] uppercase font-bold text-outline">Độ ẩm</span>
                <span className="text-xl font-bold text-primary">65%</span>
              </div>
            </div>
          </section>

          {/* Lịch sử chẩn đoán AI */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-outline-variant/10 pb-4 mb-6">
              <h4 className="text-2xl font-headline text-primary font-bold flex items-center gap-3">
                <FileText className="h-7 w-7 text-secondary" />
                Hồ sơ chẩn đoán AI
              </h4>
              <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Tất cả</button>
            </div>
            
            <div className="space-y-4">
              {reports.map((report) => (
                <div 
                  key={report.id} 
                  className="bg-white p-6 rounded-3xl shadow-md border border-outline-variant/20 hover:border-primary/30 transition-all cursor-pointer group"
                  onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-outline tracking-widest">{report.date}</span>
                      <h5 className="text-xl font-bold text-primary font-headline group-hover:text-secondary transition-colors">{report.diagnosis}</h5>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${report.status === 'Xanh tốt' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-4 line-clamp-2">
                    {report.summary}
                  </p>

                  <AnimatePresence>
                    {selectedReport?.id === report.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-4 pt-4 border-t border-outline-variant/10"
                      >
                         <div className="space-y-2">
                           <span className="text-[10px] uppercase font-bold text-outline">Ghi chú từ bác sĩ:</span>
                           <div className="bg-surface-container-low p-4 rounded-xl text-sm italic font-medium leading-relaxed">
                             {report.notes || 'Không có ghi chú thêm.'}
                           </div>
                         </div>
                         <div className="bg-primary-container/10 p-4 rounded-xl">
                            <span className="text-[10px] uppercase font-bold text-primary mb-2 block">Việc cần làm ngay:</span>
                            {report.details.actions.map((act, i) => (
                              <div key={i} className="flex gap-2 items-center text-sm font-bold text-primary mb-1">
                                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                                {act}
                              </div>
                            ))}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-center pt-2">
                    <ChevronRight className={`h-5 w-5 text-outline transition-transform ${selectedReport?.id === report.id ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lịch sử hoạt động */}
          <section className="space-y-10">
            <h4 className="text-2xl font-headline text-primary font-bold flex items-center gap-3 border-b-2 border-outline-variant/10 pb-4">
              <History className="h-7 w-7 text-secondary" />
              Lịch sử chăm sóc
            </h4>
            <div className="space-y-0 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-1 before:bg-surface-container">
              <div className="relative pl-16 pb-12 group">
                <div className="absolute left-[19px] top-1.5 w-4 h-4 rounded-full bg-secondary ring-8 ring-white shadow-lg"></div>
                <div className="bg-surface-container-low p-8 rounded-[32px] space-y-4 border border-outline-variant/10 shadow-sm">
                  <span className="text-xs uppercase font-bold text-outline tracking-wider block">12 Tháng 10, 2023</span>
                  <p className="text-lg font-bold text-primary leading-tight">Cắt tỉa bảo dưỡng và bón kích rễ</p>
                  <p className="text-on-surface-variant font-medium text-sm leading-relaxed italic">
                    Loại bỏ các cành héo, làm sạch bụi bề mặt lá để tăng khả năng quang hợp cho mùa đông.
                  </p>
                  <div className="flex gap-4">
                    <img src="https://picsum.photos/seed/p1/200/200" className="w-24 h-24 rounded-2xl object-cover shadow-md" referrerPolicy="no-referrer" />
                    <img src="https://picsum.photos/seed/p2/200/200" className="w-24 h-24 rounded-2xl object-cover shadow-md" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
              <div className="relative pl-16 group">
                <div className="absolute left-[19px] top-1.5 w-4 h-4 rounded-full bg-outline ring-8 ring-white shadow-lg"></div>
                <div className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/10">
                  <span className="text-xs uppercase font-bold text-outline tracking-wider block">05 Tháng 08, 2023</span>
                  <p className="text-lg font-bold text-primary leading-tight">Thay chậu chuyên dụng</p>
                  <p className="text-on-surface-variant font-medium text-sm leading-relaxed italic">Chuyển sang chậu gốm thủ công size 25cm. Đất trộn theo công thức Aeroid Mix.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Lịch nhắc nhở */}
          <section className="space-y-6">
            <h4 className="text-2xl font-headline text-primary font-bold flex items-center gap-3 border-b-2 border-outline-variant/10 pb-4">
              <Calendar className="h-7 w-7 text-secondary" />
              Lịch nhắc nhở sắp tới
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-8 bg-surface-container-low rounded-[32px] border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-secondary shadow-lg">
                    <Droplets className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xl font-bold text-primary italic">Tưới nước</span>
                    <span className="text-sm text-on-surface-variant font-medium uppercase tracking-widest">3 ngày một lần • 250ml</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <AlertTriangle className="h-5 w-5 text-error" />
                   <span className="text-xs font-bold text-error uppercase tracking-widest">Đã quá hạn</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-8 bg-surface-container-low rounded-[32px] border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-secondary shadow-lg">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xl font-bold text-primary italic">Bón phân định kỳ</span>
                    <span className="text-sm text-on-surface-variant font-medium uppercase tracking-widest">Hàng tháng • NPK cân bằng</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-outline uppercase tracking-widest">Còn 12 ngày</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
