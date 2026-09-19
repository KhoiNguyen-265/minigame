import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronUp, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { Team } from '../types/game';

interface HostBarProps {
  currentSlideIndex: number;
  totalSlides: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  // Timer
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer?: () => void;
  // Reveal
  isRevealed: boolean;
  onToggleReveal: () => void;
  // Question & Teams
  isQuestionSlide: boolean;
  teams: Team[];
  selectedTeamId: number | null;
  onSelectTeam: (teamId: number) => void;
  onScoreCorrect: () => void;
  onScoreWrong: () => void;
  isStealMode: boolean;
  failedTeamIds: number[];
}

export const HostBar: React.FC<HostBarProps> = ({
  currentSlideIndex,
  totalSlides,
  onPrevSlide,
  onNextSlide,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  isRevealed,
  onToggleReveal,
  isQuestionSlide,
  teams,
  selectedTeamId,
  onSelectTeam,
  onScoreCorrect,
  onScoreWrong,
  isStealMode,
  failedTeamIds,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
      {/* Collapse/Expand toggle handle */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-0.5 text-[10px] font-mono rounded-t-lg bg-cyber-card/90 hover:bg-cyber-card border-t border-x border-cyber-border text-cyan-300/70 hover:text-cyan-300 flex items-center gap-1 backdrop-blur-md"
        >
          <ChevronUp className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          MC CONTROLLER
        </button>
      </div>

      {isExpanded && (
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-cyber-dark/95 border border-cyber-cyan/30 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,242,254,0.15)] backdrop-blur-xl">
          {/* 1. Slide Navigation (< and >) */}
          <div className="flex items-center gap-1 bg-cyber-card/80 p-1 rounded-xl border border-cyber-border">
            <button
              onClick={onPrevSlide}
              disabled={currentSlideIndex === 0}
              title="Lùi slide (Phím < hoặc mũi tên Trái)"
              className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-cyan-300 transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <kbd className="text-[10px] font-mono opacity-60">&lt;</kbd>
            </button>

            <span className="text-xs font-mono font-bold text-slate-300 px-2 min-w-[50px] text-center">
              {currentSlideIndex + 1}/{totalSlides}
            </span>

            <button
              onClick={onNextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              title="Tiến slide (Phím > hoặc mũi tên Phải)"
              className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-cyan-300 transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <kbd className="text-[10px] font-mono opacity-60">&gt;</kbd>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Timer & Reveal (if on question slide or team-setup) */}
          {isQuestionSlide && (
            <div className="flex items-center gap-1.5 bg-cyber-card/80 p-1 rounded-xl border border-cyber-border">
              <button
                onClick={onToggleTimer}
                title="Bấm giờ đếm ngược (Phím Space)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isTimerRunning
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse'
                    : 'bg-cyan-500/20 text-cyber-cyan border border-cyber-cyan/50 hover:bg-cyan-500/30'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'DỪNG' : 'BẤM GIỜ'}</span>
                <kbd className="text-[9px] font-mono px-1 rounded bg-black/40">Space</kbd>
              </button>

              {onResetTimer && (
                <button
                  onClick={onResetTimer}
                  title="Đặt lại đồng hồ"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={onToggleReveal}
                title="Lật mở đáp án (Phím R hoặc Enter)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isRevealed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isRevealed ? 'ẨN ĐÁP ÁN' : 'MỞ ĐÁP ÁN'}</span>
                <kbd className="text-[9px] font-mono px-1 rounded bg-black/40">R</kbd>
              </button>
            </div>
          )}

          {/* 3. Team Selection & Scoring (if on question slide) */}
          {isQuestionSlide && (
            <div className="flex items-center gap-1 bg-cyber-card/80 p-1 rounded-xl border border-cyber-border">
              <span className="text-[10px] font-mono text-cyan-200/50 px-1 hidden xl:inline">CHỌN ĐỘI:</span>
              <div className="flex items-center gap-1">
                {teams.map((t, idx) => {
                  const isSelected = selectedTeamId === t.id;
                  const isFailed = failedTeamIds.includes(t.id);

                  return (
                    <button
                      key={t.id}
                      onClick={() => onSelectTeam(t.id)}
                      disabled={isFailed}
                      title={`Chọn ${t.name} (Phím ${idx + 1})`}
                      style={{
                        borderColor: isSelected ? t.color : undefined,
                        boxShadow: isSelected ? `0 0 12px ${t.color}` : undefined
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-white/15 text-white scale-105'
                          : isFailed
                          ? 'opacity-30 line-through bg-black/30 border-transparent text-slate-500 cursor-not-allowed'
                          : 'bg-black/20 hover:bg-black/40 border-transparent text-slate-300'
                      }`}
                    >
                      <span 
                        className="w-2 h-2 rounded-full inline-block" 
                        style={{ backgroundColor: t.color }}
                      />
                      <span className="max-w-[80px] truncate">{t.name}</span>
                      <kbd className="text-[9px] font-mono opacity-70">[{idx + 1}]</kbd>
                    </button>
                  );
                })}
              </div>

              {/* Steal alert indicator */}
              {isStealMode && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/50 text-rose-300 text-[10px] font-bold animate-pulse">
                  <Zap className="w-3 h-3" />
                  <span>CƯỚP LƯỢT!</span>
                </div>
              )}

              <div className="h-5 w-px bg-cyber-border mx-1"></div>

              {/* Score Correct / Wrong */}
              <button
                onClick={onScoreCorrect}
                disabled={!selectedTeamId}
                title="Cộng 10 điểm ĐÚNG (Phím C)"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-30 border border-emerald-500/50 text-emerald-300 text-xs font-bold transition-all shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>+10 (ĐÚNG)</span>
                <kbd className="text-[9px] font-mono px-1 rounded bg-black/40">C</kbd>
              </button>

              <button
                onClick={onScoreWrong}
                disabled={!selectedTeamId}
                title="Báo SAI & Chuyển cướp lượt (Phím X)"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 disabled:opacity-30 border border-rose-500/50 text-rose-300 text-xs font-bold transition-all"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>SAI</span>
                <kbd className="text-[9px] font-mono px-1 rounded bg-black/40">X</kbd>
              </button>
            </div>
          )}

          {/* Help popover toggle */}
          <div className="relative">
            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              title="Xem danh sách phím tắt điều khiển"
              className="p-2 rounded-lg bg-cyber-card/80 hover:bg-cyber-card border border-cyber-border text-cyan-300/70 hover:text-cyan-300"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showShortcuts && (
              <div className="absolute bottom-full right-0 mb-3 w-80 p-4 rounded-xl bg-cyber-dark/95 border border-cyber-cyan/40 shadow-2xl backdrop-blur-xl text-xs space-y-2 text-slate-300">
                <div className="flex items-center justify-between border-b border-cyber-border pb-2">
                  <h4 className="font-display font-bold text-cyber-cyan">PHÍM TẮT ĐIỀU KHIỂN</h4>
                  <span className="text-[10px] font-mono text-cyan-400">PowerPoint Style</span>
                </div>
                <div className="grid grid-cols-2 gap-y-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-cyan-300">&gt;</kbd>
                    <span className="text-slate-300">Tiến slide</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-cyan-300">&lt;</kbd>
                    <span className="text-slate-300">Lùi slide</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-amber-300">Space</kbd>
                    <span className="text-slate-300">Đếm ngược</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-indigo-300">R</kbd>
                    <span className="text-slate-300">Mở đáp án</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-emerald-300">C</kbd>
                    <span className="text-slate-300">Đúng (+10)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-rose-300">X</kbd>
                    <span className="text-slate-300">Sai / Cướp</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-cyan-300">1..4</kbd>
                    <span className="text-slate-300">Chọn đội</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-amber-300">L</kbd>
                    <span className="text-slate-300">Bảng điểm</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-slate-300">F</kbd>
                    <span className="text-slate-300">Toàn màn hình</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 bg-black/50 border border-white/20 rounded font-mono text-slate-300">M</kbd>
                    <span className="text-slate-300">Mute âm</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
