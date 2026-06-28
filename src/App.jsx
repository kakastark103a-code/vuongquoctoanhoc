import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import StoreScreen from './screens/StoreScreen';
import ReferenceScreen from './screens/ReferenceScreen';
import { getSoundEnabled, setSoundEnabled } from './utils/soundEffects';

export default function App() {
  const [screen, setScreen] = useState('welcome'); // 'welcome' | 'home' | 'game' | 'result' | 'store' | 'reference'
  const [subject, setSubject] = useState(null); // 'multiplication' | 'division' | 'geometry' | 'conversion' | 'area'
  
  // Thông tin người chơi & linh vật
  const [name, setName] = useState('');
  const [mascot, setMascot] = useState('knight');
  const [stars, setStars] = useState(0);
  const [unlockedSkins, setUnlockedSkins] = useState([]); // Array IDs
  const [equippedSkins, setEquippedSkins] = useState([]); // Array IDs

  const [soundEnabled, setLocalSoundEnabled] = useState(true);
  const [currentScore, setCurrentScore] = useState(0);

  // Khôi phục tất cả thông tin từ LocalStorage khi khởi tạo
  useEffect(() => {
    const savedName = localStorage.getItem('math_kingdom_name');
    const savedMascot = localStorage.getItem('math_kingdom_mascot');
    const savedStars = localStorage.getItem('math_kingdom_stars');
    const savedUnlocked = localStorage.getItem('math_kingdom_unlocked_skins');
    const savedEquipped = localStorage.getItem('math_kingdom_equipped_skins');

    if (savedName) {
      setName(savedName);
      setScreen('home'); // Đã có profile thì vào thẳng Home
    } else {
      setScreen('welcome'); // Chưa có profile thì vào Welcome
    }

    if (savedMascot) setMascot(savedMascot);
    
    if (savedName === 'test123') {
      setStars(9999);
      localStorage.setItem('math_kingdom_stars', '9999');
    } else if (savedStars !== null) {
      setStars(parseInt(savedStars, 10));
    } else {
      setStars(0);
    }

    if (savedUnlocked) {
      try {
        setUnlockedSkins(JSON.parse(savedUnlocked));
      } catch (e) {
        setUnlockedSkins([]);
      }
    } else {
      setUnlockedSkins([]);
    }

    if (savedEquipped) {
      try {
        setEquippedSkins(JSON.parse(savedEquipped));
      } catch (e) {
        setEquippedSkins([]);
      }
    } else {
      setEquippedSkins([]);
    }

    setLocalSoundEnabled(getSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setLocalSoundEnabled(newState);
    setSoundEnabled(newState);
  };

  const handleSelectSubject = (selectedSub) => {
    setSubject(selectedSub);
    setScreen('game');
  };

  const handleGameFinish = (finalScore) => {
    setCurrentScore(finalScore);
    
    // Tính toán số sao thưởng: 2 sao cho mỗi câu đúng, đúng hết 10/10 thưởng thêm 10 sao
    const earnedStars = finalScore * 2 + (finalScore === 10 ? 10 : 0);
    const newTotalStars = stars + earnedStars;
    
    setStars(newTotalStars);
    localStorage.setItem('math_kingdom_stars', newTotalStars.toString());
    
    setScreen('result');
  };

  const handleReplay = () => {
    setScreen('game');
  };

  const handleGoHome = () => {
    setSubject(null);
    setScreen('home');
  };

  const handleBack = () => {
    setSubject(null);
    setScreen('home');
  };

  // Các hàm xử lý profile & Cửa hàng
  const handleSubmitProfile = ({ name: newName, mascot: newMascot }) => {
    setName(newName);
    setMascot(newMascot);
    localStorage.setItem('math_kingdom_name', newName);
    localStorage.setItem('math_kingdom_mascot', newMascot);
    
    if (newName === 'test123') {
      setStars(9999);
      localStorage.setItem('math_kingdom_stars', '9999');
    }
    
    setScreen('home');
  };

  const handleResetProfile = () => {
    // Reset thông tin nhưng vẫn giữ lại số Sao và trang phục đã mua
    localStorage.removeItem('math_kingdom_name');
    localStorage.removeItem('math_kingdom_mascot');
    setName('');
    setScreen('welcome');
  };

  const handleBuyItem = (itemId, cost) => {
    const nextStars = stars - cost;
    const nextUnlocked = [...unlockedSkins, itemId];
    
    setStars(nextStars);
    setUnlockedSkins(nextUnlocked);

    localStorage.setItem('math_kingdom_stars', nextStars.toString());
    localStorage.setItem('math_kingdom_unlocked_skins', JSON.stringify(nextUnlocked));
  };

  const handleToggleEquip = (itemId) => {
    let nextEquipped = [];
    if (equippedSkins.includes(itemId)) {
      // Đang mặc -> cởi ra
      nextEquipped = equippedSkins.filter(id => id !== itemId);
    } else {
      // Đang cởi -> mặc vào
      if (itemId.startsWith('color_')) {
        // Loại bỏ màu lông cũ khác đang mặc
        const cleanEquipped = equippedSkins.filter(id => !id.startsWith('color_'));
        nextEquipped = [...cleanEquipped, itemId];
      } else {
        nextEquipped = [...equippedSkins, itemId];
      }
    }
    setEquippedSkins(nextEquipped);
    localStorage.setItem('math_kingdom_equipped_skins', JSON.stringify(nextEquipped));
  };

  // Trang trí background bóng bay nổi cho giao diện hoạt hình
  const bubbles = Array.from({ length: 8 });

  return (
    <div className="min-h-screen w-screen bg-slate-900 flex items-center justify-center p-0 sm:p-4 overflow-hidden relative">
      
      {/* Môi trường trang trí bên ngoài điện thoại trên màn hình PC */}
      <div className="hidden lg:block absolute left-10 top-1/4 max-w-[220px] text-white/40 select-none pointer-events-none">
        <h2 className="text-3xl font-black text-white/50 tracking-wider">VƯƠNG QUỐC</h2>
        <h2 className="text-4xl font-black text-amber-400/60 tracking-wider">TOÁN HỌC</h2>
        <p className="text-xs mt-2 leading-relaxed">
          Ứng dụng học toán vui nhộn được tối ưu hóa cho màn hình di động. Bé có thể chơi trên điện thoại hoặc máy tính bảng!
        </p>
      </div>

      <div className="hidden lg:block absolute right-12 bottom-1/4 text-right max-w-[200px] text-white/40 select-none pointer-events-none">
        <span className="text-6xl">✨ 🧮 🎒</span>
        <p className="text-xs mt-3">
          Luyện tập bảng cửu chương phép nhân, phép chia và nhận diện chu vi các hình học thông dụng.
        </p>
      </div>

      {/* Bubble background bay lung tung phía sau */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {bubbles.map((_, idx) => (
          <div
            key={idx}
            className="bubble-bg"
            style={{
              width: `${Math.random() * 60 + 40}px`,
              height: `${Math.random() * 60 + 40}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Khung mô phỏng Điện thoại di động (Mobile Mockup) */}
      <div className="w-full h-full sm:h-[840px] sm:max-w-[420px] bg-white sm:rounded-[36px] sm:border-8 sm:border-slate-800 flex flex-col overflow-hidden relative shadow-2xl z-10 transition-all">
        
        {/* Notch tai thỏ giả lập trên PC */}
        <div className="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-5 bg-slate-800 rounded-b-2xl z-40"></div>
        
        {/* Header điều hướng và điểm sao - Ẩn khi ở màn hình chào mừng, Store hoặc Sổ tay */}
        {screen !== 'welcome' && screen !== 'store' && screen !== 'reference' && (
          <Header 
            onBack={handleBack} 
            stars={stars}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            showBackBtn={screen === 'game'}
          />
        )}

        {/* Nội dung màn hình thay đổi linh hoạt kèm hiệu ứng mượt mà */}
        <main className="flex-1 flex flex-col overflow-hidden bg-sky-50 relative">
          <AnimatePresence mode="wait">
            
            {screen === 'welcome' && (
              <motion.div
                key="welcome"
                className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <WelcomeScreen onSubmit={handleSubmitProfile} />
              </motion.div>
            )}

            {screen === 'home' && (
              <motion.div
                key="home"
                className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <HomeScreen 
                  name={name}
                  mascot={mascot}
                  equippedSkins={equippedSkins}
                  onSelectSubject={handleSelectSubject} 
                  totalStars={stars}
                  onGoToStore={() => setScreen('store')}
                  onResetProfile={handleResetProfile}
                  onGoToReference={() => setScreen('reference')}
                />
              </motion.div>
            )}

            {screen === 'game' && (
              <motion.div
                key="game"
                className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <GameScreen 
                  subject={subject} 
                  name={name}
                  mascot={mascot}
                  equippedSkins={equippedSkins}
                  onFinish={handleGameFinish} 
                />
              </motion.div>
            )}

            {screen === 'result' && (
              <motion.div
                key="result"
                className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.3 }}
              >
                <ResultScreen 
                  score={currentScore} 
                  name={name}
                  mascot={mascot}
                  equippedSkins={equippedSkins}
                  subject={subject} 
                  onReplay={handleReplay} 
                  onGoHome={handleGoHome} 
                />
              </motion.div>
            )}

            {screen === 'store' && (
              <motion.div
                key="store"
                className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.25 }}
              >
                <StoreScreen
                  mascot={mascot}
                  stars={stars}
                  unlockedSkins={unlockedSkins}
                  equippedSkins={equippedSkins}
                  onBuyItem={handleBuyItem}
                  onToggleEquip={handleToggleEquip}
                  onClose={() => setScreen('home')}
                />
              </motion.div>
            )}

            {screen === 'reference' && (
              <motion.div
                key="reference"
                className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ReferenceScreen
                  onClose={() => setScreen('home')}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </main>
        
        {/* Thanh điều hướng ảo dưới màn hình (chỉ hiển thị giả lập trên PC) */}
        <div className="hidden sm:block h-6 bg-slate-800 w-full relative z-30">
          <div className="w-28 h-1 bg-slate-500 rounded-full mx-auto mt-2"></div>
        </div>

      </div>
    </div>
  );
}
