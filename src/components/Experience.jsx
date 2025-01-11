import React, { useState, useEffect } from 'react';
import DropdownSection from './DropdownSection';
import RetroOverlay from './RetroOverlay';

import nasaLogo from '/src/assets/images/experience/nasa-logo.png';
import anreLogo from '/src/assets/images/experience/anre-logo.png';
import bccLogo from '/src/assets/images/experience/bcc-logo.png';
import ivycodeLogo from '/src/assets/images/experience/ivycode-logo.png';
import sccrLogo from '/src/assets/images/experience/sccr-logo.jpg';

const Experience = () => {
  return (
    <DropdownSection title="Technical Experience">
      <RetroOverlay />
      <div className="space-y-6 relative">
        <ExperienceItem 
          company="NASA"
          logo={nasaLogo}
          role="NCAS Intern"
          date="Jan 2025 - Present"
          className="border-l-[#FF533D]"
          description="Participating in NASA's National Community College Aerospace Scholars program, working on space-related projects and research."
        />
        <ExperienceItem 
          company="Anre AI"
          logo={anreLogo}
          role="Software Engineer"
          date="Oct 2023 - Present"
          className="border-l-[#FF533D]"
          description="Developing AI-powered solutions for various industries, focusing on machine learning and data analysis."
        />
        <ExperienceItem 
          company="Berkeley City College"
          logo={bccLogo}
          role="Computer Science TA, Computer Science, Physics and Math Tutor"
          date="Aug 2023 - Present"
          className="border-l-[#FF533D]"
          description="Assisting students in computer science courses, providing tutoring in CS, physics, and math subjects."
        />
        <ExperienceItem 
          company="IvyCode Consulting"
          logo={ivycodeLogo}
          role="Software Engineering Intern"
          date="Jun 2024 - Aug 2024"
          className="border-l-[#FF533D]"
          description="Worked on various software development projects, gaining hands-on experience in full-stack development and consulting."
        />
        <ExperienceItem 
          company="Stanford Center for Clinical Research"
          logo={sccrLogo}
          role="Deep Learning Researcher"
          date="Oct 2023 - Jan 2024"
          className="border-l-[#FF533D]"
          description="Conducted research on applying deep learning techniques to clinical data, contributing to advancements in medical research."
        />
      </div>
    </DropdownSection>
  );
};

const ExperienceItem = ({ company, logo, role, date, className, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isFlipped) {
      if (index < description.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + description[index]);
          setIndex(index + 1);
        }, 5); // Adjust speed here. SMALLER = FASTER
        return () => clearTimeout(timer);
      }
    } else {
      setDisplayText("");
      setIndex(0);
    }
  }, [index, description, isFlipped]);

  return (
    <div
      className={`flex items-center p-4 bg-opacity-10 bg-[#F5F5F5] 
        border-l-4 ${className} rounded-r transition-all duration-300 
        hover:translate-x-2 hover:bg-opacity-20 cursor-pointer clickable-element
        min-h-[96px] max-h-[96px]`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="w-full flex items-center">
        {isFlipped ? (
          <div className="text-[#A5997A] text-sm w-full">
            {displayText}
            <span
              className="animate-pulse"
              style={{ opacity: index >= description.length ? 1 : 0 }}
            >|</span>
          </div>
        ) : (
          <>
            <img src={logo} alt={company} className="w-12 h-12 mr-4 rounded flex-shrink-0" />
            <div className="flex-grow min-w-0">
              <h3 className="text-[#FF533D] font-bold text-xl truncate">{company}</h3>
              <p className="text-[#A5997A] text-sm truncate">{role}</p>
            </div>
            <span className="text-[#F5F5F5] text-sm ml-4 flex-shrink-0">{date}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Experience;
