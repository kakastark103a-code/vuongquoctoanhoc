import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundEffects';
import MascotRenderer, { BASE_MASCOTS } from '../components/MascotRenderer';

export default function ResultScreen({ score, name, mascot, equippedSkins, subject, onReplay, onGoHome }) {
  
  // Trọng số thưởng sao: Mỗi câu đúng được 2 sao! Nếu đúng 10/10 thưởng thêm 10 sao!
  const starsEarned = score * 2 + (score === 10 ? 10 : 0);

  const currentMascotInfo = BASE_MASCOTS[mascot] || BASE_MASCOTS.knight;

  // Kích hoạt confetti và âm thanh chiến thắng khi mount
  useEffect(() => {
    if (score >= 5) {
      playSound('win');
      
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    } else {
      playSound('wrong');
    }
  }, [score]);

  // Cấu hình cúp & lời chúc theo số câu đúng
  const getFeedback = () => {
    const mascotNameShort = currentMascotInfo.name.split(" ")[0];
    if (score === 10) {
      return {
        trophy: '🏆',
        title: 'THIÊN TÀI TOÁN HỌC!',
        colorClass: 'text-amber-500',
        badgeBg: 'bg-amber-100 border-amber-400',
        mascotMsg: `Quá xuất sắc ${name} ơi! Bé đã trả lời đúng hoàn hảo cả 10 câu hỏi và rinh thêm 10 Sao may mắn nữa! ${mascotNameShort} tự hào về bé lắm! 🌟`,
        starsBonus: '+30 Sao!'
      };
    } else if (score >= 8) {
      return {
        trophy: '🥇',
        title: 'RẤT XUẤT SẮC!',
        colorClass: 'text-yellow-500',
        badgeBg: 'bg-yellow-50 border-yellow-300',
        mascotMsg: `Tuyệt vời ông mặt trời! Bé ${name} làm đúng gần hết luôn. Lần sau cố gắng đạt điểm tối đa cùng ${mascotNameShort} nhé! 💪`,
        starsBonus: `+${starsEarned} Sao!`
      };
    } else if (score >= 5) {
      return {
        trophy: '🥈',
        title: 'CỐ GẮNG RẤT TỐT!',
        colorClass: 'text-slate-500',
        badgeBg: 'bg-slate-100 border-slate-300',
        mascotMsg: `Chúc mừng bé ${name} đã vượt qua thử thách thành công! Tích thêm sao để ghé shop mua đồ đẹp cho ${mascotNameShort} nha! 🎈`,
        starsBonus: `+${starsEarned} Sao!`
      };
    } else {
      return {
        trophy: '🛡️',
        title: 'HÃY THỬ LẠI NHÉ!',
        colorClass: 'text-orange-500',
        badgeBg: 'bg-orange-100 border-orange-300',
        mascotMsg: `Không sao đâu bé ${name} ơi! Ôn luyện lại một chút cùng ${mascotNameShort} rồi thử thách tiếp nha, tớ tin bé sẽ làm được! 🦖`,
        starsBonus: `+${starsEarned} Sao!`
      };
    }
  };

  const feedback = getFeedback();

  const handleReplayClick = () => {
    playSound('click');
    onReplay();
  };

  const handleGoHomeClick = () => {
    playSound('click');
    onGoHome();
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 py-5 overflow-y-auto bg-gradient-to-b from-indigo-100 to-purple-200">
      
      {/* Khối cúp chúc mừng */}
      <div className="text-center z-10 my-2 flex-1 flex flex-col justify-center items-center">
        
        {/* Cup lấp lánh animated */}
        <motion.div
          initial={{ scale: 0.3, rotate: -180, opacity: 0 }}
          animate={{ scale: 1.1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1, bounce: 0.4 }}
          className="text-7xl md:text-8xl mb-3 select-none drop-shadow-lg"
        >
          {feedback.trophy}
        </motion.div>

        {/* Tiêu đề kết quả */}
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`font-black text-xl tracking-wider uppercase mb-1 drop-shadow-sm ${feedback.colorClass}`}
        >
          {feedback.title}
        </motion.h2>

        {/* Thống kê chi tiết */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-cartoon p-4 max-w-[260px] w-full mt-2 bg-white"
        >
          <div className="text-[10px] font-bold text-slate-500 mb-1">Kết quả thử thách</div>
          <div className="text-2xl font-black text-slate-800 tracking-wide mb-2.5">
            {score} / 10
            <span className="text-[10px] block font-extrabold text-emerald-600 mt-0.5">câu trả lời đúng</span>
          </div>

          <div className={`flex items-center justify-center gap-1 py-1.5 px-3 rounded-full border-2 font-black text-[11px] text-amber-700 ${feedback.badgeBg}`}>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400 stroke-[2.5]" />
            Thưởng: {feedback.starsBonus}
          </div>
        </motion.div>
      </div>

      {/* Lời khuyên/nhận xét của Mascot có kèm trang phục */}
      <div className="z-10 w-full max-w-sm mx-auto mb-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative flex items-center gap-3 bg-white/95 border-3 border-slate-800 rounded-3xl p-3.5 shadow-md"
        >
          <div className="absolute -top-3 left-10 w-4 h-4 bg-white border-t-3 border-l-3 border-slate-800 rotate-45"></div>
          
          <div className="flex-shrink-0 w-12 h-12 bg-sky-50 border border-slate-800 rounded-full flex items-center justify-center overflow-visible relative">
            <MascotRenderer 
              mascot={mascot} 
              equippedSkins={equippedSkins} 
              size="sm" 
              status={score >= 5 ? 'happy' : 'sad'} 
            />
          </div>

          <div className="text-left flex-1">
            <h4 className="font-extrabold text-slate-800 text-xs uppercase">
              {currentMascotInfo.name}
            </h4>
            <p className="text-[10px] text-slate-600 font-bold leading-normal mt-0.5">
              {feedback.mascotMsg}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Nút hành động */}
      <div className="z-10 w-full max-w-sm mx-auto flex flex-col gap-3 pb-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReplayClick}
          className="w-full py-3.5 btn-cartoon-purple text-purple-950 font-black text-sm flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4.5 h-4.5 stroke-[3]" />
          <span>Thử Thách Lại</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoHomeClick}
          className="w-full py-3.5 btn-cartoon-white text-slate-800 font-black text-sm flex items-center justify-center gap-2"
        >
          <span>Quay Về Trang Chủ 🏠</span>
        </motion.button>
      </div>

    </div>
  );
}
