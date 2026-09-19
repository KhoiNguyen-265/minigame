import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Crown, 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  Gift, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { Team } from '../../types/game';
import { sound } from '../../utils/audio';

interface TeamSetupSlideProps {
  teams: Team[];
  onUpdateTeam: (id: number, updates: Partial<Team>) => void;
  onAddTeam: () => void;
  onRemoveTeam: (id: number) => void;
  onRewardFastestTeam: (teamId: number) => void;
}

const STAGES = [
  { id: 1, title: 'BỐC THĂM THẺ', duration: 60, desc: 'Mỗi thành viên bốc ngẫu nhiên 1 thẻ màu/ký hiệu' },
  { id: 2, title: 'TẬP HỢP ĐỘI', duration: 60, desc: 'Tìm đồng đội cùng ký hiệu và tập trung về một khu vực' },
  { id: 3, title: 'ĐẶT TÊN & ĐỘI TRƯỞNG', duration: 90, desc: 'Thống nhất Tên đội cực ngầu và bầu ra Đội trưởng' },
];

export const TeamSetupSlide: React.FC<TeamSetupSlideProps> = ({
  teams,
  onUpdateTeam,
  onAddTeam,
  onRemoveTeam,
  onRewardFastestTeam,
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const currentStage = STAGES[currentStageIdx];

  const [timeLeft, setTimeLeft] = useState(currentStage.duration);
  const [isRunning, setIsRunning] = useState(false);

  // Switch stage resets timer
  const handleSelectStage = (idx: number) => {
    setCurrentStageIdx(idx);
    setTimeLeft(STAGES[idx].duration);
    setIsRunning(false);
  };

  useEffect(() => {
    let timer: number;
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            sound.playFanfare();
            return 0;
          }
          if (prev <= 4) {
            sound.playWarning();
          } else {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(currentStage.duration);
  };

  const handleBonus = (teamId: number) => {
    onRewardFastestTeam(teamId);
    sound.playCorrect();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto select-none">
      {/* Title & Stage Stepper */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-border pb-3">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-cyber-cyan uppercase flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> GIAI ĐOẠN KHỞI ĐỘNG • 3–4 PHÚT
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-wide mt-0.5">
              CHIA ĐỘI & THIẾT LẬP CHIẾN BINH
            </h2>
          </div>

          {/* 3 Stages Selector */}
          <div className="flex items-center gap-2 bg-cyber-card/90 p-1.5 rounded-xl border border-cyber-border">
            {STAGES.map((s, idx) => {
              const isActive = idx === currentStageIdx;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectStage(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyber-cyan to-cyber-mint text-cyber-darkest shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{idx + 1}. {s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Big Stage Banner + Live Timer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 p-4 rounded-2xl bg-cyber-card/40 border border-cyber-cyan/30 backdrop-blur-md">
          <div className="md:col-span-2 flex flex-col justify-center">
            <span className="text-xs font-mono text-cyan-400">BƯỚC {currentStage.id} / 3</span>
            <h3 className="font-display text-xl md:text-2xl font-black text-white">
              {currentStage.title}
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              {currentStage.desc}
            </p>
          </div>

          {/* Timer Display */}
          <div className="flex items-center justify-between md:justify-end gap-4 bg-cyber-dark/80 p-3 rounded-xl border border-cyber-border">
            <div className="text-right">
              <div className={`font-mono text-3xl md:text-4xl font-black ${timeLeft <= 10 && timeLeft > 0 ? 'text-rose-400 animate-pulse' : 'text-cyber-cyan'}`}>
                {formatTime(timeLeft)}
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                {timeLeft === 0 ? 'HẾT GIỜ!' : isRunning ? 'ĐANG ĐẾM' : 'SẴN SÀNG'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleTimer}
                className={`p-2.5 rounded-lg font-bold transition-all ${
                  isRunning 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30' 
                    : 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/50 hover:bg-cyber-cyan/30'
                }`}
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={resetTimer}
                className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 border border-cyber-border transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="my-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
            DANH SÁCH CÁC ĐỘI THI ĐẤU ({teams.length} ĐỘI)
          </span>

          <div className="flex items-center gap-2">
            {teams.length < 6 && (
              <button
                onClick={onAddTeam}
                className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg bg-cyber-card border border-cyber-border text-cyan-300 hover:border-cyber-cyan transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm đội
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((team, idx) => {
            const hasBonus = team.bonusPoints > 0;

            return (
              <div
                key={team.id}
                style={{ borderColor: team.color }}
                className="relative rounded-xl p-4 bg-cyber-card/60 border backdrop-blur-md flex flex-col justify-between transition-all hover:bg-cyber-card/80"
              >
                {/* Team Header & Color */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-3.5 h-3.5 rounded-full ring-2 ring-white/30"
                        style={{ backgroundColor: team.color }}
                      />
                      <span className="text-xs font-mono font-bold uppercase text-slate-400">
                        ĐỘI #{idx + 1}
                      </span>
                    </div>

                    {teams.length > 3 && (
                      <button
                        onClick={() => onRemoveTeam(team.id)}
                        title="Xóa đội này"
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Input Team Name */}
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] font-mono text-cyan-200/60 uppercase block">Tên Đội</label>
                      <input
                        type="text"
                        value={team.name}
                        onChange={(e) => onUpdateTeam(team.id, { name: e.target.value })}
                        placeholder="Nhập tên đội..."
                        className="w-full font-display font-bold text-base bg-cyber-dark/80 border border-cyber-border focus:border-cyber-cyan px-2.5 py-1.5 rounded-lg text-white outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-cyan-200/60 uppercase block flex items-center gap-1">
                        <Crown className="w-3 h-3 text-amber-400" /> Đội Trưởng
                      </label>
                      <input
                        type="text"
                        value={team.leader}
                        onChange={(e) => onUpdateTeam(team.id, { leader: e.target.value })}
                        placeholder="Tên đội trưởng..."
                        className="w-full text-xs font-sans bg-cyber-dark/80 border border-cyber-border focus:border-cyber-cyan px-2.5 py-1.5 rounded-lg text-slate-300 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Score & Bonus Action */}
                <div className="mt-4 pt-3 border-t border-cyber-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">ĐIỂM HIỆN TẠI</span>
                    <span 
                      className="font-mono text-2xl font-black"
                      style={{ color: team.color }}
                    >
                      {team.score}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBonus(team.id)}
                    disabled={hasBonus}
                    title="Cộng 5 điểm cho đội tập hợp và đặt tên nhanh nhất!"
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      hasBonus
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-sm hover:scale-105'
                    }`}
                  >
                    {hasBonus ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Đã +5 Đ</span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-3.5 h-3.5 text-amber-400" />
                        <span>+5 Nhanh Nhất</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
