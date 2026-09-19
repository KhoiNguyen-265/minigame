import React from 'react';
import { Headphones, Hand, Volume2 } from 'lucide-react';

export const Round2IntroSlide: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 sm:px-12 py-8 max-w-6xl mx-auto text-center select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none top-[-10%] left-[15%]" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none bottom-[-10%] right-[15%]" />

      {/* Top Tag */}
      <div className="mb-5 sm:mb-6 slide-enter relative z-10">
        <div className="inline-flex items-center px-5 py-2 rounded-full border border-cyber-cyan/50 bg-cyber-cyan/15 text-cyan-300 font-sans text-xs sm:text-sm font-bold shadow-cyan-glow tracking-wide">
          VÒNG 2 · 6 BÀI HÁT GIAI ĐIỆU BẮT TAI · GIƠ TAY NHẬN QUÀ LIỀN TAY
        </div>
      </div>

      {/* Center Section: Massive Title */}
      <div className="relative z-10 mb-4 sm:mb-5">
        <h1
          className="font-sans font-bold text-white tracking-normal uppercase slide-enter text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.2] drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]"
          style={{ animationDelay: '0.07s' }}
        >
          NGHE NHẠC <span className="text-gradient-cyan">ĐOÁN TÊN BÀI</span>
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className="font-sans text-sm sm:text-base md:text-lg text-slate-200 font-semibold max-w-3xl mx-auto mb-7 sm:mb-9 slide-enter leading-relaxed relative z-10"
        style={{ animationDelay: '0.14s' }}
      >
        Chuỗi 6 bài hát với giai điệu quen thuộc — lắng nghe giai điệu, nhanh nhạy nhận diện ca khúc, giơ tay thật nhanh để MC dừng nhạc và rinh quà IT!
      </p>

      {/* 3 Pro-tips Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 w-full max-w-5xl mb-7 sm:mb-8 slide-enter relative z-10"
        style={{ animationDelay: '0.2s' }}
      >
        {[
          {
            icon: Headphones,
            accent: 'border-cyber-cyan/40 bg-cyber-cyan/10',
            iconCls: 'text-cyber-cyan',
            title: 'Lắng Nghe Giai Điệu',
            body: 'Để ý tiếng nhạc dạo mở đầu, điệp khúc, tiết tấu và phong cách phối khí đặc trưng.',
          },
          {
            icon: Volume2,
            accent: 'border-cyber-mint/40 bg-cyber-mint/10',
            iconCls: 'text-cyber-mint',
            title: 'Nhận Diện Ca Sĩ',
            body: 'Chất giọng ca sĩ và ca từ là manh mối nhanh nhất giúp bạn gọi tên chuẩn xác bài hát.',
          },
          {
            icon: Hand,
            accent: 'border-amber-500/40 bg-amber-500/10',
            iconCls: 'text-amber-400',
            title: 'Nhanh Tay Giơ Tay',
            body: 'Khi nhận ra bài hát, giơ tay thật nhanh và cao để MC gọi tên rinh quà liền tay.',
          },
        ].map(({ icon: Icon, accent, iconCls, title, body }) => (
          <div
            key={title}
            className={`p-5 sm:p-6 rounded-2xl border ${accent} text-left bg-cyber-card/75 backdrop-blur-xl shadow-lg transition-all hover:scale-[1.02]`}
          >
            <div className="mb-3">
              <Icon className={`w-7 h-7 ${iconCls}`} />
            </div>
            <h3 className="font-sans font-bold text-lg sm:text-xl text-white mb-2">{title}</h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Scoring Rules Bottom Bar */}
      <div
        className="inline-flex items-center gap-6 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-cyber-card/90 border border-cyber-border/80 font-sans text-sm sm:text-base slide-enter shadow-lg relative z-10"
        style={{ animationDelay: '0.26s' }}
      >
        <span className="flex items-center gap-2 text-emerald-400 font-bold">
          Đoán ĐÚNG → <strong className="font-sans font-bold text-emerald-300 text-lg">NHẬN 01 PHẦN QUÀ</strong>
        </span>
        <span className="text-cyber-border text-xl font-light">|</span>
        <span className="text-cyan-300 font-bold">
          Nhạc phát liên tục đến khi có khán giả giơ tay!
        </span>
      </div>
    </div>
  );
};
export default Round2IntroSlide;