import React, { useState, useEffect } from 'react';
import { sound } from './audio/soundManager';
import { LOCATIONS } from './data/portfolioData';
import { OpeningScreen } from './components/OpeningScreen';
import { HUD } from './components/HUD';
import { WorldMap } from './components/WorldMap';
import { QuestJournal } from './components/QuestJournal';
import { MyLittleWorldSection } from './components/sections/MyLittleWorldSection';
import { LearningLabSection } from './components/sections/LearningLabSection';
import { ProjectArcadeSection } from './components/sections/ProjectArcadeSection';
import { CreativeCornerSection } from './components/sections/CreativeCornerSection';
import { ExplorationForestSection } from './components/sections/ExplorationForestSection';
import { ContactStationSection } from './components/sections/ContactStationSection';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  // Navigation State
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [visitedLocations, setVisitedLocations] = useState<string[]>([]);

  // Sound States (Muted by default as required)
  const [isMuted, setIsMuted] = useState<boolean>(sound.getIsMuted());
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(sound.getIsBgmPlaying());

  // Global hotkeys (ESC to return to map, J for journal, M for map)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'Escape') {
        if (isJournalOpen) {
          setIsJournalOpen(false);
        } else if (activeLocationId) {
          setActiveLocationId(null);
        }
      } else if (e.key === 'j' || e.key === 'J') {
        setIsJournalOpen((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        setActiveLocationId(null);
        setIsJournalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJournalOpen, activeLocationId]);

  // Handle location selection
  const handleSelectLocation = (locationId: string) => {
    setActiveLocationId(locationId);

    // Track as visited if new
    if (!visitedLocations.includes(locationId)) {
      const nextVisited = [...visitedLocations, locationId];
      setVisitedLocations(nextVisited);

      // If all 6 locations visited, celebrate!
      if (nextVisited.length === LOCATIONS.length) {
        setTimeout(() => {
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.5 },
              colors: ['#ffe066', '#f4a6b2', '#74c0fc', '#cbb2fe', '#8fa89b'],
            });
          } catch {
            // safe
          }
        }, 500);
      }
    }
  };

  // Next location cycling
  const handleNextLocation = () => {
    if (!activeLocationId) return;
    const currentIndex = LOCATIONS.findIndex((loc) => loc.id === activeLocationId);
    const nextIndex = (currentIndex + 1) % LOCATIONS.length;
    handleSelectLocation(LOCATIONS[nextIndex].id);
  };

  // Sound toggles
  const handleToggleSound = () => {
    const nextState = !isMuted;
    sound.setMuted(nextState);
    setIsMuted(nextState);
    if (nextState) {
      setIsBgmPlaying(false);
    }
  };

  const handleToggleBgm = () => {
    const playing = sound.toggleBgm();
    setIsBgmPlaying(playing);
    setIsMuted(sound.getIsMuted());
  };

  // Current location name for HUD
  const currentLocation = LOCATIONS.find((loc) => loc.id === activeLocationId);

  return (
    <div className="relative min-h-screen w-full bg-[#68b5e8] flex flex-col justify-between selection:bg-pastel-pink selection:text-ink">
      {!hasStarted ? (
        /* Opening Title Screen (Guided by Reference Image 4) */
        <OpeningScreen
          onStartExploring={() => setHasStarted(true)}
          onSkipToMap={() => setHasStarted(true)}
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
        />
      ) : (
        /* Interactive Game World & HUD */
        <div className="relative w-full min-h-screen flex flex-col">
          {/* Top Heads-Up Display */}
          <HUD
            currentLocationName={currentLocation ? currentLocation.name : null}
            onOpenJournal={() => setIsJournalOpen(true)}
            onResetMap={() => setActiveLocationId(null)}
            visitedCount={visitedLocations.length}
            totalLocations={LOCATIONS.length}
            isMuted={isMuted}
            onToggleSound={handleToggleSound}
            isBgmPlaying={isBgmPlaying}
            onToggleBgm={handleToggleBgm}
          />

          {/* Main Body: Map or Location Section */}
          <main className="flex-1 flex flex-col justify-center items-center w-full">
            {!activeLocationId ? (
              /* Interactive Top-Down / Isometric World Map */
              <WorldMap
                onSelectLocation={handleSelectLocation}
                visitedLocations={visitedLocations}
              />
            ) : (
              /* Location Views (Scrapbook + Neo-brutalist cards) */
              <div className="w-full pt-16 sm:pt-20 pb-12 px-2 sm:px-4">
                {activeLocationId === 'my-world' && (
                  <MyLittleWorldSection
                    onBackToMap={() => setActiveLocationId(null)}
                    onNextLocation={handleNextLocation}
                  />
                )}
                {activeLocationId === 'learning-lab' && (
                  <LearningLabSection
                    onBackToMap={() => setActiveLocationId(null)}
                    onNextLocation={handleNextLocation}
                  />
                )}
                {activeLocationId === 'project-arcade' && (
                  <ProjectArcadeSection
                    onBackToMap={() => setActiveLocationId(null)}
                    onNextLocation={handleNextLocation}
                  />
                )}
                {activeLocationId === 'creative-corner' && (
                  <CreativeCornerSection
                    onBackToMap={() => setActiveLocationId(null)}
                    onNextLocation={handleNextLocation}
                  />
                )}
                {activeLocationId === 'exploration-forest' && (
                  <ExplorationForestSection
                    onBackToMap={() => setActiveLocationId(null)}
                    onNextLocation={handleNextLocation}
                  />
                )}
                {activeLocationId === 'contact-station' && (
                  <ContactStationSection
                    onBackToMap={() => setActiveLocationId(null)}
                  />
                )}
              </div>
            )}
          </main>

          {/* Quest Journal Modal (Guided by Reference Image 3) */}
          <QuestJournal
            isOpen={isJournalOpen}
            onClose={() => setIsJournalOpen(false)}
            visitedLocations={visitedLocations}
            onSelectLocation={handleSelectLocation}
          />
        </div>
      )}
    </div>
  );
};

export default App;
