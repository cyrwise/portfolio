// Projects.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import DropdownSection from './DropdownSection';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import PhotographyLoadingScreen from './PhotographyLoadingScreen';

// Import project images
import placeholderImage from '/src/assets/images/projects/CoolSquare.jpg';
import gymberImage from '/src/assets/images/projects/gymber.png';
import sfImage from '/src/assets/images/projects/scholarship-finder.png';
import sgnnImage from '/src/assets/images/projects/structgnn-improved.png';
import spImage from '/src/assets/images/projects/space-portfolio.png';
import mymuseImage from '/src/assets/images/projects/MyMuseLogo.png';
import ranImage from '/src/assets/images/projects/RAN_LogoNewDM.png';


function Projects() {
  const projects = [
    {
      title: "Gymber",
      description: "A fitness-focused IOS mobile app for finding gym compatible workout partners in your area in a swipe format.",
      tech: ["Swift", "SwiftUI", "Firebase", "Node.js"],
      image: gymberImage,
    },
    {
      title: "Scholarship Finder",
      description: "AI powered scholarship locator with tips for application.",
      tech: ["React", "OpenAI API", "Firebase"],
      image: sfImage,
    },
    {
      title: "Improved StructGNN",
      description: "Upgraded version of Taiwan University's Graph Neural Network framework for static structural analysis, with added dynamic analysis and improved structure generation features utilizing SAP2000.",
      tech: ["Python", "PyTorch", "Graph Neural Networks", "SAP2000"],
      image: sgnnImage,
      githubUrl: "https://github.com/Mpascual7/StructGNN"
    },
    {
      title: "Space Game (portfolio)",
      description: "Web-focused maneuverable space exploration game featured in the skills section of this portfolio, with skills featured as randomly spread-out visitable planets.",
      tech: ["React", "Three.js", "WebGL"],
      image: spImage,
      githubUrl: "https://github.com/cyrwise/portfolio",
      websiteUrl: "https://cyruswise.com/game"
    },
    {
      title: "MyMuseAI",
      description: "Viral short-form content script generator MVP platform powered by LLM technology for SF's MindsDB hackathon.",
      tech: ["Node.js", "OpenAI API", "Streamlit"],
      image: mymuseImage,
      githubUrl: "https://github.com/cyrwise/MyMuseAI"
    },
    {
      title: "Research Assistant Nexus",
      description: "Research assistant platform which helps you find relevant research papers to your project on Arxiv.org, onboards new members quickly, and tracks the progression of your research.",
      tech: ["Next.js", "Node.js", "MongoDB", "OpenAI API", "SpaCy"],
      image: ranImage,
      websiteUrl: "https://ran.so"
    }
  ];
  
  return (
    <DropdownSection title="Projects">
      <div className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="relative group min-h-[250px] md:h-[300px] rounded overflow-hidden border-l-4 border-[#FF533D] bg-[#F5F5F5] bg-opacity-10 hover:bg-opacity-20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#FF533D]/60 to-[#FF533D]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex flex-col h-full p-3 md:p-4">
                  <h3 className="text-white font-bold text-base md:text-lg mb-2">{project.title}</h3>
                  <p className="text-white text-xs mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-2 py-0.5 text-xs bg-white/20 text-white rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    {project.websiteUrl && (
                      <a 
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#FF533D] transition-colors"
                      >
                        <FontAwesomeIcon icon={faGlobe} size="lg" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#FF533D] transition-colors"
                      >
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Not all projects are shown here due to private and ongoing work. 
            You can explore more of my open-source projects on{" "}
            <a 
              href="https://github.com/cyrwise" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#FF533D] hover:underline"
            >
              GitHub
            </a>.
          </p>
        </div>
      </div>
    </DropdownSection>
  );
}

export default Projects;