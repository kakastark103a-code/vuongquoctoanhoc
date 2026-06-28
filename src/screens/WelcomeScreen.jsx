import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import MascotRenderer, { BASE_MASCOTS } from '../components/MascotRenderer';
import { playSound } from '../utils/soundEffects';

export default function WelcomeScreen({ onSubmit }) {
  const [name, setName] = useState('');
  const [selectedMascot, setSelectedMascot] = useState('knight');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError('Bé hãy nhập tên của mình vào nhé!');
      playSound('wrong');
      return;
    }
    if (cleanName.length > 12) {
      setError('Tên dài quá rồi bé ơi! Hãy nhập dưới 12 ký tự nhé.');
      playSound('wrong');
      return;
    }

    playSound('click');
    onSubmit({
      name: cleanName,
      mascot: selectedMascot
    });
  };

  const selectMascot = (mascotId) => {
    playSound('click');
    setSelectedMascot(mascotId);
    setError('');
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-6 overflow-y-auto bg-gradient-to-b from-sky-100 to-indigo-200">
      
      {/* Khối lời chào */}
      <div className="text-center z-10 my-2">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-5xl mb-2.5 inline-block drop-shadow-sm"
        >
          🏰
        </motion.div>
        <h1 className="font-extrabold text-2xl text-slate-800 tracking-wide uppercase drop-shadow-sm">
          Chào Mừng Bé!
        </h1>
        <p className="text-xs font-bold text-slate-500 mt-1 max-w-[280px] mx-auto leading-relaxed">
          Bé hãy nhập tên và chọn người bạn đồng hành cùng leo lên đỉnh Vương Quốc Toán Học nhé!
        </p>
      </div>

      {/* Form điền thông tin */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center gap-6 max-w-sm w-full mx-auto z-10">
        
        {/* Input Nhập tên */}
        <div className="flex flex-col gap-2">
          <label className="font-black text-xs text-slate-700 uppercase tracking-wider pl-1">
            Tên Của Hiệp Sĩ Nhí:
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Nhập biệt danh của bé..."
              maxLength={12}
              className="w-full py-3.5 px-5 text-base font-black text-slate-800 bg-white border-3 border-slate-800 rounded-2xl outline-none placeholder:text-slate-400 placeholder:font-bold focus:border-indigo-600 transition-colors shadow-inner"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl pointer-events-none">
              ✏️
            </span>
          </div>
          
          {/* Thông báo lỗi động */}
          {error && (
            <motion.p 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xs font-bold text-rose-600 pl-1 mt-0.5"
            >
              ⚠️ {error}
            </motion.p>
          )}
        </div>

        {/* Khối chọn Linh vật */}
        <div className="flex flex-col gap-2.5">
          <label className="font-black text-xs text-slate-700 uppercase tracking-wider pl-1 flex items-center gap-1">
            <span>Chọn Bạn Đồng Hành:</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
          </label>

          <div className="grid grid-cols-3 gap-2.5">
            {Object.values(BASE_MASCOTS).map((mascotItem) => {
              const isSelected = selectedMascot === mascotItem.id;
              
              return (
                <motion.button
                  key={mascotItem.id}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => selectMascot(mascotItem.id)}
                  className={`flex flex-col items-center p-3 rounded-2xl border-3 transition-all ${
                    isSelected 
                      ? 'bg-white border-slate-800 shadow-[0_4px_0_0_#1e293b] translate-y-[-2px]' 
                      : 'bg-white/60 border-slate-300 hover:border-slate-400 text-slate-500'
                  }`}
                >
                  {/* Preview linh vật động nhỏ */}
                  <MascotRenderer 
                    mascot={mascotItem.id} 
                    size="sm" 
                    status={isSelected ? 'happy' : 'idle'}
                  />
                  
                  <span className={`text-[10px] font-black text-center mt-2.5 leading-tight ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>
                    {mascotItem.name.includes("Sư Tử") ? "Sư Tử" : mascotItem.name.split(" ")[0]}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <p className="text-[10px] font-bold text-slate-400 text-center italic mt-1">
            (Bé có thể đổi bạn đồng hành khác ở Trang chủ bất cứ lúc nào)
          </p>
        </div>

        {/* Nút bắt đầu */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 mt-2 btn-cartoon-orange text-amber-950 font-black text-base flex items-center justify-center gap-2"
        >
          <span>Khám Phá Vương Quốc</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </motion.button>

      </form>

      {/* Hướng dẫn cài đặt Phím tắt MH chính (PWA Guide) */}
      <div className="z-10 bg-indigo-50/70 border border-dashed border-indigo-200 rounded-2xl p-3 text-left max-w-sm w-full mx-auto my-3">
        <h4 className="font-black text-[10px] text-indigo-950 flex items-center gap-1.5 leading-none">
          📲 Cài đặt ứng dụng về màn hình chính:
        </h4>
        <p className="text-[9px] font-bold text-slate-500 mt-1.5 leading-normal">
          • <strong>iPhone (Safari)</strong>: Nhấp nút chia sẻ <span className="bg-white px-1 py-0.5 rounded border border-slate-300 font-extrabold text-[8px]">📤</span> ➡️ Chọn <strong>"Thêm vào MH chính"</strong>.
          <br />
          • <strong>Android (Chrome)</strong>: Bấm nút ba chấm <strong className="font-extrabold">⋮</strong> ở góc trên ➡️ Chọn <strong>"Thêm vào màn hình chính"</strong>.
        </p>
      </div>

      {/* Trang trí chân trang */}
      <div className="text-center text-[8px] font-extrabold text-slate-400/50 z-10 pt-4 border-t border-slate-200/50 max-w-[200px] mx-auto select-none uppercase tracking-widest">
        © 2026 TruongPhan
      </div>

    </div>
  );
}
