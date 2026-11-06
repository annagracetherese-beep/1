import React, { useState } from 'react';
import { sound } from '../../audio/soundManager';
import { SKILL_INVENTORY, CURRENT_QUESTS } from '../../data/portfolioData';
import { WashiTape, ScrabbleTiles, StickerSparkle } from '../ui/ScrapbookElements';
import { Map, ArrowRight, BookOpen, Compass, CheckCircle2 } from 'lucide-react';

interface LearningLabSectionProps {
  onBackToMap: () => void;
  onNextLocation: () => void;
}

/**
 * LOCATION 02 — LEARNING LAB
 * RPG Knowledge Inventory & Active Quests Board.
 */
export const LearningLabSection: React.FC<LearningLabSectionProps> = ({
  onBackToMap,
  onNextLocation,
}) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_INVENTORY[0]);

  const handleSelectSkill = (skill: (typeof SKILL_INVENTORY)[0]) => {
    sound.playClick();
    setSelectedSkill(skill);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white border-4 border-ink rounded-3xl shadow-brutal-xl overflow-hidden p-6 sm:p-8 paper-dots">
        {/* Top Tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <WashiTape color="rgba(116, 192, 252, 0.85)" width="130px" rotation={1} />
        </div>

        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-ink/30 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs bg-pastel-blue text-ink px-3 py-1 rounded-full border-2 border-ink shadow-brutal-sm font-bold">
              LOCATION 02
            </span>
            <span className="font-pixel text-xs text-ink/70">LEARNING LAB &bull; SKILLS &amp; QUESTS</span>
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
          <ScrabbleTiles text="INVENTORY" size="sm" className="mb-2" />
          <h2 className="font-pixel text-xl sm:text-3xl text-ink tracking-tight mt-2 flex items-center gap-2">
            &ldquo;MY INVENTORY OF KNOWLEDGE&rdquo;
            <BookOpen size={26} className="text-blue-600" />
          </h2>
          <p className="text-sm text-ink/75 font-semibold mt-1">
            Genuine skills and tools in my backpack — no fake percentages or exaggerated mastery.
          </p>
        </div>

        {/* Grid: RPG Inventory Grid & Item Inspector Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: 6 Inventory Slots */}
          <div className="md:col-span-7">
            <div className="bg-[#28211e] p-4 rounded-2xl shadow-brutal border-2 border-ink">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/20">
                <span className="font-pixel text-[11px] text-pastel-yellow tracking-wider">
                  🎒 BACKPACK SLOTS
                </span>
                <span className="font-pixel text-[9px] text-white/70">CLICK ITEM TO INSPECT</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {SKILL_INVENTORY.map((item) => {
                  const isSelected = selectedSkill.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectSkill(item)}
                      className={`relative cursor-pointer aspect-square rounded-xl p-2 flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-pastel-yellow border-3 border-white scale-105 shadow-[0_0_12px_rgba(255,224,102,0.8)]'
                          : 'bg-[#423631] hover:bg-[#52443e] border-2 border-[#1a1513]'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl mb-1 filter drop-shadow-sm">
                        {item.pixelIcon}
                      </span>
                      <span
                        className={`font-pixel text-[9px] sm:text-[10px] text-center truncate max-w-full font-bold ${
                          isSelected ? 'text-ink' : 'text-cream-100'
                        }`}
                      >
                        {item.name}
                      </span>
                      <span
                        className={`text-[8px] sm:text-[9px] mt-0.5 px-1 rounded-sm uppercase tracking-wider font-semibold ${
                          isSelected
                            ? 'bg-ink text-white'
                            : 'bg-black/40 text-cream-200'
                        }`}
                      >
                        {item.status.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Item Inspector Panel */}
          <div className="md:col-span-5 text-left">
            <div className="relative bg-cream-100 border-3 border-ink rounded-2xl p-5 shadow-brutal">
              <div className="absolute -top-3 right-4">
                <WashiTape color="rgba(203, 178, 254, 0.9)" width="60px" rotation={-2} />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl border-2 border-ink flex items-center justify-center text-2xl shadow-brutal-sm"
                  style={{ backgroundColor: selectedSkill.color }}
                >
                  {selectedSkill.pixelIcon}
                </div>
                <div>
                  <h4 className="font-pixel text-sm text-ink font-bold">{selectedSkill.name}</h4>
                  <span className="inline-block bg-ink text-white font-pixel text-[9px] px-2 py-0.5 rounded-full mt-0.5">
                    STATUS: {selectedSkill.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-ink/80 pt-2 border-t border-ink/20">
                <div>
                  <span className="font-bold text-ink">Category:</span> {selectedSkill.category}
                </div>
                <div>
                  <span className="font-bold text-ink">Field Notes:</span>
                  <p className="mt-1 leading-relaxed bg-white p-2.5 rounded-lg border border-ink/30 text-ink">
                    {selectedSkill.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-dashed border-ink/30 flex items-center gap-1.5 text-[10px] font-pixel text-ink/60">
                <StickerSparkle size={14} color="#74c0fc" />
                <span>ACTIVE ADVENTURE ASSET</span>
              </div>
            </div>
          </div>
        </div>

        {/* CURRENT QUESTS BOARD */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-ink/30 text-left">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Compass size={20} className="text-amber-800" />
              <h3 className="font-pixel text-sm sm:text-base text-ink">CURRENT QUESTS</h3>
            </div>
            <span className="font-pixel text-[10px] bg-pastel-yellow px-2.5 py-1 rounded-full border border-ink">
              4 ACTIVE QUESTS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CURRENT_QUESTS.map((quest) => (
              <div
                key={quest.id}
                className="bg-white hover:bg-cream-50 border-2 border-ink p-3.5 rounded-xl shadow-brutal-sm hover:shadow-brutal transition-all flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-pastel-yellow border-2 border-ink flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} className="text-ink" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-pixel text-[9px] bg-ink text-white px-1.5 py-0.2 rounded">
                      {quest.tag}
                    </span>
                    <span className="font-pixel text-[9px] text-emerald-700 font-bold">
                      {quest.status}
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-ink">{quest.title}</h5>
                  <p className="text-[11px] text-ink/75 mt-0.5 leading-snug">{quest.detail}</p>
                </div>
              </div>
            ))}
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
            <span>NEXT: PROJECT ARCADE</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
