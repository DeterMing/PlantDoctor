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

  const careHistoryByPlant: Record<string, { date: string; title: string; note: string; done: boolean }[]> = {
    '1': [
      {
        date: '03 Tháng 05, 2026',
        title: 'Tỉa cành tăm và tạo tán',
        note: 'Cắt nhẹ các nhánh mọc dày để tập trung dinh dưỡng nuôi hoa.',
        done: true
      },
      {
        date: '20 Tháng 04, 2026',
        title: 'Bón thúc trước đợt nắng',
        note: 'Bổ sung phân giàu kali liều nhẹ để hỗ trợ ra hoa.',
        done: false
      }
    ],
    '2': [
      {
        date: '06 Tháng 05, 2026',
        title: 'Kiểm tra độ khô giá thể',
        note: 'Đất khô nhanh do điều hòa, đã tưới bù 1 lần.',
        done: true
      },
      {
        date: '27 Tháng 04, 2026',
        title: 'Lau bụi bề mặt lá',
        note: 'Lau từng lá bằng khăn ẩm để cây quang hợp tốt hơn.',
        done: false
      }
    ],
    '3': [
      {
        date: '05 Tháng 05, 2026',
        title: 'Cắt lá già cháy mép',
        note: 'Loại bỏ 2 lá già để cây tập trung nuôi lá non.',
        done: true
      },
      {
        date: '25 Tháng 04, 2026',
        title: 'Bổ sung ẩm khu vực đặt chậu',
        note: 'Thêm khay sỏi ẩm để giảm tình trạng khô đầu lá.',
        done: false
      }
    ],
    '4': [
      {
        date: '07 Tháng 05, 2026',
        title: 'Xử lý rệp ở ngọn non',
        note: 'Dùng khăn ẩm lau rệp và theo dõi lại sau 3 ngày.',
        done: true
      },
      {
        date: '28 Tháng 04, 2026',
        title: 'Tỉa cành rậm sau mưa',
        note: 'Tạo độ thoáng cho tán để hạn chế nấm bệnh mùa ẩm.',
        done: false
      }
    ]
  };

  const remindersByPlant: Record<string, { icon: 'water' | 'feed'; title: string; detail: string; due: string; overdue?: boolean }[]> = {
    '1': [
      {
        icon: 'feed',
        title: 'Bón phân kích hoa',
        detail: '2 tuần/lần • liều nhẹ',
        due: 'Còn 2 ngày'
      },
      {
        icon: 'water',
        title: 'Tưới sáng sớm',
        detail: 'Mỗi 2 ngày • 500ml',
        due: 'Sáng mai'
      }
    ],
    '2': [
      {
        icon: 'water',
        title: 'Tưới đẫm theo chu kỳ',
        detail: '7-10 ngày/lần • 350ml',
        due: 'Hôm nay',
        overdue: true
      },
      {
        icon: 'feed',
        title: 'Bổ sung phân hữu cơ',
        detail: 'Hàng tháng • liều thấp',
        due: 'Còn 8 ngày'
      }
    ],
    '3': [
      {
        icon: 'water',
        title: 'Kiểm tra ẩm đất',
        detail: '2-3 ngày/lần • tưới khi mặt đất se khô',
        due: 'Tối nay'
      },
      {
        icon: 'feed',
        title: 'Bón phân lá loãng',
        detail: '3 tuần/lần • pha loãng',
        due: 'Còn 5 ngày'
      }
    ],
    '4': [
      {
        icon: 'water',
        title: 'Tưới giữ ẩm gốc',
        detail: 'Mỗi ngày • 300ml',
        due: 'Chiều nay',
        overdue: true
      },
      {
        icon: 'feed',
        title: 'Phun phòng sâu sinh học',
        detail: '7 ngày/lần • buổi sáng',
        due: 'Còn 3 ngày'
      }
    ]
  };

  const careHistory = careHistoryByPlant[plant.id] || careHistoryByPlant['1'];
  const reminders = remindersByPlant[plant.id] || remindersByPlant['1'];

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
    }
  ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 lg:inset-y-0 lg:right-0 lg:left-auto z-[60] w-full lg:max-w-2xl bg-surface-container-lowest shadow-2xl overflow-y-auto font-body rounded-t-[40px] lg:rounded-none"
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
              {careHistory.map((entry, idx) => (
                <div key={entry.date + entry.title} className={`relative pl-16 group ${idx < careHistory.length - 1 ? 'pb-12' : ''}`}>
                  <div className={`absolute left-[19px] top-1.5 w-4 h-4 rounded-full ring-8 ring-white shadow-lg ${entry.done ? 'bg-secondary' : 'bg-outline'}`}></div>
                  <div className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/10 shadow-sm">
                    <span className="text-xs uppercase font-bold text-outline tracking-wider block">{entry.date}</span>
                    <p className="text-lg font-bold text-primary leading-tight">{entry.title}</p>
                    <p className="text-on-surface-variant font-medium text-sm leading-relaxed italic">{entry.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lịch nhắc nhở */}
          <section className="space-y-6">
            <h4 className="text-2xl font-headline text-primary font-bold flex items-center gap-3 border-b-2 border-outline-variant/10 pb-4">
              <Calendar className="h-7 w-7 text-secondary" />
              Lịch nhắc nhở sắp tới
            </h4>
            <div className="space-y-4">
              {reminders.map((item) => (
                <div key={item.title} className="flex items-center justify-between p-8 bg-surface-container-low rounded-[32px] border border-outline-variant/10 shadow-sm">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-secondary shadow-lg">
                      {item.icon === 'water' ? <Droplets className="h-8 w-8" /> : <Clock className="h-8 w-8" />}
                    </div>
                    <div className="space-y-1">
                      <span className="block text-xl font-bold text-primary italic">{item.title}</span>
                      <span className="text-sm text-on-surface-variant font-medium uppercase tracking-widest">{item.detail}</span>
                    </div>
                  </div>
                  {item.overdue ? (
                    <div className="flex flex-col items-end gap-1">
                      <AlertTriangle className="h-5 w-5 text-error" />
                      <span className="text-xs font-bold text-error uppercase tracking-widest">{item.due}</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-outline uppercase tracking-widest">{item.due}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
