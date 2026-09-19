import React from 'react';
import { Eye, KeyRound, Hand } from 'lucide-react';

export const Round1IntroSlide: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 sm:px-12 py-8 max-w-6xl mx-auto text-center select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none top-[-10%] left-[15%]" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none bottom-[-10%] right-[15%]" />

      {/* Top Tag */}
      <div className="mb-5 sm:mb-6 slide-enter relative z-10">
        <div className="inline-flex items-center px-5 py-2 rounded-full border border-cyber-mint/50 bg-cyber-mint/15 text-cyber-mint font-sans text-xs sm:text-sm font-bold shadow-mint-glow tracking-wide">
          9 CÂU ĐỐ ĐUỔI HÌNH BẮT CHỮ · GIƠ TAY NHẬN QUÀ LIỀN TAY
        </div>
      </div>

      {/* Center Section: Title với khoảng cách thoáng, không bị cấn dấu */}
      <div className="relative z-10 mb-4 sm:mb-5">
        <h1
          className="font-sans font-bold text-white tracking-normal uppercase slide-enter text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.2] drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]"
          style={{ animationDelay: '0.07s' }}
        >
          ĐUỔI HÌNH <span className="text-gradient-cyan">BẮT CHỮ</span>
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className="font-sans text-sm sm:text-base md:text-lg text-slate-200 font-semibold max-w-3xl mx-auto mb-7 sm:mb-9 slide-enter leading-relaxed relative z-10"
        style={{ animationDelay: '0.14s' }}
      >
        Chuỗi 9 câu đố hình ảnh dí dỏm, bất ngờ — thử thách khả năng liên tưởng, độ nhạy bén và rinh quà IT!
      </p>

      {/* 3 Pro-tips Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 w-full max-w-5xl mb-7 sm:mb-8 slide-enter relative z-10"
        style={{ animationDelay: '0.2s' }}
      >
        {[
          {
            icon: Eye,
            accent: 'border-cyber-cyan/40 bg-cyber-cyan/10',
            iconCls: 'text-cyber-cyan',
            title: 'Quan Sát Chi Tiết',
            body: 'Để ý vị trí, hành động, chữ cái, khoảng cách và các phép ẩn dụ trong ảnh.',
          },
          {
            icon: KeyRound,
            accent: 'border-cyber-mint/40 bg-cyber-mint/10',
            iconCls: 'text-cyber-mint',
            title: 'Gợi Ý Ô Chữ',
            body: 'Xem kỹ số lượng từ, số chữ cái và ký tự gợi ý hiển thị trên màn hình.',
          },
          {
            icon: Hand,
            accent: 'border-amber-500/40 bg-amber-500/10',
            iconCls: 'text-amber-400',
            title: 'Nhanh Tay Giơ Tay',
            body: 'Khi lóe lên ý tưởng, giơ tay thật nhanh và cao để MC gọi tên rinh quà.',
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
          Trả lời ĐÚNG → <strong className="font-sans font-bold text-emerald-300 text-lg">NHẬN 01 PHẦN QUÀ</strong>
        </span>
        <span className="text-cyber-border text-xl font-light">|</span>
        <span className="text-amber-400 font-bold">
          Trả lời SAI → CHUYỂN LƯỢT CHO KHÁN GIẢ KHÁC
        </span>
      </div>
    </div>
  );
};
export default Round1IntroSlide;
