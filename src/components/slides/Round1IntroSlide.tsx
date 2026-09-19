import React from 'react';
import { Eye, KeyRound, Hand } from 'lucide-react';

export const Round1IntroSlide: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-6 sm:px-12 py-5 sm:py-7 max-w-5xl mx-auto text-center select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none top-[-10%] left-[15%]" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none bottom-[-10%] right-[15%]" />

      {/* ── 1. TOP BADGE ── */}
      <div className="slide-enter relative z-10 pt-1">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyber-mint/50 bg-cyber-mint/15 text-cyber-mint font-sans text-xs font-bold shadow-mint-glow tracking-widest uppercase">
          VÒNG 1 · 9 CÂU ĐỐ HÌNH ẢNH DÍ DỎM
        </div>
      </div>

      {/* ── 2. CENTER STAGE: TIÊU ĐỀ 1 DÒNG TO RÕ & 3 THẺ TỐI GIẢN ── */}
      <div className="relative z-10 flex flex-col items-center my-auto w-full max-w-4xl text-center slide-enter" style={{ animationDelay: '0.08s' }}>
        {/* Tiêu đề 1 dòng duy nhất — font-bold chuẩn tiếng Việt, giữ nguyên trọn vẹn dấu sắc chữ BẮT */}
        <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-white leading-normal pt-2 pb-1 mb-6 sm:mb-8 drop-shadow-[0_0_35px_rgba(0,242,254,0.3)] overflow-visible">
          ĐUỔI HÌNH <span className="text-gradient-cyan">BẮT CHỮ</span>
        </h1>

        {/* 3 Thẻ mẹo chơi: Gọn gàng, vừa vặn mọi màn hình */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 w-full">
          <div className="p-4 sm:p-5 rounded-2xl border border-cyber-cyan/40 bg-cyber-card/85 backdrop-blur-xl text-center shadow-lg transition-all hover:scale-[1.03] flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-cyber-cyan/15 border border-cyber-cyan/40 flex items-center justify-center mb-2.5 text-cyber-cyan">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-1">Quan Sát Chi Tiết</h3>
            <p className="font-sans text-xs sm:text-sm text-cyan-300/80 font-medium">Hình ảnh & gợi ý ẩn dụ</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-cyber-mint/40 bg-cyber-card/85 backdrop-blur-xl text-center shadow-lg transition-all hover:scale-[1.03] flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-cyber-mint/15 border border-cyber-mint/40 flex items-center justify-center mb-2.5 text-cyber-mint">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-1">Gợi Ý Ô Chữ</h3>
            <p className="font-sans text-xs sm:text-sm text-emerald-300/80 font-medium">Số từ & số chữ cái</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/40 bg-cyber-card/85 backdrop-blur-xl text-center shadow-lg transition-all hover:scale-[1.03] flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center mb-2.5 text-amber-400">
              <Hand className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-1">Nhanh Tay Giơ Tay</h3>
            <p className="font-sans text-xs sm:text-sm text-amber-300/80 font-medium">Giành quyền trả lời</p>
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM SCORING BAR: GỌN GÀNG, DỄ ĐỌC ── */}
      <div className="slide-enter relative z-10 pb-1" style={{ animationDelay: '0.16s' }}>
        <div className="inline-flex items-center gap-4 sm:gap-6 px-6 py-2.5 rounded-xl bg-cyber-card/90 border border-cyber-border/80 font-sans text-xs sm:text-sm shadow-lg">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            Trả lời ĐÚNG → <strong className="font-sans font-bold text-emerald-300 text-base">NHẬN 01 PHẦN QUÀ</strong>
          </span>
          <span className="text-cyber-border text-lg font-light">|</span>
          <span className="text-amber-400 font-bold">
            Trả lời SAI → Chuyển lượt cho bạn khác
          </span>
        </div>
      </div>
    </div>
  );
};
export default Round1IntroSlide;
