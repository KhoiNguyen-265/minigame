import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES, ROUND_1_QUESTIONS, ROUND_2_QUESTIONS } from './data/gameData';
import { ShortcutHelpModal } from './components/ShortcutHelpModal';
import { LobbySlide } from './components/slides/LobbySlide';
import { RulesSlide } from './components/slides/RulesSlide';
import { Round1IntroSlide } from './components/slides/Round1IntroSlide';
import { Round2IntroSlide } from './components/slides/Round2IntroSlide';
import { QuestionSlide } from './components/slides/QuestionSlide';
import { MusicQuestionSlide } from './components/slides/MusicQuestionSlide';
import { VictorySlide } from './components/slides/VictorySlide';
import { SlideTransition } from './components/Motion3D';
import { sound } from './utils/audio';
import confetti from 'canvas-confetti';
import { Maximize, Minimize, ChevronLeft, ChevronRight } from 'lucide-react';

const STORAGE_KEY_SLIDE = 'it_club_battle_slide_v2';

export const App: React.FC = () => {
  // Slide index state
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SLIDE);
      return saved ? Math.min(Math.max(0, parseInt(saved, 10)), SLIDES.length - 1) : 0;
    } catch {
      return 0;
    }
  });

  // Modal Help & Fullscreen state
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Question & Reveal states
  const [isRevealed, setIsRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Current Slide derived data
  const currentSlide = SLIDES[currentSlideIndex];
  const isQuestionSlide = currentSlide?.type === 'question';
  const isMusicQuestionSlide = currentSlide?.type === 'music-question';

  const currentQuestion =
    isQuestionSlide && currentSlide.questionIndex !== undefined
      ? ROUND_1_QUESTIONS[currentSlide.questionIndex]
      : null;

  const currentMusicQuestion =
    isMusicQuestionSlide && currentSlide.musicQuestionIndex !== undefined
      ? ROUND_2_QUESTIONS[currentSlide.musicQuestionIndex]
      : null;

  // Slide transition direction (1 = forward, -1 = backward)
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  // Save slide index to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SLIDE, currentSlideIndex.toString());
    } catch {
      // ignore
    }
  }, [currentSlideIndex]);

  // Chuyển slide
  const handleSlideChange = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= SLIDES.length) return;

    sound.stopSnippet();
    setCurrentSlideIndex(newIndex);
    setIsRevealed(false);
    setShowHint(false);
  }, []);

  const handlePrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setSlideDirection(-1);
      handleSlideChange(currentSlideIndex - 1);
    }
  }, [currentSlideIndex, handleSlideChange]);

  const handleNextSlide = useCallback(() => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setSlideDirection(1);
      handleSlideChange(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, handleSlideChange]);

  // Toggle Reveal / Hint
  const handleToggleReveal = useCallback(() => {
    setIsRevealed((prev) => !prev);
  }, []);

  const handleToggleHint = useCallback(() => {
    setShowHint((prev) => !prev);
  }, []);

  // Bắn pháo hoa ăn mừng khi mở đáp án chính xác (2 luồng từ 2 bên góc màn hình)
  const triggerFireworks = useCallback(() => {
    confetti({
      particleCount: 90,
      angle: 60,
      spread: 65,
      origin: { x: 0.05, y: 0.75 },
      colors: ['#00f2fe', '#10b981', '#f59e0b', '#ffffff'],
      zIndex: 9999,
    });
    confetti({
      particleCount: 90,
      angle: 120,
      spread: 65,
      origin: { x: 0.95, y: 0.75 },
      colors: ['#00f2fe', '#10b981', '#f59e0b', '#ffffff'],
      zIndex: 9999,
    });
  }, []);

  // Tự động bắn pháo hoa & phát âm thanh chúc mừng mỗi khi hiện đáp án câu hỏi
  useEffect(() => {
    if (isRevealed && (isQuestionSlide || isMusicQuestionSlide)) {
      triggerFireworks();
      sound.playCorrect();
    }
  }, [isRevealed, isQuestionSlide, isMusicQuestionSlide, triggerFireworks]);

  // Toàn màn hình
  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Bàn phím điều khiển (như PowerPoint)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      // 1. Lùi slide (<, ,, ArrowLeft, ArrowUp, PageUp, Backspace)
      if (
        e.key === '<' ||
        e.key === ',' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowUp' ||
        e.key === 'PageUp' ||
        e.key === 'Backspace'
      ) {
        e.preventDefault();
        handlePrevSlide();
        return;
      }

      // 2. Tiến slide (>, ., ArrowRight, ArrowDown, PageDown, N)
      if (
        e.key === '>' ||
        e.key === '.' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowDown' ||
        e.key === 'PageDown' ||
        e.key === 'n' ||
        e.key === 'N'
      ) {
        e.preventDefault();
        handleNextSlide();
        return;
      }

      // 3. Phím Space: Nếu đang ở câu hỏi và chưa mở đáp án -> Mở đáp án; nếu đã mở -> Tiến slide
      if (e.key === ' ') {
        e.preventDefault();
        if ((isQuestionSlide || isMusicQuestionSlide) && !isRevealed) {
          setIsRevealed(true);
        } else {
          handleNextSlide();
        }
        return;
      }

      // 4. Phím R hoặc Enter: Lật mở / Ẩn đáp án
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        if (isQuestionSlide || isMusicQuestionSlide) {
          setIsRevealed((prev) => !prev);
        }
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if ((isQuestionSlide || isMusicQuestionSlide) && !isRevealed) {
          setIsRevealed(true);
        } else {
          handleNextSlide();
        }
        return;
      }

      // 5. Phím G: Bật / Tắt gợi ý ô chữ
      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        if (isQuestionSlide) {
          handleToggleHint();
        }
        return;
      }

      // 6. Toàn màn hình (F hoặc F5)
      if (e.key === 'f' || e.key === 'F' || e.key === 'F5') {
        e.preventDefault();
        handleToggleFullscreen();
        return;
      }

      // 7. Bật / Tắt âm thanh hiệu ứng (M)
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        sound.toggleMute();
        return;
      }

      // 8. Trợ giúp phím tắt (? hoặc H hoặc F1)
      if (e.key === '?' || e.key === 'h' || e.key === 'H' || e.key === 'F1') {
        e.preventDefault();
        setIsHelpOpen((prev) => !prev);
        return;
      }

      // 9. Escape: Đóng modal trợ giúp
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isHelpOpen) setIsHelpOpen(false);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handlePrevSlide,
    handleNextSlide,
    isQuestionSlide,
    isMusicQuestionSlide,
    isRevealed,
    handleToggleReveal,
    handleToggleHint,
    handleToggleFullscreen,
    isHelpOpen,
  ]);

  return (
    <div className="w-screen h-screen flex flex-col cyber-bg select-none overflow-hidden text-white font-sans cursor-default relative">
      {/* Nút lùi slide bên trái cho MC click chuột */}
      {currentSlideIndex > 0 && (
        <button
          onClick={handlePrevSlide}
          title="Slide trước (←)"
          className="fixed left-3 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-cyber-dark/60 hover:bg-cyber-dark border border-cyber-border hover:border-cyber-cyan text-slate-400 hover:text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-20 hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Nút tiến slide bên phải cho MC click chuột */}
      {currentSlideIndex < SLIDES.length - 1 && (
        <button
          onClick={handleNextSlide}
          title="Slide tiếp theo (→)"
          className="fixed right-3 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-cyber-dark/60 hover:bg-cyber-dark border border-cyber-border hover:border-cyber-cyan text-slate-400 hover:text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-20 hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Nút phóng to / thu nhỏ góc trên phải cho các slide giới thiệu */}
      {!isQuestionSlide && !isMusicQuestionSlide && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFullscreen();
          }}
          title={isFullscreen ? 'Thu nhỏ màn hình (Esc hoặc F)' : 'Phóng to toàn màn hình máy chiếu (F)'}
          className="fixed top-4 right-4 z-50 p-2.5 rounded-xl bg-cyber-dark/80 hover:bg-cyber-dark border border-cyber-cyan/40 hover:border-cyber-cyan text-cyan-300 hover:text-white shadow-cyan-glow backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>
      )}

      {/* Sân khấu trình chiếu chính — 100% full screen */}
      <main className="flex-1 w-full h-full overflow-hidden relative flex flex-col justify-center">
        <SlideTransition slideKey={currentSlide.id} direction={slideDirection}>
          {currentSlide.type === 'lobby' && <LobbySlide />}

          {currentSlide.type === 'rules' && <RulesSlide />}

          {currentSlide.type === 'round1-intro' && <Round1IntroSlide />}

          {currentSlide.type === 'question' && currentQuestion && (
            <QuestionSlide
              question={currentQuestion}
              questionNumber={(currentSlide.questionIndex || 0) + 1}
              totalQuestions={ROUND_1_QUESTIONS.length}
              isRevealed={isRevealed}
              onToggleReveal={handleToggleReveal}
              showHint={showHint}
              onToggleHint={handleToggleHint}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
            />
          )}

          {currentSlide.type === 'round2-intro' && <Round2IntroSlide />}

          {currentSlide.type === 'music-question' && currentMusicQuestion && (
            <MusicQuestionSlide
              question={currentMusicQuestion}
              questionNumber={(currentSlide.musicQuestionIndex || 0) + 1}
              totalQuestions={ROUND_2_QUESTIONS.length}
              isRevealed={isRevealed}
              onToggleReveal={handleToggleReveal}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
            />
          )}

          {currentSlide.type === 'victory' && (
            <VictorySlide onRestart={() => handleSlideChange(0)} />
          )}
        </SlideTransition>
      </main>

      {/* Modal trợ giúp phím tắt (phím ? hoặc H) */}
      <ShortcutHelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};
export default App;