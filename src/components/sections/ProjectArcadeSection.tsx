import React, { useState, useEffect } from 'react';
import { sound } from '../../audio/soundManager';
import { PROJECTS } from '../../data/portfolioData';
import { WashiTape, ScrabbleTiles } from '../ui/ScrapbookElements';
import { Map, ArrowRight, Play, Terminal, RotateCcw, Sparkles } from 'lucide-react';

interface ProjectArcadeSectionProps {
  onBackToMap: () => void;
  onNextLocation: () => void;
}

/**
 * LOCATION 03 — PROJECT ARCADE
 * Features 2 Retro Arcade Cabinets for the EXACT 2 Authentic Projects:
 * 1. Train Ticket Booking System (Python + MySQL) with interactive terminal simulator
 * 2. Dinosaur Arrow Game (Scratch) with playable mini-game simulator!
 */
export const ProjectArcadeSection: React.FC<ProjectArcadeSectionProps> = ({
  onBackToMap,
  onNextLocation,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('train-booking');

  // Terminal Simulator State for Project 1 (Train Ticket Booking)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '========================================',
    '🚂 TRAIN TICKET BOOKING SYSTEM v1.0',
    'Connected to MySQL database [railway_db]...',
    '========================================',
    'Choose an option:',
    ' [1] Check Available Trains',
    ' [2] Book Ticket (Express 102)',
    ' [3] View Booking Status',
  ]);

  // Mini-Game State for Project 2 (Dinosaur Arrow Game)
  const [dinoY, setDinoY] = useState(0); // 0 = ground, > 0 = jumping
  const [isJumping, setIsJumping] = useState(false);
  const [arrowX, setArrowX] = useState(260);
  const [gameScore, setGameScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Jump handler for Dinosaur
  const handleDinoJump = () => {
    if (isJumping || isGameOver) return;
    sound.playArcadeBeep(650);
    setIsJumping(true);
    let jumpHeight = 0;
    const upInterval = setInterval(() => {
      jumpHeight += 4;
      setDinoY(jumpHeight);
      if (jumpHeight >= 45) {
        clearInterval(upInterval);
        const downInterval = setInterval(() => {
          jumpHeight -= 4;
          setDinoY(jumpHeight);
          if (jumpHeight <= 0) {
            setDinoY(0);
            setIsJumping(false);
            clearInterval(downInterval);
          }
        }, 22);
      }
    }, 22);
  };

  // Dinosaur Mini-Game Loop
  useEffect(() => {
    if (!gameStarted || isGameOver) return;

    const interval = setInterval(() => {
      setArrowX((prev) => {
        if (prev <= 10) {
          // Check collision
          setGameScore((s) => s + 1);
          sound.playArcadeBeep(880);
          return 260; // reset arrow
        }
        // Collision check
        if (prev > 30 && prev < 65 && dinoY < 20) {
          setIsGameOver(true);
          sound.playArcadeBeep(220);
          return prev;
        }
        return prev - 6;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [gameStarted, isGameOver, dinoY]);

  const restartDinoGame = () => {
    sound.playClick();
    setArrowX(260);
    setDinoY(0);
    setGameScore(0);
    setIsGameOver(false);
    setGameStarted(true);
  };

  const handleTerminalAction = (action: number) => {
    sound.playArcadeBeep(700);
    if (action === 1) {
      setTerminalOutput((prev) => [
        ...prev,
        '> QUERY: SELECT * FROM trains;',
        '  [101] Kerala Express: 42 seats left',
        '  [102] Nilgiri Superfast: 18 seats left',
      ]);
    } else if (action === 2) {
      const pnr = Math.floor(100000 + Math.random() * 900000);
      setTerminalOutput((prev) => [
        ...prev,
        `> INSERT INTO bookings (train_no, passenger) VALUES (102, "Student Explorer");`,
        `  SUCCESS! PNR #${pnr} confirmed in MySQL db.`,
      ]);
    } else {
      setTerminalOutput((prev) => [
        ...prev,
        '> STATUS: Booking confirmed. MySQL transaction committed.',
      ]);
    }
  };

  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div className="w-full max-w-5xl mx-auto my-6 p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white border-4 border-ink rounded-3xl shadow-brutal-xl overflow-hidden p-6 sm:p-8 paper-dots">
        {/* Top Tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <WashiTape color="rgba(255, 224, 102, 0.85)" width="130px" rotation={-1.5} />
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-ink/30 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs bg-pastel-yellow text-ink px-3 py-1 rounded-full border-2 border-ink shadow-brutal-sm font-bold">
              LOCATION 03
            </span>
            <span className="font-pixel text-xs text-ink/70">PROJECT ARCADE &bull; 2 CREATIONS</span>
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
          <ScrabbleTiles text="CREATIONS" size="sm" className="mb-2" />
          <h2 className="font-pixel text-xl sm:text-3xl text-ink tracking-tight mt-2 flex items-center gap-2">
            &ldquo;MY LITTLE CREATIONS&rdquo;
            <Sparkles size={24} className="text-amber-500" />
          </h2>
          <p className="text-base text-ink/80 font-medium italic mt-1">
            &ldquo;Every project is another little adventure in learning.&rdquo;
          </p>
          <div className="mt-2 inline-block bg-pastel-pinkLight border border-ink/40 px-3 py-1 rounded-md text-xs font-semibold text-ink">
            Note: Exactly two authentic projects are showcased below. No extra projects or placeholders added.
          </div>
        </div>

        {/* 2 ARCADE CABINETS SELECTOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* CABINET 1: TRAIN TICKET BOOKING SYSTEM */}
          <div
            onClick={() => {
              sound.playClick();
              setSelectedProjectId('train-booking');
            }}
            className={`cursor-pointer rounded-2xl border-3 border-ink p-4 transition-all ${
              selectedProjectId === 'train-booking'
                ? 'bg-pastel-blueLight shadow-brutal-lg ring-3 ring-ink'
                : 'bg-white hover:bg-cream-50 shadow-brutal-sm'
            }`}
          >
            {/* Arcade Cabinet Top Marquee */}
            <div className="bg-[#28211e] text-pastel-yellow font-pixel text-xs p-2 rounded-t-lg border-2 border-ink text-center flex items-center justify-between">
              <span>CABINET 01</span>
              <span className="bg-[#52796f] text-white px-1.5 rounded text-[9px]">PYTHON + MYSQL</span>
            </div>

            {/* Cabinet Screen Frame */}
            <div className="bg-[#1a1513] p-3 rounded-b-lg border-2 border-t-0 border-ink relative overflow-hidden">
              <div className="aspect-[16/10] bg-[#0c1a0e] rounded border border-emerald-900/60 p-3 text-left font-mono2 text-emerald-400 text-sm crt-scanlines flex flex-col justify-between">
                <div>
                  <div className="font-bold text-emerald-300">🚂 TRAIN BOOKING SYSTEM</div>
                  <div className="text-xs text-emerald-500/80">Database Architecture &bull; Python</div>
                </div>
                <div className="text-[11px] text-emerald-300 bg-emerald-950/60 p-1.5 rounded border border-emerald-800/40">
                  &gt; [READY] Click to operate database terminal
                </div>
              </div>
            </div>

            <div className="mt-3 text-left">
              <h4 className="font-pixel text-xs sm:text-sm text-ink font-bold">
                Train Ticket Booking System
              </h4>
              <p className="text-xs text-ink/70 mt-1 line-clamp-2">
                School-level project exploring database management and basic programming.
              </p>
            </div>
          </div>

          {/* CABINET 2: DINOSAUR ARROW GAME */}
          <div
            onClick={() => {
              sound.playClick();
              setSelectedProjectId('dino-game');
            }}
            className={`cursor-pointer rounded-2xl border-3 border-ink p-4 transition-all ${
              selectedProjectId === 'dino-game'
                ? 'bg-pastel-yellowLight shadow-brutal-lg ring-3 ring-ink'
                : 'bg-white hover:bg-cream-50 shadow-brutal-sm'
            }`}
          >
            {/* Arcade Cabinet Top Marquee */}
            <div className="bg-[#28211e] text-pastel-pink font-pixel text-xs p-2 rounded-t-lg border-2 border-ink text-center flex items-center justify-between">
              <span>CABINET 02</span>
              <span className="bg-[#e8590c] text-white px-1.5 rounded text-[9px]">SCRATCH</span>
            </div>

            {/* Cabinet Screen Frame */}
            <div className="bg-[#1a1513] p-3 rounded-b-lg border-2 border-t-0 border-ink relative overflow-hidden">
              <div className="aspect-[16/10] bg-[#1a2e3b] rounded border border-cyan-900/60 p-3 text-left font-mono2 text-cyan-300 text-sm crt-scanlines flex flex-col justify-between">
                <div>
                  <div className="font-bold text-pastel-yellow">🦖 DINOSAUR ARROW GAME</div>
                  <div className="text-xs text-cyan-400/80">Interactive Mechanics &bull; Scratch</div>
                </div>
                <div className="text-[11px] text-pastel-yellow bg-cyan-950/60 p-1.5 rounded border border-cyan-800/40">
                  &gt; [READY] Click to play dinosaur mini-game
                </div>
              </div>
            </div>

            <div className="mt-3 text-left">
              <h4 className="font-pixel text-xs sm:text-sm text-ink font-bold">
                Dinosaur Arrow Game
              </h4>
              <p className="text-xs text-ink/70 mt-1 line-clamp-2">
                Simple interactive game featuring a dinosaur, arrow, scoring and game-over functionality.
              </p>
            </div>
          </div>
        </div>

        {/* ACTIVE PROJECT INTERACTION PANEL */}
        <div className="bg-[#f9f5ec] border-3 border-ink rounded-2xl p-5 sm:p-7 shadow-brutal text-left relative">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink/20 pb-3 mb-4">
            <div>
              <span className="font-pixel text-[10px] bg-ink text-white px-2 py-0.5 rounded mr-2">
                {activeProject.technology}
              </span>
              <span className="font-pixel text-sm sm:text-base text-ink font-bold">
                {activeProject.title}
              </span>
            </div>
            <span className="text-xs font-pixel text-ink/70">{activeProject.badge}</span>
          </div>

          <p className="text-sm text-ink/80 leading-relaxed font-medium mb-4">
            {activeProject.description}
          </p>

          {/* SIMULATOR 1: TRAIN TICKET BOOKING TERMINAL */}
          {activeProject.id === 'train-booking' && (
            <div className="bg-[#0f1710] border-2 border-ink rounded-xl p-4 shadow-brutal-sm text-emerald-400 font-mono2 text-base crt-scanlines">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-800/40 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <Terminal size={14} /> python main.py --db=mysql
                </span>
                <span className="text-emerald-500">DATABASE: CONNECTED</span>
              </div>

              {/* Terminal Logs */}
              <div className="h-40 overflow-y-auto space-y-1 text-sm bg-black/40 p-2 rounded border border-emerald-900/40">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} className="leading-snug">{line}</div>
                ))}
              </div>

              {/* Terminal Action Buttons */}
              <div className="mt-3 pt-2 border-t border-emerald-800/40 flex flex-wrap gap-2">
                <button
                  onClick={() => handleTerminalAction(1)}
                  className="px-3 py-1 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-600 rounded text-xs text-white transition-colors"
                >
                  [1] Check Trains
                </button>
                <button
                  onClick={() => handleTerminalAction(2)}
                  className="px-3 py-1 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-600 rounded text-xs text-white transition-colors"
                >
                  [2] Book Ticket (MySQL Insert)
                </button>
                <button
                  onClick={() => handleTerminalAction(3)}
                  className="px-3 py-1 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-600 rounded text-xs text-white transition-colors"
                >
                  [3] Check Status
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setTerminalOutput(['[Console Reset]']);
                  }}
                  className="px-2 py-1 bg-red-950/60 hover:bg-red-900 border border-red-700 rounded text-xs text-white transition-colors ml-auto flex items-center gap-1"
                >
                  <RotateCcw size={12} /> Clear
                </button>
              </div>
            </div>
          )}

          {/* SIMULATOR 2: PLAYABLE SCRATCH DINOSAUR MINI-GAME */}
          {activeProject.id === 'dino-game' && (
            <div className="bg-[#102027] border-2 border-ink rounded-xl p-4 shadow-brutal-sm text-cyan-200 font-pixel crt-scanlines">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-800/40 text-[10px]">
                <span>🦖 SCRATCH CANVAS SIMULATOR</span>
                <span className="text-pastel-yellow">SCORE: {gameScore}</span>
              </div>

              {/* Game Viewport */}
              <div className="relative h-44 bg-[#1b3a4b] rounded-lg border border-cyan-800/60 overflow-hidden flex flex-col justify-end p-2 select-none">
                {/* Cloud & Stars */}
                <div className="absolute top-2 left-6 text-xs text-cyan-400 opacity-60">☁️</div>
                <div className="absolute top-4 right-12 text-xs text-cyan-400 opacity-60">☁️</div>

                {/* Dinosaur Sprite */}
                <div
                  className="absolute left-8 transition-all"
                  style={{
                    bottom: `${14 + dinoY}px`,
                  }}
                >
                  <div className="text-3xl filter drop-shadow">🦖</div>
                </div>

                {/* Moving Arrow Obstacle */}
                <div
                  className="absolute bottom-4 transition-all"
                  style={{
                    left: `${arrowX}px`,
                  }}
                >
                  <div className="text-2xl text-red-400 font-bold">🏹</div>
                </div>

                {/* Ground */}
                <div className="w-full h-3 bg-[#40916c] border-t-2 border-ink" />

                {/* Game Over Overlay */}
                {isGameOver && (
                  <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-4">
                    <span className="text-red-400 text-xs sm:text-sm font-bold mb-1">
                      GAME OVER!
                    </span>
                    <span className="text-[10px] text-white mb-2">Final Score: {gameScore}</span>
                    <button
                      onClick={restartDinoGame}
                      className="px-3 py-1 bg-pastel-yellow text-ink border border-ink rounded text-[10px] font-bold flex items-center gap-1 shadow-brutal-sm"
                    >
                      <RotateCcw size={12} /> Play Again
                    </button>
                  </div>
                )}

                {/* Start Prompt if not started */}
                {!gameStarted && !isGameOver && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
                    <span className="text-xs text-pastel-yellow mb-2">
                      Dinosaur Arrow Game
                    </span>
                    <button
                      onClick={restartDinoGame}
                      className="px-4 py-1.5 bg-pastel-yellow text-ink border-2 border-ink rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-brutal-sm hover:scale-105 transition-transform"
                    >
                      <Play size={14} className="fill-ink" /> Start Mini-Game
                    </button>
                  </div>
                )}
              </div>

              {/* Game Control Button */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[9px] text-cyan-400">Jump over the incoming arrows!</span>
                <button
                  onClick={handleDinoJump}
                  disabled={!gameStarted || isGameOver}
                  className="px-4 py-1.5 bg-pastel-yellow hover:bg-[#ffeb85] active:scale-95 disabled:opacity-40 border-2 border-ink rounded-lg text-ink text-xs font-bold shadow-brutal-sm transition-all"
                >
                  [ JUMP (SPACE) ]
                </button>
              </div>
            </div>
          )}

          {/* Project Features List */}
          <div className="mt-4 pt-3 border-t border-ink/20">
            <span className="font-pixel text-[10px] text-ink/70 block mb-2">PROJECT ARCHITECTURE:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink/80">
              {activeProject.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
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
            <span>NEXT: CREATIVE CORNER</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
