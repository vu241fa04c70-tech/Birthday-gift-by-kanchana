import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./components/common/Navigation";
import BackgroundStars from "./components/common/BackgroundStars";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import CelebrationScreen from "./components/screens/CelebrationScreen";
import OurLittleWorldScreen from "./components/screens/OurLittleWorldScreen";
import FriendshipBookScreen from "./components/screens/FriendshipBookScreen";
import ReasonsScreen from "./components/screens/ReasonsScreen";
import LetterScreen from "./components/screens/LetterScreen";
import FinalUniverseScreen from "./components/screens/FinalUniverseScreen";
import { soundManager } from "./utils/audio";

export default function App() {
  // Screen state (1 to 7)
  const [currentScreen, setCurrentScreen] = useState(() => {
    try {
      const saved = localStorage.getItem("birthday_current_screen");
      return saved ? Math.min(Math.max(1, parseInt(saved, 10)), 7) : 1;
    } catch {
      return 1;
    }
  });

  // Track furthest screen unlocked
  const [maxVisitedScreen, setMaxVisitedScreen] = useState(() => {
    try {
      const saved = localStorage.getItem("birthday_max_visited");
      return saved ? Math.min(Math.max(1, parseInt(saved, 10)), 7) : 1;
    } catch {
      return 1;
    }
  });

  // Accessibility: Reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(() => {
    try {
      const saved = localStorage.getItem("birthday_reduced_motion");
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    } catch {
      return false;
    }
  });

  // Persist preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("birthday_current_screen", currentScreen.toString());
      if (currentScreen > maxVisitedScreen) {
        setMaxVisitedScreen(currentScreen);
        localStorage.setItem("birthday_max_visited", currentScreen.toString());
      }
    } catch {
      // Storage unavailable
    }
  }, [currentScreen, maxVisitedScreen]);

  useEffect(() => {
    try {
      localStorage.setItem("birthday_reduced_motion", JSON.stringify(reducedMotion));
    } catch {
      // Storage unavailable
    }
  }, [reducedMotion]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      if (e.key === "ArrowRight") {
        if (currentScreen < 7) {
          soundManager.playSfx("click");
          setCurrentScreen((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentScreen > 1) {
          soundManager.playSfx("click");
          setCurrentScreen((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentScreen]);

  const goToNextScreen = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, 7));
  };

  const handleNavigate = (screenId) => {
    setCurrentScreen(screenId);
  };

  const handleSkipAnimation = () => {
    soundManager.play();
    setCurrentScreen(2);
  };

  const handleReplay = () => {
    setCurrentScreen(1);
  };

  // Screen transition animation config
  const pageTransition = {
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: reducedMotion ? { opacity: 0 } : { opacity: 0, y: -15, scale: 0.98 },
    transition: { duration: 0.45, ease: "easeInOut" },
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-pink-500/30 selection:text-pink-200">
      {/* Background Interactive Starry Cosmos */}
      <BackgroundStars reducedMotion={reducedMotion} />

      {/* Top Glass Navigation Bar */}
      <Navigation
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        maxVisitedScreen={maxVisitedScreen}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
      />

      {/* Main Screen Content with Smooth Transitions */}
      <main className="flex-1 flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          {currentScreen === 1 && (
            <motion.div key="screen-1" {...pageTransition} className="w-full">
              <WelcomeScreen
                onStart={goToNextScreen}
                onSkipAnimation={handleSkipAnimation}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 2 && (
            <motion.div key="screen-2" {...pageTransition} className="w-full">
              <CelebrationScreen
                onNext={goToNextScreen}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 3 && (
            <motion.div key="screen-3" {...pageTransition} className="w-full">
              <OurLittleWorldScreen
                onNext={goToNextScreen}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 4 && (
            <motion.div key="screen-4" {...pageTransition} className="w-full">
              <FriendshipBookScreen
                onNext={goToNextScreen}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 5 && (
            <motion.div key="screen-5" {...pageTransition} className="w-full">
              <ReasonsScreen
                onNext={goToNextScreen}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 6 && (
            <motion.div key="screen-6" {...pageTransition} className="w-full">
              <LetterScreen
                onNext={goToNextScreen}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          )}

          {currentScreen === 7 && (
            <motion.div key="screen-7" {...pageTransition} className="w-full">
              <FinalUniverseScreen
                onReplay={handleReplay}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
