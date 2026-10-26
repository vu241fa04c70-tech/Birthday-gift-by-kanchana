import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, MapPin, ZoomIn, ArrowRight } from "lucide-react";
import { birthdayConfig } from "../../data/birthdayConfig";
import PhotoModal from "../common/PhotoModal";
import { soundManager } from "../../utils/audio";

export default function MemoriesScreen({ onNext, reducedMotion }) {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const memories = birthdayConfig.memories || [];

  // Filter tags if needed
  const tags = ["all", ...new Set(memories.map((m) => m.tag).filter(Boolean))];

  const filteredMemories =
    activeFilter === "all"
      ? memories
      : memories.filter((m) => m.tag === activeFilter);

  // Subtle tilt for polaroid authenticity
  const tilts = [-1.5, 2, -2, 1.2, -1, 1.8];

  const handleOpenMemory = (mem) => {
    soundManager.playSfx("flip");
    setSelectedMemory(mem);
  };

  return (
    <section 
      aria-label="Our Memory Universe" 
      className="relative min-h-screen flex flex-col items-center px-4 py-24 z-10 max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-300 text-xs md:text-sm font-medium mb-3 border border-purple-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Screen 3 of 7 • Our Story So Far</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 text-glow">
          Our Memory Universe
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          A constellation of unforgettable days, spontaneous adventures, and laughs that still warm the heart.
        </p>

        {/* Filter Pills */}
        {tags.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  soundManager.playSfx("click");
                  setActiveFilter(tag);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                  activeFilter === tag
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "glass-panel-light text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-2 sm:px-4">
        {filteredMemories.map((mem, idx) => {
          const tilt = reducedMotion ? 0 : tilts[idx % tilts.length];

          return (
            <motion.div
              key={mem.id || idx}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={
                reducedMotion
                  ? {}
                  : { scale: 1.03, rotate: 0, transition: { duration: 0.2 } }
              }
              style={{ rotate: `${tilt}deg` }}
              onClick={() => handleOpenMemory(mem)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleOpenMemory(mem);
                }
              }}
              aria-label={`View memory: ${mem.title}`}
              className="cursor-pointer group bg-[#fdfbf7] rounded-xl p-3 sm:p-4 polaroid-shadow border border-amber-100 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Decorative Washi Tape at Top */}
              <div className="w-20 h-5 bg-pink-300/60 -mt-5 mx-auto rounded-sm backdrop-blur-xs shadow-xs transform -rotate-1 border-t border-b border-pink-400/40" />

              {/* Photo Area */}
              <div className="relative aspect-[4/3] w-full bg-slate-900 rounded-lg overflow-hidden mt-2 mb-3">
                <img
                  src={mem.image}
                  alt={mem.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-xs">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Read Note
                  </span>
                </div>
              </div>

              {/* Polaroid Footer */}
              <div className="px-1 text-slate-800 text-left">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-pink-600" />
                    {mem.date}
                  </span>
                  {mem.location && (
                    <span className="flex items-center gap-1 truncate max-w-[120px]">
                      <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                      {mem.location}
                    </span>
                  )}
                </div>

                <h3 className="font-sans font-bold text-base text-slate-900 line-clamp-1 group-hover:text-purple-700 transition-colors">
                  {mem.title}
                </h3>

                <p className="font-handwriting text-lg text-slate-600 mt-1 line-clamp-2 leading-tight">
                  "{mem.thumbnailCaption}"
                </p>
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
        className="mt-14"
      >
        <button
          onClick={() => {
            soundManager.playSfx("click");
            onNext();
          }}
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-base text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl shadow-pink-600/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <span>Unwrap Your Mystery Surprises</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Photo & Story Modal */}
      <PhotoModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}
