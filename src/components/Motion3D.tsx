/**
 * ScorePopup – số điểm bay lên và tan biến khi cộng điểm
 * Dùng: <ScorePopup key={id} value="+10" />
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScorePopupProps {
  value: string;
  color?: string;
}

export const ScorePopup: React.FC<ScorePopupProps> = ({ value, color = '#10b981' }) => (
  <motion.div
    initial={{ y: 0, scale: 0.4, opacity: 0 }}
    animate={{ y: -90, scale: 1.1, opacity: 1 }}
    exit={{ y: -130, scale: 0.8, opacity: 0 }}
    transition={{ type: 'spring', stiffness: 300, damping: 18, duration: 0.8 }}
    className="absolute pointer-events-none z-50 font-mono font-black select-none"
    style={{
      fontSize: '2.8rem',
      color,
      textShadow: `0 0 24px ${color}cc`,
      left: '50%',
      top: '40%',
      transform: 'translateX(-50%)',
    }}
  >
    {value}
  </motion.div>
);

/**
 * FlipCard – card lật 3D khi reveal đáp án
 * Dùng: <FlipCard front={<.../>} back={<.../>} flipped={isRevealed} />
 */
interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  flipped: boolean;
}

export const FlipCard: React.FC<FlipCardProps> = ({ front, back, flipped }) => {
  return (
    <div className="relative w-full" style={{ perspective: '1200px' }}>
      <motion.div
        animate={{ rotateX: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
      >
        {/* Front face */}
        <div style={{ backfaceVisibility: 'hidden' }}>
          {front}
        </div>
        {/* Back face — flipped 180° on X axis */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
            position: 'absolute',
            top: 0, left: 0, right: 0,
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};

/**
 * SlideTransition – bọc nội dung slide với hiệu ứng 3D perspective slide-in
 */
interface SlideTransitionProps {
  slideKey: string;
  children: React.ReactNode;
  direction?: 1 | -1; // 1 = tiến, -1 = lùi
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({ slideKey, children, direction = 1 }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={slideKey}
      initial={{
        opacity: 0,
        x: direction * 60,
        rotateY: direction * 6,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        x: 0,
        rotateY: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: direction * -60,
        rotateY: direction * -6,
        scale: 0.97,
      }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

/**
 * PerspectiveTilt – container tilt theo chuột (dùng cho logo, card đặc biệt)
 */
interface PerspectiveTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const PerspectiveTilt: React.FC<PerspectiveTiltProps> = ({
  children,
  className = '',
  maxTilt = 12,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * maxTilt, y: dx * maxTilt });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

/**
 * BuzzInBanner – hiệu ứng 3D khi đội bấm chuông
 */
interface BuzzInBannerProps {
  teamName: string;
  teamColor: string;
  teamScore: number;
}

export const BuzzInBanner: React.FC<BuzzInBannerProps> = ({ teamName, teamColor, teamScore }) => (
  <motion.div
    initial={{ scale: 0.5, rotateX: -30, opacity: 0, y: -20 }}
    animate={{ scale: 1, rotateX: 0, opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
    style={{
      perspective: '800px',
      borderColor: teamColor,
      boxShadow: `0 0 40px ${teamColor}66`,
    }}
    className="mb-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border-2 bg-cyber-card/90 flex items-center justify-between"
  >
    <div className="flex items-center gap-3 sm:gap-4">
      <motion.span
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-5 h-5 rounded-full block"
        style={{ backgroundColor: teamColor }}
      />
      <div>
        <p className="font-sans text-base text-slate-400 leading-none mb-1">Đội giành quyền trả lời</p>
        <p className="font-display font-bold" style={{ fontSize: '2rem', color: teamColor }}>
          {teamName}
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-sans text-sm text-slate-400">Điểm hiện tại</p>
      <p className="font-mono font-bold text-xl" style={{ color: teamColor }}>{teamScore}</p>
    </div>
  </motion.div>
);
