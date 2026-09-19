import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, CheckCircle2, X, Maximize, Minimize, Music2, RotateCcw, Volume2, AlertCircle } from 'lucide-react';
import { Question } from '../../types/game';

interface MusicQuestionSlideProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  isRevealed: boolean;
  onToggleReveal: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const formatTime = (totalSeconds: number) => {
  if (isNaN(totalSeconds) || totalSeconds < 0) return '0:00';
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export const MusicQuestionSlide: React.FC<MusicQuestionSlideProps> = ({
  question,
  questionNumber,
  totalQuestions,
  isRevealed,
  onToggleReveal,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [showNativeControls, setShowNativeControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const prevQuestionIdRef = useRef<number | null>(null);

  // Chỉ dừng nhạc & nạp lại khi THẬT SỰ chuyển sang câu hỏi ID khác
  useEffect(() => {
    if (prevQuestionIdRef.current !== null && prevQuestionIdRef.current !== question.id) {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        try {
          audio.currentTime = 0;
        } catch {
          // ignore
        }
        audio.load();
      }
      setIsPlaying(false);
      setElapsed(0);
      setDuration(0);
      setAudioError(false);
    }
    prevQuestionIdRef.current = question.id;
  }, [question.id]);

  // Dừng phát nhạc khi component unmount (rời slide)
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  // Handler Bật / Tạm Dừng nhạc
  const handleTogglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.volume = 1.0;
    audio.muted = false;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
        })
        .catch((err) => {
          console.error('Audio play error:', err);
          setAudioError(true);
        });
    }
  }, [isPlaying]);

  // Handler Phát lại từ đầu
  const handleRestart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.currentTime = 0;
    } catch {
      // ignore
    }
    audio.volume = 1.0;
    audio.muted = false;
    setElapsed(0);

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
        })
        .catch((err) => {
          console.error('Audio play error:', err);
          setAudioError(true);
        });
    }
  }, []);

  // Phím tắt P để Bật / Tạm dừng nhạc; nếu đang phát mà ấn Space thì ưu tiên dừng nhạc ngay
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'Space' && isPlaying) {
        // Đang phát nhạc mà bấm phím cách -> Dừng nhạc ngay lập tức
        e.preventDefault();
        e.stopPropagation();
        handleTogglePlay();
      }
    };
    window.addEventListener('keydown', handleKey, { capture: true });
    return () => window.removeEventListener('keydown', handleKey, { capture: true });
  }, [handleTogglePlay, isPlaying]);

  const progress = duration > 0 ? Math.min((elapsed / duration) * 100, 100) : 0;

  return (
    <div className="relative w-full h-full flex flex-col justify-between px-4 sm:px-8 py-3 max-w-[1700px] mx-auto select-none overflow-hidden">
      {/* Thẻ audio HTML5 thực thụ phát toàn bộ bài hát */}
      <audio
        ref={audioRef}
        src={question.audioUrl}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration || 0);
        }}
        onTimeUpdate={(e) => {
          setElapsed(Math.floor(e.currentTarget.currentTime));
          if (!duration && e.currentTarget.duration) {
            setDuration(e.currentTarget.duration);
          }
        }}
        onEnded={(e) => {
          const a = e.currentTarget;
          // Chỉ coi là kết thúc bài nếu thực sự đã phát tới gần cuối bài hát
          if (!a.duration || a.currentTime >= a.duration - 2) {
            setIsPlaying(false);
            setElapsed(0);
          }
        }}
        onError={(e) => {
          console.error('Audio load error:', e.currentTarget.error);
          setAudioError(true);
        }}
      />

      {/* ── 1. TOP HEADER: Đồng bộ chuẩn giao diện với Slide Đuổi Hình Bắt Chữ ── */}
      <div className="flex items-center justify-between gap-4 shrink-0 pb-2 border-b border-cyber-border/40">
        {/* Logo CLB IT + Badge Vòng 2 + Tiêu đề */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-cyber-cyan via-cyan-300 to-cyber-mint shadow-cyan-glow shrink-0">
            <img
              src="/access/images/logo.jpg"
              alt="CLB CNTT - HUMG"
              className="w-full h-full object-cover rounded-full bg-cyber-darkest"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-cyber-mint/15 border border-cyber-mint/50 font-sans text-xs sm:text-sm font-bold text-cyber-mint uppercase tracking-wider shadow-sm">
                VÒNG 2 · CÂU {questionNumber} / {totalQuestions}
              </span>
              <h2 className="font-sans font-bold text-white text-lg sm:text-2xl tracking-wide uppercase">
                NGHE NHẠC ĐOÁN TÊN BÀI
              </h2>
            </div>
            <span className="font-sans text-[11px] sm:text-xs text-cyan-300/80 mt-0.5">
              CLB Công Nghệ Thông Tin · Trường Đại học Mỏ - Địa chất
            </span>
          </div>
        </div>

        {/* Nút Đáp Án + Toàn Màn Hình */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleReveal}
            title="Lật mở / Ẩn Đáp án chính xác (Enter hoặc R)"
            className={`px-4 py-2 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border cursor-pointer ${
              isRevealed
                ? 'bg-emerald-500 text-black border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.7)] scale-105'
                : 'bg-cyber-card/90 hover:bg-cyber-card border-emerald-500/50 text-emerald-400 hover:border-emerald-400 hover:scale-105'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isRevealed ? 'text-black' : 'text-emerald-400'}`} />
            <span>{isRevealed ? 'Ẩn Đáp Án' : 'Đáp Án'}</span>
          </button>

          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              title={isFullscreen ? 'Thu nhỏ màn hình (Esc hoặc F)' : 'Phóng to toàn màn hình máy chiếu (F)'}
              className="p-2.5 rounded-xl bg-cyber-card/90 hover:bg-cyber-card border border-cyber-cyan/40 hover:border-cyber-cyan text-cyan-300 hover:text-white shadow-cyan-glow transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* ── 2. SÂN KHẤU TRUNG TÂM: ĐĨA NHẠC CYBER + SÓNG ÂM THANH + ĐIỀU KHIỂN PHÁT NHẠC ── */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center my-2 gap-5 min-h-0 overflow-hidden">
        {/* Đĩa nhạc công nghệ Cyber Vinyl với vầng hào quang kép */}
        <div className="relative flex items-center justify-center">
          {isPlaying && (
            <>
              <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border-2 border-cyber-cyan/40 animate-ping pointer-events-none" />
              <div
                className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-cyber-mint/30 animate-pulse pointer-events-none"
                style={{ animationDuration: '1.2s' }}
              />
            </>
          )}

          <div
            className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center transition-all duration-500 p-[3px] ${
              isPlaying
                ? 'bg-gradient-to-tr from-cyber-cyan via-cyan-300 to-cyber-mint shadow-cyan-lg scale-105'
                : 'bg-cyber-border/80 border border-cyber-cyan/30 shadow-md'
            }`}
          >
            <div className="w-full h-full rounded-full bg-[#04121d] flex items-center justify-center relative overflow-hidden">
              {/* Vòng đĩa quay khi đang phát */}
              <div
                className={`absolute inset-2 rounded-full border border-cyber-cyan/20 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '8s' }}
              />
              <div
                className={`absolute inset-6 rounded-full border border-cyber-mint/20 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '5s', animationDirection: 'reverse' }}
              />
              <Music2
                className={`w-14 h-14 sm:w-16 sm:h-16 transition-all duration-300 ${
                  isPlaying ? 'text-cyber-cyan drop-shadow-[0_0_20px_rgba(0,242,254,0.9)] animate-pulse' : 'text-slate-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Thanh sóng âm thanh Visualizer (Equalizer bars đồng bộ màu Cyber Cyan & Mint) */}
        <div className="flex items-end gap-1.5 h-12 sm:h-14">
          {[4, 7, 10, 6, 9, 12, 8, 5, 11, 7, 12, 8, 5, 10, 6, 9, 11, 7, 4, 8].map((h, i) => (
            <div
              key={i}
              className="w-2 sm:w-2.5 rounded-full"
              style={{
                height: isPlaying ? `${Math.max(h * 4, 12)}px` : '8px',
                background: 'linear-gradient(to top, #00f2fe, #10b981)',
                opacity: isPlaying ? 0.95 : 0.25,
                animation: isPlaying
                  ? `cyberEq ${0.45 + (i % 6) * 0.1}s ease-in-out infinite alternate`
                  : 'none',
                animationDelay: `${i * 0.05}s`,
                transition: 'height 0.3s, opacity 0.3s',
              }}
            />
          ))}
        </div>

        {/* Cụm nút bấm điều khiển: PHÁT / DỪNG KHI CÓ NGƯỜI GIƠ TAY */}
        <div className="flex flex-col items-center gap-3 w-full max-w-lg">
          {audioError ? (
            <div className="flex flex-col items-center p-4 rounded-2xl bg-rose-950/80 border border-rose-500/60 text-center w-full shadow-lg">
              <AlertCircle className="w-8 h-8 text-rose-400 mb-1" />
              <p className="font-sans text-xs text-rose-200 mb-2">
                Trình duyệt chưa phát được âm thanh hoặc đang chờ nạp:
              </p>
              <p className="font-mono text-[11px] text-slate-300 mb-3 bg-black/40 px-3 py-1 rounded-lg truncate w-full">
                {question.audioUrl}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTogglePlay}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Bấm thử lại</span>
                </button>
                <button
                  onClick={() => setShowNativeControls((prev) => !prev)}
                  className="px-4 py-2 rounded-xl bg-cyber-card border border-cyber-border text-slate-300 font-bold text-xs hover:text-white cursor-pointer"
                >
                  {showNativeControls ? 'Ẩn thanh player' : 'Hiện thanh player'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              {/* Nút bấm chính: Bật / Dừng khi có người giơ tay */}
              <button
                onClick={handleTogglePlay}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-sans font-bold text-base sm:text-lg transition-all shadow-lg cursor-pointer ${
                  isPlaying
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-glow hover:scale-105 active:scale-95'
                    : 'bg-gradient-to-r from-cyber-cyan via-cyan-300 to-cyber-mint text-black shadow-cyan-glow hover:scale-105 active:scale-95'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="w-6 h-6 fill-current" />
                    <span>DỪNG NHẠC</span>
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 fill-current" />
                    <span>PHÁT NHẠC</span>
                  </>
                )}
              </button>

              {/* Nút phụ: Phát lại từ đầu nếu muốn nghe lại */}
              {elapsed > 0 && !isPlaying && (
                <button
                  onClick={handleRestart}
                  title="Phát lại từ đầu bài hát"
                  className="px-4 py-4 rounded-2xl bg-cyber-card/90 hover:bg-cyber-card border border-cyber-border/80 hover:border-cyber-cyan text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 text-sm font-bold shrink-0"
                >
                  <RotateCcw className="w-4 h-4 text-cyan-400" />
                  <span>Phát Lại Từ Đầu</span>
                </button>
              )}
            </div>
          )}

          {/* Thanh đo tiến trình bài hát */}
          <div className="w-full h-2.5 bg-cyber-card rounded-full border border-cyber-border overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyber-cyan via-cyan-300 to-cyber-mint transition-all duration-300 shadow-cyan-glow"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dòng trạng thái tiếng Việt & Đồng hồ thời gian bài hát */}
          <div className="flex items-center justify-between w-full font-sans text-xs sm:text-sm px-1">
            <div className="flex items-center gap-2">
              {isPlaying && (
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-ping inline-block" />
              )}
              <span className="text-cyan-300 font-bold">
                {formatTime(elapsed)} {duration > 0 ? `/ ${formatTime(duration)}` : ''}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Âm lượng 100%</span>
            </div>
          </div>

          {/* Thanh điều khiển phụ trực tiếp (nếu cần tua nhanh) */}
          {showNativeControls && (
            <div className="w-full pt-2">
              <audio controls src={question.audioUrl} className="w-full h-8" />
            </div>
          )}
        </div>
      </div>

      {/* ── 3. OVERLAY ĐÁP ÁN: Chuẩn đồng bộ 100% với QuestionSlide ── */}
      {isRevealed && (
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-3xl rounded-3xl p-[2px] bg-gradient-to-b from-emerald-400 via-emerald-500/50 to-cyber-cyan/30 shadow-[0_0_70px_rgba(16,185,129,0.5),0_25px_60px_rgba(0,0,0,0.95)] animate-fade-in">
          <div className="relative w-full rounded-3xl bg-[#04131d]/95 backdrop-blur-2xl px-6 sm:px-10 py-3.5 sm:py-5 text-center overflow-hidden">
            {/* Nút đóng nhanh ✕ */}
            <button
              onClick={onToggleReveal}
              title="Đóng bảng đáp án (Enter hoặc R)"
              className="absolute top-3 right-3 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Huy hiệu ĐÁP ÁN CHÍNH XÁC */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/50 shadow-sm mb-3 sm:mb-4">
              <span className="font-sans text-[11px] sm:text-xs font-bold text-emerald-300 uppercase tracking-widest">
                ĐÁP ÁN CHÍNH XÁC
              </span>
            </div>

            {/* TÊN BÀI HÁT - ĐẢM BẢO KHÔNG BỊ CẮT DẤU TIẾNG VIỆT */}
            <h2
              className="font-sans font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-white to-emerald-300 drop-shadow-[0_4px_30px_rgba(16,185,129,0.6)] pt-2 sm:pt-3 pb-1 sm:pb-2 mb-2"
              style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)', lineHeight: 1.35 }}
            >
              {question.answer}
            </h2>

            {/* Ca sĩ thể hiện */}
            {question.artist && (
              <p className="font-sans text-xs sm:text-sm text-cyan-300 font-semibold mb-1">
                Ca sĩ / Thể hiện: <span className="text-white">{question.artist}</span>
              </p>
            )}

            {/* Khung Ý nghĩa / Giới thiệu bài hát */}
            {question.explanation && (
              <div className="mt-2.5 px-5 sm:px-7 py-3 rounded-2xl bg-black/65 border border-emerald-500/30 text-left shadow-inner">
                <p className="font-sans text-xs sm:text-sm md:text-base text-slate-100 font-medium leading-relaxed">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider mr-2">
                    GIỚI THIỆU:
                  </span>
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes cyberEq {
          from { transform: scaleY(0.2); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};
export default MusicQuestionSlide;