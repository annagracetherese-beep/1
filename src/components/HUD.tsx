import React from 'react';
import { sound } from '../audio/soundManager';
import { Volume2, VolumeX, BookOpen, Map, Music, Sparkles } from 'lucide-react';

interface HUDProps {
  currentLocationName: string | null;
  onOpenJournal: () => void;
  onResetMap: () => void;
  visitedCount: number;
  totalLocations: number;
  isMuted: boolean;
  onToggleSound: () => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
}

/**
 * Top HUD (Heads-Up Display)
 * Provides persistent, clean game controls, status indicator, sound controls, and quest journal access.
 */
export const HUD: React.FC<HUDProps> = ({
  currentLocationName,
  onOpenJournal,
  onResetMap,
  visitedCount,
  totalLocations,
  isMuted,
  onToggleSound,
  isBgmPlaying,
  onToggleBgm,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 p-2 sm:p-3 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Player ID & Current Location Tag */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Logo / Player Badge */}
          <div
            onClick={onResetMap}
            className="cursor-pointer bg-white border-2 border-ink px-3 py-1.5 rounded-xl shadow-brutal-sm hover:shadow-brutal transition-all flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-md bg-pastel-yellow border border-ink flex items-center justify-center font-pixel text-xs font-bold text-ink">
              AA
            </div>
            <div className="hidden sm:block text-left">
              <span className="font-pixel text-[11px] text-ink block leading-tight">ANNA ANOOP</span>
              <span className="text-[10px] text-ink/70 font-semibold block">The Designer Explorer &bull; Amal Jyothi CSE</span>
            </div>
          </div>

          {/* Current Location Pill */}
          <div className="bg-cream-100 border-2 border-ink px-3 py-1.5 rounded-xl shadow-brutal-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-ink" />
            <span className="font-pixel text-[10px] text-ink font-bold max-w-[130px] sm:max-w-none truncate">
              {currentLocationName ? currentLocationName : 'WORLD MAP: EXPLORING'}
            </span>
          </div>
        </div>

        {/* Right: Controls & Journal Toggle */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Map Overview Button */}
          {currentLocationName && (
            <button
              onClick={() => {
                sound.playClick();
                onResetMap();
              }}
              className="flex items-center gap-1 bg-pastel-pink border-2 border-ink px-2.5 sm:px-3 py-1.5 rounded-xl shadow-brutal-sm hover:shadow-brutal active:translate-y-0.5 transition-all font-pixel text-[10px] text-ink"
              title="Return to World Map"
            >
              <Map size={14} />
              <span className="hidden sm:inline">WORLD MAP</span>
            </button>
          )}

          {/* Background Music Toggle */}
          <button
            onClick={() => {
              onToggleBgm();
              sound.playClick();
            }}
            className={`flex items-center gap-1 border-2 border-ink px-2.5 sm:px-3 py-1.5 rounded-xl shadow-brutal-sm hover:shadow-brutal active:translate-y-0.5 transition-all font-pixel text-[10px] ${
              isBgmPlaying ? 'bg-pastel-lavender text-ink' : 'bg-white text-ink/70'
            }`}
            title={isBgmPlaying ? 'Pause Cozy BGM' : 'Play Cozy 8-Bit BGM'}
          >
            <Music size={14} className={isBgmPlaying ? 'animate-bounceSubtle text-purple-900' : ''} />
            <span className="hidden md:inline">{isBgmPlaying ? 'BGM: ON' : 'BGM: OFF'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-white border-2 border-ink rounded-xl shadow-brutal-sm hover:shadow-brutal active:translate-y-0.5 transition-all text-ink"
            title={isMuted ? 'Turn Sound FX ON' : 'Turn Sound FX OFF'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-emerald-700" />}
          </button>

          {/* Quest Journal Button (matching Reference Image 3 book) */}
          <button
            onClick={() => {
              sound.playJournalFlip();
              onOpenJournal();
            }}
            className="relative flex items-center gap-1.5 bg-pastel-yellow hover:bg-[#ffeb85] border-2 border-ink px-3 py-1.5 rounded-xl shadow-brutal-sm hover:shadow-brutal active:translate-y-0.5 transition-all text-ink font-pixel text-[11px]"
            title="Open Quest Journal (Fast Travel & Log)"
          >
            <BookOpen size={15} />
            <span className="hidden sm:inline">JOURNAL</span>
            {/* Progress Badge */}
            <span className="bg-ink text-white font-pixel text-[9px] px-1.5 py-0.2 rounded-md ml-0.5">
              {visitedCount}/{totalLocations}
            </span>
            {/* Sparkle badge */}
            <Sparkles size={11} className="text-amber-700 absolute -top-1 -right-1" />
          </button>
        </div>
      </div>
    </header>
  );
};
