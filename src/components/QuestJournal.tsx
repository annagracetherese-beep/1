import React, { useState } from 'react';
import { sound } from '../audio/soundManager';
import { LOCATIONS, CURRENT_QUESTS, SKILL_INVENTORY, PROJECTS } from '../data/portfolioData';
import { X, CheckCircle, Sparkles, BookOpen, MapPin, ArrowRight } from 'lucide-react';
import { StickerFlower } from './ui/ScrapbookElements';

interface QuestJournalProps {
  isOpen: boolean;
  onClose: () => void;
  visitedLocations: string[];
  onSelectLocation: (locationId: string) => void;
}

/**
 * Quest Journal Interface (Guided by Reference Image 3 - Ritual of Raven Spellbook)
 * Features an open two-page leather/cloth bound journal with category icon tabs at top,
 * potion progress bottles, quest checklists, and instant recruiter navigation.
 */
export const QuestJournal: React.FC<QuestJournalProps> = ({
  isOpen,
  onClose,
  visitedLocations,
  onSelectLocation,
}) => {
  const [activeTab, setActiveTab] = useState<'locations' | 'quests' | 'inventory'>('locations');

  if (!isOpen) return null;

  const totalLocations = LOCATIONS.length;
  const discoveredCount = visitedLocations.length;
  const progressPercent = Math.round((discoveredCount / totalLocations) * 100);

  const handleTabChange = (tab: 'locations' | 'quests' | 'inventory') => {
    sound.playJournalFlip();
    setActiveTab(tab);
  };

  const handleGoTo = (id: string) => {
    sound.playSelect();
    onSelectLocation(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/60 backdrop-blur-sm animate-fadeIn select-none">
      {/* Outer Click Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Book Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col z-10">
        {/* Top Category Tabs (matching Reference Image 3 tab bar) */}
        <div className="flex items-end justify-between px-4 sm:px-8 mb-[-4px] z-20 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => handleTabChange('locations')}
              className={`flex items-center gap-2 px-3 sm:px-5 py-2 font-pixel text-[11px] sm:text-xs rounded-t-xl border-t-3 border-x-3 border-ink transition-all ${
                activeTab === 'locations'
                  ? 'bg-[#f4efe3] text-ink font-bold translate-y-0 shadow-[0_-2px_0_#28211e]'
                  : 'bg-[#cfbda8] text-ink/75 hover:bg-[#decbbe] translate-y-1'
              }`}
            >
              <MapPin size={14} className={activeTab === 'locations' ? 'text-pastel-pink' : ''} />
              <span>WORLD MAP ({discoveredCount}/{totalLocations})</span>
            </button>

            <button
              onClick={() => handleTabChange('quests')}
              className={`flex items-center gap-2 px-3 sm:px-5 py-2 font-pixel text-[11px] sm:text-xs rounded-t-xl border-t-3 border-x-3 border-ink transition-all ${
                activeTab === 'quests'
                  ? 'bg-[#f4efe3] text-ink font-bold translate-y-0 shadow-[0_-2px_0_#28211e]'
                  : 'bg-[#cfbda8] text-ink/75 hover:bg-[#decbbe] translate-y-1'
              }`}
            >
              <Sparkles size={14} className={activeTab === 'quests' ? 'text-pastel-yellow' : ''} />
              <span>QUEST LOG ({CURRENT_QUESTS.length})</span>
            </button>

            <button
              onClick={() => handleTabChange('inventory')}
              className={`flex items-center gap-2 px-3 sm:px-5 py-2 font-pixel text-[11px] sm:text-xs rounded-t-xl border-t-3 border-x-3 border-ink transition-all ${
                activeTab === 'inventory'
                  ? 'bg-[#f4efe3] text-ink font-bold translate-y-0 shadow-[0_-2px_0_#28211e]'
                  : 'bg-[#cfbda8] text-ink/75 hover:bg-[#decbbe] translate-y-1'
              }`}
            >
              <BookOpen size={14} className={activeTab === 'inventory' ? 'text-pastel-blue' : ''} />
              <span>INVENTORY ({SKILL_INVENTORY.length})</span>
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-9 h-9 flex items-center justify-center bg-pastel-pink hover:bg-pastel-pink/80 border-2 border-ink rounded-full shadow-brutal-sm text-ink mb-1 transition-transform active:scale-95"
            title="Close Quest Journal (ESC)"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Open Book Frame */}
        <div className="relative w-full bg-[#f4efe3] border-4 border-ink rounded-3xl shadow-brutal-xl overflow-hidden flex flex-col">
          {/* Leather Book Spine Header */}
          <div className="w-full bg-[#8b5a3e] border-b-3 border-ink px-6 py-2.5 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs text-[#ffe066]">📖 EXPLORER&apos;S CHRONICLE</span>
              <span className="text-xs text-white/80 hidden sm:inline">&bull; Ritual of Learning &amp; Discovery</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono2 text-sm text-[#ffe066]">FAST-TRAVEL JOURNAL</span>
            </div>
          </div>

          {/* Dual-Page Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink/30 min-h-[460px] max-h-[72vh] overflow-y-auto">
            {/* ================= LEFT PAGE ================= */}
            <div className="p-5 sm:p-7 flex flex-col justify-between paper-grid bg-[#f9f5ec]">
              <div>
                {/* Page Title & Potion Bottle Indicator */}
                <div className="flex items-center justify-between border-b-2 border-dashed border-ink/30 pb-3 mb-4">
                  <div>
                    <h3 className="font-pixel text-sm sm:text-base text-ink">
                      {activeTab === 'locations' && 'MAP PROGRESS'}
                      {activeTab === 'quests' && 'ACTIVE QUESTS'}
                      {activeTab === 'inventory' && 'DISCOVERED ITEMS'}
                    </h3>
                    <p className="text-xs text-ink/70 font-medium">Amal Jyothi BTech CSE Exploration</p>
                  </div>
                  <StickerFlower size={24} color="#f4a6b2" />
                </div>

                {/* Tab: LOCATIONS (Left Page Details) */}
                {activeTab === 'locations' && (
                  <div className="space-y-4">
                    {/* Magical Potion Progress Bottle (matching Reference Image 3) */}
                    <div className="flex items-center gap-4 bg-white/80 p-3.5 rounded-xl border-2 border-ink shadow-brutal-sm">
                      {/* Potion Bottle Graphic */}
                      <div className="relative w-12 h-20 bg-white border-2 border-ink rounded-b-2xl rounded-t-md flex flex-col justify-end p-1 overflow-hidden">
                        {/* Cork Top */}
                        <div className="absolute top-0 inset-x-2 h-2 bg-[#8b5a3e] border-b border-ink" />
                        {/* Glowing Liquid */}
                        <div
                          className="w-full bg-gradient-to-t from-[#cbb2fe] to-[#f4a6b2] rounded-b-xl border-t-2 border-ink transition-all duration-700 relative"
                          style={{ height: `${Math.max(15, progressPercent)}%` }}
                        >
                          <div className="absolute top-0.5 left-1 w-1.5 h-1.5 rounded-full bg-white/60 animate-ping" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-pixel text-xs text-ink">EXPLORATION</span>
                          <span className="font-pixel text-xs text-emerald-700">{progressPercent}%</span>
                        </div>
                        <p className="text-xs text-ink/80 mt-1 leading-snug">
                          {discoveredCount === totalLocations
                            ? '✨ All island locations discovered! You are a true Explorer.'
                            : `Discovered ${discoveredCount} of ${totalLocations} regions across the island.`}
                        </p>
                        {/* Progress Bar */}
                        <div className="w-full h-3 bg-cream-200 border-2 border-ink rounded-full overflow-hidden mt-2">
                          <div
                            className="h-full bg-pastel-yellow border-r-2 border-ink transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Summary Quote */}
                    <div className="bg-pastel-pink/30 p-3 rounded-lg border border-dashed border-ink/40 text-xs text-ink/90 italic">
                      &quot;Every world has a story. Click any destination on the right page to fast-travel immediately.&quot;
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-pixel text-[10px] text-ink/70">ACADEMIC HOME BASE:</span>
                      <p className="text-xs text-ink font-semibold">
                        Amal Jyothi College of Engineering &bull; First-Year BTech CSE
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab: QUESTS (Left Page) */}
                {activeTab === 'quests' && (
                  <div className="space-y-3">
                    <p className="text-xs text-ink/80">
                      These are my real ongoing learning quests. No finished certifications are claimed prematurely!
                    </p>
                    <div className="space-y-2 mt-2">
                      {CURRENT_QUESTS.map((quest, idx) => (
                        <div
                          key={quest.id}
                          className="bg-white/90 p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-md bg-pastel-yellow border border-ink flex items-center justify-center font-pixel text-[10px] shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-bold text-xs text-ink block">{quest.title}</span>
                            <span className="text-[11px] text-ink/70">{quest.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab: INVENTORY (Left Page) */}
                {activeTab === 'inventory' && (
                  <div className="space-y-3">
                    <p className="text-xs text-ink/80">
                      Skills presented as authentic inventory slots with genuine status levels:
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {SKILL_INVENTORY.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white/90 p-2 rounded-lg border-2 border-ink shadow-brutal-sm flex items-center gap-2"
                        >
                          <span className="text-xl">{item.pixelIcon}</span>
                          <div className="overflow-hidden">
                            <span className="font-pixel text-[10px] text-ink truncate block">{item.name}</span>
                            <span className="text-[10px] text-ink/70 block truncate">{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Scrapbook Seal */}
              <div className="mt-4 pt-3 border-t border-ink/20 flex items-center justify-between text-[11px] text-ink/60">
                <span className="font-mono2 text-sm">ARCHIVE ENTRY: 2026</span>
                <span className="font-handwriting text-base font-bold text-ink">Anna Anoop &bull; The Designer Explorer</span>
              </div>
            </div>

            {/* ================= RIGHT PAGE ================= */}
            <div className="p-5 sm:p-7 flex flex-col justify-between paper-dots bg-[#fcf9f2]">
              <div>
                <div className="flex items-center justify-between border-b-2 border-dashed border-ink/30 pb-3 mb-4">
                  <h3 className="font-pixel text-sm sm:text-base text-ink">
                    {activeTab === 'locations' ? 'DESTINATIONS & FAST TRAVEL' : 'QUICK NAVIGATION'}
                  </h3>
                  <span className="font-pixel text-[10px] bg-pastel-yellow px-2 py-0.5 rounded border border-ink">
                    PAGE 02
                  </span>
                </div>

                {/* Location Quick Fast Travel Cards */}
                <div className="space-y-2.5">
                  {LOCATIONS.map((loc) => {
                    const isVisited = visitedLocations.includes(loc.id);
                    return (
                      <div
                        key={loc.id}
                        onClick={() => handleGoTo(loc.id)}
                        className="group cursor-pointer bg-white hover:bg-cream-100 p-2.5 sm:p-3 rounded-xl border-2 border-ink shadow-brutal-sm hover:shadow-brutal transition-all transform hover:-translate-y-0.5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {/* Location Number Badge */}
                          <div
                            className="w-8 h-8 rounded-lg border-2 border-ink flex items-center justify-center font-pixel text-xs font-bold text-ink shrink-0"
                            style={{ backgroundColor: loc.themeColor }}
                          >
                            {loc.number}
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-pixel text-xs text-ink font-bold group-hover:text-amber-800 transition-colors">
                                {loc.name}
                              </span>
                              {isVisited && (
                                <CheckCircle size={13} className="text-emerald-600 fill-emerald-100" />
                              )}
                            </div>
                            <span className="text-xs text-ink/75 line-clamp-1">{loc.shortLabel}</span>
                          </div>
                        </div>

                        {/* Travel Arrow */}
                        <div className="flex items-center gap-1 bg-cream-200 group-hover:bg-pastel-yellow border border-ink px-2 py-1 rounded-md text-[11px] font-pixel text-ink transition-colors">
                          <span className="hidden sm:inline">VISIT</span>
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 2 Projects Quick Link Bar */}
                <div className="mt-4 pt-3 border-t border-ink/20">
                  <span className="font-pixel text-[10px] text-ink/70 block mb-1.5">DOCUMENTED PROJECTS (2 ONLY):</span>
                  <div className="flex gap-2">
                    {PROJECTS.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => handleGoTo('project-arcade')}
                        className="cursor-pointer flex-1 bg-white hover:bg-pastel-yellow/30 p-2 rounded-lg border border-ink text-left transition-colors"
                      >
                        <span className="font-pixel text-[9px] text-ink block truncate">{proj.title}</span>
                        <span className="text-[10px] text-ink/70 block">{proj.technology}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Instructions */}
              <div className="mt-4 pt-3 border-t border-ink/20 text-center font-pixel text-[9px] text-ink/60">
                [ Click any location card above to warp directly ]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
