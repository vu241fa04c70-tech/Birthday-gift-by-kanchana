import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Heart,
  Smile,
  MessageCircle,
  HeartHandshake,
  Star,
  Camera,
  Laugh,
  Award,
  Clover,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trophy,
  CheckCircle2,
  Send,
} from "lucide-react";
import { birthdayConfig } from "../../data/birthdayConfig";
import { soundManager } from "../../utils/audio";

const ICON_COMPONENTS = {
  Smile,
  Heart,
  MessageCircle,
  Sparkles,
  HeartHandshake,
  Star,
  Camera,
  Laugh,
  Award,
  Clover,
};

export default function ReasonsScreen({ onNext, reducedMotion }) {
  const reasons = birthdayConfig.reasons || [];
  const feelings = birthdayConfig.thingsINeverGetTiredOfTellingYou || [];

  // Active reason index (0 to 9)
  const [activeIndex, setActiveIndex] = useState(0);
  const [visitedIndices, setVisitedIndices] = useState([0]);
  const [viewMode, setViewMode] = useState("card");

  // "Things I Never Get Tired of Telling You" counter
  const [revealedFeelingsCount, setRevealedFeelingsCount] = useState(2);

  const currentReason = reasons[activeIndex] || reasons[0];
  const IconComponent = ICON_COMPONENTS[currentReason.iconName] || Heart;

  const markVisited = (idx) => {
    if (!visitedIndices.includes(idx)) {
      const updated = [...visitedIndices, idx];
      setVisitedIndices(updated);
      if (updated.length === reasons.length) {
        soundManager.playSfx("celebrate");
        if (!reducedMotion) {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
          });
        }
      }
    }
  };

  const handleNext = () => {
    if (activeIndex < reasons.length - 1) {
      soundManager.playSfx("flip");
      const nextIdx = activeIndex + 1;
      setActiveIndex(nextIdx);
      markVisited(nextIdx);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      soundManager.playSfx("flip");
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleSelect = (idx) => {
    soundManager.playSfx("flip");
    setActiveIndex(idx);
    markVisited(idx);
  };

  const handleRevealNextFeeling = () => {
    soundManager.playSfx("chime");
    if (revealedFeelingsCount < feelings.length) {
      setRevealedFeelingsCount((prev) => prev + 1);
    }
  };

  return (
    <section 
      aria-label="Reasons and Feelings" 
      className="relative min-h-screen flex flex-col items-center px-4 py-24 z-10 max-w-4xl mx-auto text-center"
    >
      {/* Header */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 text-pink-300 text-xs md:text-sm font-medium mb-3 border border-pink-500/30">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
          <span>Screen 5 of 7 • From Kanchana's Heart</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 text-glow">
          {birthdayConfig.reasonsSectionTitle}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          {birthdayConfig.reasonsSectionSubtitle}
        </p>
      </motion.div>

      {/* Special Nickname Callout Box */}
      <motion.div
        initial={reducedMotion ? {} : { scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full max-w-2xl glass-panel rounded-2xl p-4 sm:p-5 mb-8 border border-emerald-400/30 text-left relative overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xl shrink-0">
            🍀
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1">
              Why I Call You Lucky
            </h2>
            <p className="font-serif text-sm sm:text-base text-slate-200 italic leading-relaxed">
              "{birthdayConfig.nicknameStory.quote}"
            </p>
            <div className="mt-2 text-[11px] font-mono text-purple-300 text-right">
              — {birthdayConfig.nicknameStory.author} ❤️
            </div>
          </div>
        </div>
      </motion.div>

      {/* =================================================================== */}
      {/* 1. 10 REASONS SHOWCASE */}
      {/* =================================================================== */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-3 mb-6">
        <div className="flex items-center justify-between w-full text-xs font-medium text-slate-300 px-1">
          <span className="flex items-center gap-1.5 text-pink-300">
            <CheckCircle2 className="w-4 h-4 text-pink-400" />
            Explored: {visitedIndices.length} of {reasons.length} Reasons
          </span>

          <button
            onClick={() => {
              soundManager.playSfx("click");
              setViewMode(viewMode === "card" ? "grid" : "card");
            }}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg glass-panel-light hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{viewMode === "card" ? "View All in Grid" : "One-by-One Mode"}</span>
          </button>
        </div>

        {/* Reason Number Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {reasons.map((r, i) => {
            const isSelected = activeIndex === i && viewMode === "card";
            const isVisited = visitedIndices.includes(i);

            return (
              <button
                key={i}
                onClick={() => {
                  setViewMode("card");
                  handleSelect(i);
                }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                  isSelected
                    ? "bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 scale-110 ring-2 ring-white/50"
                    : isVisited
                    ? "bg-white/15 text-purple-200 hover:bg-white/25"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {r.number}
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="w-full max-w-xl my-2 mb-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReason.number}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 25, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -25, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="glass-card rounded-3xl p-7 sm:p-9 text-left border border-white/20 shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: `0 20px 45px -15px ${currentReason.color}35`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-44 h-44 rounded-bl-full pointer-events-none opacity-20"
                style={{ backgroundColor: currentReason.color }}
              />

              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${currentReason.color}25`,
                    color: currentReason.color,
                    border: `1px solid ${currentReason.color}50`,
                  }}
                >
                  Reason #{currentReason.number} of 10
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  For Lucky ❤️
                </span>
              </div>

              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
                  style={{ backgroundColor: `${currentReason.color}30`, border: `1px solid ${currentReason.color}80` }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: currentReason.color }} />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {currentReason.title}
                </h3>
              </div>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light mb-8">
                "{currentReason.description}"
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white glass-panel-light hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {activeIndex < reasons.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Next Reason ❤️</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-1 text-xs text-emerald-300 font-semibold bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/40 animate-pulse">
                    <Trophy className="w-4 h-4 text-amber-300" />
                    <span>All 10 Discovered!</span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left my-2 mb-14">
          {reasons.map((r, i) => {
            const Icon = ICON_COMPONENTS[r.iconName] || Heart;
            return (
              <motion.div
                key={i}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => {
                  setActiveIndex(i);
                  setViewMode("card");
                }}
                className="cursor-pointer glass-card rounded-2xl p-5 border border-white/15 hover:border-pink-400/50 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${r.color}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: r.color }} />
                    </div>
                    <h3 className="font-serif font-bold text-base text-white">
                      {r.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-purple-300">
                    #{r.number}
                  </span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed pl-10">
                  {r.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. "THINGS I NEVER GET TIRED OF TELLING YOU" 💗 */}
      {/* =================================================================== */}
      <div className="w-full max-w-2xl my-4 mb-14 text-left">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-medium mb-2 border border-pink-400/30">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span>Kanchana's Heart to Lucky</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white text-glow">
            Things I Never Get Tired of Telling You 💗
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light mt-1">
            Little thoughts I hold in my heart every time we talk.
          </p>
        </div>

        {/* Revealed Thoughts List */}
        <div className="space-y-3">
          {feelings.slice(0, revealedFeelingsCount).map((feeling, idx) => (
            <motion.div
              key={idx}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="glass-card rounded-2xl p-4 sm:p-5 border border-pink-400/25 flex items-start gap-3.5 shadow-lg shadow-purple-950/20"
            >
              <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="font-serif text-base sm:text-lg text-slate-100 font-normal leading-relaxed">
                "{feeling}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Button to reveal more thoughts */}
        {revealedFeelingsCount < feelings.length && (
          <div className="text-center mt-5">
            <button
              onClick={handleRevealNextFeeling}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Reveal One More Thought ({revealedFeelingsCount + 1} of {feelings.length}) 💗</span>
            </button>
          </div>
        )}
      </div>

      {/* Button to proceed to the next screen (A Little Truth) */}
      <div className="mt-8">
        <button
          onClick={() => {
            soundManager.playSfx("click");
            onNext();
          }}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-medium text-base text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <span>A Little Truth From Kanchana ❤️</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
