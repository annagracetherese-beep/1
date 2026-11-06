import React from 'react';

interface ExplorerSpriteProps {
  direction?: 'down' | 'left' | 'right' | 'up';
  isWalking?: boolean;
  scale?: number;
  className?: string;
  showShadow?: boolean;
}

/**
 * Pixel-Art Explorer Character Sprite (Guided by Reference Image 2)
 * Features safari/explorer hat, khaki expedition outfit, green backpack straps & blue pack,
 * friendly pixel face, and animated walk cycle.
 */
export const ExplorerSprite: React.FC<ExplorerSpriteProps> = ({
  direction = 'down',
  isWalking = false,
  scale = 1,
  className = '',
  showShadow = true,
}) => {
  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{
        width: `${40 * scale}px`,
        height: `${52 * scale}px`,
      }}
    >
      {/* Soft Ground Shadow */}
      {showShadow && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-ink/30 transition-all duration-200"
          style={{
            width: `${28 * scale}px`,
            height: `${8 * scale}px`,
            filter: 'blur(1px)',
          }}
        />
      )}

      {/* Pixel Character Container with subtle bounce or walk animation */}
      <div
        className={`w-full h-full relative ${
          isWalking ? 'animate-bounceSubtle' : 'animate-float'
        }`}
        style={{
          transform: direction === 'left' ? 'scaleX(-1)' : 'none',
        }}
      >
        <svg
          viewBox="0 0 40 52"
          className="w-full h-full pixelated drop-shadow-[0_2px_0_rgba(40,33,30,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Backpack (Blue pack seen behind/side) */}
          <rect x="7" y="22" width="6" height="15" rx="2" fill="#2b5c8f" stroke="#28211e" strokeWidth="1.5" />
          <rect x="27" y="22" width="6" height="15" rx="2" fill="#2b5c8f" stroke="#28211e" strokeWidth="1.5" />
          
          {/* Sleeping Bag / Bedroll rolled at bottom of pack */}
          <rect x="8" y="34" width="24" height="5" rx="2" fill="#3a7d44" stroke="#28211e" strokeWidth="1.5" />

          {/* Legs & Shorts (Khaki Brown) */}
          <rect x="12" y="32" width="7" height="9" fill="#c49e72" stroke="#28211e" strokeWidth="1.5" />
          <rect x="21" y="32" width="7" height="9" fill="#c49e72" stroke="#28211e" strokeWidth="1.5" />
          {/* Belt */}
          <rect x="12" y="31" width="16" height="3" fill="#694829" stroke="#28211e" strokeWidth="1.2" />
          <rect x="18" y="31" width="4" height="3" fill="#ffe066" />

          {/* Boots */}
          <g className={isWalking ? 'transition-transform' : ''}>
            <rect x="10" y="41" width="9" height="7" rx="1.5" fill="#7a4e2d" stroke="#28211e" strokeWidth="1.5" />
            <rect x="21" y="41" width="9" height="7" rx="1.5" fill="#7a4e2d" stroke="#28211e" strokeWidth="1.5" />
            {/* Boot soles */}
            <rect x="9" y="46" width="10" height="2" fill="#28211e" />
            <rect x="21" y="46" width="10" height="2" fill="#28211e" />
          </g>

          {/* Torso / Shirt (Khaki Beige) */}
          <rect x="11" y="21" width="18" height="12" rx="2" fill="#e8d3b5" stroke="#28211e" strokeWidth="1.5" />
          {/* Shirt Collar & Buttons */}
          <path d="M16 21L20 25L24 21" stroke="#28211e" strokeWidth="1.5" fill="none" />
          <circle cx="20" cy="27" r="0.8" fill="#28211e" />
          <circle cx="20" cy="29.5" r="0.8" fill="#28211e" />

          {/* Green Backpack Straps across shoulders */}
          <rect x="12" y="21" width="3" height="11" fill="#4a7c59" stroke="#28211e" strokeWidth="1" />
          <rect x="25" y="21" width="3" height="11" fill="#4a7c59" stroke="#28211e" strokeWidth="1" />

          {/* Arms / Hands */}
          <rect x="7" y="23" width="4" height="8" rx="1.5" fill="#e8d3b5" stroke="#28211e" strokeWidth="1.2" />
          <circle cx="9" cy="32" r="2.5" fill="#ffcca0" stroke="#28211e" strokeWidth="1.2" />

          <rect x="29" y="23" width="4" height="8" rx="1.5" fill="#e8d3b5" stroke="#28211e" strokeWidth="1.2" />
          <circle cx="31" cy="32" r="2.5" fill="#ffcca0" stroke="#28211e" strokeWidth="1.2" />

          {/* Head & Face */}
          <rect x="12" y="10" width="16" height="13" rx="3" fill="#ffcca0" stroke="#28211e" strokeWidth="1.5" />
          {/* Ears */}
          <rect x="9" y="13" width="3" height="5" rx="1" fill="#ffcca0" stroke="#28211e" strokeWidth="1.2" />
          <rect x="28" y="13" width="3" height="5" rx="1" fill="#ffcca0" stroke="#28211e" strokeWidth="1.2" />

          {/* Hair strands peeking out (Warm Auburn/Brown) */}
          <rect x="11" y="9" width="18" height="4" fill="#a45a2a" />
          <rect x="10" y="12" width="3" height="4" fill="#a45a2a" />
          <rect x="27" y="12" width="3" height="4" fill="#a45a2a" />

          {/* Eyes (Pixel blue expressive eyes matching ref 2) */}
          <rect x="15" y="14" width="3" height="4" fill="#28211e" />
          <rect x="15" y="15" width="2" height="3" fill="#3b82f6" />
          <rect x="15" y="14" width="1.2" height="1.2" fill="#ffffff" />

          <rect x="22" y="14" width="3" height="4" fill="#28211e" />
          <rect x="22" y="15" width="2" height="3" fill="#3b82f6" />
          <rect x="22" y="14" width="1.2" height="1.2" fill="#ffffff" />

          {/* Rosy Cheeks */}
          <rect x="13" y="18" width="2.5" height="1.5" rx="0.5" fill="#f4a6b2" />
          <rect x="24.5" y="18" width="2.5" height="1.5" rx="0.5" fill="#f4a6b2" />

          {/* Friendly Smile & Nose */}
          <rect x="19" y="17" width="2" height="1" fill="#c49e72" />
          <path d="M18 20 Q20 22 22 20" stroke="#28211e" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Explorer Hat (Wide brim safari hat matching reference 2) */}
          {/* Hat Crown */}
          <path
            d="M11 9 C11 4, 29 4, 29 9 Z"
            fill="#cbb38b"
            stroke="#28211e"
            strokeWidth="1.5"
          />
          {/* Hat Shadow & Band */}
          <rect x="11.5" y="7" width="17" height="2.5" fill="#694829" stroke="#28211e" strokeWidth="1" />
          <rect x="18" y="7" width="4" height="2.5" fill="#ffe066" />
          {/* Hat Wide Brim */}
          <ellipse
            cx="20"
            cy="10"
            rx="16"
            ry="4.5"
            fill="#dfcaaa"
            stroke="#28211e"
            strokeWidth="1.5"
          />
          {/* Brim Underside Shadow */}
          <path d="M6 10 Q20 12 34 10" stroke="#8d7253" strokeWidth="1.2" fill="none" />
        </svg>
      </div>
    </div>
  );
};
