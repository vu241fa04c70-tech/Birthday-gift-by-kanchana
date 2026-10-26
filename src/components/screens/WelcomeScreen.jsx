import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Compass, ArrowRight, FastForward } from "lucide-react";
import { birthdayConfig } from "../../data/birthdayConfig";
import { soundManager } from "../../utils/audio";

export default function WelcomeScreen({ onStart, onSkipAnimation, reducedMotion }) {
  const handleStart = () => {
    // Start background music and sound effects on user interaction
    soundManager.play();
    soundManager.playSfx("chime");
    onStart();
  };

  return (
    <section 
      aria-label="Welcome Screen" 
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center z-10"
    >
      {/* Floating Decorative Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="max-w-3xl mx-auto flex flex-col items-center relative"
      >
        {/* Subtle Made With Love Badge */}
        <motion.div
          initial={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-light text-pink-200 text-xs md:text-sm font-medium mb-8 border border-pink-400/30 shadow-lg shadow-purple-900/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "8s" }} />
          <span>Made with love by Kanchana, especially for Lucky ❤️</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
        </motion.div>

        {/* Personalized Main Greeting */}
        <motion.h1
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-tight text-glow"
        >
          Hey Lucky! <span className="text-pink-500 inline-block animate-pulse">❤️</span>
        </motion.h1>

        {/* Warm Subtitle */}
        <motion.p
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="text-lg sm:text-xl md:text-2xl text-purple-200 max-w-xl mx-auto leading-relaxed mb-10 font-light"
        >
          {birthdayConfig.welcomeSubtitle}
        </motion.p>

        {/* Glowing Interactive CTA Button */}
        <motion.div
          initial={reducedMotion ? {} : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-base md:text-lg text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 ring-2 ring-white/20 animate-pulse-glow"
          >
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
            <span>{birthdayConfig.welcomeButtonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Quick Skip Option */}
          <button
            onClick={onSkipAnimation}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip intro & explore</span>
          </button>
        </motion.div>

        {/* Gentle Sound Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-14 flex items-center gap-2 text-xs text-purple-300/80"
        >
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Best experienced with sound turned on 🎶</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
