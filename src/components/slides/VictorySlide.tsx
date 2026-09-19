import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, Share2, ThumbsUp } from 'lucide-react';
import { sound } from '../../utils/audio';
import { VictoryFireworks3D } from '../three/VictoryFireworks';

interface VictorySlideProps {
  onRestart?: () => void;
}

export const VictorySlide: React.FC<VictorySlideProps> = () => {
  const triggerConfetti = () => {
    confetti({ particleCount: 90, angle: 60, spread: 65, origin: { x: 0.05, y: 0.75 }, colors: ['#00f2fe', '#10b981', '#f59e0b', '#fff'] });
    confetti({ particleCount: 90, angle: 120, spread: 65, origin: { x: 0.95, y: 0.75 }, colors: ['#00f2fe', '#10b981', '#f59e0b', '#fff'] });
  };

  useEffect(() => {
    sound.playFanfare();
    triggerConfetti();
    const id = setInterval(triggerConfetti, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-6 sm:px-12 py-5 sm:py-7 max-w-6xl mx-auto overflow-hidden select-none">
      {/* Three.js Pháo hoa 3D sân khấu */}
      <VictoryFireworks3D />

      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none top-[-10%] left-[20%]" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none bottom-[-10%] right-[20%]" />

      {/* ── 1. TOP BRAND & TIÊU ĐỀ CHÍNH (ĐÃ BỎ DÒNG PHỤ THEO YÊU CẦU) ── */}
      <div className="text-center slide-enter relative z-10 pt-1">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-card/85 border border-cyber-cyan/40 backdrop-blur-md mb-2 shadow-cyan-glow">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
          <span className="font-sans text-xs sm:text-sm text-cyan-300 font-bold uppercase tracking-widest">
            CLB CÔNG NGHỆ THÔNG TIN · TRƯỜNG ĐẠI HỌC MỎ - ĐỊA CHẤT
          </span>
        </div>

        <h1 className="font-sans font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-normal leading-tight uppercase drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">
          CẢM ƠN TOÀN THỂ <span className="text-gradient-cyan">HỘI TRƯỜNG!</span>
        </h1>
      </div>

      {/* ── 2. CENTER STAGE: LOGO CLB IT & 3 THẺ TỔNG KẾT / KẾT NỐI ── */}
      <div className="relative z-10 flex flex-col items-center my-auto w-full max-w-5xl text-center slide-enter" style={{ animationDelay: '0.1s' }}>
        {/* Logo CLB CNTT HUMG với vầng sáng nổi bật */}
        <div className="relative mb-4 sm:mb-5">
          <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full p-[2.5px] bg-gradient-to-tr from-cyber-cyan via-cyan-300 to-cyber-mint shadow-cyan-glow mx-auto">
            <img
              src="/access/images/logo.jpg"
              alt="CLB CNTT HUMG"
              className="w-full h-full object-cover rounded-full bg-cyber-darkest"
            />
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-cyber-card/95 border border-cyber-cyan/50 font-sans font-bold text-[11px] sm:text-xs text-cyber-cyan whitespace-nowrap shadow-md">
            ★ CLB CNTT · HUMG ★
          </div>
        </div>

        {/* 3 Thẻ thông tin tổng kết & kết nối */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full">
          {/* Thẻ 1: 15 Phần quà */}
          <div className="p-4 sm:p-5 rounded-2xl bg-cyber-card/85 border border-cyber-cyan/40 backdrop-blur-xl text-center shadow-lg transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-xl bg-cyber-cyan/15 border border-cyber-cyan/40 flex items-center justify-center mx-auto mb-2 text-cyber-cyan">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-1">15 Phần Quà Trao Tay</h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
              Chúc mừng các bạn khán giả đã xuất sắc giơ tay nhanh và giải mã chuẩn xác các câu đố dí dỏm!
            </p>
          </div>

          {/* Thẻ 2: Hưởng ứng bùng nổ */}
          <div className="p-4 sm:p-5 rounded-2xl bg-cyber-card/85 border border-cyber-mint/40 backdrop-blur-xl text-center shadow-lg transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-xl bg-cyber-mint/15 border border-cyber-mint/40 flex items-center justify-center mx-auto mb-2 text-cyber-mint">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-1">Hưởng Ứng Bùng Nổ</h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
              Cảm ơn toàn thể hội trường HUMG đã cùng tạo nên bầu không khí vô cùng sôi động và vui tươi!
            </p>
          </div>

          {/* Thẻ 3: Kết nối CLB IT */}
          <a
            href="https://www.facebook.com/humgit"
            target="_blank"
            rel="noopener noreferrer"
            title="Bấm để truy cập Fanpage CLB CNTT HUMG"
            className="p-4 sm:p-5 rounded-2xl bg-cyber-card/85 border border-amber-500/40 backdrop-blur-xl text-center shadow-lg transition-all hover:scale-[1.02] hover:border-amber-400 block cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center mx-auto mb-2 text-amber-400">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-1">Kết Nối Cùng CLB</h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
              Theo dõi Fanpage CLB CNTT HUMG để đón chờ các sự kiện, workshop và thử thách công nghệ tiếp theo!
            </p>
          </a>
        </div>
      </div>

      {/* ── 3. BOTTOM FOOTER BANNER ── */}
      <div className="relative z-10 w-full max-w-5xl slide-enter pb-1" style={{ animationDelay: '0.2s' }}>
        <div className="w-full px-6 py-2.5 rounded-2xl bg-cyber-dark/85 border border-cyber-border/80 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm shadow-md">
          <a
            href="https://www.facebook.com/humgit"
            target="_blank"
            rel="noopener noreferrer"
            title="Mở Fanpage CLB CNTT HUMG (https://www.facebook.com/humgit)"
            className="font-sans text-cyan-300 hover:text-white font-bold flex items-center gap-2 transition-colors cursor-pointer hover:underline"
          >
            <Share2 className="w-4 h-4 text-cyber-cyan" /> Fanpage: facebook.com/humgit
          </a>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="font-sans text-amber-400 font-bold flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-amber-400" /> Sân chơi công nghệ sinh viên HUMG
          </span>
        </div>
      </div>
    </div>
  );
};
export default VictorySlide;
