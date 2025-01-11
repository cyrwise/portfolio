// Portfolio.jsx
import React from 'react';
import Hero from './Hero';
import Experience from './Experience';
import Education from './education/Education';
import Projects from './Projects';
import Skills from './Skills';
import Footer from './Footer';


const Portfolio = ({ setIsGameLocked }) => {
  return (
    <div className="portfolio-container">
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Skills setIsGameLocked={setIsGameLocked} />
      <Footer />
    </div>
  );
};

export default Portfolio;
