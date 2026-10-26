import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Play,
  Pause,
  FastForward,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { birthdayConfig, personalize } from "../../data/birthdayConfig";
import { soundManager } from "../../utils/audio";

export default function LetterScreen({ onNext, reducedMotion }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [typedChars, setTypedChars] = useState(0);

  const { letter, letterEnvelopePrompt } = birthdayConfig;
  const salutation = personalize(letter.salutation);
  const paragraphs = (letter.paragraphs || []).map((p) => personalize(p));
  const closing = personalize(letter.closing);
  const signature = personalize(letter.signature);

  // Full assembled text string for typewriter
  const fullText = [
    salutation,
    "",
    ...paragraphs,
    "",
    closing,
    signature,
  ].join("\n\n");

  const typingTimerRef = useRef(null);

  // Open envelope
  const handleOpenEnvelope = () => {
    if (isOpen) return;
    soundManager.playSfx("paper");
    setIsOpen(true);
    setIsTyping(true);
    setIsPaused(false);
    setTypedChars(0);
  };

  // Typewriter effect
  useEffect(() => {
    if (!isOpen || !isTyping || isPaused) return;

    if (reducedMotion) {
      setTypedChars(fullText.length);
      setIsTyping(false);
      return;
    }

    typingTimerRef.current = setInterval(() => {
      setTypedChars((prev) => {
        if (prev >= fullText.length) {
          clearInterval(typingTimerRef.current);
          setIsTyping(false);
          return fullText.length;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(typingTimerRef.current);
  }, [isOpen, isTyping, isPaused, fullText.length, reducedMotion]);

  const togglePauseTyping = () => {
    soundManager.playSfx("click");
    setIsPaused(!isPaused);
  };

  const handleSkipTyping = () => {
    soundManager.playSfx("click");
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setTypedChars(fullText.length);
    setIsTyping(false);
    setIsPaused(false);
  };

  const handleReplayLetter = () => {
    soundManager.playSfx("paper");
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setTypedChars(0);
    setIsTyping(true);
    setIsPaused(false);
  };

  const isFinished = typedChars >= fullText.length;
  const currentVisibleText = fullText.slice(0, typedChars);

  return (
    <section 
      aria-label="A Little Truth From Kanchana" 
      className="relative min-h-screen flex flex-col items-center px-4 py-24 z-10 max-w-4xl mx-auto text-center"
    >
      {/* Header */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-xs md:text-sm font-medium mb-3 border border-pink-500/30">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
          <span>Screen 6 of 7 • A Little Truth From Kanchana</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2 text-glow">
          A Little Truth From Kanchana ❤️
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          {isOpen
            ? "Written from my heart, especially for Lucky."
            : "Tap the sealed envelope to read my personal birthday message for you."}
        </p>
      </motion.div>

      {/* =================================================================== */}
      {/* ENVELOPE & PARCHMENT LETTER */}
      {/* =================================================================== */}
      <div className="w-full flex flex-col items-center my-4">
        {!isOpen ? (
          /* Sealed Envelope Graphic */
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={reducedMotion ? {} : { scale: 1.03, y: -4 }}
            onClick={handleOpenEnvelope}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleOpenEnvelope();
              }
            }}
            aria-label="Click the golden seal to open the letter"
            className="cursor-pointer group relative w-full max-w-md aspect-[16/10] bg-gradient-to-br from-[#4a154b] via-[#31104b] to-[#1e1b4b] rounded-3xl p-6 shadow-2xl border border-pink-400/40 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Envelope flap lines */}
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 400 250" className="w-full h-full">
                <polygon points="0,0 200,130 400,0" fill="#3b0764" opacity="0.6" stroke="#c084fc" stroke-width="1.5" />
                <polygon points="0,0 0,250 200,130" fill="#2e1065" opacity="0.5" />
                <polygon points="400,0 400,250 200,130" fill="#2e1065" opacity="0.5" />
                <polygon points="0,250 200,130 400,250" fill="#1e1b4b" opacity="0.8" stroke="#a855f7" stroke-width="1" />
              </svg>
            </div>

            {/* Golden Wax Seal */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 border-2 border-yellow-100 shadow-2xl flex items-center justify-center text-amber-950 font-serif font-bold text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ring-4 ring-amber-400/30 animate-pulse">
                💌
              </div>
              <span className="mt-4 px-4 py-1.5 rounded-full glass-panel text-pink-200 text-xs sm:text-sm font-medium tracking-wide border border-pink-300/30 shadow-lg group-hover:bg-pink-400/20 transition-colors">
                "{letterEnvelopePrompt}"
              </span>
            </div>

            <div className="absolute top-4 right-4 border-2 border-dashed border-pink-300/40 rounded-lg p-2 text-[10px] text-pink-300/70 font-mono tracking-widest uppercase rotate-6">
              FOR LUCKY • FROM KANCHANA ❤️
            </div>
          </motion.div>
        ) : (
          /* Unfolded Letter */
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-2xl parchment-paper text-slate-800 rounded-3xl p-7 sm:p-11 text-left polaroid-shadow border border-amber-200/80 relative"
          >
            {/* Postal Stamp Badge */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <div className="border border-pink-700/20 rounded-md p-1.5 text-center bg-pink-50">
                <span className="text-xl">🎂</span>
                <span className="block text-[8px] font-mono text-pink-900 uppercase">LUCKY'S DAY</span>
              </div>
            </div>

            {/* Letter Content with Typewriter */}
            <div className="min-h-[300px] font-serif text-slate-900 leading-relaxed text-base sm:text-lg whitespace-pre-line font-light">
              {currentVisibleText}
              {isTyping && (
                <span className="inline-block w-2 h-5 bg-pink-600 ml-1 animate-pulse align-middle" />
              )}
            </div>

            {/* Signature once completed */}
            {isFinished && (
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-pink-600">
                  <Heart className="w-4 h-4 fill-pink-600" />
                  <span className="font-handwriting text-2xl text-slate-900 font-bold">
                    {closing} {signature}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  Written with love
                </span>
              </motion.div>
            )}

            {/* Controls */}
            <div className="mt-8 pt-4 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {isTyping && (
                  <>
                    <button
                      onClick={togglePauseTyping}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-medium transition-colors"
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                      <span>{isPaused ? "Resume" : "Pause"}</span>
                    </button>
                    <button
                      onClick={handleSkipTyping}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-medium transition-colors"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      <span>Skip to End</span>
                    </button>
                  </>
                )}

                {isFinished && (
                  <button
                    onClick={handleReplayLetter}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-medium transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Letter ✍️</span>
                  </button>
                )}
              </div>

              <span className="text-[11px] text-slate-500 font-sans">
                {isFinished ? "Delivered to Lucky ❤️" : "Writing letter..."}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Button to proceed to Final Screen */}
      <AnimatePresence>
        {isOpen && isFinished && (
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <button
              onClick={() => {
                soundManager.playSfx("click");
                onNext();
              }}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-medium text-base text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Our Story Doesn't Need Photos 🌌</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
