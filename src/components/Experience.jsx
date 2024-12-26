// Experience.jsx
import React from 'react';
import RetroOverlay from './RetroOverlay';

const Experience = () => {
  return (
    <div className="bg-[#001018] p-8 max-w-4xl mx-auto relative">
      <RetroOverlay />
      <h2 className="text-[#FF533D] text-3xl font-bold mb-8 relative">&gt;&gt; Technical Experience</h2>
      
      <div className="space-y-6 relative">
        <ExperienceItem 
          company="NASA"
          logo="src/assets/images/experience/nasa-logo.png"
          role="NCAS Intern"
          date="January 2025 - ?"
          className="border-l-[#FF533D]"
        />
        <ExperienceItem 
          company="Anre AI"
          logo="src/assets/images/experience/anre-logo.png"
          role="Software Engineer"
          date="October 2023 - Present"
          className="border-l-[#FF533D]"
        />
        <ExperienceItem 
          company="Berkeley City College"
          logo="src/assets/images/experience/bcc-logo.png"
          role="Computer Science TA, Computer Science, Physics and Math Tutor"
          date="August 2023 - Present"
          className="border-l-[#FF533D]"
        />
        <ExperienceItem 
          company="IvyCode Consulting"
          logo="src/assets/images/experience/ivycode-logo.png"
          role="Software Engineering Intern"
          date="June 2024 - August 2024"
          className="border-l-[#FF533D]"
        />
        <ExperienceItem 
          company="Stanford Center for Clinical Research"
          logo="src/assets/images/experience/sccr-logo.jpg"
          role="Deep Learning Researcher"
          date="October 2023 - January 2024"
          className="border-l-[#FF533D]"
        />
      </div>
    </div>
  );
};


const ExperienceItem = ({ company, logo, role, date, className }) => {
  return (
    <div className={`flex items-center p-4 bg-opacity-10 bg-[#F5F5F5] 
      border-l-4 ${className} rounded-r transition-all duration-300 
      hover:translate-x-2 hover:bg-opacity-20`}>
      <img src={logo} alt={company} className="w-12 h-12 mr-4 rounded" />
      <div className="flex-grow">
        <h3 className="text-[#FF533D] font-bold text-xl">{company}</h3>
        <p className="text-[#A5997A] text-sm">{role}</p>
      </div>
      <span className="text-[#F5F5F5] text-sm">{date}</span>
    </div>
  );
};

export default Experience;
