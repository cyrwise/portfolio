// PhotographyLoadingScreen.jsx
import { motion } from 'framer-motion';

const Leaf = ({ delay }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{ 
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      y: [0, -20, 0]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    style={{
      width: "20px",
      height: "40px",
      background: "#FF533D",
      borderRadius: "50% 0 50% 0",
      margin: "0 10px"
    }}
  />
);

const PhotographyLoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#001018] flex flex-col items-center justify-center z-50"
    >
      <motion.h2 
        className="text-[#FF533D] text-4xl mb-8"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading Experience...
      </motion.h2>
      
      <div className="flex items-center">
        <Leaf delay={0} />
        <Leaf delay={0.4} />
        <Leaf delay={0.8} />
      </div>
      
      <motion.p
        className="text-gray-300 mt-4"
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        This won't take long
      </motion.p>
    </motion.div>
  );
};

export default PhotographyLoadingScreen;
