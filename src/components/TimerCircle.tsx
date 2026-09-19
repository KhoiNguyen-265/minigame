import React, { useEffect } from 'react';
import { sound } from '../utils/audio';

interface TimerCircleProps {
  timeRemaining: number;
  totalDuration: number;
  isRunning: boolean;
  size?: number;
  strokeWidth?: number;
}

export const TimerCircle: React.FC<TimerCircleProps> = ({
  timeRemaining,
  totalDuration,
  isRunning,
  size = 86,
  strokeWidth = 7,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = totalDuration > 0 ? timeRemaining / totalDuration : 0;
  const strokeDashoffset = circumference - progress * circumference;

  const isUrgent = timeRemaining <= 3 && timeRemaining > 0;
  const isWarning = timeRemaining > 3 && timeRemaining <= Math.floor(totalDuration * 0.4);
  const isTimeUp = timeRemaining === 0;

  // Play sound effects
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;
    if (timeRemaining <= 3) {
      sound.playWarning();
    } else {
      sound.playTick();
    }
  }, [timeRemaining, isRunning]);

  const strokeColor = isUrgent ? '#f43f5e' : isWarning ? '#f59e0b' : '#00f2fe';
  const glowColor  = isUrgent
    ? 'drop-shadow(0 0 12px rgba(244,63,94,0.9))'
    : isWarning
    ? 'drop-shadow(0 0 10px rgba(245,158,11,0.7))'
    : 'drop-shadow(0 0 10px rgba(0,242,254,0.6))';

  return (
    <div className={`relative inline-flex items-center justify-center ${isUrgent ? 'animate-timer-urgent' : ''}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="rgba(14, 51, 77, 0.7)" strokeWidth={strokeWidth} fill="transparent"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease',
            filter: glowColor,
          }}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center leading-none">
        <span
          className="font-mono font-black"
          style={{
            fontSize: size < 80 ? '1.5rem' : '1.8rem',
            color: isTimeUp ? '#f43f5e' : isUrgent ? '#f43f5e' : '#ffffff',
          }}
        >
          {timeRemaining}
        </span>
        <span
          className="font-sans font-bold text-center"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.05em',
            color: isTimeUp ? '#f43f5e' : 'rgba(148,163,184,0.7)',
          }}
        >
          {isTimeUp ? 'HẾT' : isRunning ? 'SEC' : 'DỪNG'}
        </span>
      </div>
    </div>
  );
};
