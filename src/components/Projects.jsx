// Projects.jsx
import React from 'react';
import DropdownSection from './DropdownSection';
import { motion } from 'framer-motion';
import AnimatedPolygons from './AnimatedPolygons';

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
      link: "https://project1.com"
    },
    {
      title: "Project 2",
      description: "Interactive data visualization dashboard",
      tech: ["React", "D3.js", "Firebase"],
      image: project2Image,
      link: "https://project2.com"
    },
    {
      title: "Project 3",
      description: "Real-time chat application",
      tech: ["Socket.io", "Express", "Redis"],
      image: project3Image,
      link: "https://project3.com"
    }
  ];
  
  return (
    <DropdownSection title="Projects">
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="relative group h-[400px] rounded overflow-hidden border-l-4 border-[#FF533D] bg-[#F5F5F5] bg-opacity-10 hover:bg-opacity-20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Front of card */}
              <div className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:[transform:rotateY(180deg)] [transform-style:preserve-3d] backface-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Back of card */}
              <div className="absolute inset-0 w-full h-full bg-[#001018] p-6 [transform:rotateY(-180deg)] transition-transform duration-500 group-hover:[transform:rotateY(0deg)] [transform-style:preserve-3d] backface-hidden">
                <div className="flex flex-col h-full">
                  <h3 className="text-[#FF533D] font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-[#F5F5F5] text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-3 py-1 text-xs bg-[#F5F5F5] bg-opacity-10 text-[#A5997A] rounded">
                        {tech}
                      </span>
                    ))}
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
