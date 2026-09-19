import React from 'react';
import { X, Trophy, Medal, Award, Plus, Minus, RotateCcw } from 'lucide-react';
import { Team } from '../types/game';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  onUpdateScore: (teamId: number, delta: number) => void;
  onResetScores: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  teams,
  onUpdateScore,
  onResetScores,
}) => {
  if (!isOpen) return null;

  // Sort teams descending by score
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-2xl bg-cyber-dark/95 border border-cyber-cyan/40 shadow-[0_0_50px_rgba(0,242,254,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-border bg-cyber-card/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white tracking-wide">
                BẢNG XẾP HẠNG TRỰC TIẾP
              </h3>
              <p className="text-xs text-cyan-200/60 font-sans">
                IT CLUB TEAM BATTLE • CLB CNTT - HUMG
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Team Ranks */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {sortedTeams.map((team, index) => {
            const isTop1 = index === 0 && team.score > 0;
            const isTop2 = index === 1 && team.score > 0;
            const isTop3 = index === 2 && team.score > 0;

            return (
              <div
                key={team.id}
                style={{ borderColor: team.color }}
                className={`flex items-center justify-between p-4 rounded-xl border bg-cyber-card/40 transition-all ${
                  isTop1 
                    ? 'shadow-[0_0_20px_rgba(245,158,11,0.25)] bg-amber-500/10' 
                    : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm">
                    {isTop1 ? (
                      <Trophy className="w-7 h-7 text-amber-400 animate-bounce" />
                    ) : isTop2 ? (
                      <Medal className="w-6 h-6 text-slate-300" />
                    ) : isTop3 ? (
                      <Award className="w-6 h-6 text-amber-700" />
                    ) : (
                      <span className="text-slate-400 font-mono">#{index + 1}</span>
                    )}
                  </div>

                  {/* Team Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: team.color }}
                      />
                      <h4 className="font-display font-bold text-base text-white">
                        {team.name}
                      </h4>
                      {team.bonusPoints > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          +{team.bonusPoints} bonus
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      Đội trưởng: <span className="text-cyan-200">{team.leader || 'Chưa đặt'}</span>
                    </p>
                  </div>
                </div>

                {/* Score & Adjust Controls */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span 
                      className="font-mono text-3xl font-extrabold"
                      style={{ color: team.color }}
                    >
                      {team.score}
                    </span>
                    <span className="text-xs font-mono text-slate-400 ml-1">ĐIỂM</span>
                  </div>

                  {/* Manual +/- adjust buttons for MC */}
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                    <button
                      onClick={() => onUpdateScore(team.id, -5)}
                      title="Trừ 5 điểm"
                      className="p-1 rounded hover:bg-white/10 text-rose-400 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onUpdateScore(team.id, 5)}
                      title="Cộng 5 điểm"
                      className="p-1 rounded hover:bg-white/10 text-emerald-400 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onUpdateScore(team.id, 10)}
                      title="Cộng 10 điểm"
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold hover:bg-white/10 text-cyan-300 transition-colors"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-cyber-border bg-cyber-dark/90">
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn đặt lại điểm của tất cả các đội về 0 không?')) {
                onResetScores();
              }
            }}
            className="flex items-center gap-1 text-xs text-rose-400/80 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại toàn bộ điểm</span>
          </button>

          <span className="text-[11px] font-mono text-cyan-200/50">
            Bấm phím <kbd className="px-1 py-0.5 rounded bg-black/50 text-cyan-300 border border-white/10">L</kbd> hoặc click ngoài để đóng
          </span>
        </div>
      </div>
    </div>
  );
};
