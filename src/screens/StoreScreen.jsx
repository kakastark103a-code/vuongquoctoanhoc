import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Check, ShoppingBag, X } from 'lucide-react';
import MascotRenderer, { SHOP_ITEMS } from '../components/MascotRenderer';
import { playSound } from '../utils/soundEffects';

export default function StoreScreen({ 
  mascot, 
  stars, 
  unlockedSkins = [], 
  equippedSkins = [], 
  onBuyItem, 
  onToggleEquip, 
  onClose 
}) {
  const [activeTab, setActiveTab] = React.useState('accessory'); // 'accessory' | 'clothing' | 'color'

  const handleBuy = (item) => {
    if (stars >= item.cost) {
      onBuyItem(item.id, item.cost);
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  const handleToggle = (itemId) => {
    playSound('click');
    onToggleEquip(itemId);
  };

  const handleBack = () => {
    playSound('click');
    onClose();
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 py-5 overflow-y-auto bg-gradient-to-b from-purple-100 to-indigo-200">
      
      {/* Header riêng của Store */}
      <div className="flex items-center justify-between mb-4 z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center btn-cartoon-white"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700 stroke-[3]" />
        </motion.button>

        <h2 className="font-black text-xl text-indigo-950 uppercase tracking-wide">
          Cửa Hàng 🎒
        </h2>

        {/* Điểm sao */}
        <div className="flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 px-3 py-1.5 rounded-full">
          <Star className="w-4 h-4 text-amber-500 fill-amber-400 stroke-[2.5]" />
          <span className="font-extrabold text-amber-700 text-sm">{stars}</span>
        </div>
      </div>

      {/* Live Preview linh vật đang thử trang phục */}
      <div className="z-10 bg-white/70 border-3 border-slate-800 rounded-3xl p-4 flex flex-col items-center justify-center gap-2 mb-4 relative shadow-sm">
        
        {/* Nhãn giới thiệu */}
        <span className="absolute top-2 left-3 text-[10px] font-black uppercase text-indigo-500 tracking-wide bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
          Thử Đồ 👗
        </span>

        <MascotRenderer 
          mascot={mascot} 
          equippedSkins={equippedSkins} 
          size="lg" 
          status="idle" 
        />
        
        <div className="text-center">
          <h4 className="font-extrabold text-slate-800 text-xs">Bạn Đồng Hành Của Bé</h4>
          <p className="text-[9px] font-bold text-slate-400 mt-0.5">
            Các trang phục đang trang bị sẽ hiển thị trực tiếp khi làm bài toán!
          </p>
        </div>
      </div>

      {/* Tabs Phân Loại Trang Phục */}
      <div className="z-10 grid grid-cols-3 gap-2 bg-indigo-50 border-3 border-slate-800 p-1 rounded-2xl mb-4 shadow-sm">
        <button
          type="button"
          onClick={() => { playSound('click'); setActiveTab('accessory'); }}
          className={`py-2 text-[10px] font-black rounded-xl transition-all border-2 ${
            activeTab === 'accessory' 
              ? 'bg-indigo-600 text-white border-indigo-800 shadow-[0_2px_0_0_#3730a3]' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-[0_2px_0_0_#e2e8f0]'
          }`}
        >
          Trang Bị 🎒
        </button>
        <button
          type="button"
          onClick={() => { playSound('click'); setActiveTab('clothing'); }}
          className={`py-2 text-[10px] font-black rounded-xl transition-all border-2 ${
            activeTab === 'clothing' 
              ? 'bg-indigo-600 text-white border-indigo-800 shadow-[0_2px_0_0_#3730a3]' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-[0_2px_0_0_#e2e8f0]'
          }`}
        >
          Quần Áo 👕
        </button>
        <button
          type="button"
          onClick={() => { playSound('click'); setActiveTab('color'); }}
          className={`py-2 text-[10px] font-black rounded-xl transition-all border-2 ${
            activeTab === 'color' 
              ? 'bg-indigo-600 text-white border-indigo-800 shadow-[0_2px_0_0_#3730a3]' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-[0_2px_0_0_#e2e8f0]'
          }`}
        >
          Màu Lông 🎨
        </button>
      </div>

      {/* Danh sách vật phẩm bán */}
      <div className="flex-1 flex flex-col gap-3.5 z-10 max-w-sm w-full mx-auto overflow-y-auto pr-1 mb-4">
        {SHOP_ITEMS.filter(item => item.category === activeTab).map((item) => {
          const isUnlocked = unlockedSkins.includes(item.id);
          const isEquipped = equippedSkins.includes(item.id);
          const canAfford = stars >= item.cost;
          const isWrongMascot = item.category === 'clothing' && item.targetMascot !== mascot;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-3 border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-inner"
            >
              {/* Icon vật phẩm & Thông tin */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 border-2 border-slate-800 rounded-xl flex items-center justify-center text-2xl select-none">
                  {item.emoji}
                </div>
                <div className="text-left">
                  <h4 className="font-black text-xs text-slate-800 tracking-wide">
                    {item.name}
                  </h4>
                  <p className="text-[9px] font-bold text-slate-400 leading-snug mt-0.5 max-w-[150px]">
                    {item.desc}
                  </p>
                  
                  {/* Hiển thị giá sao nếu chưa mua */}
                  {!isUnlocked && (
                    <div className="flex items-center gap-0.5 text-amber-700 font-extrabold text-[10px] mt-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span>{item.cost} Sao</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Cụm Nút Hành Động */}
              <div>
                {isWrongMascot ? (
                  // Không đúng linh vật đang chọn -> Khóa hoàn toàn (cả Mua và Trang bị)
                  <button
                    disabled
                    className="px-2.5 py-2 bg-slate-100 text-slate-400 border-2 border-slate-300 text-[9px] font-black rounded-lg cursor-not-allowed leading-tight"
                  >
                    {item.targetMascot === 'knight' && 'Cho Sư Tử 🦁'}
                    {item.targetMascot === 'princess' && 'Cho Thỏ Elsa 🐰'}
                    {item.targetMascot === 'spiderman' && 'Cho Khỉ Nhện 🐵'}
                  </button>
                ) : isUnlocked ? (
                  isEquipped ? (
                    // Đã trang bị -> Bấm tháo ra
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggle(item.id)}
                      className="px-3 py-2 btn-cartoon-white border-2 text-[10px] font-black flex items-center gap-1 hover:bg-rose-50 text-rose-600 border-rose-400 shadow-[0_2.5px_0_0_#ef4444]"
                    >
                      <X className="w-3 h-3 stroke-[3]" />
                      Tháo Ra
                    </motion.button>
                  ) : (
                    // Đã mua nhưng chưa trang bị -> Bấm trang bị
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggle(item.id)}
                      className="px-3 py-2 btn-cartoon-green text-emerald-950 text-[10px] font-black flex items-center gap-1 border-2 border-slate-800 shadow-[0_2.5px_0_0_#15803d]"
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                      Trang Bị
                    </motion.button>
                  )
                ) : (
                  // Chưa mua -> Bấm mua
                  <motion.button
                    whileTap={canAfford ? { scale: 0.95 } : {}}
                    disabled={!canAfford}
                    onClick={() => handleBuy(item)}
                    className={`px-3 py-2 text-[10px] font-black flex items-center gap-1 border-2 border-slate-800 shadow-[0_2.5px_0_0_#c2410c] ${
                      canAfford 
                        ? 'btn-cartoon-orange text-amber-950 cursor-pointer' 
                        : 'bg-slate-200 text-slate-400 border-slate-400 shadow-none cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
                    Mua Đồ
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nút Đóng */}
      <div className="z-10 w-full max-w-sm mx-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBack}
          className="w-full py-3.5 btn-cartoon-purple text-purple-950 font-black text-sm"
        >
          Xong & Trở Về Trang Chủ 🏠
        </motion.button>
      </div>

    </div>
  );
}
