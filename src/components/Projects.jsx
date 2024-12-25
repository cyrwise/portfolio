import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedPolygons from './AnimatedPolygons';

function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application built with modern technologies",
      tech: ["React", "Node.js", "MongoDB"],
      image: "src/assets/images/projects/CoolSquare.jpg",
      link: "https://project1.com"
    },
    {
      title: "Project 2",
      description: "Interactive data visualization dashboard",
      tech: ["React", "D3.js", "Firebase"],
      image: "/path-to-project-image.jpg",
      link: "https://project2.com"
    },
    {
      title: "Project 3",
      description: "Real-time chat application",
      tech: ["Socket.io", "Express", "Redis"],
      image: "/path-to-project-image.jpg",
      link: "https://project3.com"
    }
  ];

  return (
    <section className="min-h-screen bg-[#001018] relative overflow-hidden">
      <AnimatedPolygons side="left" />
      <AnimatedPolygons side="right" />
      
      <div className="max-w-7xl mx-auto px-8 py-20">
  <motion.h2 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-6xl font-bold text-white mb-20 text-center"
  >
    Projects
  </motion.h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"> 
    {projects.map((project, index) => ( 
      <motion.div
        key={project.title}
        className="relative aspect-[1/1] group cursor-pointer overflow-hidden rounded-xl h-[400px]" // Change project block size here
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        onHoverStart={() => setHoveredProject(index)}
        onHoverEnd={() => setHoveredProject(null)}
        onClick={() => window.open(project.link, '_blank')}
      >
        <div className="absolute inset-0">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <motion.div
          className="absolute inset-0 p-8 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={hoveredProject === index ? { y: 0 } : { y: 20 }}
        >
          <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
          <p className="text-lg text-gray-200 mb-6">{project.description}</p>
        </motion.div>
      </motion.div>
    ))}
  </div>
</div>

    </section>
  );
}

export default Projects;
