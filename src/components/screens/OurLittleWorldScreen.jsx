import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Moon,
  Heart,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Send,
  Clock,
  CheckCheck,
} from "lucide-react";
import { birthdayConfig } from "../../data/birthdayConfig";
import { soundManager } from "../../utils/audio";

export default function OurLittleWorldScreen({ onNext, reducedMotion }) {
  const { heading, introParagraphs, signoff, lateNightMemories, chatBubbles, chatVibesNote } =
    birthdayConfig.ourLittleWorld;

  // Active memory card index (0 to 5)
  const [activeMemoryIndex, setActiveMemoryIndex] = useState(0);
  const [revealedMemories, setRevealedMemories] = useState([0]);

  // Active chat bubble reveal index
  const [visibleChatCount, setVisibleChatCount] = useState(2);
  const [isTypingChat, setIsTypingChat] = useState(false);

  const currentMemory = lateNightMemories[activeMemoryIndex];

  // Reveal next memory
  const handleNextMemory = () => {
    soundManager.playSfx("flip");
    if (activeMemoryIndex < lateNightMemories.length - 1) {
      const nextIdx = activeMemoryIndex + 1;
      setActiveMemoryIndex(nextIdx);
      if (!revealedMemories.includes(nextIdx)) {
        setRevealedMemories((prev) => [...prev, nextIdx]);
      }
    } else {
      // Loop or stay at last
      setActiveMemoryIndex(0);
    }
  };

  const handlePrevMemory = () => {
    soundManager.playSfx("flip");
    if (activeMemoryIndex > 0) {
      setActiveMemoryIndex((prev) => prev - 1);
    }
  };

  // Reveal more playful chat bubbles
  const handleMoreChat = () => {
    if (visibleChatCount < chatBubbles.length) {
      soundManager.playSfx("click");
      setIsTypingChat(true);
      setTimeout(() => {
        setVisibleChatCount((prev) => prev + 1);
        setIsTypingChat(false);
      }, 700);
    }
  };

  return (
    <section 
      aria-label="Our Little World" 
      className="relative min-h-screen flex flex-col items-center px-4 py-24 z-10 max-w-5xl mx-auto text-center"
    >
      {/* =================================================================== */}
      {/* 1. INTRO: WE MAY NOT HAVE PHOTOS TOGETHER... */}
      {/* =================================================================== */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs md:text-sm font-medium mb-4 border border-purple-500/30">
          <Moon className="w-3.5 h-3.5 text-amber-300" />
          <span>Screen 3 of 7 • Our Little World</span>
          <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 text-glow leading-snug">
          "{heading}"
        </h1>

        {/* Introduction Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 text-left border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/10 rounded-bl-full pointer-events-none" />
          
          <div className="space-y-3.5 text-slate-200 text-base sm:text-lg font-light leading-relaxed">
            {introParagraphs.map((para, idx) => (
              <p key={idx} className={idx === 0 ? "font-normal text-white" : ""}>
                {para}
              </p>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-pink-300 font-medium">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Moments built from messages & smiles
            </span>
            <span className="font-handwriting text-xl text-pink-300 font-bold">
              {signoff}
            </span>
          </div>
        </div>
      </motion.div>

      {/* =================================================================== */}
      {/* 2. OUR LATE-NIGHT TALKS 🌙 (INTERACTIVE MEMORY SHOWCASE) */}
      {/* =================================================================== */}
      <div className="w-full max-w-2xl flex flex-col items-center mb-16">
        <div className="flex items-center gap-2 mb-2 text-amber-300">
          <Moon className="w-5 h-5" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Our Late-Night Talks 🌙
          </h2>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
          Memories of the conversations that meant so much to me.
        </p>

        {/* Stepper Dots */}
        <div className="flex items-center gap-2 mb-6">
          {lateNightMemories.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => {
                soundManager.playSfx("flip");
                setActiveMemoryIndex(idx);
                if (!revealedMemories.includes(idx)) {
                  setRevealedMemories((prev) => [...prev, idx]);
                }
              }}
              title={m.title}
              aria-label={`Go to Memory ${idx + 1}: ${m.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeMemoryIndex === idx
                  ? "w-8 bg-gradient-to-r from-pink-400 to-purple-400"
                  : revealedMemories.includes(idx)
                  ? "w-2.5 bg-purple-400/60 hover:bg-purple-300"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Active Memory Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMemory.id}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="w-full glass-card rounded-3xl p-7 sm:p-9 text-left border border-purple-400/30 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient moonlit glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-purple-500/20 via-pink-500/10 to-transparent rounded-bl-full pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-200 border border-purple-400/30">
                <Clock className="w-3 h-3 text-amber-300" />
                {currentMemory.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Memory {currentMemory.id} of {lateNightMemories.length}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {currentMemory.title}
            </h3>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light mb-8">
              "{currentMemory.quote}"
            </p>

            {/* Bottom Card Controls */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={handlePrevMemory}
                disabled={activeMemoryIndex === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white glass-panel-light hover:bg-white/15 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNextMemory}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                <span>
                  {activeMemoryIndex === lateNightMemories.length - 1
                    ? "Read Memories Again 🌙"
                    : "One More Memory 🌙"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =================================================================== */}
      {/* 3. "IF OUR CHATS COULD TALK..." 💬 */}
      {/* =================================================================== */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-xl mx-auto mb-14"
      >
        <div className="flex items-center justify-center gap-2 mb-2 text-pink-300">
          <MessageCircle className="w-5 h-5 text-pink-400" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            If Our Chats Could Talk... 💬
          </h2>
        </div>
        <p className="text-xs text-slate-400 italic mb-6 max-w-md mx-auto">
          "{chatVibesNote}"
        </p>

        {/* Chat Phone Mockup Container */}
        <div className="bg-[#121624] border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl relative text-left">
          {/* Top Chat Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                K
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Kanchana</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Always happy to talk to Lucky
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">🌙 Late Night</span>
          </div>

          {/* Chat Bubbles */}
          <div className="space-y-3.5 min-h-[220px]">
            {chatBubbles.slice(0, visibleChatCount).map((msg, i) => (
              <motion.div
                key={i}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-end"
              >
                <div className="max-w-[85%] bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl rounded-tr-xs px-4 py-2.5 text-sm sm:text-base shadow-md">
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 pr-1">
                  <span>Delivered with a smile</span>
                  <CheckCheck className="w-3 h-3 text-pink-300" />
                </div>
              </motion.div>
            ))}

            {isTypingChat && (
              <div className="flex items-center gap-1.5 p-2 text-slate-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                <span className="ml-1 text-[11px]">Kanchana is typing another thought...</span>
              </div>
            )}
          </div>

          {/* Button to reveal more chat moments */}
          {visibleChatCount < chatBubbles.length && (
            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <button
                onClick={handleMoreChat}
                disabled={isTypingChat}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-pink-200 glass-panel hover:bg-white/15 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Next Message 😂</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Continue Button to Next Screen (Our Little Book) */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => {
            soundManager.playSfx("click");
            onNext();
          }}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-medium text-base text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl shadow-pink-600/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <span>Open Our Little Storybook 📖</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}
