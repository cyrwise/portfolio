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
      className="skills-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="skill-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="skill-name">{skill.name}</span>
          <div className="sphere-container">
            <BallCanvas icon={skill.icon} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default SkillsPV;
