// Skills.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import SkillsPV from "./SkillsPV";
import { useNavigate } from 'react-router-dom';
import DropdownSection from './DropdownSection';
import './Skills.css';

// Backend Logos
import pythonLogo from '/src/assets/images/skills/python-logo.png';
import cppLogo from '/src/assets/images/skills/cpp-logo.png';
import javaLogo from '/src/assets/images/skills/java-logo.png';
import rustLogo from '/src/assets/images/skills/rust-logo.png';
import asmLogo from '/src/assets/images/skills/asm-logo.png';

// Frontend Logos
import reactLogo from '/src/assets/images/skills/react-logo.png';
import svelteLogo from '/src/assets/images/skills/sveltekit-logo.png';
import nodeLogo from '/src/assets/images/skills/nodejs-logo.png';
import nextLogo from '/src/assets/images/skills/nextjs-logo.svg';
import jsLogo from '/src/assets/images/skills/javascript-logo.png';

// ML Logos
import tensorflowLogo from '/src/assets/images/skills/tensorflow-logo.webp';
import pytorchLogo from '/src/assets/images/skills/pytorch-logo.png';
import scikitLearnLogo from '/src/assets/images/skills/scikitlearn-logo.png';
import opencvLogo from '/src/assets/images/skills/opencv-logo.png';
import pandasLogo from '/src/assets/images/skills/pandas-logo.png';

// Dev Tool Logos
import dockerLogo from '/src/assets/images/skills/docker-logo.png';
import kubernetesLogo from '/src/assets/images/skills/kubernetes-logo.png';
import awsLogo from '/src/assets/images/skills/aws-logo.png';
import cudaLogo from '/src/assets/images/skills/cuda-logo.png';
import figmaLogo from '/src/assets/images/skills/figma-logo.png';

function Skills({ setIsGameLocked }) {  
  const [activeCategory, setActiveCategory] = useState("Backend");
  const [viewMode, setViewMode] = useState("planet");
  const navigate = useNavigate();

  const categories = {
    Frontend: [
      { name: "React", icon: reactLogo },
      { name: "Svelte", icon: svelteLogo },
      { name: "Next.js", icon: nextLogo },
      { name: "Node.js", icon: nodeLogo },
      { name: "JavaScript", icon: jsLogo },
    ],
    Backend: [
      { name: "Python", icon: pythonLogo },
      { name: "C++", icon: cppLogo },
      { name: "Java", icon: javaLogo },
      { name: "Rust", icon: rustLogo },
      { name: "Assembly", icon: asmLogo },
      { name: "SQL", icon: asmLogo }
    ],
    "Machine Learning": [
      { name: "TensorFlow", icon: tensorflowLogo },
      { name: "PyTorch", icon: pytorchLogo },
      { name: "SciKit-learn", icon: scikitLearnLogo },
      { name: "OpenCV", icon: opencvLogo },
      { name: "Pandas", icon: pandasLogo },
    ],
    "Dev Tools": [
      { name: "Docker", icon: dockerLogo },
      { name: "Kubernetes", icon: kubernetesLogo },
      { name: "AWS", icon: awsLogo },
      { name: "CUDA", icon: cudaLogo },
      { name: "Figma", icon: figmaLogo },
    ],
  };

  const handleGameView = () => {
    const positions = {};
    categories[activeCategory].forEach((skill) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 50 + Math.random() * 100;
      positions[skill.name] = {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: (Math.random() * 200) - 100,
        z: radius * Math.sin(phi) * Math.sin(theta)
      };
    });
    
    navigate('/game', { 
      state: { 
        skills: categories[activeCategory],
        skillPositions: positions,
        isGameView: true
      },
      replace: true
    });
  };

  const GameViewButton = (
    <motion.button
      className="px-4 py-2 bg-[#0A192F] text-[#FF533D] rounded-md border border-[#FF533D]/30 
                hover:bg-[#FF533D]/10 transition-all duration-300 interactive"
      onClick={handleGameView}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Game View
    </motion.button>
  );

  return (
    <div className="w-full bg-[#001018]">
      <DropdownSection title="Skills" extraButton={GameViewButton}>
        <div className="space-y-8 py-4">
          <div className="flex justify-center gap-4 flex-wrap">
            {Object.keys(categories).map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-2 rounded-md transition-all duration-300 interactive
                  ${activeCategory === category 
                    ? 'bg-[#FF533D] text-[#001018] font-semibold' 
                    : 'bg-[#0A192F] text-[#FF533D] border border-[#FF533D]/30 hover:bg-[#FF533D]/10'
                  }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="relative bg-[#0A192F] rounded-lg p-8">
            <SkillsPV 
              skills={categories[activeCategory]}
              viewMode={viewMode}
            />
          </div>
        </div>
      </DropdownSection>
    </div>
  );
}

export default Skills;
