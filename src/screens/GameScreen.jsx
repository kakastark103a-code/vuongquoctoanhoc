import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import GeometryVisual from '../components/GeometryVisual';
import MascotRenderer from '../components/MascotRenderer';
import { generateQuestionSet } from '../utils/mathGenerator';

export default function GameScreen({ subject, name, mascot, equippedSkins, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  
  // Trạng thái linh vật cổ vũ
  const [mascotStatus, setMascotStatus] = useState('idle'); // 'idle' | 'happy' | 'sad'
  const [mascotSpeech, setMascotSpeech] = useState('');

  // Sinh bộ câu hỏi khi vào game
  useEffect(() => {
    const qSet = generateQuestionSet(subject);
    setQuestions(qSet);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setEarnedStars(0);
    setTimeLeft(30);
    setMascotStatus('idle');
  }, [subject]);

  useEffect(() => {
    if (isAnswered || questions.length === 0) return;
    
    if (timeLeft <= 0) {
      if (!isAnswered) {
        playSound('wrong');
        setIsAnswered(true);
        setMascotStatus('sad');
        setMascotSpeech(`Hết giờ mất rồi ${name} ơi! Đáp án đúng là ${questions[currentIndex].correctAnswer} nha. Luyện tập thêm nào! ⏰`);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, questions, currentIndex, name]);

  // Cập nhật lời thoại mascot khi đổi câu hỏi
  useEffect(() => {
    if (questions.length > 0) {
      const q = questions[currentIndex];
      setMascotStatus('idle');
      if (q.type === 'geometry') {
        if (q.isArea) {
          setMascotSpeech(`Tính diện tích hình này nha ${name}! Công thức là gì nhỉ? 🟦`);
        } else {
          setMascotSpeech(`Hãy tính chu vi hình này nhé ${name}! Đọc kỹ số đo nha! 📐`);
        }
      } else if (q.type === 'conversion') {
        setMascotSpeech(`Bảng quy đổi đơn vị đo đây rồi! Đổi cẩn thận nhé ${name}! ⚖️`);
      } else {
        setMascotSpeech(`Đố ${name} biết phép tính này có đáp án là gì nào? ⚡`);
      }
    }
  }, [currentIndex, questions, name]);

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-sky-100">
        <div className="text-center font-bold text-slate-700 animate-bounce">
          Đang chuẩn bị câu hỏi... 🦖
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleAnswerSelect = (option) => {
    if (isAnswered) return; // Khóa sau khi đã chọn

    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) {
      playSound('correct');
      setScore(prev => prev + 1);
      
      let starsToAdd = 1;
      if (timeLeft >= 20) starsToAdd = 3;
      else if (timeLeft >= 10) starsToAdd = 2;
      
      setEarnedStars(prev => prev + starsToAdd);
      setMascotStatus('happy');
      
      const praises = [
        `Bé ${name} xuất sắc quá! Nhận được ${starsToAdd} sao kìa! 🥳`,
        `Tính siêu nhanh luôn ${name} ơi! Quá chuẩn! 🌟`,
        `Tuyệt vời! ${name} thông minh lắm nha! 🎉`
      ];
      setMascotSpeech(praises[Math.floor(Math.random() * praises.length)]);
    } else {
      playSound('wrong');
      setMascotStatus('sad');
      setMascotSpeech(`Không sao đâu ${name}! Đáp án đúng là ${currentQuestion.correctAnswer} nha. Luyện tập thêm nào! 💪`);
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      // Hoàn thành 10 câu
      onFinish({ correctCount: score, earnedStars });
    }
  };

  const getOptionStyle = (option) => {
    if (!isAnswered) {
      return 'btn-cartoon-white hover:bg-slate-50 text-slate-800 border-slate-800';
    }

    const isCurrentOption = option === selectedAnswer;
    const isCorrectOption = option === currentQuestion.correctAnswer;

    if (isCorrectOption) {
      return 'btn-cartoon-green text-emerald-950 border-slate-800 scale-102';
    }

    if (isCurrentOption && !isCorrectOption) {
      return 'btn-cartoon-red text-rose-950 border-slate-800';
    }

    return 'opacity-65 bg-slate-100 border-slate-300 text-slate-400 border-2';
  };

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-sky-100 to-indigo-100">
      
      {/* Phần trên chứa câu hỏi và tiến độ (Có padding) */}
      <div className="flex-1 flex flex-col px-5 pt-4 overflow-y-auto pb-2">
        
        {/* Tiến độ và điểm số */}
        <div className="w-full mb-3.5 z-10">
          <div className="flex items-center justify-between text-[10px] font-black text-slate-600 mb-1.5 uppercase tracking-wide">
            <span>Câu hỏi: {currentIndex + 1} / {questions.length}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-300 shadow-sm animate-pulse">
                ⏱️ {timeLeft}s
              </span>
              <span className="text-emerald-600 flex items-center gap-1 font-bold">
                Đúng: <strong className="text-xs text-emerald-700">{score}</strong> ⭐
              </span>
            </div>
          </div>
          
          {/* Progress Bar Cartoon */}
          <div className="w-full h-4.5 bg-white border-2 border-slate-800 rounded-full overflow-hidden p-0.5 relative shadow-inner">
            <motion.div 
              className="h-full bg-emerald-400 rounded-full border-r border-slate-800"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            />
          </div>
        </div>

        {/* Thẻ câu hỏi */}
        <div className="flex-1 flex flex-col justify-center my-1 z-10 min-h-[220px]">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="card-cartoon p-4 relative overflow-hidden"
          >
            {/* Nhãn loại thử thách */}
            <div className="absolute top-2.5 right-2.5 text-[9px] bg-indigo-100 border border-indigo-300 font-extrabold text-indigo-700 px-2 py-0.5 rounded-full">
              {subject === 'multiplication' && '✖️ Nhân'}
              {subject === 'division' && '➗ Chia'}
              {subject === 'conversion' && '⚖️ Quy Đổi'}
              {subject === 'area' && '🟦 Diện Tích'}
              {subject === 'geometry' && '📐 Chu Vi'}
            </div>

            <div className="text-center pt-2">
              <h3 className="font-extrabold text-2xl text-slate-800 mb-1.5">
                {currentQuestion.questionText}
              </h3>

              {/* Vẽ hình nếu là Geometry */}
              {currentQuestion.type === 'geometry' && (
                <GeometryVisual shape={currentQuestion.shape} data={currentQuestion.shapeData} />
              )}

              <p className="text-xs font-bold text-slate-500 leading-snug px-1.5">
                {currentQuestion.questionSubText}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Danh sách 4 Đáp án */}
        <div className="z-10 w-full max-w-sm mx-auto my-3">
          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelectedWrong = isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer;
              
              return (
                <motion.button
                  key={`${currentIndex}-${option}-${idx}`}
                  disabled={isAnswered}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  animate={isSelectedWrong ? {
                    x: [0, -8, 8, -6, 6, 0],
                    transition: { duration: 0.4 }
                  } : {}}
                  onClick={() => handleAnswerSelect(option)}
                  className={`py-3 px-2.5 font-black text-lg text-center leading-none transition-all flex flex-col items-center justify-center gap-1 min-h-[64px] ${getOptionStyle(option)}`}
                >
                  <span>{option}</span>
                  
                  {isAnswered && option === currentQuestion.correctAnswer && (
                    <span className="text-[10px] text-emerald-900 font-extrabold flex items-center gap-0.5 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 fill-emerald-100 stroke-[3]" /> Đúng
                    </span>
                  )}
                  {isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                    <span className="text-[10px] text-rose-950 font-extrabold flex items-center gap-0.5 mt-0.5">
                      <XCircle className="w-3 h-3 fill-rose-100 stroke-[3]" /> Sai
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Mascot Cổ Vũ & Nút Điều Hướng Pinned ở đáy màn hình */}
      <div className="z-20 min-h-[85px] flex items-center justify-between gap-3 bg-white border-t-3 border-slate-800 px-4 py-2.5 rounded-t-[24px] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        
        {/* Linh vật và khung thoại */}
        <div className="flex items-center gap-2.5 flex-1 max-w-[70%]">
          {/* Avatar của Linh vật */}
          <div className="w-13 h-13 bg-indigo-50 border-2 border-slate-800 rounded-full flex items-center justify-center overflow-visible relative flex-shrink-0">
            <MascotRenderer 
              mascot={mascot} 
              equippedSkins={equippedSkins} 
              size="sm" 
              status={mascotStatus} 
            />
          </div>
          
          {/* Bong bóng hội thoại của Linh vật */}
          <div className="relative bg-white border-2 border-slate-800 p-2 rounded-2xl text-[10px] font-black text-slate-700 leading-snug w-full min-h-[44px] flex items-center">
            {/* Mũi tên trỏ vào avatar */}
            <div className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-white border-b-2 border-l-2 border-slate-800 rotate-45"></div>
            <p className="w-full text-left line-clamp-3">
              {mascotSpeech}
            </p>
          </div>
        </div>

        {/* Nút Câu Tiếp Theo */}
        <div className="w-24 flex-shrink-0 flex justify-end">
          <AnimatePresence>
            {isAnswered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-full py-3.5 btn-cartoon-orange text-amber-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_3px_0_0_#c2410c]"
              >
                <span>{currentIndex === questions.length - 1 ? 'Kết Quả' : 'Câu Tiếp'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3.5]" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
