import React from 'react';
import { sound } from '../../audio/soundManager';
import { ExplorerSprite } from '../character/ExplorerSprite';
import { StickerFlower, StickerSmiley, WashiTape, ScrabbleTiles } from '../ui/ScrapbookElements';
import { Map, ArrowRight, Heart, Sparkles } from 'lucide-react';

interface MyLittleWorldSectionProps {
  onBackToMap: () => void;
  onNextLocation: () => void;
}

/**
 * LOCATION 01 — MY LITTLE WORLD
 * Warm personal introduction, cottage interior illustration, and 3 scrapbook cards.
 */
export const MyLittleWorldSection: React.FC<MyLittleWorldSectionProps> = ({
  onBackToMap,
  onNextLocation,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-4 sm:p-6 animate-fadeIn">
      {/* Neo-brutalist / Scrapbook Card Container */}
      <div className="relative bg-white border-4 border-ink rounded-3xl shadow-brutal-xl overflow-hidden p-6 sm:p-8 paper-grid">
        {/* Washi Tape top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <WashiTape color="rgba(244, 166, 178, 0.85)" width="120px" rotation={-1} />
        </div>

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-ink/30 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs bg-pastel-pink text-ink px-3 py-1 rounded-full border-2 border-ink shadow-brutal-sm font-bold">
              LOCATION 01
            </span>
            <span className="font-pixel text-xs text-ink/70">MY LITTLE WORLD &bull; ABOUT ME</span>
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

        {/* Scrabble Title & Heading */}
        <div className="mb-6 text-left">
          <ScrabbleTiles text="ABOUT ME" size="sm" className="mb-2" />
          <h2 className="font-pixel text-xl sm:text-3xl text-ink tracking-tight mt-2 flex items-center gap-2">
            &ldquo;HEY, NICE TO MEET YOU! I&apos;M ANNA ANOOP.&rdquo;
            <StickerSmiley size={28} />
          </h2>
          <p className="text-sm text-ink/70 font-semibold mt-1">
            Anna Anoop &bull; First-Year BTech CSE Student &bull; Amal Jyothi College of Engineering, Kerala
          </p>
        </div>

        {/* Main Content Layout: Story & Cozy House Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="bg-cream-100 p-5 rounded-2xl border-2 border-ink shadow-brutal-sm relative">
              <div className="absolute -top-3 -right-2">
                <StickerFlower size={26} color="#ffe066" />
              </div>
              <p className="text-base text-ink leading-relaxed font-medium">
                I&apos;m <span className="font-bold text-ink underline decoration-pastel-pink decoration-2">Anna Anoop</span>, a first-year Computer Science and Engineering student who loves exploring the
                creative side of technology.
              </p>
              <p className="text-base text-ink leading-relaxed font-medium mt-3">
                I&apos;ve always enjoyed making things, whether through arts and crafts, designing,
                experimenting with layouts or learning something new.
              </p>
              <p className="text-base text-ink leading-relaxed font-medium mt-3">
                My interest in computer science started with programming, but over time I became
                increasingly fascinated by how technology and creativity can come together to create
                meaningful experiences.
              </p>
              <p className="text-base text-ink leading-relaxed font-medium mt-3 italic text-amber-900 bg-pastel-yellow/30 p-2.5 rounded-lg border border-dashed border-ink/40">
                &ldquo;I&apos;m still discovering my interests, building my skills and figuring out
                where my creativity can take me.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Polaroid Avatar & House Interior */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Polaroid Frame */}
            <div className="relative bg-white border-3 border-ink p-4 pb-6 rounded-2xl shadow-brutal transform rotate-1 hover:rotate-0 transition-transform w-full max-w-[280px]">
              {/* Top Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <WashiTape color="rgba(116, 192, 252, 0.85)" width="70px" rotation={2} />
              </div>

              {/* Photo Area: Cozy House Interior & Explorer */}
              <div className="relative bg-gradient-to-b from-[#ffd8a8] to-[#ffec99] border-2 border-ink rounded-lg p-3 overflow-hidden flex flex-col items-center justify-center min-h-[190px]">
                {/* Pixel Bookshelf & Window backdrop */}
                <div className="absolute top-2 left-2 bg-[#8b5a3e] border border-ink w-12 h-14 rounded-xs p-1 flex flex-col gap-1">
                  <div className="h-2 bg-[#f4a6b2] rounded-xs" />
                  <div className="h-2 bg-[#74c0fc] rounded-xs" />
                  <div className="h-2 bg-[#ffe066] rounded-xs" />
                </div>
                {/* Window */}
                <div className="absolute top-2 right-2 bg-[#e7f5ff] border border-ink w-12 h-14 rounded-xs flex items-center justify-center">
                  <div className="w-full h-[1px] bg-ink" />
                  <div className="h-full w-[1px] bg-ink absolute" />
                </div>
                {/* Cozy Rug */}
                <ellipse cx="65" cy="110" rx="35" ry="12" fill="#f4a6b2" stroke="#28211e" strokeWidth="1.5" />
                {/* Explorer Character */}
                <ExplorerSprite scale={2} showShadow={true} isWalking={false} />
              </div>

              {/* Handwritten Polaroid Caption */}
              <div className="mt-3 text-center">
                <span className="font-handwriting text-xl text-ink font-bold block">
                  Anna Anoop
                </span>
                <span className="font-pixel text-[9px] text-ink/60">The Designer Explorer &bull; Year 1 CSE</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Scrapbook Information Cards */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-ink/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* CARD 1: CURRENTLY */}
            <div className="relative bg-pastel-pinkLight border-2 border-ink p-4 rounded-2xl shadow-brutal-sm text-left transform hover:-translate-y-1 transition-transform">
              <div className="absolute -top-3 left-4">
                <WashiTape color="rgba(244, 166, 178, 0.9)" width="55px" rotation={-3} />
              </div>
              <div className="flex items-center gap-1.5 mb-1.5 mt-1">
                <Sparkles size={16} className="text-pink-600" />
                <span className="font-pixel text-xs text-ink font-bold">CURRENTLY:</span>
              </div>
              <p className="text-sm font-bold text-ink leading-snug">
                First-Year BTech CSE Student
              </p>
              <p className="text-xs text-ink/75 mt-1">
                Amal Jyothi College of Engineering, Kerala, India.
              </p>
            </div>

            {/* CARD 2: EXPLORING */}
            <div className="relative bg-pastel-blueLight border-2 border-ink p-4 rounded-2xl shadow-brutal-sm text-left transform hover:-translate-y-1 transition-transform">
              <div className="absolute -top-3 left-4">
                <WashiTape color="rgba(116, 192, 252, 0.9)" width="55px" rotation={2} />
              </div>
              <div className="flex items-center gap-1.5 mb-1.5 mt-1">
                <Sparkles size={16} className="text-blue-600" />
                <span className="font-pixel text-xs text-ink font-bold">EXPLORING:</span>
              </div>
              <p className="text-sm font-bold text-ink leading-snug">
                Design, Technology &amp; Creativity
              </p>
              <p className="text-xs text-ink/75 mt-1">
                Connecting artistic expression with logical programming foundations.
              </p>
            </div>

            {/* CARD 3: ALWAYS */}
            <div className="relative bg-pastel-yellowLight border-2 border-ink p-4 rounded-2xl shadow-brutal-sm text-left transform hover:-translate-y-1 transition-transform">
              <div className="absolute -top-3 left-4">
                <WashiTape color="rgba(255, 224, 102, 0.9)" width="55px" rotation={-1} />
              </div>
              <div className="flex items-center gap-1.5 mb-1.5 mt-1">
                <Heart size={16} className="text-amber-700" />
                <span className="font-pixel text-xs text-ink font-bold">ALWAYS:</span>
              </div>
              <p className="text-sm font-bold text-ink leading-snug">
                Learning Something New
              </p>
              <p className="text-xs text-ink/75 mt-1">
                Curious, open-minded, and excited by every creative adventure.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
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
            <span>NEXT: LEARNING LAB</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
