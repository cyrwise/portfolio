// Projects.jsx
import React from 'react';
import DropdownSection from './DropdownSection';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Import project images
import project1Image from '/src/assets/images/projects/CoolSquare.jpg';
import project2Image from '/src/assets/images/projects/CoolSquare.jpg';
import project3Image from '/src/assets/images/projects/CoolSquare.jpg';

function Projects() {
  const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application built with modern technologies",
      tech: ["React", "Node.js", "MongoDB"],
      image: project1Image,
      websiteUrl: "https://project1.com",
      githubUrl: "https://github.com/username/project1"
    },
    {
      title: "Project 2",
      description: "Interactive data visualization dashboard",
      tech: ["React", "D3.js", "Firebase"],
      image: project2Image,
      websiteUrl: "https://project2.com"
    },
    {
      title: "Project 3",
      description: "Real-time chat application",
      tech: ["Socket.io", "Express", "Redis"],
      image: project3Image,
      githubUrl: "https://github.com/username/project3"
    },
    {
      title: "Project 4",
      description: "Real-time chat application",
      tech: ["Socket.io", "Express", "Redis"],
      image: project3Image,
      githubUrl: "https://github.com/username/project3"
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
</div>

    </DropdownSection>
  );
}

export default Projects;
