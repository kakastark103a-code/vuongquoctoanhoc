import React from 'react';
import { motion } from 'framer-motion';

// Thông tin các linh vật cơ bản
export const BASE_MASCOTS = {
  knight: {
    id: 'knight',
    name: 'Sư Tử Conan',
    emoji: '🦁',
    image: '/mascots/lion_conan.png',
    imagePlain: '/mascots/lion_plain.png',
    desc: 'Hiệp sĩ thám tử tài ba phá án cực giỏi.',
    color: 'from-amber-400 to-orange-500'
  },
  princess: {
    id: 'princess',
    name: 'Thỏ Elsa',
    emoji: '🐰',
    image: '/mascots/bunny_elsa.png',
    imagePlain: '/mascots/bunny_plain.png',
    desc: 'Thỏ công chúa băng tuyết phép thuật nhiệm màu.',
    color: 'from-pink-400 to-rose-500'
  },
  spiderman: {
    id: 'spiderman',
    name: 'Khỉ Spiderman',
    emoji: '🐵',
    image: '/mascots/spider_monkey.png',
    imagePlain: '/mascots/monkey_plain.png',
    desc: 'Khỉ siêu nhân nhện bay nhảy siêu đẳng.',
    color: 'from-red-400 to-blue-500'
  }
};

// Thông tin các vật phẩm nâng cấp trong cửa hàng
export const SHOP_ITEMS = [
  // 1. Nhóm Vật phẩm (Accessories)
  {
    id: 'wings',
    category: 'accessory',
    name: 'Cánh Thiên Thần',
    emoji: '🪽',
    cost: 15,
    desc: 'Đôi cánh lấp lánh giúp linh vật bay lượn.'
  },
  {
    id: 'bat_wings',
    category: 'accessory',
    name: 'Cánh Dơi Ác Ma',
    emoji: '🦇',
    cost: 30,
    desc: 'Đôi cánh dơi siêu ngầu bay trong đêm.'
  },
  {
    id: 'sword',
    category: 'accessory',
    name: 'Cún Con Tinh Nghịch 🐶',
    emoji: '🐶',
    cost: 25,
    desc: 'Bạn cún con siêu dễ thương chạy lon ton cổ vũ bên phải.'
  },
  {
    id: 'shield',
    category: 'accessory',
    name: 'Khiên Ánh Sáng',
    emoji: '🛡️',
    cost: 20,
    desc: 'Khiên hộ vệ bảo vệ bé trước câu hỏi khó.'
  },
  {
    id: 'glasses',
    category: 'accessory',
    name: 'Kính Siêu Ngầu',
    emoji: '🕶️',
    cost: 10,
    desc: 'Kính mát đen thời trang cực chất.'
  },
  {
    id: 'mask',
    category: 'accessory',
    name: 'Mèo Con May Mắn 🐱',
    emoji: '🐱',
    cost: 18,
    desc: 'Mèo con dễ thương ngồi ngoan ngoãn bên trái chúc mừng bé.'
  },
  {
    id: 'crown',
    category: 'accessory',
    name: 'Vương Miện Kim Cương',
    emoji: '👑',
    cost: 35,
    desc: 'Mũ miện hoàng gia lấp lánh cúp vàng.'
  },
  {
    id: 'graduate_hat',
    category: 'accessory',
    name: 'Mũ Trạng Nguyên',
    emoji: '🎓',
    cost: 45,
    desc: 'Mũ tốt nghiệp cho bé thông thái học giỏi.'
  },
  {
    id: 'dragon',
    category: 'accessory',
    name: 'Rồng Con May Mắn',
    emoji: '🐉',
    cost: 50,
    desc: 'Bạn rồng con tí hon bay bên cạnh cổ vũ.'
  },
  {
    id: 'balloon',
    category: 'accessory',
    name: 'Bóng Bay Cầu Vồng',
    emoji: '🎈',
    cost: 12,
    desc: 'Chiếc bóng sắc màu bay lơ lửng bên phải.'
  },

  // 2. Nhóm Quần áo (Clothing) - Chỉ bán 3 bộ Cosplay đặc trưng 500 Sao
  {
    id: 'conan_suit',
    category: 'clothing',
    targetMascot: 'knight',
    name: 'Bộ Đồ Conan 🕵️',
    emoji: '👔',
    cost: 500,
    desc: 'Bộ vest thám tử Conan thông minh, lanh lợi. (Chỉ cho Sư Tử)'
  },
  {
    id: 'elsa_dress',
    category: 'clothing',
    targetMascot: 'princess',
    name: 'Váy Tuyết Elsa ❄️',
    emoji: '👗',
    cost: 500,
    desc: 'Chiếc váy băng giá Elsa lấp lánh kiêu sa. (Chỉ cho Thỏ Ngọc)'
  },
  {
    id: 'spiderman_suit',
    category: 'clothing',
    targetMascot: 'spiderman',
    name: 'Đồ Nhện Spiderman 🕷️',
    emoji: '🦸',
    cost: 500,
    desc: 'Trang phục siêu nhân nhện đỏ xanh cực ngầu. (Chỉ cho Khỉ Nhện)'
  },

  // 3. Nhóm Màu lông (Color)
  {
    id: 'color_pink',
    category: 'color',
    name: 'Lông Hồng Candy',
    emoji: '🌸',
    cost: 20,
    desc: 'Đổi màu lông sang hồng ngọt ngào kẹo ngọt.'
  },
  {
    id: 'color_blue',
    category: 'color',
    name: 'Lông Lam Băng Giá',
    emoji: '❄️',
    cost: 20,
    desc: 'Đổi màu lông sang lam mát lạnh bắc cực.'
  },
  {
    id: 'color_green',
    category: 'color',
    name: 'Lông Lục Bảo',
    emoji: '🍃',
    cost: 20,
    desc: 'Đổi màu lông sang xanh lục bảo may mắn.'
  },
  {
    id: 'color_purple',
    category: 'color',
    name: 'Lông Tím Ma Thuật',
    emoji: '🔮',
    cost: 25,
    desc: 'Đổi màu lông sang tím huyền bí ma mị.'
  },
  {
    id: 'color_shadow',
    category: 'color',
    name: 'Lông Đen Bóng Đêm',
    emoji: '🌑',
    cost: 35,
    desc: 'Đầu tư màu đen bóng đêm huyền ảo mạnh mẽ.'
  }
];

const processedImageCache = {};

export default function MascotRenderer({
  mascot = 'knight',
  equippedSkins = [],
  status = 'idle', // 'idle' | 'happy' | 'sad'
  size = 'md' // 'sm' | 'md' | 'lg'
}) {
  const baseInfo = BASE_MASCOTS[mascot] || BASE_MASCOTS.knight;

  // Kiểm tra xem đã trang bị phụ kiện đặc trưng để biến hình sang 3D giáp chưa
  const hasEquippedStyle = React.useMemo(() => {
    if (mascot === 'knight') {
      return equippedSkins.includes('conan_suit');
    } else if (mascot === 'princess') {
      return equippedSkins.includes('elsa_dress');
    } else if (mascot === 'spiderman') {
      return equippedSkins.includes('spiderman_suit');
    }
    return false;
  }, [mascot, equippedSkins]);

  const activeImage = hasEquippedStyle ? baseInfo.image : (baseInfo.imagePlain || baseInfo.image);

  const [processedSrc, setProcessedSrc] = React.useState(activeImage);

  React.useEffect(() => {
    if (processedImageCache[activeImage]) {
      setProcessedSrc(processedImageCache[activeImage]);
      return;
    }

    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const w = canvas.width;
        const h = canvas.height;

        // Thuật toán Loang (Flood fill) để xác định vùng nền
        const visited = new Uint8Array(w * h);
        const queue = [];

        // Kiểm tra xem một điểm pixel có phải là màu nền trắng hay không (R, G, B > threshold)
        const isBg = (x, y) => {
          const idx = (y * w + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          
          // Tính khoảng cách tới biên gần nhất
          const distFromEdgeX = Math.min(x, w - 1 - x);
          const distFromEdgeY = Math.min(y, h - 1 - y);
          const minDist = Math.min(distFromEdgeX, distFromEdgeY);
          
          // Sử dụng ngưỡng thấp ở sát biên để xóa sạch bóng mờ vignette ở các góc
          // Sử dụng ngưỡng rất cao ở gần nhân vật để tránh ăn lẹm vào người thỏ
          let threshold = 245;
          if (minDist < 15) {
            threshold = 190; // Sát rìa: quét sạch bóng xám
          } else if (minDist < 35) {
            threshold = 225; // Vùng đệm
          }
          
          return r > threshold && g > threshold && b > threshold;
        };

        // Đẩy TẤT CẢ các điểm sát biên ảnh vào hàng đợi làm điểm mồi (seeds)
        // Vì biên ngoài cùng chắc chắn là nền (không chạm nhân vật)
        // Việc này đảm bảo ta sẽ xóa sạch 100% vệt xám ở các cạnh/góc vignette
        for (let x = 0; x < w; x++) {
          queue.push(x, 0); visited[0 * w + x] = 1;
          queue.push(x, h - 1); visited[(h - 1) * w + x] = 1;
        }
        for (let y = 0; y < h; y++) {
          queue.push(0, y); visited[y * w + 0] = 1;
          queue.push(w - 1, y); visited[y * w + (w - 1)] = 1;
        }

        // Loang BFS tìm toàn bộ vùng nền trống liên kết bên ngoài
        let head = 0;
        const dx = [1, -1, 0, 0];
        const dy = [0, 0, 1, -1];
        while (head < queue.length) {
          const cx = queue[head++];
          const cy = queue[head++];

          for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              const vidx = ny * w + nx;
              if (visited[vidx] === 0 && isBg(nx, ny)) {
                visited[vidx] = 1;
                queue.push(nx, ny);
              }
            }
          }
        }

        // Đặt độ trong suốt của vùng nền = 0, và làm mềm viền (anti-aliasing)
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const vidx = y * w + x;
            const idx = vidx * 4;

            if (visited[vidx] === 1) {
              data[idx + 3] = 0; // Nền trong suốt
            } else {
              // Làm mềm các điểm viền tiếp giáp với nền để xóa viền trắng răng cưa
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];
              if (r > 240 && g > 240 && b > 240) {
                let nearBg = false;
                for (let i = 0; i < 4; i++) {
                  const nx = x + dx[i];
                  const ny = y + dy[i];
                  if (nx >= 0 && nx < w && ny >= 0 && ny < h && visited[ny * w + nx] === 1) {
                    nearBg = true;
                    break;
                  }
                }
                if (nearBg) {
                  const brightness = (r + g + b) / 3;
                  const alpha = Math.max(0, Math.min(255, (255 - brightness) * 4));
                  data[idx + 3] = alpha; // Mờ dần khi càng gần màu trắng của nền
                }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const dataUrl = canvas.toDataURL();
        processedImageCache[activeImage] = dataUrl;
        if (active) {
          setProcessedSrc(dataUrl);
        }
      } catch (e) {
        console.error("Canvas transparent background process fail:", e);
      }
    };
    img.src = activeImage;
    return () => {
      active = false;
    };
  }, [activeImage]);

  // Cấu hình kích thước
  const sizeClasses = {
    sm: { container: 'w-16 h-16', baseEmoji: 'text-3xl', itemSize: 'text-lg' },
    md: { container: 'w-24 h-24', baseEmoji: 'text-5xl', itemSize: 'text-2xl' },
    lg: { container: 'w-36 h-36', baseEmoji: 'text-7xl', itemSize: 'text-4xl' },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  // Framer Motion variants cho linh vật dựa trên trạng thái cổ vũ
  const mascotVariants = {
    idle: {
      y: [0, -4, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    },
    happy: {
      y: [0, -25, 0, -15, 0],
      scale: [1, 1.15, 0.95, 1.05, 1],
      rotate: [0, 15, -15, 10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    sad: {
      x: [0, -8, 8, -6, 6, 0],
      y: [0, 4, 0],
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Kiểm tra vật phẩm trang bị
  const hasWings = equippedSkins.includes('wings');
  const hasBatWings = equippedSkins.includes('bat_wings');
  const hasSword = equippedSkins.includes('sword');
  const hasShield = equippedSkins.includes('shield');
  const hasGlasses = equippedSkins.includes('glasses');
  const hasMask = equippedSkins.includes('mask');
  const hasCrown = equippedSkins.includes('crown');
  const hasGraduateHat = equippedSkins.includes('graduate_hat');
  const hasDragon = equippedSkins.includes('dragon');
  const hasBalloon = equippedSkins.includes('balloon');

  // Tính toán filter màu sắc
  const equippedColor = equippedSkins.find(id => id.startsWith('color_'));
  let colorFilter = '';
  if (equippedColor === 'color_pink') {
    colorFilter = 'hue-rotate(320deg) saturate(1.2) brightness(1.05)';
  } else if (equippedColor === 'color_blue') {
    colorFilter = 'hue-rotate(180deg) saturate(1.3) brightness(1.05)';
  } else if (equippedColor === 'color_green') {
    colorFilter = 'hue-rotate(90deg) saturate(1.2) brightness(1.05)';
  } else if (equippedColor === 'color_purple') {
    colorFilter = 'hue-rotate(260deg) saturate(1.3) brightness(1.05)';
  } else if (equippedColor === 'color_shadow') {
    colorFilter = 'brightness(0.55) contrast(1.3) saturate(0.65)';
  }

  return (
    <div className={`relative flex items-center justify-center ${currentSize.container} select-none`}>

      {/* 1. Cánh thiên thần (Vẽ đằng sau lưng linh vật) */}
      {/* 1. Cánh Thiên Thần (2 cánh 2 bên cân đối) */}
      {hasWings && (
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-between">
          {/* Cánh trái */}
          <motion.div
            className="absolute"
            style={{
              width: size === 'sm' ? '30px' : size === 'md' ? '60px' : '100px',
              height: size === 'sm' ? '30px' : size === 'md' ? '60px' : '100px',
              left: size === 'sm' ? '-16px' : size === 'md' ? '-32px' : '-56px',
              top: '25%',
              transformOrigin: '85% 50%',
            }}
            animate={{
              rotate: [-15, 0, -15],
              y: [0, -4, 0]
            }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <defs>
                <linearGradient id="angelGradLeft" x1="1" y1="0.5" x2="0" y2="0.5">
                  <stop offset="0%" stopColor="#fff9c4" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#b2ebf2" />
                </linearGradient>
                <filter id="angelGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                d="M 85 50 C 70 30, 40 15, 10 20 C 15 38, 25 48, 35 52 C 24 56, 14 62, 18 72 C 30 72, 40 66, 46 60 C 35 72, 28 82, 32 87 C 45 82, 55 72, 60 62 C 70 66, 82 58, 85 50 Z"
                fill="url(#angelGradLeft)"
                stroke="#80deea"
                strokeWidth="2.5"
                filter="url(#angelGlow)"
              />
              <path d="M 65 45 C 55 35, 40 32, 25 32" fill="none" stroke="#e0f7fa" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 58 50 C 50 43, 38 42, 28 44" fill="none" stroke="#e0f7fa" strokeWidth="2" strokeLinecap="round" />
              <path d="M 52 56 C 45 52, 38 52, 32 54" fill="none" stroke="#e0f7fa" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Cánh phải */}
          <motion.div
            className="absolute"
            style={{
              width: size === 'sm' ? '30px' : size === 'md' ? '60px' : '100px',
              height: size === 'sm' ? '30px' : size === 'md' ? '60px' : '100px',
              right: size === 'sm' ? '-16px' : size === 'md' ? '-32px' : '-56px',
              top: '25%',
              transformOrigin: '15% 50%',
            }}
            animate={{
              rotate: [15, 0, 15],
              y: [0, -4, 0]
            }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ transform: 'scaleX(-1)' }}>
              <defs>
                <linearGradient id="angelGradRight" x1="1" y1="0.5" x2="0" y2="0.5">
                  <stop offset="0%" stopColor="#fff9c4" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#b2ebf2" />
                </linearGradient>
              </defs>
              <path
                d="M 85 50 C 70 30, 40 15, 10 20 C 15 38, 25 48, 35 52 C 24 56, 14 62, 18 72 C 30 72, 40 66, 46 60 C 35 72, 28 82, 32 87 C 45 82, 55 72, 60 62 C 70 66, 82 58, 85 50 Z"
                fill="url(#angelGradRight)"
                stroke="#80deea"
                strokeWidth="2.5"
                filter="url(#angelGlow)"
              />
              <path d="M 65 45 C 55 35, 40 32, 25 32" fill="none" stroke="#e0f7fa" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 58 50 C 50 43, 38 42, 28 44" fill="none" stroke="#e0f7fa" strokeWidth="2" strokeLinecap="round" />
              <path d="M 52 56 C 45 52, 38 52, 32 54" fill="none" stroke="#e0f7fa" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* 2. Cánh Dơi Ác Ma (2 cánh 2 bên cân đối) */}
      {hasBatWings && (
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-between">
          {/* Cánh trái */}
          <motion.div
            className="absolute"
            style={{
              width: size === 'sm' ? '30px' : size === 'md' ? '60px' : '100px',
              height: size === 'sm' ? '30px' : size === 'md' ? '60px' : '100px',
              left: size === 'sm' ? '-16px' : size === 'md' ? '-32px' : '-56px',
              top: '25%',
              transformOrigin: '85% 50%',
            }}
            animate={{
              rotate: [-15, 5, -15],
              y: [0, -4, 0]
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <defs>
                <linearGradient id="batGradLeft" x1="1" y1="0.5" x2="0" y2="0.5">
                  <stop offset="0%" stopColor="#4a148c" />
                  <stop offset="50%" stopColor="#311b92" />
                  <stop offset="100%" stopColor="#1a237e" />
                </linearGradient>
                <filter id="batGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                d="M 85 50 C 70 32, 45 18, 10 25 C 16 43, 24 53, 22 58 C 34 58, 44 63, 44 75 C 56 68, 70 58, 85 50 Z"
                fill="url(#batGradLeft)"
                stroke="#e040fb"
                strokeWidth="2.5"
                filter="url(#batGlow)"
              />
              <path d="M 85 50 L 10 25" fill="none" stroke="#e040fb" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 85 50 L 22 58" fill="none" stroke="#e040fb" strokeWidth="2" strokeLinecap="round" />
              <path d="M 85 50 L 44 75" fill="none" stroke="#e040fb" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Cánh phải */}
          <motion.div
            className="absolute"
            style={{
              width: size === 'sm' ? '30px' : size === 'md' ? '60px' : '100px',
              height: size === 'sm' ? '30px' : size === 'md' ? '60px' : '100px',
              right: size === 'sm' ? '-16px' : size === 'md' ? '-32px' : '-56px',
              top: '25%',
              transformOrigin: '15% 50%',
            }}
            animate={{
              rotate: [15, -5, 15],
              y: [0, -4, 0]
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ transform: 'scaleX(-1)' }}>
              <defs>
                <linearGradient id="batGradRight" x1="1" y1="0.5" x2="0" y2="0.5">
                  <stop offset="0%" stopColor="#4a148c" />
                  <stop offset="50%" stopColor="#311b92" />
                  <stop offset="100%" stopColor="#1a237e" />
                </linearGradient>
              </defs>
              <path
                d="M 85 50 C 70 32, 45 18, 10 25 C 16 43, 24 53, 22 58 C 34 58, 44 63, 44 75 C 56 68, 70 58, 85 50 Z"
                fill="url(#batGradRight)"
                stroke="#e040fb"
                strokeWidth="2.5"
                filter="url(#batGlow)"
              />
              <path d="M 85 50 L 10 25" fill="none" stroke="#e040fb" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 85 50 L 22 58" fill="none" stroke="#e040fb" strokeWidth="2" strokeLinecap="round" />
              <path d="M 85 50 L 44 75" fill="none" stroke="#e040fb" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* 3. Bạn Rồng Con Đồng Hành (Bay bên trái) */}
      {hasDragon && (
        <motion.div
          animate={{
            y: [4, -8, 4],
            x: [-12, -18, -12],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute z-10 pointer-events-none"
          style={{
            fontSize: size === 'sm' ? '1.1rem' : size === 'md' ? '1.8rem' : '2.6rem',
            left: '0%',
            top: '25%',
          }}
        >
          🐉
        </motion.div>
      )}

      {/* 4. Bóng Bay Cầu Vồng (Bay bên phải) */}
      {hasBalloon && (
        <motion.div
          animate={{
            y: [-4, 6, -4],
            x: [12, 16, 12],
          }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute z-10 pointer-events-none"
          style={{
            fontSize: size === 'sm' ? '1.2rem' : size === 'md' ? '2rem' : '3rem',
            right: '0%',
            top: '20%',
          }}
        >
          🎈
        </motion.div>
      )}

      {/* Linh vật chính */}
      <motion.div
        variants={mascotVariants}
        animate={status}
        className="relative z-10 flex items-center justify-center w-full h-full"
      >
        {/* Bong bóng tròn nền rực rỡ */}
        <div className={`absolute inset-1 rounded-full bg-gradient-to-tr ${baseInfo.color} opacity-20 border-2 border-slate-800/40 z-0`} />

        {/* Đồ họa linh vật 3D đã tách nền kèm màu lông động */}
        <img
          src={processedSrc}
          alt={baseInfo.name}
          style={{ filter: colorFilter }}
          className="w-[85%] h-[85%] object-contain z-10 filter drop-shadow-sm select-none"
        />



        {/* 8. Vương miện hoàng gia (Vẽ trên đầu) */}
        {hasCrown && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{
              fontSize: size === 'sm' ? '1rem' : size === 'md' ? '1.7rem' : '2.5rem',
              top: size === 'sm' ? '-10px' : size === 'md' ? '-22px' : '-35px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-5deg)',
            }}
            animate={status === 'happy' ? { y: [-5, 0] } : {}}
          >
            👑
          </motion.div>
        )}

        {/* 9. Mũ Trạng Nguyên (Vẽ trên đầu) */}
        {hasGraduateHat && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{
              fontSize: size === 'sm' ? '1.1rem' : size === 'md' ? '1.8rem' : '2.6rem',
              top: size === 'sm' ? '-12px' : size === 'md' ? '-24px' : '-36px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-5deg)',
            }}
            animate={status === 'happy' ? { y: [-5, 0] } : {}}
          >
            🎓
          </motion.div>
        )}

        {/* 10. Kính siêu ngầu (Vẽ đè lên mắt) */}
        {hasGlasses && (
          <div
            className="absolute z-25 pointer-events-none"
            style={{
              fontSize: size === 'sm' ? '0.9rem' : size === 'md' ? '1.5rem' : '2.2rem',
              top: size === 'sm' ? '22%' : size === 'md' ? '25%' : '28%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            🕶️
          </div>
        )}

        {/* 11. Mèo Con May Mắn (Thế chỗ cho mask - Ngồi bên trái) */}
        {hasMask && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{
              fontSize: size === 'sm' ? '0.9rem' : size === 'md' ? '1.5rem' : '2.2rem',
              left: size === 'sm' ? '-10px' : size === 'md' ? '-20px' : '-30px',
              bottom: size === 'sm' ? '8px' : size === 'md' ? '14px' : '20px',
            }}
            animate={{
              rotate: [-5, 5, -5],
              y: [0, -2, 0]
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            🐱
          </motion.div>
        )}

        {/* 12. Cún Con Tinh Nghịch (Thế chỗ cho kiếm - Nhảy bên phải) */}
        {hasSword && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{
              fontSize: size === 'sm' ? '0.9rem' : size === 'md' ? '1.5rem' : '2.2rem',
              right: size === 'sm' ? '-10px' : size === 'md' ? '-20px' : '-30px',
              bottom: size === 'sm' ? '8px' : size === 'md' ? '14px' : '20px',
            }}
            animate={{
              y: [0, -4, 0],
              rotate: [0, 4, -4, 0]
            }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            🐶
          </motion.div>
        )}

        {/* 13. Khiên Ánh Sáng (Cầm bên tay trái / góc dưới trái) */}
        {hasShield && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{
              fontSize: size === 'sm' ? '0.9rem' : size === 'md' ? '1.5rem' : '2.2rem',
              left: size === 'sm' ? '-6px' : size === 'md' ? '-12px' : '-18px',
              bottom: size === 'sm' ? '6px' : size === 'md' ? '10px' : '15px',
              transform: 'rotate(-15deg)',
            }}
            animate={status === 'happy' ? { rotate: [-15, -35, -15] } : {}}
            transition={{ repeat: status === 'happy' ? 2 : 0, duration: 0.2 }}
          >
            🛡️
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
