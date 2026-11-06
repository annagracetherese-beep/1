import React, { useState } from 'react';
import { sound } from '../../audio/soundManager';
import { CURIOSITY_AREAS } from '../../data/portfolioData';
import { WashiTape, ScrabbleTiles, StickerSparkle } from '../ui/ScrapbookElements';
import { Map, ArrowRight, Compass, Sparkles } from 'lucide-react';

interface ExplorationForestSectionProps {
  onBackToMap: () => void;
  onNextLocation: () => void;
}

/**
 * LOCATION 05 — EXPLORATION FOREST
 * Curiosity Map of 6 Future Frontiers (Explicitly framed as learning interests, not past work).
 */
export const ExplorationForestSection: React.FC<ExplorationForestSectionProps> = ({
  onBackToMap,
  onNextLocation,
}) => {
  const [selectedArea, setSelectedArea] = useState(CURIOSITY_AREAS[0]);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white border-4 border-ink rounded-3xl shadow-brutal-xl overflow-hidden p-6 sm:p-8 paper-grid">
        {/* Top Tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <WashiTape color="rgba(143, 168, 155, 0.85)" width="130px" rotation={-1} />
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-ink/30 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs bg-sage-300 text-ink px-3 py-1 rounded-full border-2 border-ink shadow-brutal-sm font-bold">
              LOCATION 05
            </span>
            <span className="font-pixel text-xs text-ink/70">EXPLORATION FOREST &bull; CURIOSITY MAP</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onBackToMap();
              }}
              className="btn-neo bg-cream-200 hover:bg-cream-300 px-3 py-1.5 rounded-xl text-xs font-pixel text-ink flex items-center gap-1.5"
            >
              <Map size={14} />
              <span>RETURN TO MAP</span>
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6 text-left">
          <ScrabbleTiles text="EXPLORE" size="sm" className="mb-2" />
          <h2 className="font-pixel text-xl sm:text-3xl text-ink tracking-tight mt-2 flex items-center gap-2">
            &ldquo;PLACES I WANT TO EXPLORE&rdquo;
            <Compass size={26} className="text-emerald-700" />
          </h2>
          <p className="text-base text-ink/80 font-medium italic mt-1">
            &ldquo;There are so many fascinating areas of technology waiting to be explored. Here&apos;s my curiosity map.&rdquo;
          </p>
          <div className="mt-2 inline-block bg-sage-100 border border-ink/40 px-3 py-1 rounded-md text-xs font-semibold text-ink">
            Note: These represent genuine curiosity and future exploration paths, not completed commercial projects.
          </div>
        </div>

        {/* 6 Discoverable Frontier Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
          {CURIOSITY_AREAS.map((area) => {
            const isSelected = selectedArea.id === area.id;
            return (
              <div
                key={area.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedArea(area);
                }}
                className={`cursor-pointer rounded-2xl border-2 border-ink p-3.5 text-left transition-all ${
                  isSelected
                    ? 'bg-pastel-yellow border-3 shadow-brutal scale-102 ring-2 ring-ink'
                    : 'bg-white hover:bg-cream-50 shadow-brutal-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{area.icon}</span>
                  <span className="font-pixel text-[9px] bg-ink text-white px-1.5 py-0.2 rounded">
                    FRONTIER
                  </span>
                </div>
                <h4 className="font-pixel text-xs text-ink font-bold leading-tight">
                  {area.title}
                </h4>
                <p className="text-[11px] text-ink/75 mt-1 line-clamp-2 leading-snug">
                  {area.blurb}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Frontier Spotlight Inspector */}
        <div className="relative bg-sage-50 border-3 border-ink rounded-2xl p-6 shadow-brutal text-left">
          <div className="absolute -top-3 right-6">
            <WashiTape color="rgba(255, 224, 102, 0.85)" width="60px" rotation={2} />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl border-2 border-ink flex items-center justify-center text-2xl shadow-brutal-sm"
              style={{ backgroundColor: selectedArea.color }}
            >
              {selectedArea.icon}
            </div>
            <div>
              <h3 className="font-pixel text-base text-ink font-bold">{selectedArea.title}</h3>
              <span className="text-xs text-ink/70 font-semibold">Future Exploration Frontier</span>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="bg-white p-3.5 rounded-xl border-2 border-ink shadow-brutal-sm">
              <span className="font-pixel text-[10px] text-ink/70 block mb-1">WHAT IT REPRESENTS:</span>
              <p className="text-sm text-ink leading-relaxed font-medium">
                {selectedArea.blurb}
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border-2 border-ink shadow-brutal-sm">
              <span className="font-pixel text-[10px] text-ink/70 block mb-1">WHY IT SPARKS MY CURIOSITY:</span>
              <p className="text-sm text-ink leading-relaxed font-medium">
                {selectedArea.whyCurious}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ink/20 flex items-center justify-between text-xs text-ink/70">
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-700" />
              <span className="font-pixel text-[9px]">STEP-BY-STEP ADVENTURE &bull; LEARNING CONTINUOUSLY</span>
            </div>
            <StickerSparkle size={18} color="#8fa89b" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-ink/20 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBackToMap();
            }}
            className="btn-neo bg-cream-200 hover:bg-cream-300 px-4 py-2 rounded-xl text-xs font-pixel text-ink flex items-center gap-2"
          >
            <Map size={14} />
            <span>&lt; BACK TO MAP</span>
          </button>

          <button
            onClick={() => {
              sound.playSelect();
              onNextLocation();
            }}
            className="btn-neo bg-pastel-yellow hover:bg-[#ffeb85] px-5 py-2.5 rounded-xl text-xs font-pixel text-ink flex items-center gap-2 font-bold"
          >
            <span>NEXT: CONTACT STATION</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
