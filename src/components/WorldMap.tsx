import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../audio/soundManager';
import { LOCATIONS, type LocationInfo } from '../data/portfolioData';
import { ExplorerSprite } from './character/ExplorerSprite';
import { Home, BookOpen, Gamepad2, Palette, Compass, Mail, CheckCircle } from 'lucide-react';

interface WorldMapProps {
  onSelectLocation: (locationId: string) => void;
  visitedLocations: string[];
}

/**
 * Interactive Pixel-Art World Map (Guided by Reference Image 1)
 * Features an island village with paths, river, wooden bridges, sandy coastline,
 * swaying trees, sparkling water, 6 clickable landmark buildings, and a walking explorer character!
 */
export const WorldMap: React.FC<WorldMapProps> = ({
  onSelectLocation,
  visitedLocations,
}) => {
  // Player Position on map (percentage 0-100)
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);
  const [playerDirection, setPlayerDirection] = useState<'down' | 'left' | 'right' | 'up'>('down');
  const [isWalking, setIsWalking] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<LocationInfo | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation (Arrow keys / WASD)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const step = 2.5;
      let newX = playerPos.x;
      let newY = playerPos.y;
      let newDir = playerDirection;
      let moved = false;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        newY = Math.max(12, playerPos.y - step);
        newDir = 'up';
        moved = true;
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        newY = Math.min(88, playerPos.y + step);
        newDir = 'down';
        moved = true;
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        newX = Math.max(10, playerPos.x - step);
        newDir = 'left';
        moved = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        newX = Math.min(90, playerPos.x + step);
        newDir = 'right';
        moved = true;
      }

      if (moved) {
        setPlayerPos({ x: newX, y: newY });
        setPlayerDirection(newDir);
        setIsWalking(true);
        sound.playStep();

        // Check if close to any location
        LOCATIONS.forEach((loc) => {
          const dist = Math.hypot(loc.mapCoordinates.x - newX, loc.mapCoordinates.y - newY);
          if (dist < 6) {
            handleEnterLocation(loc.id);
          }
        });

        setTimeout(() => setIsWalking(false), 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, playerDirection]);

  // Click-to-move interpolation
  useEffect(() => {
    if (!targetPos) return;

    const interval = setInterval(() => {
      setPlayerPos((curr) => {
        const dx = targetPos.x - curr.x;
        const dy = targetPos.y - curr.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 1.5) {
          setIsWalking(false);
          setTargetPos(null);
          clearInterval(interval);
          return targetPos;
        }

        // Set direction
        if (Math.abs(dx) > Math.abs(dy)) {
          setPlayerDirection(dx > 0 ? 'right' : 'left');
        } else {
          setPlayerDirection(dy > 0 ? 'down' : 'up');
        }

        setIsWalking(true);
        sound.playStep();

        // Move towards target
        const speed = 1.2;
        return {
          x: curr.x + (dx / dist) * speed,
          y: curr.y + (dy / dist) * speed,
        };
      });
    }, 40);

    return () => clearInterval(interval);
  }, [targetPos]);

  // Handle map click
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Bounds check to stay on the island
    const boundedX = Math.max(10, Math.min(90, x));
    const boundedY = Math.max(15, Math.min(85, y));

    setTargetPos({ x: boundedX, y: boundedY });
  };

  const handleEnterLocation = (id: string) => {
    sound.playLocationEnter();
    onSelectLocation(id);
  };

  // Icon helper
  const renderLocationIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home size={18} />;
      case 'BookOpen':
        return <BookOpen size={18} />;
      case 'Gamepad2':
        return <Gamepad2 size={18} />;
      case 'Palette':
        return <Palette size={18} />;
      case 'Compass':
        return <Compass size={18} />;
      case 'Mail':
        return <Mail size={18} />;
      default:
        return <Home size={18} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#68b5e8] flex flex-col items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 select-none overflow-hidden">
      {/* Map Card Container */}
      <div className="relative w-full max-w-5xl rounded-3xl border-4 border-ink shadow-brutal-xl overflow-hidden bg-[#75b87c]">
        {/* Top Village Label Banner */}
        <div className="absolute top-3 left-4 z-30 bg-white/95 backdrop-blur-sm border-2 border-ink px-3 py-1.5 rounded-xl shadow-brutal-sm flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-pixel text-[11px] text-ink font-bold">ISLAND VILLAGE &bull; EXPLORE</span>
          <span className="text-[10px] text-ink/70 font-semibold hidden md:inline">
            [Click buildings or use WASD/Arrows to walk]
          </span>
        </div>

        {/* The World Map Canvas Viewport */}
        <div
          ref={mapContainerRef}
          onClick={handleMapClick}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[82vh] cursor-pointer overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(#8ec495 15%, transparent 16%)`,
            backgroundSize: '24px 24px',
          }}
        >
          {/* ================= SVG MAP ENVIRONMENT ================= */}
          <svg
            viewBox="0 0 1000 625"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Water Pattern */}
              <pattern id="waterRipples" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q10 5 20 10 T40 10" fill="none" stroke="#a5d8ff" strokeWidth="1.5" />
              </pattern>

              {/* Cobblestone Pattern */}
              <pattern id="cobble" width="16" height="16" patternUnits="userSpaceOnUse">
                <rect width="16" height="16" fill="#ded3b9" />
                <rect x="0" y="0" width="7" height="7" fill="#ebdcb9" stroke="#b8a786" strokeWidth="0.8" />
                <rect x="8" y="0" width="7" height="7" fill="#ebdcb9" stroke="#b8a786" strokeWidth="0.8" />
                <rect x="4" y="8" width="7" height="7" fill="#e2d2ae" stroke="#b8a786" strokeWidth="0.8" />
              </pattern>
            </defs>

            {/* Ocean Water Surrounding Island */}
            <rect width="1000" height="625" fill="#58a4d8" />
            <rect width="1000" height="625" fill="url(#waterRipples)" opacity="0.6" />

            {/* Sandy Beach Coastline Perimeter (Guided by Image 1) */}
            <path
              d="M70 60 Q250 30 500 40 T930 65 Q960 250 940 450 T880 580 Q550 610 300 580 T70 540 Q40 320 70 60 Z"
              fill="#eddcb4"
              stroke="#28211e"
              strokeWidth="4"
            />
            {/* Inner Beach Details / Sand shells */}
            <circle cx="880" cy="530" r="3" fill="#ffffff" />
            <circle cx="910" cy="200" r="2.5" fill="#ffffff" />
            <circle cx="100" cy="480" r="3" fill="#ffffff" />

            {/* Lush Island Grass Landmass */}
            <path
              d="M90 75 Q260 45 500 55 T910 80 Q940 250 920 440 T860 560 Q540 590 310 560 T90 520 Q60 320 90 75 Z"
              fill="#75b87c"
              stroke="#28211e"
              strokeWidth="3.5"
            />

            {/* Winding Sparkling River (Guided by Image 1) */}
            <path
              d="M480 55 C460 160 420 220 380 290 C340 360 410 440 460 520 C480 550 500 590 500 590"
              fill="none"
              stroke="#28211e"
              strokeWidth="56"
              strokeLinecap="round"
            />
            <path
              d="M480 55 C460 160 420 220 380 290 C340 360 410 440 460 520 C480 550 500 590 500 590"
              fill="none"
              stroke="#74c0fc"
              strokeWidth="50"
              strokeLinecap="round"
            />
            {/* River Shimmer */}
            <path
              d="M478 65 C458 165 422 225 382 295 C345 365 412 445 462 522"
              fill="none"
              stroke="#d0ebff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="18 12"
            />

            {/* River Wooden Bridges (crossing river to connect island) */}
            {/* Bridge 1 (North) */}
            <g transform="translate(425, 175) rotate(-10)">
              <rect x="-10" y="-8" width="55" height="26" rx="3" fill="#9c6644" stroke="#28211e" strokeWidth="2.5" />
              <line x1="-10" y1="-8" x2="45" y2="-8" stroke="#28211e" strokeWidth="2" />
              <line x1="-10" y1="18" x2="45" y2="18" stroke="#28211e" strokeWidth="2" />
              {/* Planks */}
              <line x1="2" y1="-8" x2="2" y2="18" stroke="#7f4f24" strokeWidth="2" />
              <line x1="16" y1="-8" x2="16" y2="18" stroke="#7f4f24" strokeWidth="2" />
              <line x1="30" y1="-8" x2="30" y2="18" stroke="#7f4f24" strokeWidth="2" />
            </g>

            {/* Bridge 2 (South) */}
            <g transform="translate(400, 420) rotate(15)">
              <rect x="-10" y="-8" width="55" height="26" rx="3" fill="#9c6644" stroke="#28211e" strokeWidth="2.5" />
              <line x1="-10" y1="-8" x2="45" y2="-8" stroke="#28211e" strokeWidth="2" />
              <line x1="-10" y1="18" x2="45" y2="18" stroke="#28211e" strokeWidth="2" />
              <line x1="2" y1="-8" x2="2" y2="18" stroke="#7f4f24" strokeWidth="2" />
              <line x1="16" y1="-8" x2="16" y2="18" stroke="#7f4f24" strokeWidth="2" />
              <line x1="30" y1="-8" x2="30" y2="18" stroke="#7f4f24" strokeWidth="2" />
            </g>

            {/* Paved Pathways & Central Plaza (Guided by Image 1) */}
            {/* Central Plaza */}
            <rect x="440" y="270" width="120" height="90" rx="8" fill="url(#cobble)" stroke="#28211e" strokeWidth="3" />
            {/* Central Fountain / Monument in Plaza */}
            <circle cx="500" cy="315" r="22" fill="#74c0fc" stroke="#28211e" strokeWidth="2.5" />
            <circle cx="500" cy="315" r="14" fill="#a5d8ff" stroke="#28211e" strokeWidth="2" />
            <circle cx="500" cy="315" r="6" fill="#ffffff" />

            {/* Pathway to House (West) */}
            <path d="M440 315 L230 315 L230 250" fill="none" stroke="#28211e" strokeWidth="22" strokeLinecap="round" />
            <path d="M440 315 L230 315 L230 250" fill="none" stroke="#ded3b9" strokeWidth="18" strokeLinecap="round" />

            {/* Pathway to Lab (North) */}
            <path d="M500 270 L500 150" fill="none" stroke="#28211e" strokeWidth="22" strokeLinecap="round" />
            <path d="M500 270 L500 150" fill="none" stroke="#ded3b9" strokeWidth="18" strokeLinecap="round" />

            {/* Pathway to Arcade (East) */}
            <path d="M560 315 L760 315 L760 215" fill="none" stroke="#28211e" strokeWidth="22" strokeLinecap="round" />
            <path d="M560 315 L760 315 L760 215" fill="none" stroke="#ded3b9" strokeWidth="18" strokeLinecap="round" />

            {/* Pathway to Creative Corner (Southwest) */}
            <path d="M470 360 L470 435 L280 435" fill="none" stroke="#28211e" strokeWidth="20" strokeLinecap="round" />
            <path d="M470 360 L470 435 L280 435" fill="none" stroke="#ded3b9" strokeWidth="16" strokeLinecap="round" />

            {/* Pathway to Exploration Forest (South) */}
            <path d="M520 360 L545 475" fill="none" stroke="#28211e" strokeWidth="20" strokeLinecap="round" />
            <path d="M520 360 L545 475" fill="none" stroke="#ded3b9" strokeWidth="16" strokeLinecap="round" />

            {/* Pathway to Contact Station (Southeast) */}
            <path d="M560 340 L815 340 L815 410" fill="none" stroke="#28211e" strokeWidth="20" strokeLinecap="round" />
            <path d="M560 340 L815 340 L815 410" fill="none" stroke="#ded3b9" strokeWidth="16" strokeLinecap="round" />

            {/* Ambient Trees & Foliage (Stardew-style round pixel trees) */}
            {[
              { x: 130, y: 130 },
              { x: 175, y: 100 },
              { x: 310, y: 110 },
              { x: 620, y: 110 },
              { x: 670, y: 80 },
              { x: 840, y: 120 },
              { x: 880, y: 160 },
              { x: 130, y: 440 },
              { x: 170, y: 490 },
              { x: 660, y: 490 },
              { x: 710, y: 520 },
              { x: 880, y: 460 },
            ].map((tree, idx) => (
              <g key={idx} transform={`translate(${tree.x}, ${tree.y})`}>
                {/* Trunk */}
                <rect x="-4" y="6" width="8" height="14" fill="#694829" stroke="#28211e" strokeWidth="1.5" />
                {/* Green Foliage Ball */}
                <circle cx="0" cy="0" r="18" fill="#40916c" stroke="#28211e" strokeWidth="2" />
                <circle cx="-3" cy="-3" r="14" fill="#52b788" />
                <circle cx="-5" cy="-6" r="6" fill="#74c69d" />
              </g>
            ))}

            {/* Streetlamps in plazas */}
            {[
              { x: 445, y: 280 },
              { x: 555, y: 280 },
              { x: 445, y: 350 },
              { x: 555, y: 350 },
            ].map((lamp, i) => (
              <g key={i} transform={`translate(${lamp.x}, ${lamp.y})`}>
                <rect x="-2" y="0" width="4" height="18" fill="#28211e" />
                <circle cx="0" cy="-2" r="5" fill="#ffe066" stroke="#28211e" strokeWidth="1.5" />
                <circle cx="0" cy="-2" r="8" fill="#ffe066" opacity="0.3" />
              </g>
            ))}
          </svg>

          {/* ================= 6 INTERACTIVE LOCATION BUILDINGS ================= */}
          {LOCATIONS.map((loc) => {
            const isHovered = hoveredLocation?.id === loc.id;
            const isVisited = visitedLocations.includes(loc.id);

            return (
              <div
                key={loc.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnterLocation(loc.id);
                }}
                onMouseEnter={() => setHoveredLocation(loc)}
                onMouseLeave={() => setHoveredLocation(null)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110 cursor-pointer z-20 group"
                style={{
                  left: `${loc.mapCoordinates.x}%`,
                  top: `${loc.mapCoordinates.y}%`,
                }}
              >
                {/* Location Landmark Visual */}
                <div className="relative flex flex-col items-center">
                  {/* Subtle Discovery Marker / Checkmark */}
                  {isVisited && (
                    <div className="absolute -top-6 -right-2 bg-emerald-500 text-white rounded-full p-0.5 border border-ink shadow-brutal-sm z-30">
                      <CheckCircle size={14} />
                    </div>
                  )}

                  {/* Pulsing Selection Ring when hovered */}
                  {isHovered && (
                    <div className="absolute inset-[-12px] rounded-2xl border-2 border-dashed border-ink bg-white/40 animate-pulse pointer-events-none" />
                  )}

                  {/* Building Graphic (Custom Pixel SVG per Location) */}
                  <div className="relative drop-shadow-[4px_4px_0_#28211e] transition-transform group-hover:-translate-y-1">
                    {/* LOCATION 01: MY LITTLE WORLD (House) */}
                    {loc.id === 'my-world' && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20">
                        <svg viewBox="0 0 80 80" className="w-full h-full pixelated">
                          {/* House Walls */}
                          <rect x="12" y="32" width="56" height="42" rx="3" fill="#fdf8ee" stroke="#28211e" strokeWidth="2.5" />
                          {/* Roof (Pastel Pink) */}
                          <path d="M4 34 L40 8 L76 34 Z" fill="#f4a6b2" stroke="#28211e" strokeWidth="2.5" />
                          {/* Chimney with smoke */}
                          <rect x="52" y="12" width="10" height="16" fill="#c49e72" stroke="#28211e" strokeWidth="2" />
                          <circle cx="57" cy="6" r="3" fill="#ffffff" opacity="0.8" className="animate-ping" />
                          {/* Door */}
                          <rect x="32" y="46" width="16" height="28" rx="2" fill="#7a4e2d" stroke="#28211e" strokeWidth="2" />
                          <circle cx="44" cy="60" r="1.5" fill="#ffe066" />
                          {/* Windows with Warm Glow */}
                          <rect x="18" y="44" width="10" height="12" rx="1.5" fill="#ffe066" stroke="#28211e" strokeWidth="1.8" />
                          <line x1="23" y1="44" x2="23" y2="56" stroke="#28211e" strokeWidth="1.2" />
                          <rect x="52" y="44" width="10" height="12" rx="1.5" fill="#ffe066" stroke="#28211e" strokeWidth="1.8" />
                          <line x1="57" y1="44" x2="57" y2="56" stroke="#28211e" strokeWidth="1.2" />
                          {/* Flower box */}
                          <rect x="16" y="56" width="14" height="4" fill="#a45a2a" stroke="#28211e" strokeWidth="1" />
                          <circle cx="19" cy="55" r="2" fill="#f4a6b2" />
                          <circle cx="23" cy="55" r="2" fill="#ffe066" />
                          <circle cx="27" cy="55" r="2" fill="#74c0fc" />
                        </svg>
                      </div>
                    )}

                    {/* LOCATION 02: LEARNING LAB (Magical Library) */}
                    {loc.id === 'learning-lab' && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20">
                        <svg viewBox="0 0 80 80" className="w-full h-full pixelated">
                          {/* Stone Structure */}
                          <rect x="10" y="28" width="60" height="46" rx="4" fill="#e7f5ff" stroke="#28211e" strokeWidth="2.5" />
                          {/* Blue Crystal Dome / Roof */}
                          <path d="M10 28 Q40 4 70 28 Z" fill="#74c0fc" stroke="#28211e" strokeWidth="2.5" />
                          {/* Magical Telescope / Crystal on Roof */}
                          <polygon points="40,2 45,12 35,12" fill="#ffe066" stroke="#28211e" strokeWidth="1.8" />
                          {/* Grand Library Arched Entrance */}
                          <path d="M30 74 L30 48 Q40 38 50 48 L50 74 Z" fill="#423631" stroke="#28211e" strokeWidth="2" />
                          {/* Glowing Bookshelf Windows */}
                          <rect x="16" y="38" width="10" height="16" rx="2" fill="#ffe066" stroke="#28211e" strokeWidth="1.8" />
                          <rect x="54" y="38" width="10" height="16" rx="2" fill="#ffe066" stroke="#28211e" strokeWidth="1.8" />
                          {/* Book sign */}
                          <rect x="36" y="44" width="8" height="6" fill="#f4a6b2" stroke="#28211e" strokeWidth="1" />
                        </svg>
                      </div>
                    )}

                    {/* LOCATION 03: PROJECT ARCADE */}
                    {loc.id === 'project-arcade' && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20">
                        <svg viewBox="0 0 80 80" className="w-full h-full pixelated">
                          {/* Arcade Building Body */}
                          <rect x="10" y="26" width="60" height="48" rx="3" fill="#ffe066" stroke="#28211e" strokeWidth="2.5" />
                          {/* Neon Marquee Header */}
                          <rect x="6" y="14" width="68" height="16" rx="2" fill="#f4a6b2" stroke="#28211e" strokeWidth="2.5" />
                          <text x="40" y="26" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#28211e" fontFamily="monospace">
                            ARCADE
                          </text>
                          {/* Striped Awning */}
                          <path d="M8 30 L72 30 L66 38 L14 38 Z" fill="#74c0fc" stroke="#28211e" strokeWidth="2" />
                          {/* Glass Front showing 2 mini arcade screens */}
                          <rect x="16" y="42" width="20" height="24" rx="2" fill="#28211e" />
                          <rect x="19" y="45" width="14" height="10" fill="#69db7c" className="animate-pulse" />
                          <rect x="44" y="42" width="20" height="24" rx="2" fill="#28211e" />
                          <rect x="47" y="45" width="14" height="10" fill="#ff922b" className="animate-pulse" />
                          {/* Coin slot dots */}
                          <circle cx="26" cy="60" r="1.5" fill="#ffe066" />
                          <circle cx="54" cy="60" r="1.5" fill="#ffe066" />
                        </svg>
                      </div>
                    )}

                    {/* LOCATION 04: CREATIVE CORNER (Studio) */}
                    {loc.id === 'creative-corner' && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20">
                        <svg viewBox="0 0 80 80" className="w-full h-full pixelated">
                          {/* Studio Barn Body */}
                          <rect x="12" y="30" width="56" height="44" rx="3" fill="#f3edff" stroke="#28211e" strokeWidth="2.5" />
                          {/* Artist Loft Gambrel Roof */}
                          <path d="M8 32 L20 12 L60 12 L72 32 Z" fill="#cbb2fe" stroke="#28211e" strokeWidth="2.5" />
                          {/* Big skylight on roof */}
                          <polygon points="26,16 54,16 50,28 30,28" fill="#e7f5ff" stroke="#28211e" strokeWidth="1.5" />
                          {/* Wooden Easel outside */}
                          <polygon points="22,50 30,70 14,70" fill="none" stroke="#7a4e2d" strokeWidth="1.8" />
                          <rect x="16" y="52" width="12" height="10" fill="#ffffff" stroke="#28211e" strokeWidth="1" />
                          <circle cx="20" cy="56" r="2" fill="#f4a6b2" />
                          {/* French Doors with Music Notes */}
                          <rect x="36" y="42" width="26" height="32" rx="2" fill="#ffffff" stroke="#28211e" strokeWidth="2" />
                          <circle cx="44" cy="50" r="2" fill="#cbb2fe" />
                          <path d="M46 50 L46 44 L50 44" stroke="#28211e" strokeWidth="1.2" fill="none" />
                        </svg>
                      </div>
                    )}

                    {/* LOCATION 05: EXPLORATION FOREST */}
                    {loc.id === 'exploration-forest' && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20">
                        <svg viewBox="0 0 80 80" className="w-full h-full pixelated">
                          {/* Enchanted Pine Trees Cluster */}
                          <polygon points="24,20 12,42 36,42" fill="#2d6a4f" stroke="#28211e" strokeWidth="2" />
                          <polygon points="24,10 16,28 32,28" fill="#40916c" stroke="#28211e" strokeWidth="1.8" />
                          <rect x="22" y="42" width="4" height="10" fill="#694829" />

                          <polygon points="56,22 44,44 68,44" fill="#2d6a4f" stroke="#28211e" strokeWidth="2" />
                          <polygon points="56,12 48,30 64,30" fill="#40916c" stroke="#28211e" strokeWidth="1.8" />
                          <rect x="54" y="44" width="4" height="10" fill="#694829" />

                          {/* Center Wooden Direction Signpost */}
                          <rect x="38" y="32" width="4" height="38" fill="#7a4e2d" stroke="#28211e" strokeWidth="1.8" />
                          {/* Arrow Sign 1 */}
                          <polygon points="34,36 50,36 54,41 50,46 34,46" fill="#ffe066" stroke="#28211e" strokeWidth="1.5" />
                          {/* Arrow Sign 2 */}
                          <polygon points="46,48 30,48 26,53 30,58 46,58" fill="#74c0fc" stroke="#28211e" strokeWidth="1.5" />
                          {/* Campfire glowing */}
                          <circle cx="40" cy="68" r="4" fill="#ff922b" className="animate-ping" />
                          <circle cx="40" cy="68" r="3" fill="#ffe066" />
                        </svg>
                      </div>
                    )}

                    {/* LOCATION 06: CONTACT STATION (Post Office) */}
                    {loc.id === 'contact-station' && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20">
                        <svg viewBox="0 0 80 80" className="w-full h-full pixelated">
                          {/* Postal Office Cottage */}
                          <rect x="12" y="28" width="56" height="46" rx="3" fill="#ffeaa7" stroke="#28211e" strokeWidth="2.5" />
                          {/* Roof */}
                          <path d="M6 30 L40 10 L74 30 Z" fill="#ffbe76" stroke="#28211e" strokeWidth="2.5" />
                          {/* Postal Horn / Letter Symbol on Roof */}
                          <circle cx="40" cy="22" r="5" fill="#ffe066" stroke="#28211e" strokeWidth="1.2" />
                          <rect x="38" y="20" width="4" height="4" fill="#f4a6b2" />
                          {/* Red Postbox / Mailbox outside */}
                          <rect x="16" y="46" width="10" height="20" rx="3" fill="#e03131" stroke="#28211e" strokeWidth="1.8" />
                          <rect x="18" y="50" width="6" height="2" fill="#ffffff" />
                          <rect x="20" y="66" width="2" height="6" fill="#28211e" />
                          {/* Door & Window */}
                          <rect x="36" y="44" width="16" height="30" rx="2" fill="#7a4e2d" stroke="#28211e" strokeWidth="2" />
                          <rect x="56" y="46" width="8" height="12" rx="1.5" fill="#74c0fc" stroke="#28211e" strokeWidth="1.5" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Location Floating Nameplate Pill */}
                  <div className="mt-1 bg-white border-2 border-ink px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg shadow-brutal-sm flex items-center gap-1.5 whitespace-nowrap transition-transform group-hover:scale-105">
                    <span
                      className="w-4 h-4 rounded-full border border-ink flex items-center justify-center font-pixel text-[9px] text-ink font-bold"
                      style={{ backgroundColor: loc.themeColor }}
                    >
                      {loc.number}
                    </span>
                    <span className="font-pixel text-[9px] sm:text-[10px] text-ink font-bold">
                      {loc.name}
                    </span>
                  </div>

                  {/* Tooltip on Hover */}
                  {isHovered && (
                    <div className="absolute top-[-70px] z-40 bg-white border-2 border-ink p-2 rounded-xl shadow-brutal w-44 text-left pointer-events-none animate-bounceSubtle">
                      <div className="flex items-center gap-1 text-[10px] font-pixel text-ink font-bold">
                        {renderLocationIcon(loc.iconName)}
                        <span className="truncate">{loc.shortLabel}</span>
                      </div>
                      <p className="text-[10px] text-ink/75 leading-tight mt-0.5 line-clamp-2">
                        {loc.description}
                      </p>
                      <div className="text-[9px] font-pixel text-emerald-700 font-bold mt-1">
                        &gt; CLICK TO ENTER
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* ================= WALKING EXPLORER AVATAR ================= */}
          <div
            className="absolute z-25 pointer-events-none transition-all duration-75 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${playerPos.x}%`,
              top: `${playerPos.y}%`,
            }}
          >
            <ExplorerSprite
              direction={playerDirection}
              isWalking={isWalking}
              scale={1.25}
              showShadow={true}
            />
            {/* Player Name Tag */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ink text-white font-pixel text-[8px] px-1.5 py-0.2 rounded-sm whitespace-nowrap">
              YOU
            </div>
          </div>
        </div>

        {/* Bottom Map Navigation Bar */}
        <div className="bg-[#fdf8ee] border-t-3 border-ink px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-ink">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] bg-pastel-yellow px-2 py-0.5 rounded border border-ink font-bold">
              CONTROLS:
            </span>
            <span className="text-[11px] font-medium hidden sm:inline">
              Click anywhere to walk &bull; Use WASD or Arrow Keys &bull; Click buildings to explore
            </span>
            <span className="text-[11px] font-medium sm:hidden">
              Tap anywhere to walk &bull; Tap buildings to enter
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-pixel text-[10px] text-ink/70">
              DISCOVERED: {visitedLocations.length} / {LOCATIONS.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
