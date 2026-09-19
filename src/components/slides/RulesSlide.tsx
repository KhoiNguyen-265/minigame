import React from 'react';
import { Eye, Hand, Gift } from 'lucide-react';

export const RulesSlide: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-6 sm:px-12 py-6 max-w-6xl mx-auto text-center select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none top-[-10%] left-[20%]" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none bottom-[-10%] right-[15%]" />

      {/* ── CENTER SECTION: TITLE + 3 RULES CARDS ── */}
      <div className="relative z-10 w-full flex flex-col items-center my-auto max-w-5xl">
        <h2
          className="font-sans font-bold text-white tracking-normal uppercase slide-enter text-4xl sm:text-5xl md:text-6xl mb-8"
          style={{ animationDelay: '0.06s' }}
        >
          THỂ LỆ <span className="text-gradient-cyan">GIƠ TAY NHẬN QUÀ</span>
        </h2>

        {/* 3 Steps Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full slide-enter"
          style={{ animationDelay: '0.18s' }}
        >
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-cyber-cyan/40 bg-cyber-card/75 backdrop-blur-xl shadow-cyan-glow flex flex-col items-center text-center transition-all hover:scale-[1.02]">
            <div className="w-16 h-16 rounded-2xl bg-cyber-cyan/15 border border-cyber-cyan/50 flex items-center justify-center mb-4 text-cyber-cyan">
              <Eye className="w-8 h-8" />
            </div>
            <span className="font-sans text-xs font-bold text-cyber-cyan uppercase tracking-widest mb-1">
              BƯỚC 1
            </span>
            <h3 className="font-sans font-bold text-xl text-white mb-2">
              Lắng Nghe & Quan Sát
            </h3>
            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              Theo dõi câu hỏi trên màn hình chiếu, nghe đoạn nhạc gợi ý hoặc giải mã hình ảnh câu đố IT.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-cyber-mint/40 bg-cyber-card/75 backdrop-blur-xl shadow-mint-glow flex flex-col items-center text-center transition-all hover:scale-[1.02]">
            <div className="w-16 h-16 rounded-2xl bg-cyber-mint/15 border border-cyber-mint/50 flex items-center justify-center mb-4 text-cyber-mint">
              <Hand className="w-8 h-8" />
            </div>
            <span className="font-sans text-xs font-bold text-cyber-mint uppercase tracking-widest mb-1">
              BƯỚC 2
            </span>
            <h3 className="font-sans font-bold text-xl text-white mb-2">
              Giơ Tay Nhanh Nhất
            </h3>
            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              Khi MC phát hiệu lệnh, nhanh chóng giơ tay thật cao và dứt khoát để giành quyền đứng dậy trả lời.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-amber-500/40 bg-cyber-card/75 backdrop-blur-xl shadow-amber-glow flex flex-col items-center text-center transition-all hover:scale-[1.02]">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/50 flex items-center justify-center mb-4 text-amber-400">
              <Gift className="w-8 h-8 animate-bounce" />
            </div>
            <span className="font-sans text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              BƯỚC 3
            </span>
            <h3 className="font-sans font-bold text-xl text-white mb-2">
              Rinh Quà Về Liền Tay
            </h3>
            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              Trả lời <span className="text-emerald-400 font-bold">ĐÚNG</span> nhận ngay phần quà từ BTC. Trả lời chưa chính xác, cơ hội chuyển cho bạn tiếp theo!
            </p>
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM FOOTER ── */}
      <div className="relative z-10 slide-enter pb-2" style={{ animationDelay: '0.24s' }}>
        <div className="px-6 py-2.5 rounded-xl bg-cyber-card/60 border border-cyber-border/80 backdrop-blur-md flex items-center gap-3">
          <span className="font-sans text-xs sm:text-sm font-bold text-amber-400 tracking-wider uppercase">
            ★ TỰ TIN BỨT PHÁ
          </span>
          <span className="text-slate-500 font-light">|</span>
          <span className="font-sans text-xs sm:text-sm text-slate-200 font-semibold">
            15 CÂU HỎI ĐỐ VUI HẤP DẪN QUA 2 VÒNG THI · 15 PHẦN QUÀ ĐANG CHỜ ĐÓN BẠN!
          </span>
        </div>
      </div>
    </div>
  );
};
export default RulesSlide;
