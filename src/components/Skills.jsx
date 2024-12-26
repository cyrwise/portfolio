import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BallCanvas } from "./Ball";
import './Skills.css';

// Import logos
import reactLogo from '/src/assets/images/skills/react-logo.png';
import jsLogo from '/src/assets/images/skills/javascript-logo.png';
import nodeLogo from '/src/assets/images/skills/nodejs-logo.png';
import dockerLogo from '/src/assets/images/skills/docker-logo.png';


const SkillCategory = ({ title, skills }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="category-container">
      <motion.button
        className="category-bag"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {title}
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="skills-grid"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  delay: index * 0.1,
                  bounce: 0.4
                }}
              >
                <span className="skill-name">{skill.name}</span>
                <div className="sphere-container">
                  <BallCanvas 
                    icon={skill.icon}
                    index={index}
                    total={skills.length}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Skills() {
  const categories = {
    Frontend: [
      { name: "React", icon: reactLogo },
      { name: "JavaScript", icon: jsLogo },
    ],
    Backend: [
      { name: "Node.js", icon: nodeLogo },
    ],
    "Machine Learning": [
      { name: "Docker", icon: dockerLogo },
    ]
  };

  return (
    <div className="skills-container">
      <h1 className="skills-title">Skills</h1>
      <div className="categories-wrapper">
        {Object.entries(categories).map(([title, skills]) => (
          <SkillCategory key={title} title={title} skills={skills} />
        ))}
      </div>
    </div>
  );
}

export default Skills;
