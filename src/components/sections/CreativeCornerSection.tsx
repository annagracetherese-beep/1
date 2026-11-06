import React, { useState } from 'react';
import { sound } from '../../audio/soundManager';
import { CREATIVE_OUTLETS } from '../../data/portfolioData';
import { WashiTape, ScrabbleTiles, StickerFlower } from '../ui/ScrapbookElements';
import { Map, ArrowRight, Palette, Sparkles } from 'lucide-react';

interface CreativeCornerSectionProps {
  onBackToMap: () => void;
  onNextLocation: () => void;
}

/**
 * LOCATION 04 — CREATIVE CORNER
 * Warm, artistic studio showcasing crafts, collages, music, singing, dancing, and organizing.
 */
export const CreativeCornerSection: React.FC<CreativeCornerSectionProps> = ({
  onBackToMap,
  onNextLocation,
}) => {
  const [activeOutlet, setActiveOutlet] = useState(CREATIVE_OUTLETS[0]);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white border-4 border-ink rounded-3xl shadow-brutal-xl overflow-hidden p-6 sm:p-8 paper-grid">
        {/* Top Tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <WashiTape color="rgba(203, 178, 254, 0.85)" width="130px" rotation={2} />
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-ink/30 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs bg-pastel-lavender text-ink px-3 py-1 rounded-full border-2 border-ink shadow-brutal-sm font-bold">
              LOCATION 04
            </span>
            <span className="font-pixel text-xs text-ink/70">CREATIVE CORNER &bull; BEYOND CODE</span>
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
          <ScrabbleTiles text="CREATIVE" size="sm" className="mb-2" />
          <h2 className="font-pixel text-xl sm:text-3xl text-ink tracking-tight mt-2 flex items-center gap-2">
            &ldquo;MY WORLD BEYOND TECHNOLOGY&rdquo;
            <Palette size={26} className="text-purple-600" />
          </h2>
          <p className="text-base text-ink/80 font-medium italic mt-1">
            &ldquo;Some of my favourite things happen away from a screen.&rdquo;
          </p>
          <p className="text-sm text-ink/75 font-normal mt-2 leading-relaxed">
            I love exploring creativity in different forms. From arts and crafts to collages, visual compositions,
            music, singing and dancing, I enjoy expressing myself through different creative outlets.
          </p>
        </div>

        {/* Interactive Studio Stations */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {CREATIVE_OUTLETS.map((outlet) => {
            const isSelected = activeOutlet.title === outlet.title;
            return (
              <div
                key={outlet.title}
                onClick={() => {
                  sound.playClick();
                  setActiveOutlet(outlet);
                }}
                className={`cursor-pointer rounded-2xl border-2 border-ink p-3 text-center transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-pastel-yellow border-3 shadow-brutal scale-105'
                    : 'bg-white hover:bg-cream-100 shadow-brutal-sm'
                }`}
              >
                <span className="text-2xl mb-1">{outlet.icon}</span>
                <span className="font-pixel text-[10px] text-ink font-bold line-clamp-1">
                  {outlet.title}
                </span>
                <span className="text-[9px] text-ink/70 mt-0.5 line-clamp-1">{outlet.subtitle}</span>
              </div>
            );
          })}
        </div>

        {/* Detailed Studio Workbench Showcase */}
        <div className="relative bg-pastel-lavenderLight border-3 border-ink rounded-2xl p-6 shadow-brutal text-left">
          <div className="absolute -top-3 right-6">
            <WashiTape color="rgba(244, 166, 178, 0.85)" width="60px" rotation={-2} />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl border-2 border-ink flex items-center justify-center text-2xl shadow-brutal-sm"
              style={{ backgroundColor: activeOutlet.color }}
            >
              {activeOutlet.icon}
            </div>
            <div>
              <h3 className="font-pixel text-base text-ink font-bold">{activeOutlet.title}</h3>
              <span className="font-handwriting text-lg text-amber-900 font-bold">
                {activeOutlet.subtitle}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border-2 border-ink shadow-brutal-sm mt-3">
            <p className="text-sm text-ink leading-relaxed font-medium">
              {activeOutlet.description}
            </p>
          </div>

          {/* Scrapbook Doodle Elements */}
          <div className="mt-4 pt-3 border-t border-ink/20 flex flex-wrap items-center justify-between text-xs text-ink/70">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-purple-600" />
              <span className="font-pixel text-[9px]">TACTILE EXPERIMENTATION &bull; SENSORY JOY</span>
            </div>
            <StickerFlower size={22} color="#cbb2fe" />
          </div>
        </div>

        {/* Studio Elements Visual Collage */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-ink/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="bg-white p-3.5 rounded-xl border-2 border-ink shadow-brutal-sm">
            <span className="font-pixel text-[10px] text-ink/70 block mb-1">CRAFT DESK</span>
            <p className="text-xs text-ink font-medium">
              Paper clippings, glue sticks, vintage stamps, and washi tape journals.
            </p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border-2 border-ink shadow-brutal-sm">
            <span className="font-pixel text-[10px] text-ink/70 block mb-1">MUSIC CORNER</span>
            <p className="text-xs text-ink font-medium">
              Vocal melodies, rhythms, and songs that ignite creative inspiration while designing.
            </p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border-2 border-ink shadow-brutal-sm">
            <span className="font-pixel text-[10px] text-ink/70 block mb-1">LEADERSHIP &amp; TEAMWORK</span>
            <p className="text-xs text-ink font-medium">
              Organized, enthusiastic about bringing groups together and planning creative initiatives.
            </p>
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
            <span>NEXT: EXPLORATION FOREST</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
