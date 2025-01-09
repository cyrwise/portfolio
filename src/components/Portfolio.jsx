import React from 'react';
import Hero from './Hero';
import Experience from './Experience';
import Education from './education/Education';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Resume from './Resume';

const Portfolio = ({ setIsGameLocked }) => {
  return (
    <div className="portfolio-container">
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Skills setIsGameLocked={setIsGameLocked} />
    </div>
  );
};

export default Portfolio;
