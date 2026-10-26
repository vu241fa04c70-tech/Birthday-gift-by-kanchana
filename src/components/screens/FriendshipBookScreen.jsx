import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Bookmark,
  Heart,
  X,
} from "lucide-react";
import { birthdayConfig } from "../../data/birthdayConfig";
import { soundManager } from "../../utils/audio";

export default function FriendshipBookScreen({ onNext, reducedMotion }) {
  const { title, subtitle, chapters, remindersTitle, remindersSubtitle, reminders } =
    birthdayConfig.book;

  // Active book chapter index (0 to 4)
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Active floating reminder card (for popup/modal)
  const [selectedReminder, setSelectedReminder] = useState(null);

  const currentChapter = chapters[activeChapterIndex];

  const handleNextChapter = () => {
    soundManager.playSfx("paper");
    if (activeChapterIndex < chapters.length - 1) {
      setActiveChapterIndex((prev) => prev + 1);
    }
  };

  const handlePrevChapter = () => {
    soundManager.playSfx("paper");
    if (activeChapterIndex > 0) {
      setActiveChapterIndex((prev) => prev - 1);
    }
  };

  return (
    <section 
      aria-label="Our Little Storybook" 
      className="relative min-h-screen flex flex-col items-center px-4 py-24 z-10 max-w-5xl mx-auto text-center"
    >
      {/* Header Badge & Title */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs md:text-sm font-medium mb-3 border border-amber-400/30">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>Screen 4 of 7 • Our Storybook</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 text-glow">
          {title}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          {subtitle}
        </p>
      </motion.div>

      {/* =================================================================== */}
      {/* 1. DIGITAL STORYBOOK (5 CHAPTERS) */}
      {/* =================================================================== */}
      <div className="w-full max-w-2xl my-2 mb-16">
        {/* Chapter Stepper Indicator */}
        <div className="flex items-center justify-between text-xs text-amber-200/80 mb-3 px-2 font-mono">
          <span className="flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            Chapter {currentChapter.number} of {chapters.length}
          </span>
          <span className="text-slate-400">{currentChapter.tag}</span>
        </div>

        {/* Parchment Book Page Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter.number}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, rotateY: -10 }}
            transition={{ duration: 0.4 }}
            className="parchment-paper rounded-3xl p-7 sm:p-10 text-left border-2 border-amber-200/80 shadow-2xl relative text-slate-800 overflow-hidden"
          >
            {/* Ribbon Bookmark graphic in top right */}
            <div className="absolute top-0 right-8 w-6 h-12 bg-pink-500 rounded-b-md shadow-md flex items-end justify-center pb-1 text-white text-[10px]">
              ❤️
            </div>

            <div className="text-[11px] font-mono tracking-widest uppercase text-amber-900/60 mb-2 font-bold">
              Kanchana's Journal for Lucky
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-5">
              {currentChapter.title}
            </h2>

            <p className="font-serif text-base sm:text-lg text-slate-800 leading-relaxed font-light mb-8 italic">
              "{currentChapter.content}"
            </p>

            {/* Book Navigation Footer */}
            <div className="pt-4 border-t border-amber-800/15 flex items-center justify-between">
              <button
                onClick={handlePrevChapter}
                disabled={activeChapterIndex === 0}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-amber-900 hover:bg-amber-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Page</span>
              </button>

              {/* Page Number Dots */}
              <div className="flex items-center gap-1.5">
                {chapters.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      soundManager.playSfx("paper");
                      setActiveChapterIndex(i);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeChapterIndex === i
                        ? "bg-amber-900 w-5"
                        : "bg-amber-900/25 hover:bg-amber-900/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextChapter}
                disabled={activeChapterIndex === chapters.length - 1}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-amber-900 hover:bg-amber-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =================================================================== */}
      {/* 2. "LITTLE THINGS THAT REMIND ME OF YOU" ✨ (FLOATING CARDS) */}
      {/* =================================================================== */}
      <div className="w-full max-w-4xl my-4 mb-14">
        <div className="flex items-center justify-center gap-2 mb-2 text-pink-300">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            {remindersTitle}
          </h2>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm font-light mb-8">
          {remindersSubtitle}
        </p>

        {/* 8 Interactive Floating Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
          {reminders.map((rem, idx) => (
            <motion.div
              key={rem.id}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={reducedMotion ? {} : { scale: 1.04, y: -4 }}
              onClick={() => {
                soundManager.playSfx("flip");
                setSelectedReminder(rem);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedReminder(rem);
                }
              }}
              className="cursor-pointer glass-card rounded-2xl p-5 text-left border border-white/15 hover:border-pink-400/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl mb-3 block">{rem.emoji}</span>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-pink-300">
                  {rem.title}
                </h3>
              </div>
              <span className="text-[11px] text-purple-300/80 mt-4 font-mono flex items-center justify-between">
                <span>Tap to read</span>
                <span>✨ →</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reminder Detail Modal Popup */}
      <AnimatePresence>
        {selectedReminder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                soundManager.playSfx("click");
                setSelectedReminder(null);
              }
            }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-md w-full bg-[#131726] border border-white/20 rounded-3xl p-7 text-left shadow-2xl"
            >
              <button
                onClick={() => {
                  soundManager.playSfx("click");
                  setSelectedReminder(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedReminder.emoji}</span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {selectedReminder.title}
                </h3>
              </div>

              <p className="text-slate-200 text-base leading-relaxed font-light mb-6">
                "{selectedReminder.description}"
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-300">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                  A little moment with Lucky
                </span>
                <button
                  onClick={() => {
                    soundManager.playSfx("click");
                    setSelectedReminder(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Button to Next Screen (10 Simple Reasons & Feelings) */}
      <div className="mt-8">
        <button
          onClick={() => {
            soundManager.playSfx("click");
            onNext();
          }}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-medium text-base text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <span>See 10 Reasons & Feelings 💗</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
