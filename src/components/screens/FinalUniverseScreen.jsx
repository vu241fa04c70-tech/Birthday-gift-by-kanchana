import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Download,
  RotateCcw,
  Heart,
  Moon,
  Check,
} from "lucide-react";
import { birthdayConfig, personalize } from "../../data/birthdayConfig";
import { soundManager } from "../../utils/audio";

export default function FinalUniverseScreen({ onReplay, reducedMotion }) {
  const [visibleLineCount, setVisibleLineCount] = useState(1);
  const [hugCount, setHugCount] = useState(0);
  const [downloaded, setDownloaded] = useState(false);

  const lines = birthdayConfig.finalLines || [];

  // Slowly reveal lines one by one
  useEffect(() => {
    soundManager.playSfx("celebrate");

    if (reducedMotion) {
      setVisibleLineCount(lines.length);
      return;
    }

    const interval = setInterval(() => {
      setVisibleLineCount((prev) => {
        if (prev < lines.length) {
          return prev + 1;
        }
        clearInterval(interval);
        // Launch final gentle confetti shower once all lines appear
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#f472b6", "#c084fc", "#fbbf24", "#38bdf8", "#fbcfe8"],
        });
        return lines.length;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [lines.length, reducedMotion]);

  // Handle downloading the letter and memories
  const handleDownloadLetter = () => {
    soundManager.playSfx("click");

    const letter = birthdayConfig.letter;
    const paragraphs = (letter.paragraphs || []).join("\n\n");
    const reasonsList = (birthdayConfig.reasons || [])
      .map((r) => `${r.number}. ${r.title} — ${r.description}`)
      .join("\n\n");

    const memoriesList = (birthdayConfig.ourLittleWorld.lateNightMemories || [])
      .map((m) => `• ${m.title} (${m.badge}): "${m.quote}"`)
      .join("\n\n");

    const fileContent = `=====================================================
A LITTLE UNIVERSE OF LUCKY ❤️
A Birthday Keepsake Made with Love by Kanchana
=====================================================

${letter.salutation}

${paragraphs}

${letter.closing}
${letter.signature}

-----------------------------------------------------
OUR LATE-NIGHT TALKS & WORD MEMORIES:
-----------------------------------------------------
${memoriesList}

-----------------------------------------------------
10 SIMPLE REASONS WHY YOU ARE SPECIAL TO ME:
-----------------------------------------------------
${reasonsList}

-----------------------------------------------------
"Some names are just names, but some names carry
 a little piece of someone's heart. Lucky is the name
 I gave you, and now it holds so many beautiful memories for me."
=====================================================
`;

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Letter_For_Lucky_From_Kanchana.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleSendHug = () => {
    soundManager.playSfx("chime");
    setHugCount((prev) => prev + 1);

    if (!reducedMotion) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#f472b6", "#fda4af", "#fb7185", "#fbcfe8"],
      });
    }
  };

  return (
    <section 
      aria-label="Our Story Doesn't Need Photos" 
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center z-10 max-w-3xl mx-auto"
    >
      {/* Soft Moonlit Nebula Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-purple-600/20 via-pink-500/15 to-amber-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* Crescent Moon Icon */}
      <motion.div
        animate={reducedMotion ? {} : { rotate: [0, 4, -4, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 p-1 shadow-2xl shadow-purple-500/40 mb-6 flex items-center justify-center ring-2 ring-white/30"
      >
        <div className="w-full h-full bg-[#0b0f19] rounded-[22px] flex items-center justify-center text-4xl sm:text-5xl">
          🌙
        </div>
      </motion.div>

      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-xs md:text-sm font-medium mb-6 border border-pink-500/30">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Screen 7 of 7 • Our Story Doesn't Need Photos</span>
      </div>

      {/* =================================================================== */}
      {/* SLOW LINE-BY-LINE POEM REVEAL */}
      {/* =================================================================== */}
      <div className="space-y-4 my-4 mb-10 w-full">
        {lines.map((line, idx) => {
          const isVisible = idx < visibleLineCount;
          const isHighlight = line.includes("Happy Birthday") || line.includes("Made with love");
          const isSignoff = line.startsWith("—");

          return (
            <AnimatePresence key={idx}>
              {isVisible && (
                <motion.div
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`transition-all ${
                    isHighlight
                      ? "font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white text-glow my-3"
                      : isSignoff
                      ? "font-handwriting text-2xl sm:text-3xl text-pink-300 font-bold mt-2"
                      : "font-serif text-lg sm:text-2xl text-purple-200/90 font-light"
                  }`}
                >
                  {personalize(line)}
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Action Buttons (once all lines are revealed or immediately in reduced motion) */}
      {visibleLineCount >= lines.length && (
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 w-full max-w-lg mb-8"
        >
          {/* Download Letter Button */}
          <button
            onClick={handleDownloadLetter}
            className="flex-1 min-w-[220px] inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-medium text-sm sm:text-base text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all ring-1 ring-white/20"
          >
            {downloaded ? (
              <>
                <Check className="w-5 h-5 text-emerald-300" />
                <span>Letter Saved to Device!</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5 text-amber-200" />
                <span>Download My Keepsake Letter 💌</span>
              </>
            )}
          </button>

          {/* Virtual Hug Button */}
          <button
            onClick={handleSendHug}
            className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium text-sm sm:text-base text-white glass-panel hover:bg-white/15 shadow-xl hover:scale-105 active:scale-95 transition-all border border-pink-400/30"
          >
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />
            <span>
              Send a Virtual Hug to Kanchana 💖{" "}
              {hugCount > 0 && `(${hugCount})`}
            </span>
          </button>
        </motion.div>
      )}

      {/* Replay Our Story Button */}
      {visibleLineCount >= lines.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => {
              soundManager.playSfx("click");
              onReplay();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm text-slate-300 hover:text-white glass-panel-light hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-purple-300" />
            <span>Read Our Story Again 🚀</span>
          </button>
        </motion.div>
      )}

      {/* Loving Footer */}
      <div className="mt-14 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-400">
        <span>Made with love by Kanchana for Lucky</span>
        <span>•</span>
        <span className="text-pink-400">Forever In My Heart</span>
      </div>
    </section>
  );
}
