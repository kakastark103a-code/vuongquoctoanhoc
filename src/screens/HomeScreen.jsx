import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Divide, Shapes, Award, ShoppingBag, Edit3, BookOpen, Scale } from 'lucide-react';
import MascotRenderer, { BASE_MASCOTS } from '../components/MascotRenderer';
import { playSound } from '../utils/soundEffects';

export default function HomeScreen({ 
  name, 
  mascot, 
  equippedSkins = [], 
  onSelectSubject, 
  totalStars, 
  onGoToStore, 
  onResetProfile,
  onGoToReference
}) {

  const subjects = [
    {
      id: 'multiplication',
      title: 'Phép Nhân Vui Nhộn',
      desc: 'Bảng cửu chương từ 2 đến 9',
      icon: <Zap className="w-8 h-8 text-amber-900 fill-amber-300 stroke-[2.5]" />,
      emoji: '⚡',
      btnStyle: 'btn-cartoon-yellow text-amber-950',
    },
    {
      id: 'division',
      title: 'Phép Chia Kỳ Thú',
      desc: 'Bảng chia từ 2 đến 9',
      icon: <Divide className="w-8 h-8 text-indigo-950 stroke-[3]" />,
      emoji: '➗',
      btnStyle: 'btn-cartoon-blue text-sky-950',
    },
    {
      id: 'conversion',
      title: 'Quy Đổi Đo Lường',
      desc: 'Bảng đổi Độ dài và Khối lượng',
      icon: <Scale className="w-8 h-8 text-emerald-950 stroke-[2.5]" />,
      emoji: '⚖️',
      btnStyle: 'btn-cartoon-green text-emerald-950',
    },
    {
      id: 'geometry',
      title: 'Chu Vi Hình Học',
      desc: 'Chu vi hình vuông, chữ nhật, tam giác',
      icon: <Shapes className="w-8 h-8 text-pink-950 stroke-[2.5]" />,
      emoji: '📐',
      btnStyle: 'btn-cartoon-purple text-purple-950',
    },
    {
      id: 'area',
      title: 'Diện Tích Hình Học',
      desc: 'Diện tích hình vuông và hình chữ nhật',
      icon: <Shapes className="w-8 h-8 text-orange-950 stroke-[2.5]" />,
      emoji: '🟦',
      btnStyle: 'btn-cartoon-orange text-amber-950',
    },
  ];

  const handleSelect = (id) => {
    playSound('click');
    onSelectSubject(id);
  };

  const handleStoreClick = () => {
    playSound('click');
    onGoToStore();
  };

  const handleResetClick = () => {
    if (confirm("Bé có muốn đổi tên hoặc chọn bạn đồng hành khác không? (Số sao và đồ đã mua vẫn được giữ nguyên)")) {
      playSound('click');
      onResetProfile();
    }
  };

  const currentMascotInfo = BASE_MASCOTS[mascot] || BASE_MASCOTS.knight;

  // Các chữ cái tiêu đề nhảy nhót
  const titleText = "VƯƠNG QUỐC TOÁN HỌC".split("");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 py-5 overflow-y-auto relative bg-gradient-to-b from-blue-100 to-sky-200">
      
      {/* Background Decor (Clouds & Stars) */}
      <div className="absolute top-10 left-4 w-12 h-6 bg-white rounded-full opacity-60 filter blur-[1px] animate-pulse"></div>
      <div className="absolute top-24 right-6 w-16 h-8 bg-white rounded-full opacity-60 filter blur-[1px] animate-pulse"></div>
      
      {/* Profile Bar trên cùng (Hiển thị Avatar bé & Nút cài đặt/đổi tên) */}
      <div className="z-20 w-full flex items-center justify-between bg-white/80 border-3 border-slate-800 rounded-2xl p-2.5 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Avatar live thu nhỏ */}
          <div className="w-12 h-12 bg-sky-100 border-2 border-slate-800 rounded-full flex items-center justify-center relative overflow-hidden">
            <MascotRenderer mascot={mascot} equippedSkins={equippedSkins} size="sm" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Hiệp sĩ nhí</div>
            <div className="text-sm font-black text-slate-800 leading-tight flex items-center gap-1.5">
              <span>{name}</span>
            </div>
          </div>
        </div>

        {/* Nút đổi profile */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleResetClick}
          className="w-8 h-8 rounded-lg border-2 border-slate-800 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-[0_2px_0_0_#1e293b] active:translate-y-0.5 active:shadow-none"
          title="Đổi tên / Linh vật"
        >
          <Edit3 className="w-4 h-4 stroke-[2.5]" />
        </motion.button>
      </div>

      {/* Banner & Title */}
      <div className="text-center z-10 my-2">
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-4xl mb-1.5 inline-block drop-shadow-md"
        >
          👑
        </motion.div>

        {/* Tiêu đề chính */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center font-extrabold text-xl xs:text-2xl sm:text-3xl text-slate-800 tracking-wide uppercase select-none drop-shadow-sm mb-1 px-2"
        >
          {titleText.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                delay: index * 0.08,
                ease: "easeInOut"
              }}
              className={`${char === " " ? "w-2.5" : ""} inline-block text-slate-800`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Nhân vật Mascot đồng hành thực tế của bé */}
      <div className="flex justify-center items-center my-1.5 z-10">
        <motion.div 
          className="relative flex items-center gap-3.5 bg-white/90 border-3 border-slate-800 rounded-3xl p-3 shadow-md max-w-[310px] w-full"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute -top-3 left-10 w-4 h-4 bg-white border-t-3 border-l-3 border-slate-800 rotate-45"></div>
          
          {/* Vẽ linh vật thực tế */}
          <MascotRenderer mascot={mascot} equippedSkins={equippedSkins} size="sm" status="idle" />

          <div className="text-left flex-1">
            <h4 className="font-extrabold text-indigo-700 text-xs uppercase">
              {currentMascotInfo.name}
            </h4>
            <p className="text-[10px] text-slate-600 font-black leading-tight mt-0.5">
              "Chào {name}! Giải toán giỏi tích thật nhiều Sao để mua đồ siêu ngầu cho tớ nhé!"
            </p>
          </div>
        </motion.div>
      </div>

      {/* Nút Cửa Hàng & Sổ Tay Học Tập */}
      <div className="z-10 max-w-sm w-full mx-auto my-1 grid grid-cols-2 gap-2.5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStoreClick}
          className="w-full flex items-center justify-center py-3.5 btn-cartoon-purple text-purple-950 text-xs font-black gap-1.5"
        >
          <ShoppingBag className="w-4 h-4 stroke-[3]" />
          Cửa Hàng 🎒
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { playSound('click'); onGoToReference(); }}
          className="w-full flex items-center justify-center py-3.5 btn-cartoon-yellow text-amber-950 text-xs font-black gap-1.5"
        >
          <BookOpen className="w-4 h-4 stroke-[3]" />
          Sổ Tay Học Tập 📖
        </motion.button>
      </div>

      {/* Danh sách chủ đề toán */}
      <div className="flex flex-col gap-3.5 z-10 max-w-sm w-full mx-auto my-1">
        {subjects.map((sub, idx) => (
          <motion.button
            key={sub.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.08, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(sub.id)}
            className={`w-full flex items-center justify-between p-3.5 ${sub.btnStyle} text-left`}
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/85 border-2 border-slate-800 rounded-xl p-2 flex items-center justify-center">
                {sub.icon}
              </div>
              <div>
                <h3 className="font-black text-sm tracking-wide flex items-center gap-1.5">
                  {sub.title}
                  <span>{sub.emoji}</span>
                </h3>
                <p className="text-[11px] font-bold opacity-80 mt-0.5 leading-snug">
                  {sub.desc}
                </p>
              </div>
            </div>
            
            <div className="bg-white/60 hover:bg-white border-2 border-slate-800 rounded-full w-7 h-7 flex items-center justify-center">
              <span className="font-extrabold text-xs text-slate-800">👉</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Thành tích chân trang */}
      <div className="text-center z-10 mt-auto pt-2">
        <div className="inline-flex items-center gap-1 bg-white/40 border border-slate-300 rounded-full px-4 py-1">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-[10px] font-bold text-slate-700">
            Sao tích luỹ: <strong className="text-amber-700">{totalStars} ⭐️</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
