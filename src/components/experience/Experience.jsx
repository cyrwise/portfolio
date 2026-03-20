// Experience.jsx
import React, { useState, useEffect } from 'react';
import DropdownSection from '../DropdownSection';
import RetroOverlay from '../RetroOverlay';
import { experienceData } from './experienceData';

const Experience = () => {
  return (
    <DropdownSection title="Technical Experience">
      <RetroOverlay />
      <div className="space-y-6 relative">
        {experienceData.map((job, index) => (
          <ExperienceItem 
            key={index}
            company={job.company}
            logo={job.logo}
            role={job.role}
            date={job.date}
            description={job.description}
            className="border-l-[#FF533D]"
          />
        ))}
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