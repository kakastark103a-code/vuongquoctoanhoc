import React from 'react';
import { motion } from 'framer-motion';

export default function GeometryVisual({ shape, data }) {
  if (!shape || !data) return null;

  // Cấu hình chung cho style SVG hoạt hình
  const strokeColor = "#1e293b";
  const strokeWidth = 4;
  const rx = 12; // Bo tròn góc cho hình chữ nhật/hình vuông

  return (
    <div className="flex items-center justify-center py-6 px-4 bg-sky-50/50 border-3 border-dashed border-sky-200 rounded-3xl my-4">
      {shape === 'square' && (
        <motion.svg 
          width="200" 
          height="200" 
          viewBox="0 0 200 200"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="drop-shadow-md"
        >
          {/* Vẽ bóng đổ nhẹ */}
          <rect 
            x="44" 
            y="44" 
            width="120" 
            height="120" 
            rx={rx} 
            fill="#e2e8f0" 
          />
          {/* Hình vuông chính */}
          <rect 
            x="40" 
            y="40" 
            width="120" 
            height="120" 
            rx={rx} 
            fill="#fef08a" /* Vàng tươi */
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
          />
          
          {/* Nhãn kích thước */}
          {/* Cạnh trên */}
          <text 
            x="100" 
            y="25" 
            textAnchor="middle" 
            className="fill-slate-800 font-black text-sm tracking-wide"
          >
            {data.side} cm
          </text>
          {/* Cạnh bên trái */}
          <text 
            x="15" 
            y="105" 
            textAnchor="start"
            className="fill-slate-800 font-black text-sm tracking-wide"
          >
            {data.side} cm
          </text>
          
          {/* Biểu tượng vuông góc nhỏ ở góc dưới trái */}
          <path 
            d="M 40 148 L 52 148 L 52 160" 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth={2} 
          />
        </motion.svg>
      )}

      {shape === 'rectangle' && (
        <motion.svg 
          width="240" 
          height="180" 
          viewBox="0 0 240 180"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="drop-shadow-md"
        >
          {/* Bóng đổ */}
          <rect 
            x="44" 
            y="44" 
            width="160" 
            height="100" 
            rx={rx} 
            fill="#e2e8f0" 
          />
          {/* Hình chữ nhật chính */}
          <rect 
            x="40" 
            y="40" 
            width="160" 
            height="100" 
            rx={rx} 
            fill="#bbf7d0" /* Xanh lá tươi */
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
          />
          
          {/* Nhãn kích thước */}
          {/* Chiều dài - Cạnh trên */}
          <text 
            x="120" 
            y="25" 
            textAnchor="middle" 
            className="fill-slate-800 font-black text-sm tracking-wide"
          >
            {data.height} cm (Chiều dài)
          </text>
          {/* Chiều rộng - Cạnh bên trái */}
          <text 
            x="32" 
            y="95" 
            textAnchor="end"
            className="fill-slate-800 font-black text-sm tracking-wide"
          >
            {data.width} cm
          </text>
          {/* Chiều rộng - Nhãn gợi ý bên phải */}
          <text 
            x="208" 
            y="95" 
            textAnchor="start"
            className="fill-slate-500 font-bold text-xs"
          >
            (Chiều rộng)
          </text>
          
          {/* Ký hiệu vuông góc */}
          <path 
            d="M 40 128 L 52 128 L 52 140" 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth={2} 
          />
        </motion.svg>
      )}

      {shape === 'triangle' && (
        <motion.svg 
          width="220" 
          height="180" 
          viewBox="0 0 220 180"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="drop-shadow-md"
        >
          {/* Bóng đổ */}
          <polygon 
            points="114,34 34,144 194,144" 
            fill="#e2e8f0" 
          />
          {/* Hình tam giác chính */}
          <polygon 
            points="110,30 30,140 190,140" 
            fill="#fbcfe8" /* Hồng tươi */
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            strokeLinejoin="round"
          />
          
          {/* Nhãn kích thước cho 3 cạnh */}
          {/* Cạnh bên trái (a) */}
          <text 
            x="50" 
            y="85" 
            textAnchor="end" 
            className="fill-slate-800 font-black text-sm tracking-wide"
          >
            {data.a} cm
          </text>
          
          {/* Cạnh bên phải (b) */}
          <text 
            x="170" 
            y="85" 
            textAnchor="start" 
            className="fill-slate-800 font-black text-sm tracking-wide"
          >
            {data.b} cm
          </text>
          
          {/* Cạnh đáy (c) */}
          <text 
            x="110" 
            y="162" 
            textAnchor="middle" 
            className="fill-slate-800 font-black text-sm tracking-wide"
          >
            {data.c} cm
          </text>
        </motion.svg>
      )}
    </div>
  );
}
