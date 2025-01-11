// SkillsPV.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BallCanvas } from "./Ball";

function SkillsPV({ skills, viewMode }) {
  const [skillPositions, setSkillPositions] = useState({});

  useEffect(() => {
    const generatePositions = () => {
      const positions = {};
      skills.forEach((skill) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 50 + Math.random() * 100;
        
        positions[skill.name] = {
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: (Math.random() * 200) - 100,
          z: radius * Math.sin(phi) * Math.sin(theta)
        };
      });
      setSkillPositions(positions);
    };

    generatePositions();
  }, [skills]);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-16 gap-y-12 p-8">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center justify-center interactive"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-[#FF533D] font-semibold text-lg mb-4">
              {skill.name}
            </p>
            <div className="w-24 h-24">
              <BallCanvas icon={skill.icon} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillsPV;
