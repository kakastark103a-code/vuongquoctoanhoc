import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Calculator, Scale, Triangle as TriangleIcon } from 'lucide-react';
import { playSound } from '../utils/soundEffects';

export default function ReferenceScreen({ onClose }) {
  const [activeTab, setActiveTab] = useState('tables'); // 'tables' | 'conversions' | 'geometry'
  const [selectedNum, setSelectedNum] = useState(2); // For multiplication/division tables (2-9)
  
  // Custom converter state
  const [convVal, setConvVal] = useState('1');
  const [convType, setConvType] = useState('length'); // 'length' | 'mass' | 'area' | 'volume' | 'time'

  // Time converter states
  const [hoursVal, setHoursVal] = useState('1');
  const [minutesVal, setMinutesVal] = useState('15');

  const handleBack = () => {
    playSound('click');
    onClose();
  };

  const handleSelectTab = (tab) => {
    playSound('click');
    setActiveTab(tab);
  };

  const handleSelectNum = (num) => {
    playSound('click');
    setSelectedNum(num);
  };

  // Logic tính toán quy đổi
  const getLengthConversion = (val) => {
    const num = parseFloat(val) || 0;
    return {
      m: num,
      dm: num * 10,
      cm: num * 100,
      mm: num * 1000,
      km: num / 1000,
    };
  };

  const getMassConversion = (val) => {
    const num = parseFloat(val) || 0;
    return {
      kg: num,
      g: num * 1000,
      yen: num / 10,
      ta: num / 100,
      tan: num / 1000,
    };
  };

  const getAreaConversion = (val) => {
    const num = parseFloat(val) || 0;
    return {
      m2: num,
      dm2: num * 100,
      cm2: num * 10000,
      mm2: num * 1000000,
      km2: num / 1000000,
    };
  };

  const getVolumeConversion = (val) => {
    const num = parseFloat(val) || 0;
    return {
      m3: num,
      dm3: num * 1000,
      lit: num * 1000, // 1 dm3 = 1 lit
      cm3: num * 1000000,
    };
  };

  const lenResult = getLengthConversion(convVal);
  const massResult = getMassConversion(convVal);
  const areaResult = getAreaConversion(convVal);
  const volResult = getVolumeConversion(convVal);

  const totalMinutes = (parseInt(hoursVal) || 0) * 60 + (parseInt(minutesVal) || 0);

  return (
    <div className="flex-1 flex flex-col px-5 py-5 overflow-y-auto bg-gradient-to-b from-indigo-100 via-sky-100 to-emerald-50 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center btn-cartoon-white"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700 stroke-[3]" />
        </motion.button>

        <h2 className="font-black text-lg text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
          Sổ Tay Toán Học <BookOpen className="w-5 h-5 text-indigo-600" />
        </h2>

        <div className="w-10 h-10 opacity-0" /> {/* Spacer */}
      </div>

      {/* Segment Tabs */}
      <div className="z-10 grid grid-cols-3 gap-1.5 bg-slate-800/5 p-1 border-3 border-slate-800 rounded-2xl mb-5 shadow-sm bg-white/60">
        <button
          onClick={() => handleSelectTab('tables')}
          className={`py-2.5 text-[9px] sm:text-[10px] font-black rounded-xl transition-all border-2 flex flex-col items-center gap-1 ${
            activeTab === 'tables' 
              ? 'bg-indigo-600 text-white border-indigo-800 shadow-[0_2px_0_0_#3730a3]' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-[0_2px_0_0_#e2e8f0]'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Bảng Tính 🔢
        </button>
        <button
          onClick={() => handleSelectTab('conversions')}
          className={`py-2.5 text-[9px] sm:text-[10px] font-black rounded-xl transition-all border-2 flex flex-col items-center gap-1 ${
            activeTab === 'conversions' 
              ? 'bg-emerald-600 text-white border-emerald-800 shadow-[0_2px_0_0_#065f46]' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-[0_2px_0_0_#e2e8f0]'
          }`}
        >
          <Scale className="w-4 h-4" />
          Quy Đổi ⚖️
        </button>
        <button
          onClick={() => handleSelectTab('geometry')}
          className={`py-2.5 text-[9px] sm:text-[10px] font-black rounded-xl transition-all border-2 flex flex-col items-center gap-1 ${
            activeTab === 'geometry' 
              ? 'bg-amber-500 text-white border-amber-700 shadow-[0_2px_0_0_#b45309]' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-[0_2px_0_0_#e2e8f0]'
          }`}
        >
          <TriangleIcon className="w-4 h-4" />
          Hình Học 📐
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 z-10 max-w-md w-full mx-auto pb-6">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: BẢNG CỬU CHƯƠNG NHÂN CHIA */}
          {activeTab === 'tables' && (
            <motion.div
              key="tables"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4"
            >
              {/* Chọn số cửu chương */}
              <div className="bg-white border-3 border-slate-800 rounded-2xl p-3 shadow-sm text-center">
                <span className="text-[10px] font-black uppercase text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                  Chọn Bảng Cửu Chương
                </span>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleSelectNum(num)}
                      className={`py-2 font-black text-sm rounded-xl border-2 transition-all ${
                        selectedNum === num
                          ? 'bg-indigo-500 text-white border-indigo-800 shadow-[0_2.5px_0_0_#3730a3] scale-95'
                          : 'bg-indigo-50 text-indigo-950 border-indigo-200 hover:bg-indigo-100 shadow-[0_2.5px_0_0_#c7d2fe]'
                      }`}
                    >
                      Số {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bảng nhân & Bảng chia song song */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Bảng Nhân */}
                <div className="bg-amber-50 border-3 border-slate-800 rounded-3xl p-3.5 shadow-sm flex flex-col items-center">
                  <h3 className="font-black text-xs text-amber-950 mb-3 bg-amber-200/60 border-2 border-amber-300 px-3 py-1 rounded-full text-center w-full">
                    Bảng Nhân {selectedNum} ✖️
                  </h3>
                  <div className="flex flex-col gap-1.5 w-full">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const multiplier = i + 1;
                      return (
                        <div 
                          key={i} 
                          className="flex justify-between items-center text-xs font-black text-amber-900 bg-white/70 border border-amber-200 px-3 py-1.5 rounded-xl"
                        >
                          <span>{selectedNum} x {multiplier}</span>
                          <span className="text-amber-600 font-extrabold text-[13px]">= {selectedNum * multiplier}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bảng Chia */}
                <div className="bg-sky-50 border-3 border-slate-800 rounded-3xl p-3.5 shadow-sm flex flex-col items-center">
                  <h3 className="font-black text-xs text-sky-950 mb-3 bg-sky-200/60 border-2 border-sky-300 px-3 py-1 rounded-full text-center w-full">
                    Bảng Chia {selectedNum} ➗
                  </h3>
                  <div className="flex flex-col gap-1.5 w-full">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const quotient = i + 1;
                      const dividend = selectedNum * quotient;
                      return (
                        <div 
                          key={i} 
                          className="flex justify-between items-center text-xs font-black text-sky-900 bg-white/70 border border-sky-200 px-3 py-1.5 rounded-xl"
                        >
                          <span>{dividend} : {selectedNum}</span>
                          <span className="text-sky-600 font-extrabold text-[13px]">= {quotient}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: QUY ĐỔI ĐƠN VỊ ĐO */}
          {activeTab === 'conversions' && (
            <motion.div
              key="conversions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4 text-left"
            >
              {/* Chuyển loại quy đổi - Hỗ trợ cả 5 nhóm đo lường */}
              <div className="flex flex-wrap gap-1.5 bg-emerald-50 border-3 border-slate-800 p-1.5 rounded-2xl shadow-inner justify-center">
                {[
                  { id: 'length', label: 'Độ Dài 📏' },
                  { id: 'mass', label: 'Khối Lượng ⚖️' },
                  { id: 'area', label: 'Diện Tích 🟩' },
                  { id: 'volume', label: 'Thể Tích 📦' },
                  { id: 'time', label: 'Thời Gian ⏰' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { playSound('click'); setConvType(opt.id); }}
                    className={`px-3 py-1.5 text-[9px] font-black rounded-lg transition-all border ${
                      convType === opt.id 
                        ? 'bg-emerald-600 text-white border-emerald-800 shadow-sm' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Bảng đơn vị đo */}
              <div className="bg-white border-3 border-slate-800 rounded-3xl p-4 shadow-sm">
                <h3 className="font-black text-xs text-slate-800 mb-3 border-b-2 border-slate-100 pb-2">
                  Bảng Đơn Vị Sắp Xếp Từ Lớn Đến Bé
                </h3>
                
                {convType === 'length' && (
                  <div>
                    {/* Thước kẻ mô tả */}
                    <div className="flex justify-between items-center bg-teal-50 border border-teal-200 p-2.5 rounded-xl gap-1 text-[9px] font-black text-teal-800 select-none overflow-x-auto">
                      <span>km</span> ➡️ <span>hm</span> ➡️ <span>dam</span> ➡️ <span className="bg-teal-200/70 px-1.5 py-0.5 rounded text-teal-900">m</span> ➡️ <span>dm</span> ➡️ <span>cm</span> ➡️ <span>mm</span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 mt-2 text-center">
                      * Hai đơn vị đo độ dài liền kề hơn (kém) nhau 10 lần
                    </p>
                  </div>
                )}

                {convType === 'mass' && (
                  <div>
                    {/* Hộp cân nặng mô tả */}
                    <div className="flex justify-between items-center bg-orange-50 border border-orange-200 p-2.5 rounded-xl gap-1 text-[9px] font-black text-orange-800 select-none overflow-x-auto">
                      <span>Tấn</span> ➡️ <span>Tạ</span> ➡️ <span>Yến</span> ➡️ <span className="bg-orange-200/70 px-1.5 py-0.5 rounded text-orange-900">kg</span> ➡️ <span>hg</span> ➡️ <span>indigo</span> ➡️ <span>g</span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 mt-2 text-center">
                      * Hai đơn vị đo khối lượng liền kề hơn (kém) nhau 10 lần
                    </p>
                  </div>
                )}

                {convType === 'area' && (
                  <div>
                    {/* Bảng diện tích mô tả */}
                    <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl gap-1 text-[9px] font-black text-emerald-800 select-none overflow-x-auto">
                      <span>km²</span> ➡️ <span>hm²</span> ➡️ <span>dam²</span> ➡️ <span className="bg-emerald-200/70 px-1.5 py-0.5 rounded text-emerald-900">m²</span> ➡️ <span>dm²</span> ➡️ <span>cm²</span> ➡️ <span>mm²</span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 mt-2 text-center">
                      * Hai đơn vị đo diện tích liền kề hơn (kém) nhau 100 lần
                    </p>
                  </div>
                )}

                {convType === 'volume' && (
                  <div>
                    {/* Bảng thể tích mô tả */}
                    <div className="flex justify-between items-center bg-sky-50 border border-sky-200 p-2.5 rounded-xl gap-3 text-[9px] font-black text-sky-800 select-none justify-center">
                      <span>m³</span> ➡️ <span>dm³ (Lít)</span> ➡️ <span>cm³</span>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 p-2 rounded-xl mt-2 text-[9px] font-black text-indigo-800 text-center">
                      💡 Hai đơn vị thể tích liền kề hơn (kém) nhau 1000 lần.<br/>
                      🌟 Đặc biệt: <strong>1 dm³ = 1 Lít nước</strong>
                    </div>
                  </div>
                )}

                {convType === 'time' && (
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-black text-slate-700 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200">
                    <div>⏱️ 1 thế kỷ = 100 năm</div>
                    <div>📅 1 năm = 12 tháng</div>
                    <div>🗓️ 1 tuần = 7 ngày</div>
                    <div>☀️ 1 ngày = 24 giờ</div>
                    <div>⏰ 1 giờ = 60 phút</div>
                    <div>⏳ 1 phút = 60 giây</div>
                  </div>
                )}
              </div>

              {/* Trình đổi thử tương tác */}
              <div className="bg-emerald-50 border-3 border-slate-800 rounded-3xl p-4 shadow-sm">
                {convType !== 'time' ? (
                  <>
                    <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                      Bé Đổi Thử Xem Nào
                    </span>

                    <div className="flex items-center gap-2.5 mt-3">
                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-slate-400 mb-1">
                          Nhập số lượng
                        </label>
                        <input
                          type="number"
                          value={convVal}
                          onChange={(e) => setConvVal(e.target.value)}
                          placeholder="Số..."
                          className="w-full bg-white border-2 border-slate-800 rounded-xl px-3 py-2 text-sm font-black focus:outline-none focus:ring-2 focus:ring-emerald-400 text-center"
                        />
                      </div>
                      
                      <div className="flex-[2] flex flex-col justify-end h-full">
                        <span className="text-[10px] font-black text-emerald-950 mt-4 text-center">
                          {convType === 'length' && 'Mét (m)'}
                          {convType === 'mass' && 'Kilôgam (kg)'}
                          {convType === 'area' && 'Mét vuông (m²)'}
                          {convType === 'volume' && 'Mét khối (m³)'}
                        </span>
                      </div>
                    </div>

                    {/* Kết quả quy đổi nhanh */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {convType === 'length' && (
                        <>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Kilômét (km)</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{lenResult.km} km</h4>
                          </div>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Đềximét (dm)</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{lenResult.dm} dm</h4>
                          </div>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Centimét (cm)</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{lenResult.cm} cm</h4>
                          </div>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Milimét (mm)</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{lenResult.mm} mm</h4>
                          </div>
                        </>
                      )}

                      {convType === 'mass' && (
                        <>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Tấn</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{massResult.tan} tấn</h4>
                          </div>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Tạ</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{massResult.ta} tạ</h4>
                          </div>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Yến</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{massResult.yen} yến</h4>
                          </div>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Gam (g)</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{massResult.g} g</h4>
                          </div>
                        </>
                      )}

                      {convType === 'area' && (
                        <>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center col-span-2">
                            <span className="text-[8px] font-bold text-slate-400">Kilômét vuông (km²)</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{areaResult.km2} km²</h4>
                          </div>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Đềximét vuông (dm²)</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{areaResult.dm2} dm²</h4>
                          </div>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Centimét vuông (cm²)</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{areaResult.cm2} cm²</h4>
                          </div>
                        </>
                      )}

                      {convType === 'volume' && (
                        <>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Đềximét khối (dm³)</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{volResult.dm3} dm³</h4>
                          </div>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center">
                            <span className="text-[8px] font-bold text-slate-400">Số Lít Nước (Lít)</span>
                            <h4 className="font-black text-xs text-indigo-700 mt-0.5">{volResult.lit} lít</h4>
                          </div>
                          <div className="bg-white/80 border border-slate-200 p-2 rounded-xl text-center col-span-2">
                            <span className="text-[8px] font-bold text-slate-400">Centimét khối (cm³)</span>
                            <h4 className="font-black text-xs text-emerald-700 mt-0.5">{volResult.cm3} cm³</h4>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                      ⏰ Đồng Hồ Kỳ Diệu (Đổi Thời Gian)
                    </span>

                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1">
                        <label className="block text-[8px] font-bold text-slate-400 mb-0.5 text-center">Giờ</label>
                        <input
                          type="number"
                          value={hoursVal}
                          onChange={(e) => setHoursVal(e.target.value)}
                          className="w-full bg-white border-2 border-slate-800 rounded-xl px-2 py-1.5 text-xs font-black text-center focus:outline-none"
                        />
                      </div>
                      <span className="font-black text-xs text-slate-700 mt-3">:</span>
                      <div className="flex-1">
                        <label className="block text-[8px] font-bold text-slate-400 mb-0.5 text-center">Phút</label>
                        <input
                          type="number"
                          value={minutesVal}
                          onChange={(e) => setMinutesVal(e.target.value)}
                          className="w-full bg-white border-2 border-slate-800 rounded-xl px-2 py-1.5 text-xs font-black text-center focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="bg-white border-2 border-slate-800 p-3 rounded-2xl mt-4 text-center shadow-sm">
                      <span className="text-[8px] font-bold text-slate-400 block">Quy đổi ra Phút</span>
                      <h4 className="font-black text-sm text-indigo-700 mt-0.5">
                        = {totalMinutes} phút
                      </h4>
                      <p className="text-[8px] font-bold text-slate-400 mt-0.5">
                        ({hoursVal} giờ x 60 + {minutesVal} phút)
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: HÌNH HỌC TIỂU HỌC */}
          {activeTab === 'geometry' && (
            <motion.div
              key="geometry"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-3.5"
            >
              
              {/* Hình Vuông */}
              <div className="bg-white border-3 border-slate-800 rounded-3xl p-3.5 shadow-sm flex items-start gap-3.5">
                <div className="w-12 h-12 bg-amber-100 border-2 border-slate-800 rounded-2xl flex items-center justify-center font-black text-amber-600 text-lg">
                  🟨
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-black text-xs text-slate-800">Hình Vuông (Cạnh: a)</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-amber-50/50 p-2 rounded-xl border border-amber-200">
                      <span className="text-[9px] font-bold text-slate-400 block">Chu vi (P)</span>
                      <span className="font-black text-[11px] text-amber-800">P = a x 4</span>
                    </div>
                    <div className="bg-amber-50/50 p-2 rounded-xl border border-amber-200">
                      <span className="text-[9px] font-bold text-slate-400 block">Diện tích (S)</span>
                      <span className="font-black text-[11px] text-amber-800">S = a x a</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hình Chữ Nhật */}
              <div className="bg-white border-3 border-slate-800 rounded-3xl p-3.5 shadow-sm flex items-start gap-3.5">
                <div className="w-12 h-12 bg-emerald-100 border-2 border-slate-800 rounded-2xl flex items-center justify-center font-black text-emerald-600 text-lg">
                  🟩
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-black text-xs text-slate-800">Hình Chữ Nhật (Dài: a, Rộng: b)</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-emerald-50/50 p-2 rounded-xl border border-emerald-200">
                      <span className="text-[9px] font-bold text-slate-400 block">Chu vi (P)</span>
                      <span className="font-black text-[11px] text-emerald-800">P = (a + b) x 2</span>
                    </div>
                    <div className="bg-emerald-50/50 p-2 rounded-xl border border-emerald-200">
                      <span className="text-[9px] font-bold text-slate-400 block">Diện tích (S)</span>
                      <span className="font-black text-[11px] text-emerald-800">S = a x b</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hình Tam Giác */}
              <div className="bg-white border-3 border-slate-800 rounded-3xl p-3.5 shadow-sm flex items-start gap-3.5">
                <div className="w-12 h-12 bg-pink-100 border-2 border-slate-800 rounded-2xl flex items-center justify-center font-black text-pink-600 text-lg">
                  🔺
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-black text-xs text-slate-800">Hình Tam Giác (Cạnh: a, b, c. Cao: h)</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-pink-50/50 p-2 rounded-xl border border-pink-200">
                      <span className="text-[9px] font-bold text-slate-400 block">Chu vi (P)</span>
                      <span className="font-black text-[11px] text-pink-800">P = a + b + c</span>
                    </div>
                    <div className="bg-pink-50/50 p-2 rounded-xl border border-pink-200">
                      <span className="text-[9px] font-bold text-slate-400 block">Diện tích (S)</span>
                      <span className="font-black text-[11px] text-pink-800">S = (a x h) : 2</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hình Tròn */}
              <div className="bg-white border-3 border-slate-800 rounded-3xl p-3.5 shadow-sm flex items-start gap-3.5">
                <div className="w-12 h-12 bg-indigo-100 border-2 border-slate-800 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-lg">
                  🔴
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-black text-xs text-slate-800">Hình Tròn (Bán kính: r, Đường kính: d)</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-indigo-50/50 p-2 rounded-xl border border-indigo-200">
                      <span className="text-[9px] font-bold text-slate-400 block">Chu vi (C)</span>
                      <span className="font-black text-[10px] text-indigo-800">C = d x 3.14</span>
                    </div>
                    <div className="bg-indigo-50/50 p-2 rounded-xl border border-indigo-200">
                      <span className="text-[9px] font-bold text-slate-400 block">Diện tích (S)</span>
                      <span className="font-black text-[10px] text-indigo-800">S = r x r x 3.14</span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
