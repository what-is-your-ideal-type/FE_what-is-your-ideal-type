import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const MotionLoader = motion.create(Loader2);
const loadingTexts = [
  '당신의 이상형을 분석하고 있어요...',
  '당신의 이상형은 이런 스타일이군요...',
  '응답을 바탕으로 사진 생성을 시작할게요...',
  '당신의 이상형 사진을 생성하고 있어요...',
  '조금만 더 기다려주세요...',
  '거의 다 되었습니다...',
];

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2200);
    return () => clearInterval(textInterval);
  }, [isLoading]);

  return (
    <div className='fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
        <MotionLoader
          className='w-12 h-12 text-main'
          animate={{
            rotate: isLoading ? 360 : 0,
          }}
          transition={{
            duration: 2,
            ease: 'linear',
            repeat: isLoading ? Infinity : 0,
          }}
        />
        <AnimatePresence mode='wait'>
          <motion.p
            key={currentTextIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='text-lg text-main-hover whitespace-nowrap mt-8'
          >
            {loadingTexts[currentTextIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
