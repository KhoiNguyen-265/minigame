import React from 'react';
import { PerspectiveTilt } from '../Motion3D';
import { CyberNetworkBg } from '../CyberNetworkBg';

export const LobbySlide: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between text-center px-8 sm:px-16 py-8 sm:py-12 select-none overflow-hidden">
      {/* Dynamic cyber constellation background */}
      <CyberNetworkBg />

      {/* Ambient soft glow spots for stage depth */}
      <div className="absolute w-[650px] h-[650px] rounded-full bg-cyan-500/15 blur-[150px] pointer-events-none top-[-10%] left-[-10%]" />
      <div className="absolute w-[550px] h-[550px] rounded-full bg-emerald-500/12 blur-[130px] pointer-events-none bottom-[-10%] right-[-10%]" />

      {/* ── 1. TOP BRAND HEADER: Thước kẻ công nghệ tạo điểm tựa thị giác ── */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-center gap-4 slide-enter">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-cyan-400" />
        <div className="px-5 py-1.5 rounded-full bg-cyber-card/80 border border-cyber-cyan/40 backdrop-blur-md shadow-cyan-glow flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
          <span className="font-sans text-xs sm:text-sm font-bold text-cyan-300 tracking-widest uppercase">
            CLB CÔNG NGHỆ THÔNG TIN · TRƯỜNG ĐẠI HỌC MỎ - ĐỊA CHẤT
          </span>
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-cyan-400/50 to-cyan-400" />
      </div>

      {/* ── 2. CENTER STAGE: Logo + Title cực đại, siêu tương phản cho máy chiếu ── */}
      <div className="relative z-10 flex flex-col items-center my-auto w-full max-w-5xl">
        {/* Logo CLB CNTT - HUMG với vầng hào quang kép */}
        <PerspectiveTilt className="relative mb-5 cursor-default" maxTilt={14}>
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-to-tr from-cyber-cyan via-cyan-300 to-cyber-mint shadow-cyan-lg mx-auto">
            <div className="w-full h-full rounded-full overflow-hidden bg-cyber-darkest p-[2.5px]">
              <img
                src="/access/images/logo.jpg"
                alt="CLB CNTT - HUMG"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Pulsing energy rings */}
            <div className="absolute -inset-2 rounded-full border border-cyber-cyan/40 animate-pulse pointer-events-none" />
            <div className="absolute -inset-4 rounded-full border border-cyber-cyan/20 animate-ping pointer-events-none opacity-40" />
          </div>
        </PerspectiveTilt>

        {/* TIÊU ĐỀ CHÍNH: To, rõ, tương phản tuyệt đối từ hàng ghế cuối hội trường */}
        <div className="flex flex-col items-center leading-none">
          <h1
            className="font-sans font-bold text-white tracking-normal uppercase slide-enter text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]"
            style={{ animationDelay: '0.08s' }}
          >
            IT CLUB
          </h1>

          <h1
            className="font-sans font-bold tracking-normal uppercase text-gradient-cyan slide-enter text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-1 drop-shadow-[0_0_50px_rgba(0,242,254,0.5)]"
            style={{ animationDelay: '0.14s' }}
          >
            MINIGAME TRI THỨC
          </h1>
        </div>

        {/* Thanh slogan phân cách sắc nét */}
        <div className="mt-6 flex items-center justify-center gap-3 slide-enter" style={{ animationDelay: '0.2s' }}>
          <span className="h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400" />
          <p className="font-sans text-base sm:text-xl md:text-2xl text-slate-100 font-bold tracking-wider uppercase">
            GIAO LƯU HỘI TRƯỜNG · GIƠ TAY NHẬN QUÀ LIỀN TAY
          </p>
          <span className="h-[2px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400" />
        </div>
      </div>

      {/* ── 3. BOTTOM FOOTER: Slogan tinh thần bứt phá RISE UP ── */}
      <div className="relative z-10 flex items-center justify-center gap-3 slide-enter" style={{ animationDelay: '0.26s' }}>
        <div className="px-6 py-2 rounded-xl bg-cyber-card/60 border border-cyber-border/80 backdrop-blur-md flex items-center gap-3">
          <span className="font-sans text-sm sm:text-base font-bold text-amber-400 tracking-widest uppercase shadow-sm">
            ★ RISE UP ★
          </span>
          <span className="text-slate-500 font-light">|</span>
          <span className="font-sans text-xs sm:text-sm text-cyan-300 font-semibold tracking-wider uppercase">
            HUMG IT CLUB 2026
          </span>
        </div>
      </div>
    </div>
  );
};
