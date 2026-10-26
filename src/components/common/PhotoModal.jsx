import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Tag, Heart } from "lucide-react";
import { soundManager } from "../../utils/audio";

export default function PhotoModal({ memory, onClose, reducedMotion }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        soundManager.playSfx("click");
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!memory) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            soundManager.playSfx("click");
            onClose();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-memory-title"
      >
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-2xl w-full bg-[#131726] border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              soundManager.playSfx("click");
              onClose();
            }}
            aria-label="Close memory details"
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors focus:ring-2 focus:ring-pink-400"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Container with Fallback */}
          <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                // Graceful fallback if custom image is missing
                e.target.style.display = "none";
              }}
            />
            {/* Tag Overlay */}
            {memory.tag && (
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-pink-300 backdrop-blur-md border border-white/20">
                <Tag className="w-3 h-3" />
                {memory.tag}
              </span>
            )}
          </div>

          {/* Content Details */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-purple-300 mb-3">
              {memory.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-pink-400" />
                  <span>{memory.date}</span>
                </div>
              )}
              {memory.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{memory.location}</span>
                </div>
              )}
            </div>

            <h2
              id="modal-memory-title"
              className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3"
            >
              {memory.title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-6">
              {memory.fullStory}
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-pink-300">
                <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                A treasured chapter in our story
              </span>
              <button
                onClick={() => {
                  soundManager.playSfx("click");
                  onClose();
                }}
                className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all"
              >
                Back to gallery
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
