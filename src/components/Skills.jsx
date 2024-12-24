// Skills.jsx
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import CanvasLoader from "./Loader";
import './Skills.css';

// Import logos
import reactLogo from '/src/assets/images/skills/react-logo.png';
import jsLogo from '/src/assets/images/skills/javascript-logo.png';
import nodeLogo from '/src/assets/images/skills/nodejs-logo.png';

const Ball = ({ icon }) => {
  const [decal] = useTexture([icon]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball icon={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

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
            transition={{ 
              duration: 0.5,
              staggerChildren: 0.1
            }}
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
                  <BallCanvas icon={skill.icon} />
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
      // Add more frontend skills
    ],
    Backend: [
      { name: "Node.js", icon: nodeLogo },
      // Add more backend skills
    ],
    "Machine Learning": [
      // Add ML skills
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
