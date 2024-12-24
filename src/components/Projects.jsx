import { motion } from 'framer-motion';
import { useState } from 'react';

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application built with modern technologies",
      tech: ["React", "Node.js", "MongoDB"],
      image: "/path-to-project-image.jpg"
    },
    {
      title: "Project 2",
      description: "Interactive data visualization dashboard",
      tech: ["React", "D3.js", "Firebase"],
      image: "/path-to-project-image.jpg"
    },
    {
      title: "Project 3",
      description: "Real-time chat application",
      tech: ["Socket.io", "Express", "Redis"],
      image: "/path-to-project-image.jpg"
    }
  ];

  return (
    <section className="min-h-screen bg-[#001018] py-20 relative overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white text-center mb-20"
      >
        Projects
      </motion.h2>
      
      <div className="relative h-[600px] max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="absolute top-1/2 left-1/2 w-[80%] max-w-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: index === activeIndex ? 1 : 0.3,
              scale: index === activeIndex ? 1 : 0.8,
              x: `calc(-50% + ${(index - activeIndex) * 100}px)`,
              y: '-50%',
              rotateY: (index - activeIndex) * 45,
              zIndex: projects.length - Math.abs(index - activeIndex)
            }}
            transition={{ duration: 0.5 }}
            onClick={() => setActiveIndex(index)}
            whileHover={{ scale: index === activeIndex ? 1.05 : 0.85 }}
          >
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-8 rounded-xl backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
              <p className="text-gray-300 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? 'bg-blue-500' : 'bg-white/20'
            }`}
            onClick={() => setActiveIndex(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
