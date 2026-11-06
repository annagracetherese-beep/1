import React from 'react';

// Daisy Flower Sticker
export const StickerFlower: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 28,
  className = '',
  color = '#fde8ec',
}) => (
  <div
    className={`inline-block select-none animate-sway pointer-events-none drop-shadow-[2px_2px_0_#28211e] ${className}`}
    style={{ width: size, height: size }}
  >
    <svg viewBox="0 0 32 32" className="w-full h-full">
      {/* 8 Petals */}
      <circle cx="16" cy="6" r="5" fill={color} stroke="#28211e" strokeWidth="1.5" />
      <circle cx="23" cy="9" r="5" fill={color} stroke="#28211e" strokeWidth="1.5" />
      <circle cx="26" cy="16" r="5" fill={color} stroke="#28211e" strokeWidth="1.5" />
      <circle cx="23" cy="23" r="5" fill={color} stroke="#28211e" strokeWidth="1.5" />
      <circle cx="16" cy="26" r="5" fill={color} stroke="#28211e" strokeWidth="1.5" />
      <circle cx="9" cy="23" r="5" fill={color} stroke="#28211e" strokeWidth="1.5" />
      <circle cx="6" cy="16" r="5" fill={color} stroke="#28211e" strokeWidth="1.5" />
      <circle cx="9" cy="9" r="5" fill={color} stroke="#28211e" strokeWidth="1.5" />
      {/* Yellow Center */}
      <circle cx="16" cy="16" r="5.5" fill="#ffe066" stroke="#28211e" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="1.2" fill="#28211e" />
      <circle cx="18" cy="14" r="1.2" fill="#28211e" />
      <path d="M14 18 Q16 20 18 18" stroke="#28211e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

// Smiley Face Sticker
export const StickerSmiley: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 28,
  color = '#ffe066',
  className = '',
}) => (
  <div
    className={`inline-block select-none pointer-events-none drop-shadow-[2px_2px_0_#28211e] ${className}`}
    style={{ width: size, height: size }}
  >
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <circle cx="16" cy="16" r="14" fill={color} stroke="#28211e" strokeWidth="2" />
      <ellipse cx="11.5" cy="12" rx="1.8" ry="2.6" fill="#28211e" />
      <ellipse cx="20.5" cy="12" rx="1.8" ry="2.6" fill="#28211e" />
      <path d="M9 18 C11 25, 21 25, 23 18" stroke="#28211e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="7.5" cy="18" r="1.5" fill="#f4a6b2" />
      <circle cx="24.5" cy="18" r="1.5" fill="#f4a6b2" />
    </svg>
  </div>
);

// Sparkle Star Sticker
export const StickerSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 24,
  color = '#cbb2fe',
  className = '',
}) => (
  <div
    className={`inline-block select-none pointer-events-none animate-pulseGlow drop-shadow-[2px_2px_0_#28211e] ${className}`}
    style={{ width: size, height: size }}
  >
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path
        d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
        fill={color}
        stroke="#28211e"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
    </svg>
  </div>
);

// Scrabble Tile Letter Banner (as seen in Image 5 "M Y   W O R K")
export const ScrabbleTiles: React.FC<{ text: string; className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  text,
  className = '',
  size = 'md',
}) => {
  const letters = text.toUpperCase().split('');
  const sizeClasses = {
    sm: 'w-6 h-7 text-xs',
    md: 'w-8 h-9 text-sm',
    lg: 'w-10 h-11 text-base',
  };

  const colors = ['#f4a6b2', '#74c0fc', '#ffe066', '#cbb2fe', '#8fa89b', '#ffbe76'];

  return (
    <div className={`inline-flex flex-wrap items-center gap-1 select-none ${className}`}>
      {letters.map((char, index) => {
        if (char === ' ') {
          return <span key={index} className="w-3" />;
        }
        const bg = colors[index % colors.length];
        return (
          <div
            key={index}
            className={`font-pixel font-bold flex items-center justify-center border-2 border-ink shadow-[2px_2px_0px_#28211e] rounded-sm transform transition-transform hover:-translate-y-1 ${sizeClasses[size]}`}
            style={{ backgroundColor: bg }}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
};

// Step Badge Pill (as in Image 5: "STEP 1: 1%")
export const StepBadge: React.FC<{ step: number; percentage?: string; label?: string }> = ({
  step,
  percentage,
  label,
}) => (
  <div className="inline-flex items-center border-2 border-ink bg-pastel-yellow px-2.5 py-0.5 rounded-full shadow-[2px_2px_0_#28211e] text-xs font-bold text-ink">
    <span className="font-pixel text-[10px] mr-1.5">STEP {step}</span>
    {percentage && <span className="bg-ink text-white px-1.5 py-0.2 rounded-full text-[10px] ml-1">{percentage}</span>}
    {label && <span className="ml-1 text-ink">{label}</span>}
  </div>
);

// Washi Tape Strip
export const WashiTape: React.FC<{
  color?: string;
  pattern?: 'stripes' | 'dots' | 'plain';
  rotation?: number;
  width?: string;
  className?: string;
}> = ({
  color = 'rgba(255, 224, 102, 0.85)',
  rotation = -2,
  width = '80px',
  className = '',
}) => (
  <div
    className={`h-5 border border-dashed border-ink/40 shadow-sm pointer-events-none ${className}`}
    style={{
      backgroundColor: color,
      width,
      transform: `rotate(${rotation}deg)`,
    }}
  />
);
