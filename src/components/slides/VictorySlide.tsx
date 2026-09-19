import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Share2, ThumbsUp } from 'lucide-react';
import { sound } from '../../utils/audio';

interface VictorySlideProps {
  onRestart?: () => void;
}

export const VictorySlide: React.FC<VictorySlideProps> = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      angle: 60,
      spread: 65,
      origin: { x: 0.05, y: 0.75 },
      colors: ['#00f2fe', '#10b981', '#f59e0b', '#fff'],
    });
    confetti({
      particleCount: 90,
      angle: 120,
      spread: 65,
      origin: { x: 0.95, y: 0.75 },
      colors: ['#00f2fe', '#10b981', '#f59e0b', '#fff'],
    });
  };

  useEffect(() => {
    sound.playFanfare();
    triggerConfetti();
    const id = setInterval(triggerConfetti, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-6 sm:px-12 py-5 sm:py-8 max-w-6xl mx-auto overflow-hidden select-none text-center">
      {/* Ambient background glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/12 blur-[160px] pointer-events-none top-[-10%] left-[15%]" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/12 blur-[160px] pointer-events-none bottom-[-10%] right-[15%]" />

      {/* ── 1. TOP BADGE: Tách riêng ở đỉnh slide ── */}
      <div className="slide-enter relative z-10 pt-2 mb-2 sm:mb-4">
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-cyber-card/85 border border-cyber-cyan/40 backdrop-blur-md shadow-cyan-glow">
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-ping" />
          <span className="font-sans text-xs sm:text-sm text-cyan-300 font-bold uppercase tracking-widest">
            CLB CÔNG NGHỆ THÔNG TIN · TRƯỜNG ĐẠI HỌC MỎ - ĐỊA CHẤT
          </span>
        </div>
      </div>

      {/* ── 2. CENTER STAGE: TIÊU ĐỀ NỔI BẬT + LOGO + HẸN GẶP LẠI ── */}
      <div className="relative z-10 flex flex-col items-center my-auto w-full max-w-4xl text-center slide-enter" style={{ animationDelay: '0.08s' }}>
        {/* Tiêu đề chính 2 dòng tách biệt có gap rộng rãi, tuyệt đối không bị dính sát/đè dấu */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-7 overflow-visible">
          <h2 className="font-sans font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide uppercase leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            CẢM ƠN TOÀN THỂ
          </h2>
          <h1 className="font-sans font-bold text-gradient-cyan text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider uppercase leading-tight drop-shadow-[0_0_45px_rgba(0,242,254,0.4)]">
            HỘI TRƯỜNG!
          </h1>
        </div>

        {/* Logo CLB CNTT HUMG với vầng hào quang công nghệ */}
        <div className="relative mb-6 sm:mb-7">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full p-[3px] bg-gradient-to-tr from-cyber-cyan via-cyan-300 to-cyber-mint shadow-cyan-lg mx-auto">
            <div className="w-full h-full rounded-full overflow-hidden bg-cyber-darkest p-[2.5px]">
              <img
                src="/access/images/logo.jpg"
                alt="CLB CNTT HUMG"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Vòng hào quang tỏa sáng */}
            <div className="absolute -inset-2 rounded-full border border-cyber-cyan/40 animate-pulse pointer-events-none" />
            <div className="absolute -inset-4 rounded-full border border-cyber-cyan/20 animate-ping pointer-events-none opacity-30" />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyber-card/95 border border-cyber-cyan/60 font-sans font-bold text-xs sm:text-sm text-cyber-cyan whitespace-nowrap shadow-lg">
            ★ CLB CNTT · HUMG ★
          </div>
        </div>

        {/* Thông điệp hẹn gặp lại */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400" />
          <p className="font-sans text-sm sm:text-lg md:text-xl text-slate-100 font-bold tracking-wider uppercase">
            HẸN GẶP LẠI Ở CÁC SỰ KIỆN & THỬ THÁCH TIẾP THEO!
          </p>
          <span className="h-[2px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400" />
        </div>
      </div>

      {/* ── 3. BOTTOM FOOTER BANNER: KẾT NỐI FANPAGE & TINH THẦN CLB ── */}
      <div className="relative z-10 w-full max-w-4xl slide-enter pb-1" style={{ animationDelay: '0.16s' }}>
        <div className="w-full px-6 sm:px-8 py-3 rounded-2xl bg-cyber-dark/85 border border-cyber-border/80 flex flex-wrap items-center justify-around gap-4 sm:gap-6 text-xs sm:text-sm shadow-xl backdrop-blur-md">
          <a
            href="https://www.facebook.com/humgit"
            target="_blank"
            rel="noopener noreferrer"
            title="Mở Fanpage CLB CNTT HUMG (https://www.facebook.com/humgit)"
            className="font-sans text-cyan-300 hover:text-white font-bold flex items-center gap-2.5 transition-colors cursor-pointer hover:underline"
          >
            <Share2 className="w-5 h-5 text-cyber-cyan" /> Fanpage: facebook.com/humgit
          </a>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="font-sans text-amber-400 font-bold flex items-center gap-2.5">
            <ThumbsUp className="w-5 h-5 text-amber-400" /> Sân chơi công nghệ sinh viên HUMG
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="font-sans text-emerald-400 font-bold tracking-wider uppercase">
            ★ RISE UP ★
          </span>
        </div>
      </div>
    </div>
  );
};
export default VictorySlide;
