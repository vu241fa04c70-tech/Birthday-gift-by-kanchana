import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Wind, ArrowRight, Award } from "lucide-react";
import { birthdayConfig, personalize } from "../../data/birthdayConfig";
import { soundManager } from "../../utils/audio";

export default function CelebrationScreen({ onNext, reducedMotion }) {
  const candleTotal = birthdayConfig.celebration.candleCount || 5;
  const [litCandles, setLitCandles] = useState(Array(candleTotal).fill(true));
  const [allBlown, setAllBlown] = useState(false);

  const title = personalize(birthdayConfig.celebration.title);
  const tagline = personalize(birthdayConfig.celebration.tagline);
  const wishMessage = personalize(birthdayConfig.celebration.wishCardMessage);

  // Trigger grand confetti shower
  const launchConfetti = () => {
    soundManager.playSfx("celebrate");

    if (reducedMotion) return;

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#f472b6", "#c084fc", "#fbbf24", "#38bdf8", "#34d399", "#fef3c7"],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  // Blow out an individual candle
  const blowOutCandle = (index) => {
    if (!litCandles[index]) return;
    soundManager.playSfx("blow");

    const updated = [...litCandles];
    updated[index] = false;
    setLitCandles(updated);

    if (updated.every((c) => !c)) {
      setAllBlown(true);
      launchConfetti();
    }
  };

  // Blow out all candles at once
  const blowOutAll = () => {
    soundManager.playSfx("blow");
    setLitCandles(Array(candleTotal).fill(false));
    setAllBlown(true);
    launchConfetti();
  };

  // Relight candles
  const relightCandles = () => {
    soundManager.playSfx("chime");
    setLitCandles(Array(candleTotal).fill(true));
    setAllBlown(false);
  };

  return (
    <section 
      aria-label="Birthday Celebration" 
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center z-10"
    >
      {/* Floating Celebration Balloons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={reducedMotion ? {} : { y: [0, -25, 0], rotate: [-2, 3, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-4 md:left-16 text-5xl md:text-7xl opacity-80"
        >
          🎈
        </motion.div>
        <motion.div
          animate={reducedMotion ? {} : { y: [0, -35, 0], rotate: [3, -3, 3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-28 right-4 md:right-20 text-5xl md:text-7xl opacity-80"
        >
          🎉
        </motion.div>
        <motion.div
          animate={reducedMotion ? {} : { y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-24 left-10 md:left-28 text-4xl md:text-6xl opacity-70 hidden sm:block"
        >
          ✨
        </motion.div>
      </div>

      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto flex flex-col items-center w-full"
      >
        {/* Celebration Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 text-pink-300 text-xs md:text-sm font-medium mb-4 border border-pink-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Screen 2 of 7 • Celebration Time</span>
        </div>

        {/* Personalized Main Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3 text-glow">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-purple-200/90 mb-8 max-w-lg font-light">
          {tagline}
        </p>

        {/* ================================================================= */}
        {/* INTERACTIVE CELEBRATION CAKE */}
        {/* ================================================================= */}
        <div className="relative my-4 flex flex-col items-center">
          {/* Animated Cake SVG */}
          <div className="w-72 sm:w-84 md:w-96 select-none relative">
            <svg viewBox="0 0 400 320" className="w-full drop-shadow-2xl">
              <defs>
                <linearGradient id="cakeBase" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#f472b6" />
                  <stop offset="50%" stop-color="#ec4899" />
                  <stop offset="100%" stop-color="#be185d" />
                </linearGradient>
                <linearGradient id="cakeTop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#c084fc" />
                  <stop offset="100%" stop-color="#9333ea" />
                </linearGradient>
                <linearGradient id="frosting" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#fff" />
                  <stop offset="100%" stop-color="#fdf2f8" />
                </linearGradient>
                <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#fef08a" />
                  <stop offset="50%" stop-color="#f59e0b" />
                  <stop offset="100%" stop-color="#ea580c" stop-opacity="0" />
                </radialGradient>
              </defs>

              {/* Cake Stand */}
              <ellipse cx="200" cy="290" rx="140" ry="20" fill="#334155" opacity="0.6" />
              <path d="M 180 285 L 185 305 L 215 305 L 220 285 Z" fill="#64748b" />
              <ellipse cx="200" cy="285" rx="130" ry="15" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />

              {/* Bottom Cake Tier */}
              <rect x="90" y="190" width="220" height="85" rx="16" fill="url(#cakeBase)" />
              {/* Frosting Drips on Bottom Tier */}
              <path
                d="M 90 205 Q 110 225 130 205 Q 150 230 170 205 Q 190 235 210 205 Q 230 230 250 205 Q 270 225 290 205 Q 300 220 310 205 L 310 190 L 90 190 Z"
                fill="url(#frosting)"
              />
              {/* Decorative Pearls */}
              {[120, 160, 200, 240, 280].map((cx, i) => (
                <circle key={i} cx={cx} cy="255" r="4.5" fill="#fef08a" />
              ))}

              {/* Top Cake Tier */}
              <rect x="130" y="130" width="140" height="65" rx="12" fill="url(#cakeTop)" />
              {/* Top Frosting */}
              <path
                d="M 130 145 Q 145 160 160 145 Q 175 165 190 145 Q 205 165 220 145 Q 235 160 250 145 Q 260 155 270 145 L 270 130 L 130 130 Z"
                fill="url(#frosting)"
              />

              {/* Candlesticks & Flames */}
              {[150, 175, 200, 225, 250].map((cx, idx) => {
                const isLit = litCandles[idx];
                return (
                  <g
                    key={idx}
                    className="cursor-pointer group"
                    onClick={() => blowOutCandle(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Candle ${idx + 1}, ${isLit ? "Lit. Click to blow out" : "Extinguished"}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        blowOutCandle(idx);
                      }
                    }}
                  >
                    {/* Candle body */}
                    <rect
                      x={cx - 3.5}
                      y="90"
                      width="7"
                      height="40"
                      rx="2"
                      fill={idx % 2 === 0 ? "#fde047" : "#38bdf8"}
                      stroke="#fff"
                      stroke-width="1"
                    />
                    {/* Wick */}
                    <line x1={cx} y1="90" x2={cx} y2="84" stroke="#475569" stroke-width="1.5" />

                    {/* Animated Flame if lit */}
                    {isLit ? (
                      <g>
                        {/* Glow halo */}
                        <circle cx={cx} cy="72" r="14" fill="url(#flameGlow)" className="animate-pulse" />
                        {/* Teardrop Flame */}
                        <path
                          d={`M ${cx} 60 Q ${cx + 6} 72 ${cx} 82 Q ${cx - 6} 72 ${cx} 60 Z`}
                          fill="#facc15"
                          className={reducedMotion ? "" : "animate-twinkle"}
                        />
                        <path
                          d={`M ${cx} 66 Q ${cx + 3} 74 ${cx} 80 Q ${cx - 3} 74 ${cx} 66 Z`}
                          fill="#ea580c"
                        />
                      </g>
                    ) : (
                      /* Smoke wisp after blowout */
                      <g opacity="0.7">
                        <path
                          d={`M ${cx} 84 Q ${cx + 4} 75 ${cx - 2} 66 Q ${cx + 4} 58 ${cx} 50`}
                          fill="none"
                          stroke="#cbd5e1"
                          stroke-width="1.8"
                          stroke-linecap="round"
                          stroke-dasharray="3,3"
                        />
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Candle Status & Instructions */}
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            {allBlown
              ? birthdayConfig.celebration.instructionBlown
              : birthdayConfig.celebration.instructionBlow}
          </p>

          {/* Cake Interaction Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            {!allBlown ? (
              <button
                onClick={blowOutAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm text-white bg-gradient-to-r from-amber-500 to-pink-500 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Wind className="w-4 h-4" />
                <span>Make a Wish & Blow Out Candles 💨</span>
              </button>
            ) : (
              <button
                onClick={relightCandles}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm text-slate-300 hover:text-white glass-panel-light hover:bg-white/15 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Relight Candles 🕯️</span>
              </button>
            )}
          </div>
        </div>

        {/* Personalized Wish Card */}
        <AnimatePresence>
          {allBlown && (
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="mt-6 w-full glass-card rounded-2xl p-6 sm:p-8 text-left border border-pink-400/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2.5 mb-3 text-pink-300">
                <Award className="w-5 h-5 text-amber-300" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {birthdayConfig.celebration.wishCardTitle}
                </h2>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light">
                {wishMessage}
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-300">
                <span>With all warm wishes ✨</span>
                <span>— {birthdayConfig.senderName}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button to Next Screen */}
        <div className="mt-8">
          <button
            onClick={() => {
              soundManager.playSfx("click");
              onNext();
            }}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-base text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore Our Memory Universe</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
