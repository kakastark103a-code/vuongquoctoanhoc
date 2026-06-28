import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Volume2, VolumeX } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

export default function Header({ 
  onBack, 
  stars, 
  soundEnabled, 
  onToggleSound, 
  showBackBtn = false 
}) {

  const handleBackClick = () => {
    playSound('click');
    onBack();
  };

  const handleSoundClick = () => {
    // We play sound AFTER toggling, so we check the opposite of current state
    onToggleSound();
    // Delay slightly to play sound with the new state
    setTimeout(() => {
      playSound('click');
    }, 50);
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-md border-b-4 border-slate-200 sticky top-0 z-30">
      {/* Nút Quay Lại */}
      <div className="w-12">
        {showBackBtn && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            className="w-10 h-10 flex items-center justify-center btn-cartoon-white"
            aria-label="Quay lại"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700 stroke-[3]" />
          </motion.button>
        )}
      </div>

      {/* Vương miện / Tiêu đề */}
      <div className="flex items-center gap-1.5 bg-sky-100 border-2 border-sky-300 px-3 py-1 rounded-full shadow-sm">
        <span className="text-xl">👑</span>
        <span className="font-extrabold text-sky-700 text-sm tracking-wider uppercase">
          Toán Học
        </span>
      </div>

      {/* Điểm Sao & Tắt/Mở âm thanh */}
      <div className="flex items-center gap-3">
        {/* Số sao */}
        <motion.div 
          className="flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 px-3 py-1 rounded-full"
          layout
        >
          <motion.div
            key={stars}
            animate={{ 
              scale: [1, 1.4, 1],
              rotate: [0, 15, -15, 0]
            }}
            transition={{ duration: 0.4 }}
          >
            <Star className="w-5 h-5 text-amber-500 fill-amber-400 stroke-[2]" />
          </motion.div>
          <span className="font-extrabold text-amber-700 text-base min-w-[1.25rem] text-center">
            {stars}
          </span>
        </motion.div>

        {/* Nút Âm Thanh */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSoundClick}
          className={`w-10 h-10 flex items-center justify-center rounded-2xl border-3 border-slate-800 transition-colors ${
            soundEnabled 
              ? 'bg-emerald-300 hover:bg-emerald-200 shadow-[0_3px_0_0_#15803d]' 
              : 'bg-rose-300 hover:bg-rose-200 shadow-[0_3px_0_0_#b91c1c]'
          }`}
          aria-label={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-emerald-900 stroke-[3]" />
          ) : (
            <VolumeX className="w-5 h-5 text-rose-900 stroke-[3]" />
          )}
        </motion.button>
      </div>
    </header>
  );
}
