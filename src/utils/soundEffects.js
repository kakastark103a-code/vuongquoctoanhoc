let audioCtx = null;
let soundEnabled = true;

// Khôi phục thiết lập hiệu ứng âm thanh (SFX)
const savedSound = localStorage.getItem('sound_enabled');
if (savedSound !== null) {
  soundEnabled = savedSound === 'true';
}

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
  localStorage.setItem('sound_enabled', enabled ? 'true' : 'false');
};

export const getSoundEnabled = () => {
  return soundEnabled;
};

// ==========================================
// CẤU HÌNH NHẠC NỀN (BGM)
// ==========================================
let bgmAudio = null;
let bgmEnabled = true;
let bgmVolume = 0.3; // Mặc định âm lượng nhạc nền vừa phải
let currentBgmTrack = 'track1';

export const BGM_TRACKS = {
  track1: {
    name: 'Vương Quốc Vui Vẻ 🏰',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  track2: {
    name: 'Đường Đua Toán Học 🏎️',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  track3: {
    name: 'Giấc Mơ Ngôi Sao 🌟',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  }
};

export const initBgm = () => {
  if (typeof window === 'undefined') return;
  if (!bgmAudio) {
    bgmAudio = new Audio();
    bgmAudio.loop = true;
    
    // Khôi phục tùy chỉnh BGM từ LocalStorage
    const savedVolume = localStorage.getItem('bgm_volume');
    if (savedVolume !== null) {
      bgmVolume = parseFloat(savedVolume);
    }
    const savedBgmEnabled = localStorage.getItem('bgm_enabled');
    if (savedBgmEnabled !== null) {
      bgmEnabled = savedBgmEnabled === 'true';
    }
    const savedTrack = localStorage.getItem('bgm_track');
    if (savedTrack && BGM_TRACKS[savedTrack]) {
      currentBgmTrack = savedTrack;
    }
    
    bgmAudio.volume = bgmVolume;
    bgmAudio.src = BGM_TRACKS[currentBgmTrack].url;
  }
};

export const playBgm = () => {
  initBgm();
  if (!bgmEnabled || !bgmAudio) return;
  
  bgmAudio.play().catch(err => {
    console.warn("Chưa tương tác với trang để tự động phát nhạc:", err);
  });
};

export const pauseBgm = () => {
  if (bgmAudio) {
    bgmAudio.pause();
  }
};

export const setBgmEnabled = (enabled) => {
  bgmEnabled = enabled;
  localStorage.setItem('bgm_enabled', enabled ? 'true' : 'false');
  if (enabled) {
    playBgm();
  } else {
    pauseBgm();
  }
};

export const getBgmEnabled = () => bgmEnabled;

export const setBgmVolume = (volume) => {
  bgmVolume = volume;
  localStorage.setItem('bgm_volume', volume.toString());
  if (bgmAudio) {
    bgmAudio.volume = volume;
  }
};

export const getBgmVolume = () => bgmVolume;

export const changeBgmTrack = (trackId) => {
  if (!BGM_TRACKS[trackId]) return;
  currentBgmTrack = trackId;
  localStorage.setItem('bgm_track', trackId);
  
  if (bgmAudio) {
    const wasPlaying = !bgmAudio.paused;
    bgmAudio.src = BGM_TRACKS[trackId].url;
    if (wasPlaying && bgmEnabled) {
      playBgm();
    }
  }
};

export const getCurrentBgmTrack = () => currentBgmTrack;

// ==========================================
// THIẾT LẬP HIỆU ỨNG ÂM THANH DỘNG (SFX)
// ==========================================
const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playSound = (type) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'correct') {
      // Ding ding sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'wrong') {
      // Buzz sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.25);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'click') {
      // Tiny pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'win') {
      // Chime arpeggio
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    }
  } catch (err) {
    console.error("Lỗi phát âm thanh:", err);
  }
};
