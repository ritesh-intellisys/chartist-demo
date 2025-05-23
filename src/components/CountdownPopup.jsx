import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo1 from '../assets/Logo22.png';
import Logo2 from '../assets/intellisys.gif';



const CountdownPopup = ({ onClose }) => {
  const [countdown, setCountdown] = useState(10);
  const [isVisible, setIsVisible] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCelebration(true);
      
      // Try to load confetti, but don't fail if it doesn't work
      import('canvas-confetti').then((confetti) => {
        confetti.default({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }).catch(() => {
        console.log('Confetti animation could not be loaded');
      });

      const timer = setTimeout(() => {
        setShowCelebration(false);
        setIsVisible(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [countdown, onClose]);

  const handleMinimize = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            className="relative bg-gradient-to-br from-gray-900 via-black-900 to-blue-900 rounded-2xl p-8 max-w-5xl w-full shadow-2xl border border-purple-400 overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Close button */}
            <button
              onClick={handleMinimize}
              className="absolute top-4 right-4 text-white hover:text-purple-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img src={Logo1} alt="Logo" className="h-12 w-12 text-purple-600" />
              </div>
            </div>

            {/* Welcome text */}
            <h1 className="text-5xl font-bold text-center text-white mb-2">Welcome to Pro Chartist!!</h1>
            <p className="text-2xl text-center text-purple-200 mb-6">Mr.Vishal Abhang</p>

            {/* Countdown */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-lg opacity-50"></div>
                <div className="relative w-32 h-32 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-full border-4 border-white shadow-xl">
                  <span className="text-5xl font-bold text-white">{countdown}</span>
                </div>
              </div>
            </div>

            {/* Celebration animation */}
            <AnimatePresence>
              {showCelebration && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-2xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center p-4"
                  >
                    <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-4">
                      Welcome!
                    </div>
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 10, -10, 0],
                      }}
                      transition={{ repeat: 3, duration: 0.5 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer with designer credit */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <div className="flex justify-center items-center space-x-2">
                <div className="w-15 h-8 bg-white rounded-full flex items-center justify-center">
                  {/* <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg> */}
                  <img src={Logo2} alt="Logo" className="h-8 w-15 text-blue-600" />
                </div>
                <span className="text-xs text-white opacity-80">Designed by Intellisys IT Solutions Pvt Ltd.</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CountdownPopup;