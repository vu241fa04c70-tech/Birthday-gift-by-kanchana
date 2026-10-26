import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  EyeOff,
  Music,
} from "lucide-react";
import { soundManager } from "../../utils/audio";
import { birthdayConfig } from "../../data/birthdayConfig";

const SCREENS = [
  { id: 1, label: "Welcome", icon: "✨" },
  { id: 2, label: "Celebration", icon: "🎂" },
  { id: 3, label: "Our Little World", icon: "🌙" },
  { id: 4, label: "Storybook", icon: "📖" },
  { id: 5, label: "10 Reasons", icon: "💗" },
  { id: 6, label: "A Little Truth", icon: "💌" },
  { id: 7, label: "Our Story", icon: "🌌" },
];

export default function Navigation({
  currentScreen,
  onNavigate,
  maxVisitedScreen,
  reducedMotion,
  onToggleReducedMotion,
}) {
  const [audioState, setAudioState] = useState({
    isPlaying: soundManager.isPlaying,
    isMuted: soundManager.isMuted,
  });

  useEffect(() => {
    return soundManager.subscribe((state) => {
      setAudioState({
        isPlaying: state.isPlaying,
        isMuted: state.isMuted,
      });
    });
  }, []);

  const handleAudioToggle = () => {
    if (!audioState.isPlaying) {
      soundManager.play();
    } else {
      soundManager.togglePlay();
    }
    soundManager.playSfx("click");
  };

  const handleMuteToggle = () => {
    soundManager.toggleMute();
    soundManager.playSfx("click");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2 md:px-6 md:py-3 transition-all duration-300">
      <nav
        aria-label="Birthday Journey Navigation"
        className="max-w-6xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-3 py-2 md:px-5 md:py-2.5 shadow-2xl border border-white/10"
      >
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 text-sm">
            ✨
          </div>
          <span className="hidden sm:inline font-serif font-medium tracking-wide text-sm md:text-base bg-gradient-to-r from-pink-200 via-purple-200 to-amber-200 bg-clip-text text-transparent">
            {birthdayConfig.projectTitle}
          </span>
        </div>

        {/* Screen Journey Stepper */}
        <div className="flex items-center gap-1 sm:gap-2">
          {SCREENS.map((screen) => {
            const isActive = currentScreen === screen.id;
            const isUnlocked = screen.id <= Math.max(maxVisitedScreen, 2);

            return (
              <button
                key={screen.id}
                onClick={() => {
                  onNavigate(screen.id);
                  soundManager.playSfx("click");
                }}
                title={`Go to ${screen.label}`}
                aria-label={`Screen ${screen.id}: ${screen.label}`}
                aria-current={isActive ? "step" : undefined}
                className={`relative group px-2 py-1 md:px-3 md:py-1.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white shadow-lg shadow-pink-500/25 ring-1 ring-white/40 scale-105"
                    : isUnlocked
                    ? "text-slate-300 hover:text-white hover:bg-white/10"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span className="text-xs">{screen.icon}</span>
                <span className="hidden lg:inline">{screen.label}</span>
                <span className="lg:hidden text-[10px] font-mono">{screen.id}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-amber-300 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Controls: Audio & Accessibility */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Back & Next Arrows */}
          <div className="hidden sm:flex items-center gap-1 mr-1 border-r border-white/10 pr-2">
            <button
              onClick={() => {
                if (currentScreen > 1) {
                  onNavigate(currentScreen - 1);
                  soundManager.playSfx("click");
                }
              }}
              disabled={currentScreen === 1}
              aria-label="Previous section"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (currentScreen < SCREENS.length) {
                  onNavigate(currentScreen + 1);
                  soundManager.playSfx("click");
                }
              }}
              disabled={currentScreen === SCREENS.length}
              aria-label="Next section"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <button
            onClick={onToggleReducedMotion}
            title={reducedMotion ? "Enable animations" : "Reduce motion for accessibility"}
            aria-label={reducedMotion ? "Enable full animations" : "Reduce motion for accessibility"}
            className="p-1.5 md:p-2 rounded-xl text-slate-300 hover:text-amber-300 hover:bg-white/10 transition-colors"
          >
            {reducedMotion ? (
              <EyeOff className="w-4 h-4 text-amber-300" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>

          {/* Music Play / Pause */}
          <button
            onClick={handleAudioToggle}
            title={audioState.isPlaying ? "Pause music" : "Play ambient music"}
            aria-label={audioState.isPlaying ? "Pause ambient background music" : "Play ambient background music"}
            className={`p-1.5 md:p-2 rounded-xl transition-all flex items-center gap-1.5 ${
              audioState.isPlaying
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {audioState.isPlaying ? (
              <>
                <Pause className="w-4 h-4 animate-pulse" />
                <span className="hidden md:inline text-xs font-mono">Music</span>
              </>
            ) : (
              <>
                <Music className="w-4 h-4" />
                <span className="hidden md:inline text-xs font-mono">Music</span>
              </>
            )}
          </button>

          {/* Mute / Unmute */}
          <button
            onClick={handleMuteToggle}
            title={audioState.isMuted ? "Unmute sounds" : "Mute all sounds"}
            aria-label={audioState.isMuted ? "Unmute audio" : "Mute audio"}
            className="p-1.5 md:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {audioState.isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
