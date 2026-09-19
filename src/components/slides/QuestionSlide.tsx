import React, { useState, useEffect } from 'react';
import { Lightbulb, CheckCircle2, X, Maximize, Minimize, ImageOff, RefreshCw } from 'lucide-react';
import { Question } from '../../types/game';

interface QuestionSlideProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  isRevealed: boolean;
  onToggleReveal: () => void;
  showHint: boolean;
  onToggleHint: () => void;
  timeRemaining?: number;
  isTimerRunning?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const QuestionSlide: React.FC<QuestionSlideProps> = ({
  question,
  questionNumber,
  totalQuestions,
  isRevealed,
  onToggleReveal,
  showHint,
  onToggleHint,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(question.imageUrl || '');
  const [hasError, setHasError] = useState(false);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  useEffect(() => {
    setCurrentSrc(question.imageUrl || '');
    setHasError(false);
    setFallbackAttempted(false);
  }, [question.id, question.imageUrl]);

  const handleImageError = () => {
    if (!fallbackAttempted && question.imageUrl) {
      setFallbackAttempted(true);
      // Try unencoded or alternate URL if available
      if (question.imageUrl.includes('bang-quan')) {
        setCurrentSrc('/access/images/bàng quan.png');
        return;
      }
      if (question.imageUrl.includes('trieu-tap')) {
        setCurrentSrc('/access/images/triệu tập.png');
        return;
      }
    }
    setHasError(true);
  };
  return (
    <div className="relative w-full h-full flex flex-col justify-between px-4 sm:px-8 py-3 max-w-[1700px] mx-auto select-none overflow-hidden">

      {/* ── 1. TOP HEADER: Logo CLB IT + CÂU X/7 + Tiêu đề "NHÌN HÌNH ĐOÁN TỪ" + Nút Gợi Ý + Nút Đáp Án + Timer + Toàn Màn Hình ── */}
      <div className="flex items-center justify-between gap-4 shrink-0 pb-2 border-b border-cyber-border/40">
        {/* Left: Logo CLB IT HUMG + CÂU X/7 + Tiêu đề "NHÌN HÌNH ĐOÁN TỪ" */}
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
                CÂU {questionNumber} / {totalQuestions}
              </span>
              <h2 className="font-sans font-bold text-white text-lg sm:text-2xl tracking-wide uppercase">
                NHÌN HÌNH ĐOÁN TỪ
              </h2>
            </div>
            <span className="font-sans text-[11px] sm:text-xs text-cyan-300/80 mt-0.5">
              CLB Công Nghệ Thông Tin · Trường Đại học Mỏ - Địa chất
            </span>
          </div>
        </div>

        {/* Right: Nút Gợi Ý + Nút Đáp Án + Đồng Hồ Đếm Ngược + Nút Toàn Màn Hình */}
        <div className="flex items-center gap-3">
          {/* Nút bấm riêng về Gợi Ý */}
          <button
            onClick={onToggleHint}
            title="Bật / Tắt Gợi ý ô chữ (Phím G)"
            className={`px-4 py-2 rounded-xl font-sans font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border cursor-pointer ${
              showHint
                ? 'bg-amber-500 text-black border-amber-300 shadow-amber-glow scale-105'
                : 'bg-cyber-card/90 hover:bg-cyber-card border-amber-500/50 text-amber-300 hover:border-amber-400 hover:scale-105'
            }`}
          >
            <Lightbulb className={`w-4 h-4 ${showHint ? 'text-black' : 'text-amber-400'}`} />
            <span>{showHint ? 'Ẩn Gợi Ý' : 'Gợi Ý'}</span>
          </button>

          {/* Nút bấm riêng về Đáp Án */}
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

          {/* Nút Phóng To / Thu Nhỏ Toàn Màn Hình Máy Chiếu */}
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

      {/* ── 2. KHUNG HÌNH ẢNH CỰC ĐẠI — TẬN DỤNG TỐI ĐA DIỆN TÍCH MÁY CHIẾU ── */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center my-1.5 min-h-0 overflow-hidden">
        {hasError ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-amber-500/50 bg-cyber-card/90 text-center max-w-md shadow-lg backdrop-blur-md">
            <ImageOff className="w-12 h-12 text-amber-400 mb-3 animate-pulse" />
            <h3 className="font-sans font-bold text-lg text-white mb-1">Đang nạp ảnh câu đố</h3>
            <p className="font-mono text-xs text-slate-400 mb-4 truncate max-w-xs">{currentSrc}</p>
            <button
              onClick={() => {
                setHasError(false);
                setFallbackAttempted(false);
                setCurrentSrc(`${question.imageUrl}?v=${Date.now()}`);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-cyan/20 border border-cyber-cyan/50 text-cyan-300 font-bold text-xs hover:bg-cyber-cyan/30 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Tải lại ảnh</span>
            </button>
          </div>
        ) : currentSrc ? (
          <div className="relative h-full w-full flex items-center justify-center">
            <img
              key={currentSrc}
              src={currentSrc}
              alt={question.title}
              onError={handleImageError}
              className="max-h-[76vh] w-auto max-w-full object-contain rounded-2xl border-2 border-cyber-mint/50 shadow-[0_0_60px_rgba(0,0,0,0.9)] bg-black/80 transition-all duration-300 select-none"
            />
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 font-sans text-sm">
            Hình ảnh câu đố đang tải...
          </div>
        )}

        {/* ── 3. OVERLAY GỢI Ý (CHỈ HIỆN KHI BẤM NÚT GỢI Ý) ── */}
        {showHint && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-6 sm:px-8 py-3.5 rounded-2xl bg-cyber-darkest/95 border-2 border-amber-400 shadow-amber-glow backdrop-blur-xl animate-fade-in flex items-center gap-4">
            <Lightbulb className="w-6 h-6 text-amber-400 animate-bounce shrink-0" />
            <div className="text-left">
              <span className="font-sans text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest block">
                GỢI Ý Ô CHỮ
              </span>
              <span className="font-mono text-lg sm:text-2xl font-black text-white tracking-wider">
                {question.imageHint}
              </span>
            </div>
            <button
              onClick={onToggleHint}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ── 4. OVERLAY ĐÁP ÁN CAO CẤP — TƯƠNG PHẢN CAO, ĐẸP & RÕ NÉT TRÊN MÁY CHIẾU ── */}
        {isRevealed && (
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-3xl rounded-3xl p-[2px] bg-gradient-to-b from-emerald-400 via-emerald-500/50 to-cyber-cyan/30 shadow-[0_0_70px_rgba(16,185,129,0.5),0_25px_60px_rgba(0,0,0,0.95)] animate-fade-in">
            <div className="relative w-full rounded-3xl bg-[#04131d]/95 backdrop-blur-2xl px-6 sm:px-10 py-3.5 sm:py-5 text-center overflow-hidden">
              
              {/* Nút đóng nhanh ✕ góc trên phải */}
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

              {/* TỪ KHÓA ĐÁP ÁN CỰC ĐẠI - ĐẢM BẢO KHÔNG BỊ CẮT DẤU TIẾNG VIỆT (DẤU HỎI Ể, Ổ, Ắ) */}
              <h2
                className="font-sans font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-white to-emerald-300 drop-shadow-[0_4px_30px_rgba(16,185,129,0.6)] pt-2 sm:pt-3 pb-1 sm:pb-2 mb-2"
                style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)', lineHeight: 1.35 }}
              >
                {question.answer}
              </h2>

              {/* KHUNG Ý NGHĨA */}
              {question.explanation && (
                <div className="mt-2.5 px-5 sm:px-7 py-3 rounded-2xl bg-black/65 border border-emerald-500/30 text-left shadow-inner">
                  <p className="font-sans text-xs sm:text-sm md:text-base text-slate-100 font-medium leading-relaxed">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider mr-2">
                      Ý NGHĨA:
                    </span>
                    {question.explanation}
                  </p>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

    </div>
  );
};
export default QuestionSlide;
