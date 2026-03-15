// NatureOverlay.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const Butterfly = ({ initialX, initialY }) => {
    const { scrollY } = useScroll();
    const yPosition = useTransform(scrollY, 
      [0, 1000], 
      [initialY, initialY + 200]
    );
  
    return (
      <motion.div
        style={{
          position: 'absolute',
          left: initialX,
          top: initialY,
          width: '30px', // Increased size
          height: '20px', // Increased size
          zIndex: 20 // Ensure visibility
        }}
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -15, 15, 0],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: Math.random() * 3 + 4, // Faster movement
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.svg 
          viewBox="0 0 30 20" 
          style={{ width: '100%', height: '100%' }}
        >
          <motion.g
            animate={{
              scale: [1, 1.2, 1],
              rotateY: [0, 30, 0, -30, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            fill="#FF533D"
          >
            <path d="M7,10 a7,4 0 1,0 0.1,0 z" opacity="0.8" />
            <path d="M23,10 a7,4 0 1,0 0.1,0 z" opacity="0.8" />
          </motion.g>
          <path d="M15,4 v12" stroke="#000" strokeWidth="0.5" />
        </motion.svg>
      </motion.div>
    );
  };

const Bee = ({ initialX, initialY }) => {
  const { scrollY } = useScroll();
  const yPosition = useTransform(scrollY,
    [0, 1000],
    [initialY, initialY + 150]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: initialX,
        top: 0,
        y: yPosition,
        width: '16px',
        height: '8px',
      }}
      animate={{
        x: [0, 50, -50, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: Math.random() * 3 + 5,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg viewBox="0 0 16 8">
        <ellipse cx="8" cy="4" rx="4" ry="2.5" fill="#FFD700" />
        <path d="M8,2 v4" stroke="#000" strokeWidth="2" />
        <circle cx="11" cy="4" r="1" fill="transparent" stroke="#FFD700" strokeWidth="0.5">
          <animate attributeName="opacity" values="0;1;0" dur="0.3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </motion.div>
  );
};

const NatureOverlay = () => {
    const [creatures, setCreatures] = useState([]);
  
    useEffect(() => {
      const generateCreatures = () => {
        const butterflies = Array.from({ length: 5 }, (_, i) => ({
          id: `butterfly-${i}`,
          type: 'butterfly',
          x: Math.random() * (window.innerWidth - 50),
          // Distribute across the full height, avoiding navbar
          y: Math.random() * (window.innerHeight - 100) + 80
        }));
  
        const bees = Array.from({ length: 3 }, (_, i) => ({
          id: `bee-${i}`,
          type: 'bee',
          x: Math.random() * (window.innerWidth - 30),
          // Distribute across the full height, avoiding navbar
          y: Math.random() * (window.innerHeight - 100) + 80
        }));
  
        return [...butterflies, ...bees];
      };
  
      setCreatures(generateCreatures());
  
      const handleResize = () => {
        setCreatures(generateCreatures());
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return (
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          zIndex: 5,
          marginTop: '60px' // Adjust this value based on your navbar height
        }}
      >
        {creatures.map((creature) => (
          creature.type === 'butterfly' ? (
            <Butterfly
              key={creature.id}
              initialX={creature.x}
              initialY={creature.y}
            />
          ) : (
            <Bee
              key={creature.id}
              initialX={creature.x}
              initialY={creature.y}
            />
          )
        ))}
      </div>
    );
  };
  

export default NatureOverlay;
