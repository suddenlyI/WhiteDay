import React, { useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'motion/react';
import { Heart, X, User, HeartPulse } from 'lucide-react';
import profileImg from './assets/profile.jpg';

export default function App() {
  const [screen, setScreen] = useState<'intro' | 'main'>('intro');

  return (
    <div className="w-full h-[100dvh] overflow-hidden bg-gray-50 font-sans selection:bg-pink-200">
      <AnimatePresence mode="wait">
        {screen === 'intro' ? (
          <IntroScreen key="intro" onStart={() => setScreen('main')} />
        ) : (
          <MainScreen key="main" />
        )}
      </AnimatePresence>
    </div>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center cursor-pointer relative"
      style={{ backgroundColor: '#ffe4e1' }}
      onClick={onStart}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Header */}
      <div className="absolute top-0 w-full p-8 flex justify-center items-center z-10">
        <h1 className="text-pink-500 font-extrabold text-4xl flex items-center gap-3 drop-shadow-md tracking-tight">
          <span>🍬</span>
          WhiteDay Match
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-7xl flex gap-4 drop-shadow-lg"
        >
          <span>💖</span>
        </motion.div>
      </div>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="pb-24 text-pink-600 font-bold text-lg tracking-wide drop-shadow-sm"
      >
        화면을 터치해서 시작해보세요 👆
      </motion.div>
    </motion.div>
  );
}

function MainScreen() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const controls = useAnimation();

  const errorMessages = [
    "Error 404: 거절 버튼을 찾을 수 없습니다.",
    "치명적인 매력으로 인해 무한 루프에 빠졌습니다.",
    "경고: 왼쪽으로 넘기면 내 마음이 아픕니다.",
    "이 앱은 우측 스와이프 전용으로 하드코딩 되어있습니다.",
    "System: 당신의 거절 요청이 방화벽에 막혔습니다.",
    "거절 기능은 안 만들었습니다."
  ];

  const showRandomToast = () => {
    const msg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAccept = async () => {
    await controls.start({ x: window.innerWidth, rotate: 20, opacity: 0, transition: { duration: 0.4 } });
    setShowModal(true);
  };

  const handleRejectClick = async () => {
    showRandomToast();
    await controls.start({ x: [-20, 20, -10, 10, 0], transition: { duration: 0.4 } });
  };

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      handleAccept();
    } else if (offset < -50 || velocity < -500) {
      showRandomToast();
    }
  };

  return (
    <motion.div
      className="w-full h-full relative bg-gray-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Toast */}
      <div className="absolute top-20 w-full flex justify-center z-50 pointer-events-none">
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg font-medium text-sm text-center max-w-[85%] mx-auto"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Container */}
      <div className="relative w-[85%] max-w-sm h-[70vh] max-h-[650px] mt-8 z-20">
        <motion.div
          className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden absolute top-0 left-0 border border-gray-100 flex flex-col"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          animate={controls}
          whileDrag={{ scale: 1.02, cursor: "grabbing" }}
          style={{ touchAction: "none" }}
        >
          {/* Profile Image */}
          <div className="w-full h-[55%] bg-gray-200 flex items-center justify-center relative overflow-hidden">
            <img 
              src={profileImg} 
              alt="Profile" 
              className="w-full h-full object-cover object-bottom pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            {/* Status Badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-pink-600 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              화이트데이 데이트 로딩 중 💻
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6 flex-1 flex flex-col bg-white">
            <div className="flex items-end gap-2 mb-1">
              <h2 className="text-3xl font-extrabold text-gray-800">양춘봉</h2>
              <span className="text-gray-400 font-medium mb-1 text-lg">28</span>
            </div>
            <p className="text-pink-500 font-bold text-sm mb-4">
              직업 : 오늘만 개발자
            </p>
            <div className="bg-pink-50/50 rounded-2xl p-4 flex-1 border border-pink-100/50">
              <p className="text-gray-700 text-sm leading-relaxed font-medium break-keep">
                "오늘 하루, 당신만을 위한 전담 개발자가 되어드립니다. 성공적인 화이트데이 데이트를 위해 얌전히 하트를 누르시오."
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-8 mt-10 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRejectClick}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 border border-gray-100"
        >
          <X size={32} strokeWidth={3} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAccept}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-green-500 border border-gray-100"
        >
          <Heart size={32} strokeWidth={3} fill="currentColor" />
        </motion.button>
      </div>

      {/* Modal & Particles */}
      <AnimatePresence>
        {showModal && <SuccessModal />}
      </AnimatePresence>
    </motion.div>
  );
}

function SuccessModal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <HeartParticles />
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white rounded-3xl p-8 max-w-[85%] text-center shadow-2xl relative z-10 border-4 border-pink-200"
      >
        <div className="text-6xl mb-6 drop-shadow-md">😈💖</div>
        <h2 className="text-2xl font-extrabold text-pink-600 mb-4 break-keep">걸려들었다!</h2>
        <p className="text-gray-700 font-medium leading-relaxed break-keep">
          이제 환불 및 예약 취소는 불가능합니다.<br/>
          넌 도망 못 가<br/><br/>
          <span className="font-bold text-pink-500 text-lg">해피 화이트데이 🍬</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

function HeartParticles() {
  const particles = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 2 + 2;
        return (
          <motion.div
            key={i}
            className="absolute text-2xl drop-shadow-sm"
            initial={{
              left: `${left}%`,
              top: '-10%',
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360,
            }}
            animate={{
              top: '110%',
              rotate: Math.random() * 360 + 360,
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
            }}
          >
            {['💖', '🍬', '😈'][Math.floor(Math.random() * 3)]}
          </motion.div>
        );
      })}
    </div>
  );
}
