import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { Team } from '../../types/game';

interface RoundSummarySlideProps {
  teams: Team[];
}

export const RoundSummarySlide: React.FC<RoundSummarySlideProps> = ({ teams }) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const leader = sortedTeams[0];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 sm:px-12 py-6 max-w-5xl mx-auto text-center select-none">
      {/* Top Tag */}
      <div className="mb-3 slide-enter">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan font-mono text-xs sm:text-sm font-bold shadow-cyan-glow">
          KẾT THÚC 10 CÂU HỎI TRANH TÀI
        </div>
      </div>

      {/* Main Title */}
      <h1
        className="font-display font-black text-white mb-5 slide-enter tracking-tighter uppercase leading-none text-4xl sm:text-5xl md:text-6xl"
        style={{ animationDelay: '0.07s' }}
      >
        BẢNG ĐIỂM <span className="text-gradient-cyan">CHUNG CUỘC</span>
      </h1>

      {/* Leader Spotlight */}
      {leader && leader.score > 0 && (
        <div
          className="w-full max-w-xl mb-6 p-5 rounded-2xl border-2 bg-cyber-card/80 flex items-center justify-between slide-enter backdrop-blur-xl shadow-cyan-lg"
          style={{ borderColor: leader.color, animationDelay: '0.14s' }}
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/50 shadow-amber-glow">
              <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
            </div>
            <div>
              <p className="font-mono text-[11px] font-black text-amber-400 uppercase tracking-widest mb-0.5">
                ★ ĐỘI ĐANG DẪN ĐẦU ★
              </p>
              <h2 className="font-display font-black text-white text-2xl sm:text-3xl">{leader.name}</h2>
              <p className="font-sans text-xs text-slate-300">
                Đội trưởng: <span className="text-white font-semibold">{leader.leader || '—'}</span>
              </p>
            </div>
          </div>
          <div className="text-right pl-3">
            <span className="font-mono font-black text-4xl sm:text-5xl" style={{ color: leader.color, lineHeight: 1 }}>
              {leader.score}
            </span>
            <p className="font-sans text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">điểm</p>
          </div>
        </div>
      )}

      {/* All Teams Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-2xl slide-enter"
        style={{ animationDelay: '0.21s' }}
      >
        {sortedTeams.map((team, idx) => (
          <div
            key={team.id}
            className="p-3.5 rounded-xl border bg-cyber-card/60 backdrop-blur-md text-center shadow-md transition-transform hover:scale-105"
            style={{ borderColor: team.color }}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Award className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono text-xs font-bold text-slate-400 uppercase">Hạng {idx + 1}</span>
            </div>
            <p className="font-display font-bold text-sm sm:text-base text-white truncate">{team.name}</p>
            <p className="font-mono font-black text-xl sm:text-2xl mt-1" style={{ color: team.color }}>
              {team.score}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
