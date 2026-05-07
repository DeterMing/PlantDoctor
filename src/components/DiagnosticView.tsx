import { useState, ChangeEvent } from 'react';
import { Camera, Loader2, CheckCircle, AlertCircle, Send, Save, ClipboardList, Info, AlertTriangle, Lightbulb, User, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DiagnosticReport } from '../types';

interface DiagnosticViewProps {
  onBack: () => void;
}

export function DiagnosticView({ onBack }: DiagnosticViewProps) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveNotes, setSaveNotes] = useState("");
  const [location, setLocation] = useState("Vườn nhà");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartDiagnosis = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const diagnosis = {
        plantName: "Cây của bạn",
        scientificName: "Monstera / Ficus / Philodendron",
        healthStatus: "Vấn đề nghiêm trọng",
        diagnosis: "Cháy bìa lá (Leaf Scorch)",
        summary: "Dựa trên hình ảnh, cây đang gặp tình trạng cháy bìa lá (leaf scorch) nghiêm trọng. Đây là biểu hiện của việc các mô ở mép lá bị chết do không nhận đủ nước hoặc bị tổn thương tế bào.",
        details: {
          causes: [
            {
              title: "1. Thiếu hụt dinh dưỡng (Phổ biến nhất)",
              items: [
                "Thiếu Kali (K): Biểu hiện đặc trưng là mép lá bị cháy vàng hoặc nâu, bắt đầu từ các lá già phía dưới rồi lan dần lên trên.",
                "Thiếu Magie (Mg): Đôi khi gây ra các vết cháy xém nhưng thường đi kèm với việc gân lá còn xanh trong khi thịt lá bị vàng."
              ]
            },
            {
              title: "2. Sốc nhiệt hoặc Stress nước",
              items: [
                "Thời tiết khắc nghiệt: Nắng nóng gay gắt kết hợp với gió mạnh khiến tốc độ thoát hơi nước nhanh hơn tốc độ hút nước.",
                "Tưới nước không đúng cách: Đất quá khô hoặc tưới nước quá ít không đủ thấm đến bộ rễ."
              ]
            },
            {
              title: "3. Ngộ độc phân bón hoặc Phèn/Mặn",
              items: [
                "Dư thừa phân bón hóa học: Bón quá nhiều phân gần gốc gây ra tình trạng 'cháy rễ'.",
                "Nguồn nước/Đất: Đất bị nhiễm mặn hoặc nước tưới chứa nhiều Clo."
              ]
            }
          ],
          actions: [
            "Cắt bỏ: Loại bỏ các lá bị cháy nặng để tránh tiêu hao dinh dưỡng và hạn chế nấm lây lan.",
            "Kiểm tra độ ẩm: Đảm bảo tưới đủ nước, giữ ẩm cho đất nhưng không để ngập úng.",
            "Bổ sung phân bón: Sử dụng phân bón có hàm lượng Kali cao (như Kali Sunfat) và bổ sung phân hữu cơ.",
            "Che chắn: Nếu cây ở vị trí nắng quá gắt, hãy dùng lưới lan để giảm cường độ ánh sáng."
          ]
        },
        recoveryEst: "14 - 21 Ngày"
      };

      await new Promise(r => setTimeout(r, 1500));
      setResult(diagnosis);
    } catch (err) {
      setError("Chẩn đoán thất bại. Vui lòng kiểm tra lại kết nối.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReport = () => {
    // In a real app, this would save to a database. 
    // For now we simulate success and close modal.
    setShowSaveModal(false);
    alert("Báo cáo đã được lưu vào hồ sơ cây trồng!");
  };

  return (
    <div className="max-w-4xl mx-auto py-6 md:py-12 px-4 md:px-6 animate-fade-in pb-32 font-body">
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="font-headline text-3xl md:text-5xl text-primary font-bold mb-3">Phòng Khám Thực Vật AI</h1>
        <p className="text-on-surface-variant text-base md:text-xl leading-relaxed max-w-2xl mx-auto px-4">Chúng tôi giúp bạn thấu hiểu ngôn ngữ của cây cối qua từng chiếc lá.</p>
      </div>

      <div className="space-y-6 md:space-y-10">
        {!result ? (
          <div className="space-y-6 md:space-y-8">
            <div className="relative group">
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                onChange={handleFileChange}
              />
              <div className={`w-full min-h-[280px] md:min-h-[350px] aspect-video rounded-[32px] md:rounded-[40px] border-4 border-dashed border-outline-variant bg-surface-container-low flex flex-col items-center justify-center transition-all group-hover:bg-surface-container-high ${image ? 'border-primary border-solid' : ''}`}>
                {image ? (
                  <img src={image} className="w-full h-full object-cover rounded-[28px] md:rounded-[36px]" referrerPolicy="no-referrer" />
                ) : (
                  <div className="text-center p-6 md:p-12">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-primary-container text-on-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <Camera className="h-8 w-8 md:h-10 md:w-10" />
                    </div>
                    <h3 className="font-headline text-2xl md:text-3xl text-primary mb-2 font-bold">Chụp ảnh lá cây</h3>
                    <p className="text-on-surface-variant text-sm md:text-lg font-medium italic">Bấm vào đây để chọn ảnh</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-surface-container-low p-6 md:p-8 rounded-[24px] md:rounded-[32px] space-y-4 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Bạn có thắc mắc gì không?
              </label>
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ví dụ: Tại sao lá cây bị vàng ở mép? Tôi có tưới nước quá nhiều không?"
                className="w-full bg-white border-2 border-outline-variant/30 rounded-xl md:rounded-2xl p-4 md:p-6 text-base md:text-lg focus:ring-4 focus:ring-primary/10 transition-all min-h-[120px] font-medium"
              />
            </div>
            
            {image && !loading && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleStartDiagnosis}
                className="w-full botanical-gradient text-on-primary py-5 md:py-6 rounded-2xl md:rounded-3xl font-bold text-lg md:text-xl flex items-center justify-center gap-3 shadow-2xl hover:opacity-95 transition-all"
              >
                <Send className="h-5 w-5 md:h-6 md:w-6" />
                Gửi hình ảnh chẩn đoán
              </motion.button>
            )}

            {loading && (
              <div className="flex flex-col items-center gap-4 md:gap-6 py-8 md:py-12">
                <div className="relative">
                  <Loader2 className="h-12 w-12 md:h-16 md:w-16 text-primary animate-spin" />
                </div>
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-headline text-primary font-bold animate-pulse">Hệ thống đang hội chẩn...</p>
                  <p className="text-xs md:text-on-surface-variant font-medium mt-1 italic">Quá trình này có thể mất vài giây</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 md:space-y-12"
          >
            {/* Header Result */}
            <div className="bg-surface-container-lowest rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-2xl border border-outline-variant/10">
               <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                  <div className="w-full md:w-2/5 shrink-0">
                    <div className="rounded-3xl overflow-hidden aspect-square shadow-xl border-4 md:border-8 border-surface-container-low ring-1 ring-outline-variant/20">
                      <img src={image!} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-6 md:space-y-8">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-error-container text-on-error-container px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3" />
                          {result.healthStatus}
                        </span>
                        <span className="bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          Hồi phục: {result.recoveryEst}
                        </span>
                      </div>
                      <h2 className="font-headline text-2xl md:text-4xl text-primary font-bold mb-1 leading-tight">{result.diagnosis}</h2>
                      <p className="text-sm md:text-lg italic text-secondary font-headline leading-relaxed">{result.scientificName}</p>
                    </div>

                    <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border-l-[6px] md:border-l-8 border-primary space-y-3">
                       <h4 className="font-headline text-xl md:text-2xl font-bold text-primary flex items-center gap-2 text-wrap">
                         <Info className="h-5 w-5 text-secondary" />
                         Tổng quan tình trạng
                       </h4>
                       <p className="text-base md:text-lg text-on-surface-variant leading-relaxed font-medium">
                         {result.summary}
                       </p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Detailed Cause Cards */}
            <section className="space-y-4 md:space-y-6">
               <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary flex items-center gap-3 ml-2">
                 <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-amber-600" />
                 Nguyên nhân chi tiết
               </h3>
               <div className="grid grid-cols-1 gap-4 md:gap-6">
                 {result.details.causes.map((cause: any, idx: number) => (
                   <motion.div 
                     key={idx}
                     className="bg-white p-6 md:p-10 rounded-[24px] md:rounded-[32px] shadow-lg border border-outline-variant/20 space-y-4 md:space-y-6"
                   >
                     <h4 className="font-headline text-lg md:text-2xl font-bold text-primary pb-3 border-b border-outline-variant/10">
                       {cause.title}
                     </h4>
                     <ul className="space-y-4 md:space-y-6">
                        {cause.items.map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 md:gap-4 items-start">
                             <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary text-sm md:text-base font-bold shrink-0 mt-0.5">
                               {i + 1}
                             </div>
                             <p className="text-base md:text-xl text-on-surface-variant font-medium leading-relaxed italic">{item}</p>
                          </li>
                        ))}
                     </ul>
                   </motion.div>
                 ))}
               </div>
            </section>

            {/* Action Steps */}
            <section className="bg-primary-container text-on-primary-container p-8 md:p-12 rounded-[32px] md:rounded-[48px] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10 hidden sm:block">
                 <Lightbulb className="w-48 h-48" />
               </div>
               <div className="relative z-10 space-y-6 md:space-y-10">
                  <h3 className="font-headline text-2xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-emerald-400" />
                    Cần thực hiện ngay
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:gap-8">
                     {result.details.actions.map((action: string, idx: number) => (
                       <div key={idx} className="flex gap-4 md:gap-6 items-start bg-white/10 p-5 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm border border-white/10">
                          <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-emerald-400 shrink-0 mt-0.5" />
                          <p className="text-lg md:text-2xl font-bold leading-tight">{action}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Control Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-12 pb-12">
              <button 
                onClick={() => setShowSaveModal(true)}
                className="flex-1 botanical-gradient text-on-primary py-5 md:py-6 rounded-2xl font-bold text-lg md:text-xl flex items-center justify-center gap-3 shadow-2xl active:scale-[0.98] transition-all"
              >
                <Save className="h-5 w-5" />
                Lưu vào hồ sơ
              </button>
              <button 
                onClick={() => {setResult(null); setImage(null); setQuestion("");}}
                className="flex-1 bg-surface-container-high text-on-surface py-5 md:py-6 rounded-2xl font-bold text-lg md:text-xl flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all"
              >
                Phân tích lại
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Save Modal UI */}
      <AnimatePresence>
        {showSaveModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-md"
              onClick={() => setShowSaveModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              className="fixed inset-x-4 bottom-4 md:inset-x-6 md:top-1/2 md:-translate-y-1/2 z-[101] max-w-lg mx-auto bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-12 shadow-2xl space-y-8 md:space-y-10"
            >
              <div className="text-center space-y-3">
                <h3 className="font-headline text-3xl md:text-4xl font-bold text-primary">Thông tin hồ sơ</h3>
                <p className="text-on-surface-variant font-medium text-base md:text-lg italic">Bổ sung thêm thông tin theo dõi.</p>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Người chăm sóc</label>
                  <input 
                    type="text" 
                    defaultValue="Hi Brother"
                    className="w-full bg-surface-container-low border-2 border-outline-variant/30 rounded-xl p-4 text-base font-bold text-primary"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Vị trí cây</label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-surface-container-low border-2 border-outline-variant/30 rounded-xl p-4 text-base font-bold text-primary"
                  >
                    <option>Ban công hướng Đông</option>
                    <option>Phòng khách</option>
                    <option>Sân thượng</option>
                    <option>Vườn nhà</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-outline">Ghi chú hôm nay</label>
                  <textarea 
                    value={saveNotes}
                    onChange={(e) => setSaveNotes(e.target.value)}
                    placeholder="Ví dụ: Đã cắt bỏ 3 lá bị héo..."
                    className="w-full bg-surface-container-low border-2 border-outline-variant/30 rounded-xl p-4 text-base font-medium min-h-[100px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleSaveReport}
                  className="w-full botanical-gradient text-on-primary py-5 rounded-2xl font-bold text-lg shadow-xl"
                >
                  Xác nhận lưu
                </button>
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="w-full text-outline font-bold py-2 text-sm uppercase tracking-widest"
                >
                  Hủy bỏ
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
