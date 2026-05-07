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
    <div className="max-w-4xl mx-auto py-12 px-6 animate-fade-in pb-32 font-body">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl text-primary font-bold mb-4">Phòng Khám Thực Vật AI</h1>
        <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl mx-auto">Chúng tôi giúp bạn thấu hiểu ngôn ngữ của cây cối qua từng chiếc lá.</p>
      </div>

      <div className="space-y-10">
        {!result ? (
          <div className="space-y-8">
            <div className="relative group">
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                onChange={handleFileChange}
              />
              <div className={`w-full min-h-[350px] aspect-video rounded-[40px] border-4 border-dashed border-outline-variant bg-surface-container-low flex flex-col items-center justify-center transition-all group-hover:bg-surface-container-high ${image ? 'border-primary border-solid' : ''}`}>
                {image ? (
                  <img src={image} className="w-full h-full object-cover rounded-[36px]" referrerPolicy="no-referrer" />
                ) : (
                  <div className="text-center p-12">
                    <div className="w-24 h-24 bg-primary-container text-on-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <Camera className="h-10 w-10" />
                    </div>
                    <h3 className="font-headline text-3xl text-primary mb-3 font-bold">Chụp ảnh lá cây</h3>
                    <p className="text-on-surface-variant text-lg font-medium italic">Bấm vào đây để chọn ảnh từ điện thoại của bạn</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-surface-container-low p-8 rounded-[32px] space-y-4 shadow-sm">
              <label className="text-sm font-bold uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Bạn có thắc mắc gì không?
              </label>
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ví dụ: Tại sao lá cây bị vàng ở mép? Tôi có tưới nước quá nhiều không?"
                className="w-full bg-white border-2 border-outline-variant/30 rounded-2xl p-6 text-lg focus:ring-4 focus:ring-primary/10 transition-all min-h-[140px] font-medium"
              />
            </div>
            
            {image && !loading && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleStartDiagnosis}
                className="w-full botanical-gradient text-on-primary py-6 rounded-3xl font-bold text-xl flex items-center justify-center gap-3 shadow-2xl hover:opacity-95 active:scale-[0.98] transition-all"
              >
                <Send className="h-6 w-6" />
                Bấm để xem phân tích ngay
              </motion.button>
            )}

            {loading && (
              <div className="flex flex-col items-center gap-6 py-12">
                <div className="relative">
                  <Loader2 className="h-16 w-16 text-primary animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-headline text-primary font-bold animate-pulse">Hệ thống đang hội chẩn...</p>
                  <p className="text-on-surface-variant font-medium mt-2 italic">Quá trình này có thể mất 5-10 giây</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-error-container text-on-error-container p-8 rounded-3xl flex items-center gap-5 border-2 border-error/20">
                <AlertCircle className="h-8 w-8 shrink-0" />
                <p className="text-lg font-bold">{error}</p>
              </div>
            )}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Header Result */}
            <div className="bg-surface-container-lowest rounded-[40px] p-10 shadow-2xl border border-outline-variant/10">
               <div className="flex flex-col md:flex-row gap-12">
                  <div className="md:w-2/5 shrink-0">
                    <div className="rounded-[32px] overflow-hidden aspect-square shadow-xl border-8 border-surface-container-low ring-1 ring-outline-variant/20">
                      <img src={image!} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-8">
                    <div>
                      <div className="flex gap-3 mb-4">
                        <span className="bg-error-container text-on-error-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          {result.healthStatus}
                        </span>
                        <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                          Hồi phục: {result.recoveryEst}
                        </span>
                      </div>
                      <h2 className="font-headline text-4xl text-primary font-bold mb-2 leading-tight">{result.diagnosis}</h2>
                      <p className="text-lg italic text-secondary font-headline leading-relaxed">{result.scientificName}</p>
                    </div>

                    <div className="bg-surface-container-low p-8 rounded-3xl border-l-8 border-primary space-y-4">
                       <h4 className="font-headline text-2xl font-bold text-primary flex items-center gap-3">
                         <Info className="h-6 w-6 text-secondary" />
                         Tổng quan tình trạng
                       </h4>
                       <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
                         {result.summary}
                       </p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Detailed Cause Cards */}
            <section className="space-y-6">
               <h3 className="font-headline text-3xl font-bold text-primary flex items-center gap-3 ml-2">
                 <AlertTriangle className="h-8 w-8 text-amber-600" />
                 Nguyên nhân chi tiết
               </h3>
               <div className="grid grid-cols-1 gap-6">
                 {result.details.causes.map((cause: any, idx: number) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="bg-white p-10 rounded-[32px] shadow-lg border border-outline-variant/20 space-y-6"
                   >
                     <h4 className="font-headline text-2xl font-bold text-primary pb-4 border-b border-outline-variant/10">
                       {cause.title}
                     </h4>
                     <ul className="space-y-6">
                        {cause.items.map((item: string, i: number) => (
                          <li key={i} className="flex gap-4 items-start">
                             <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary font-bold shrink-0 mt-1">
                               {i + 1}
                             </div>
                             <p className="text-xl text-on-surface-variant font-medium leading-relaxed italic">{item}</p>
                          </li>
                        ))}
                     </ul>
                   </motion.div>
                 ))}
               </div>
            </section>

            {/* Action Steps */}
            <section className="bg-primary-container text-on-primary-container p-12 rounded-[48px] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10">
                 <Lightbulb className="w-48 h-48" />
               </div>
               <div className="relative z-10 space-y-10">
                  <h3 className="font-headline text-4xl font-bold mb-2 flex items-center gap-4">
                    <CheckCircle className="h-10 w-10 text-emerald-400" />
                    Cần thực hiện ngay (Phác đồ xử lý)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                     {result.details.actions.map((action: string, idx: number) => (
                       <div key={idx} className="flex gap-6 items-start bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                          <CheckCircle className="h-8 w-8 text-emerald-400 shrink-0 mt-1" />
                          <p className="text-2xl font-bold leading-tight">{action}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Control Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-12 pb-12">
              <button 
                onClick={() => setShowSaveModal(true)}
                className="flex-1 botanical-gradient text-on-primary py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Save className="h-6 w-6" />
                Lưu vào hồ sơ cây trồng
              </button>
              <button 
                onClick={() => {setResult(null); setImage(null); setQuestion("");}}
                className="flex-1 bg-surface-container-high text-on-surface py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all"
              >
                Bắt đầu phân tích mới
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-[101] max-w-lg mx-auto bg-white rounded-[48px] p-12 shadow-2xl space-y-10"
            >
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-secondary-container text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Save className="h-10 w-10" />
                </div>
                <h3 className="font-headline text-4xl font-bold text-primary">Thông tin hồ sơ</h3>
                <p className="text-on-surface-variant font-medium text-lg">Bổ sung thêm thông tin để tiện theo dõi quá trình phục hồi.</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-outline flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Người chăm sóc
                  </label>
                  <input 
                    type="text" 
                    defaultValue="Hi Brother"
                    className="w-full bg-surface-container-low border-2 border-outline-variant/30 rounded-2xl p-5 text-lg font-bold text-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-outline flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Vị trí cây đặt
                  </label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-surface-container-low border-2 border-outline-variant/30 rounded-2xl p-5 text-lg font-bold text-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  >
                    <option>Ban công hướng Đông</option>
                    <option>Phòng khách</option>
                    <option>Sân thượng</option>
                    <option>Vườn nhà</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-outline flex items-center gap-2 font-headline">
                    <ClipboardList className="h-4 w-4" />
                    Ghi chú thêm (Tình trạng hôm nay)
                  </label>
                  <textarea 
                    value={saveNotes}
                    onChange={(e) => setSaveNotes(e.target.value)}
                    placeholder="Ví dụ: Đã cắt bỏ 3 lá bị héo nặng nhất, bón lót k-sunfat..."
                    className="w-full bg-surface-container-low border-2 border-outline-variant/30 rounded-2xl p-5 text-lg font-medium focus:ring-4 focus:ring-primary/10 transition-all min-h-[120px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleSaveReport}
                  className="w-full botanical-gradient text-on-primary py-6 rounded-2xl font-bold text-xl shadow-xl hover:opacity-90 transition-all"
                >
                  Xác nhận lưu báo cáo
                </button>
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="w-full text-outline font-bold py-2 hover:text-primary transition-colors uppercase tracking-widest text-sm"
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
