import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Volume2, VolumeX, Music, Settings, Info } from 'lucide-react';
import { 
  playSound, 
  getSoundEnabled, 
  setSoundEnabled, 
  getBgmEnabled, 
  setBgmEnabled, 
  getBgmVolume, 
  setBgmVolume, 
  getCurrentBgmTrack, 
  changeBgmTrack,
  BGM_TRACKS 
} from '../utils/soundEffects';

export default function SettingsModal({ onClose }) {
  const [sfxOn, setSfxOn] = useState(getSoundEnabled());
  const [bgmOn, setBgmOn] = useState(getBgmEnabled());
  const [volume, setVolume] = useState(getBgmVolume());
  const [selectedTrack, setSelectedTrack] = useState(getCurrentBgmTrack());

  const handleClose = () => {
    playSound('click');
    onClose();
  };

  const handleToggleSfx = () => {
    const newState = !sfxOn;
    setSfxOn(newState);
    setSoundEnabled(newState);
    playSound('click');
  };

  const handleToggleBgm = () => {
    const newState = !bgmOn;
    setBgmOn(newState);
    setBgmEnabled(newState);
    playSound('click');
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setBgmVolume(val);
  };

  const handleTrackSelect = (trackId) => {
    setSelectedTrack(trackId);
    changeBgmTrack(trackId);
    playSound('click');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="card-cartoon max-w-sm w-full bg-white p-5 relative border-4 border-slate-800 rounded-3xl"
      >
        
        {/* Nút Đóng */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="absolute -top-3.5 -right-3.5 w-9 h-9 flex items-center justify-center btn-cartoon-white border-2 border-slate-800 rounded-full"
        >
          <X className="w-5 h-5 text-slate-800 stroke-[3]" />
        </motion.button>

        {/* Tiêu đề */}
        <h2 className="font-black text-base text-slate-800 flex items-center justify-center gap-1.5 border-b-2 border-slate-100 pb-3 mb-4 uppercase">
          Cài Đặt Âm Thanh <Settings className="w-4 h-4 text-indigo-600" />
        </h2>

        <div className="flex flex-col gap-4.5 text-left">
          
          {/* 1. ÂM THANH HIỆU ỨNG (SFX) */}
          <div className="flex items-center justify-between bg-sky-50/50 border border-sky-200 p-2.5 rounded-2xl">
            <div className="flex items-center gap-2">
              {sfxOn ? <Volume2 className="w-4.5 h-4.5 text-sky-600" /> : <VolumeX className="w-4.5 h-4.5 text-slate-400" />}
              <div>
                <h4 className="font-black text-xs text-slate-800 leading-tight">Hiệu ứng âm thanh</h4>
                <p className="text-[9px] font-bold text-slate-400">Tiếng Ting-ting khi trả lời</p>
              </div>
            </div>
            
            <button
              onClick={handleToggleSfx}
              className={`w-12 h-6.5 rounded-full p-1 border-2 border-slate-800 transition-colors duration-200 relative ${
                sfxOn ? 'bg-emerald-400' : 'bg-slate-200'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-white border border-slate-800 transition-all duration-200 ${
                  sfxOn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 2. NHẠC NỀN (BGM) */}
          <div className="flex flex-col gap-3 bg-indigo-50/40 border border-indigo-200 p-3 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-4.5 h-4.5 text-indigo-600" />
                <div>
                  <h4 className="font-black text-xs text-slate-800 leading-tight">Nhạc nền vui nhộn</h4>
                  <p className="text-[9px] font-bold text-slate-400">Âm thanh vui nhộn khi chơi</p>
                </div>
              </div>
              
              <button
                onClick={handleToggleBgm}
                className={`w-12 h-6.5 rounded-full p-1 border-2 border-slate-800 transition-colors duration-200 relative ${
                  bgmOn ? 'bg-emerald-400' : 'bg-slate-200'
                }`}
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-white border border-slate-800 transition-all duration-200 ${
                    bgmOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Điều chỉnh âm lượng (Chỉ hiện khi nhạc nền bật) */}
            {bgmOn && (
              <div className="flex flex-col gap-1.5 border-t border-indigo-100/50 pt-2.5">
                <div className="flex justify-between items-center text-[9px] font-black text-indigo-900">
                  <span>ÂM LƯỢNG</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            )}
          </div>

          {/* 3. THAY ĐỔI BÀI HÁT NHẠC NỀN (BGM TRACKS) */}
          {bgmOn && (
            <div className="flex flex-col gap-2 bg-amber-50/50 border border-amber-200 p-3 rounded-2xl">
              <h4 className="font-black text-[10px] text-amber-950 uppercase tracking-wider pl-0.5">
                Chọn Bản Nhạc Nền:
              </h4>
              <div className="flex flex-col gap-1.5">
                {Object.entries(BGM_TRACKS).map(([trackId, trackInfo]) => {
                  const isActive = selectedTrack === trackId;
                  return (
                    <button
                      key={trackId}
                      onClick={() => handleTrackSelect(trackId)}
                      className={`w-full py-2 px-3 text-[10px] font-black text-left rounded-xl border transition-all ${
                        isActive
                          ? 'bg-amber-400 text-amber-950 border-amber-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {trackInfo.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dòng ghi chú nhỏ cho phụ huynh */}
          <div className="flex gap-1.5 items-start mt-1">
            <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-[8px] font-bold text-slate-400 leading-normal">
              * Phụ huynh có thể chỉnh/tắt âm thanh để bé tập trung hơn khi làm bài tập trên lớp nhé!
            </p>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
