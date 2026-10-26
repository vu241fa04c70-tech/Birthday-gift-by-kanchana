import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Gift,
  CheckCircle2,
  X,
  ArrowRight,
  Heart,
  Smile,
  Star,
  Camera,
  Users,
  Mail,
  Clover,
  HeartHandshake,
} from "lucide-react";
import { birthdayConfig } from "../../data/birthdayConfig";
import { soundManager } from "../../utils/audio";

const ICONS = {
  "💖": Heart,
  "😂": Smile,
  "🌟": Star,
  "📸": Camera,
  "🤝": Users,
  "💌": Mail,
  "🍀": Clover,
  "🫶": HeartHandshake,
};

export default function SurprisesScreen({ onNext, reducedMotion }) {
  const surprises = birthdayConfig.surprises || [];
  const [openedIds, setOpenedIds] = useState(() => {
    try {
      const saved = sessionStorage.getItem("opened_surprises");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeSurprise, setActiveSurprise] = useState(null);

  // Sync opened state with session storage
  useEffect(() => {
    try {
      sessionStorage.setItem("opened_surprises", JSON.stringify(openedIds));
    } catch {
      // Storage unavailable
    }
  }, [openedIds]);

  const handleOpenBox = (surprise) => {
    soundManager.playSfx("unwrap");

    if (!openedIds.includes(surprise.id)) {
      const updated = [...openedIds, surprise.id];
      setOpenedIds(updated);

      // If all 6 unlocked, celebrate!
      if (updated.length === surprises.length) {
        soundManager.playSfx("celebrate");
        if (!reducedMotion) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        }
      }
    }

    setActiveSurprise(surprise);
  };

  const allOpened = openedIds.length === surprises.length && surprises.length > 0;

  return (
    <section 
      aria-label="Mystery Surprises" 
      className="relative min-h-screen flex flex-col items-center px-4 py-24 z-10 max-w-6xl mx-auto text-center"
    >
      {/* Header */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 text-pink-300 text-xs md:text-sm font-medium mb-3 border border-pink-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Screen 4 of 7 • Mystery Gift Boxes</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 text-glow">
          Open Your Surprises
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          Six cosmic gift boxes have arrived from across the universe. Tap each one to unwrap what is hidden inside!
        </p>

        {/* Tracker Progress Bar */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-purple-200">
            <Gift className="w-4 h-4 text-pink-400" />
            <span>
              Surprises Unwrapped: {openedIds.length} of {surprises.length}
            </span>
            {allOpened && (
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                • All Unlocked! 🎉
              </span>
            )}
          </div>
          <div className="w-56 h-2 bg-white/10 rounded-full overflow-hidden border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 transition-all duration-500 rounded-full"
              style={{
                width: `${(openedIds.length / (surprises.length || 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* 6 Interactive Gift Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-2">
        {surprises.map((surprise, idx) => {
          const isOpened = openedIds.includes(surprise.id);
          const IconComponent = ICONS[surprise.emoji] || Sparkles;

          return (
            <motion.div
              key={surprise.id}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={reducedMotion ? {} : { scale: 1.04, y: -4 }}
              onClick={() => handleOpenBox(surprise)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleOpenBox(surprise);
                }
              }}
              aria-label={`Gift Box ${surprise.id}: ${surprise.title}. ${isOpened ? "Already unwrapped" : "Click to unwrap"}`}
              className={`cursor-pointer group relative p-6 rounded-2xl glass-card text-left transition-all duration-300 border ${
                isOpened
                  ? "border-purple-400/50 bg-purple-900/20 shadow-lg shadow-purple-500/10"
                  : "border-white/15 hover:border-pink-400/60 hover:shadow-2xl hover:shadow-pink-500/20"
              }`}
            >
              {/* Box Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white"
                  style={{ backgroundColor: `${surprise.accent}40`, border: `1px solid ${surprise.accent}80` }}
                >
                  {surprise.badge}
                </span>

                {isOpened ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Opened
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    Unopened
                  </span>
                )}
              </div>

              {/* Animated Box / Icon graphic */}
              <div className="flex items-center gap-4 my-2">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-transform duration-300 group-hover:rotate-6 ${
                    isOpened
                      ? "bg-gradient-to-tr from-purple-600 to-pink-500 text-white"
                      : "bg-white/10 text-amber-300 ring-1 ring-white/20"
                  }`}
                >
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white group-hover:text-pink-300 transition-colors">
                    {surprise.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {surprise.subtitle}
                  </p>
                </div>
              </div>

              {/* Prompt hint */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-300">
                <span>{isOpened ? "Click to read again" : "Click to unwrap"}</span>
                <span className="group-hover:translate-x-1 transition-transform">🎁 →</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation to Next Screen */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <button
          onClick={() => {
            soundManager.playSfx("click");
            onNext();
          }}
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-base text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <span>See 10 Things That Make You Amazing</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Active Surprise Modal / Reveal Card */}
      <AnimatePresence>
        {activeSurprise && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                soundManager.playSfx("click");
                setActiveSurprise(null);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="active-surprise-title"
          >
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-lg w-full bg-[#131726] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundManager.playSfx("click");
                  setActiveSurprise(null);
                }}
                aria-label="Close surprise modal"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Reveal Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{activeSurprise.emoji}</span>
                <div>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${activeSurprise.accent}30`,
                      color: activeSurprise.accent,
                    }}
                  >
                    {activeSurprise.badge}
                  </span>
                  <h2
                    id="active-surprise-title"
                    className="font-serif text-2xl font-bold text-white mt-1"
                  >
                    {activeSurprise.title}
                  </h2>
                </div>
              </div>

              {/* If Photo Surprise */}
              {activeSurprise.isPhoto && activeSurprise.image && (
                <div className="relative aspect-[16/10] w-full bg-slate-900 rounded-xl overflow-hidden mb-4 border border-white/10">
                  <img
                    src={activeSurprise.image}
                    alt={activeSurprise.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* If List Surprise */}
              {activeSurprise.isList && activeSurprise.items ? (
                <div className="space-y-2 mb-6">
                  {activeSurprise.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm sm:text-base text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                /* Regular Text Content */
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light mb-6">
                  {activeSurprise.content}
                </p>
              )}

              {/* Bottom Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-purple-300">
                <span>Surprise {activeSurprise.id} of 6 unlocked ✨</span>
                <button
                  onClick={() => {
                    soundManager.playSfx("click");
                    setActiveSurprise(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:opacity-95 transition-opacity"
                >
                  Keep Exploring
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
