import React from 'react';
import { Volume2, VolumeX, Maximize, Minimize, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentSlideIndex: number;
  totalSlides: number;
  currentSlideTitle: string;
  isLeaderboardOpen: boolean;
  onToggleLeaderboard: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlideIndex,
  totalSlides,
  currentSlideTitle,
  onToggleLeaderboard,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [isMuted, setIsMuted] = React.useState(sound.getMuted());

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="w-full px-6 py-3 flex items-center justify-between border-b border-cyber-border/70 bg-cyber-dark/90 backdrop-blur-md z-40 relative">

      {/* Brand: Logo + Name */}
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-cyber-cyan/60 shadow-cyan-glow shrink-0">
          <img src="/access/images/logo.jpg" alt="CLB CNTT - HUMG" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-display font-black text-white" style={{ fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
              IT CLUB <span className="text-gradient-cyan">TEAM BATTLE</span>
            </span>
            <span className="px-2 py-0.5 rounded-full font-mono font-bold text-xs bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30">
              RISE UP
            </span>
          </div>
          <p className="font-sans text-xs text-slate-400 mt-0.5">CLB CNTT · Trường Đại học Mỏ - Địa chất</p>
        </div>
      </div>

      {/* Slide counter — readable */}
      <div className="hidden md:flex items-center gap-3 px-5 py-2 rounded-xl bg-cyber-card/80 border border-cyber-border">
        <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
        <span className="font-mono font-bold text-cyber-cyan" style={{ fontSize: '0.95rem' }}>
          {currentSlideIndex + 1} / {totalSlides}
        </span>
        <span className="text-cyber-border">|</span>
        <span className="font-sans text-slate-300 max-w-xs truncate" style={{ fontSize: '0.9rem' }}>
          {currentSlideTitle}
        </span>
      </div>

      {/* Tool buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleLeaderboard}
          title="Bảng điểm (L)"
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-display font-bold text-sm bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/35 text-amber-300 transition-all"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          Bảng điểm
          <kbd className="font-mono text-xs px-1.5 py-0.5 rounded bg-black/40 text-amber-300/70">L</kbd>
        </button>

        <button
          onClick={handleToggleMute}
          title="Âm thanh (M)"
          className={`p-2.5 rounded-xl border transition-all ${
            isMuted
              ? 'bg-rose-500/10 border-rose-500/35 text-rose-400'
              : 'bg-cyber-card border-cyber-border text-cyan-300 hover:border-cyber-cyan/50'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onToggleFullscreen}
          title="Toàn màn hình (F)"
          className="p-2.5 rounded-xl bg-cyber-card border border-cyber-border text-cyan-300 hover:border-cyber-cyan/50 transition-all"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
