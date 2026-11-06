import React from 'react';
import { sound } from '../audio/soundManager';
import { ExplorerSprite } from './character/ExplorerSprite';
import { StickerFlower, StickerSparkle } from './ui/ScrapbookElements';
import { Volume2, VolumeX, Compass, Play } from 'lucide-react';

interface OpeningScreenProps {
  onStartExploring: () => void;
  onSkipToMap: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

/**
 * Opening Title Screen (Guided by Reference Image 4)
 * Captures the vibrant retro adventure title screen with drifting pixel clouds,
 * stone pillars overgrown with ivy, lush pixel hills, "THE DESIGNER EXPLORER",
 * character pose, and interactive "[ START EXPLORING ]" button.
 */
export const OpeningScreen: React.FC<OpeningScreenProps> = ({
  onStartExploring,
  onSkipToMap,
  isMuted,
  onToggleSound,
}) => {
  const handleStart = () => {
    sound.playSelect();
    onStartExploring();
  };

  const handleSkip = () => {
    sound.playClick();
    onSkipToMap();
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#74c0fc] via-[#bbf2f6] to-[#d8f3dc] overflow-hidden flex flex-col justify-between select-none">
      {/* Top Floating Cloud Layers (Animated CSS drifting) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cloud 1 */}
        <div
          className="absolute top-10 left-[-20%] opacity-80 animate-cloudDrift"
          style={{ animationDuration: '55s' }}
        >
          <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
            <path
              d="M30 70 Q10 70 10 50 Q10 30 35 30 Q45 10 75 10 Q105 10 115 25 Q135 15 160 25 Q185 30 185 50 Q205 50 205 70 Z"
              fill="#ffffff"
              stroke="#28211e"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Cloud 2 */}
        <div
          className="absolute top-28 left-[-15%] opacity-70 animate-cloudDrift"
          style={{ animationDuration: '40s', animationDelay: '12s' }}
        >
          <svg width="180" height="75" viewBox="0 0 180 75" fill="none">
            <path
              d="M25 60 Q8 60 8 45 Q8 28 30 28 Q40 8 68 8 Q95 8 102 22 Q120 12 142 22 Q162 26 162 45 Q175 45 175 60 Z"
              fill="#ffffff"
              stroke="#28211e"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* Cloud 3 */}
        <div
          className="absolute top-6 left-[-10%] opacity-60 animate-cloudDrift"
          style={{ animationDuration: '70s', animationDelay: '25s' }}
        >
          <svg width="260" height="110" viewBox="0 0 260 110" fill="none">
            <path
              d="M35 85 Q12 85 12 60 Q12 38 42 38 Q55 12 90 12 Q125 12 135 30 Q160 18 190 30 Q220 38 220 60 Q245 60 245 85 Z"
              fill="#ffffff"
              stroke="#28211e"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 w-full px-6 py-4 flex items-center justify-between">
        {/* Player Badge */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border-2 border-ink shadow-brutal-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border border-ink" />
          <span className="font-pixel text-[11px] text-ink font-bold tracking-wider">PLAYER 01: ANNA ANOOP</span>
          <span className="text-xs text-ink/70 font-semibold hidden sm:inline">| Amal Jyothi BTech CSE</span>
        </div>

        {/* Audio Toggle & Skip Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-pastel-yellow border-2 border-ink rounded-full shadow-brutal-sm hover:translate-y-[-1px] active:translate-y-[1px] transition-all text-xs font-bold text-ink"
            title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-emerald-700 animate-bounceSubtle" />}
            <span className="font-pixel text-[10px]">{isMuted ? 'SOUND: OFF' : 'SOUND: ON'}</span>
          </button>

          <button
            onClick={handleSkip}
            className="px-3 py-1.5 bg-white border-2 border-ink rounded-full shadow-brutal-sm hover:bg-cream-200 transition-all text-xs font-bold text-ink flex items-center gap-1"
          >
            <Compass size={14} />
            <span>Skip to Map</span>
          </button>
        </div>
      </header>

      {/* Main Hero Showcase */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 text-center max-w-4xl mx-auto">
        {/* Floating Scrapbook Badges */}
        <div className="relative mb-3 flex items-center gap-2">
          <StickerSparkle size={26} color="#ffe066" className="absolute -left-8 -top-3" />
          <div className="inline-block bg-pastel-pink border-2 border-ink px-4 py-1.5 rounded-full shadow-brutal text-xs sm:text-sm font-bold text-ink transform -rotate-1">
            ✨ ANNA ANOOP &bull; &quot;Every world has a story. This is mine.&quot;
          </div>
          <StickerFlower size={30} color="#f4a6b2" className="absolute -right-8 -bottom-3" />
        </div>

        {/* Grand Title: THE DESIGNER EXPLORER */}
        <div className="relative my-2">
          <h1
            className="font-pixel text-3xl sm:text-5xl md:text-6xl text-white tracking-wider leading-tight drop-shadow-[4px_4px_0_#28211e]"
            style={{
              WebkitTextStroke: '3px #28211e',
              textShadow: '5px 5px 0px #28211e',
            }}
          >
            THE DESIGNER
            <br />
            <span className="text-pastel-yellow">EXPLORER</span>
          </h1>
        </div>

        {/* Subtitle & Supporting Line */}
        <div className="mt-4 max-w-xl mx-auto space-y-2">
          <p className="font-display text-lg sm:text-2xl text-ink font-bold tracking-wide">
            &ldquo;A little curious. A little creative. Always exploring.&rdquo;
          </p>
          <p className="text-sm sm:text-base text-ink/80 font-medium bg-white/70 backdrop-blur-xs px-4 py-1.5 rounded-lg border border-ink/40 inline-block">
            Hi, I&apos;m <span className="font-bold text-ink underline decoration-pastel-pink decoration-2">Anna Anoop</span>. Welcome to my little world of creativity and code.
          </p>
        </div>

        {/* Center Explorer Avatar with safari hat & backpack */}
        <div className="my-6 relative flex flex-col items-center">
          <div className="relative p-2">
            <ExplorerSprite scale={2.4} showShadow={true} isWalking={false} />
            {/* Little speech bubble */}
            <div className="absolute -top-6 -right-20 bg-white border-2 border-ink px-2.5 py-1 rounded-xl shadow-brutal-sm text-[11px] font-pixel text-ink animate-bounceSubtle">
              I&apos;m Anna! 👋
              <div className="absolute bottom-[-6px] left-3 w-2 h-2 bg-white border-r-2 border-b-2 border-ink transform rotate-45" />
            </div>
          </div>
          <span className="font-pixel text-[10px] text-ink/75 mt-1">Anna Anoop &bull; Level 1 Student Adventurer</span>
        </div>

        {/* Main CTA: [ START EXPLORING ] */}
        <div className="mt-2 flex flex-col items-center gap-3">
          <button
            onClick={handleStart}
            className="group relative px-8 sm:px-12 py-4 bg-pastel-yellow hover:bg-[#ffeb85] active:bg-pastel-yellow border-3 border-ink rounded-2xl shadow-brutal-lg hover:shadow-brutal-xl active:shadow-brutal-pressed transition-all transform hover:-translate-y-1 active:translate-y-1 flex items-center gap-3"
          >
            <Play size={20} className="fill-ink text-ink group-hover:scale-110 transition-transform" />
            <span className="font-pixel text-base sm:text-xl text-ink font-bold tracking-wider">
              [ START EXPLORING ]
            </span>
          </button>
          
          <p className="font-mono2 text-lg text-ink/80 tracking-wide mt-1 animate-pulse">
            PRESS START OR CLICK BUTTON TO ENTER THE WORLD
          </p>
        </div>
      </main>

      {/* Bottom Scene: Green Pixel Hills & Ancient Ivy Ruins (Guided by Image 4) */}
      <div className="relative z-10 w-full h-28 sm:h-36 overflow-hidden">
        <svg
          viewBox="0 0 1200 180"
          className="w-full h-full preserve-3d"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Back Hill Layer */}
          <path
            d="M0 180 L0 100 Q300 40 600 110 T1200 90 L1200 180 Z"
            fill="#759d81"
            stroke="#28211e"
            strokeWidth="3"
          />

          {/* Ancient Stone Ruins Pillar (Left) */}
          <g transform="translate(120, 30)">
            <rect x="0" y="20" width="35" height="110" rx="3" fill="#e9ecef" stroke="#28211e" strokeWidth="2.5" />
            <rect x="-6" y="10" width="47" height="12" rx="2" fill="#ced4da" stroke="#28211e" strokeWidth="2.5" />
            <rect x="-4" y="120" width="43" height="15" rx="2" fill="#ced4da" stroke="#28211e" strokeWidth="2.5" />
            {/* Vine overlays */}
            <path d="M5 25 Q15 45 5 65 Q20 85 10 110" stroke="#3a7d44" strokeWidth="3" fill="none" />
            <circle cx="8" cy="40" r="3" fill="#52b788" />
            <circle cx="16" cy="80" r="3.5" fill="#52b788" />
          </g>

          {/* Ancient Broken Arch / Serpent Ruin (Right) */}
          <g transform="translate(980, 25)">
            <rect x="0" y="30" width="38" height="100" rx="3" fill="#e9ecef" stroke="#28211e" strokeWidth="2.5" />
            <rect x="-5" y="18" width="48" height="14" rx="2" fill="#ced4da" stroke="#28211e" strokeWidth="2.5" />
            <path d="M10 25 Q25 55 12 85 Q30 105 15 125" stroke="#3a7d44" strokeWidth="3" fill="none" />
            <circle cx="22" cy="65" r="4" fill="#52b788" />
          </g>

          {/* Front Foreground Hill with lush flowers & grass tufts */}
          <path
            d="M0 180 L0 120 Q240 70 550 130 T1200 110 L1200 180 Z"
            fill="#52796f"
            stroke="#28211e"
            strokeWidth="3"
          />

          {/* Grass Tufts along bottom */}
          <g stroke="#28211e" strokeWidth="2" fill="#95d5b2">
            <path d="M50 150 L45 135 L55 145 L65 130 L65 150 Z" />
            <path d="M220 155 L215 140 L225 148 L235 135 L235 155 Z" />
            <path d="M480 160 L475 145 L485 152 L495 140 L495 160 Z" />
            <path d="M780 155 L775 142 L785 150 L795 138 L795 155 Z" />
            <path d="M1050 150 L1045 135 L1055 146 L1065 132 L1065 150 Z" />
          </g>
        </svg>

        {/* Small bottom footer credit */}
        <div className="absolute bottom-2 inset-x-0 text-center font-pixel text-[9px] text-white/90 drop-shadow-[1px_1px_0_#28211e]">
          &copy; 2026 ANNA ANOOP &bull; THE DESIGNER EXPLORER &bull; BTech Computer Science &amp; Engineering &bull; Amal Jyothi College of Engineering
        </div>
      </div>
    </div>
  );
};
