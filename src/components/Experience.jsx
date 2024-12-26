// Experience.jsx
import React from 'react';

const Experience = () => {
  return (
    <div className="bg-[#001018] p-8 max-w-4xl mx-auto">
      <h2 className="text-[#FF533D] text-3xl font-bold mb-8">&gt;&gt; Places I've Worked</h2>
      
      <div className="space-y-6">
        <ExperienceItem 
          company="Cisco Meraki"
          logo="/meraki-logo.png"
          role="Meraki Vision Platform Firmware"
          date="Sept. 2024 - Dec. 2024"
          className="border-l-[#FF533D]"
        />
        
        <ExperienceItem 
          company="NVIDIA"
          logo="/nvidia-logo.png"
          role="Distributed Hardware Testing Infrastructure"
          date="Jun 2024 - Sep 2024"
          className="border-l-[#A5997A]"
        />
        
        <ExperienceItem 
          company="Cal Poly"
          logo="/calPoly-logo.png"
          role="Research, Artificial Intelligence"
          date="Nov 2023 - Apr. 2024"
          className="border-l-[#0F1626]"
        />
        
        <ExperienceItem 
          company="DeepWater Exploration"
          logo="/dw-logo.png"
          role="Firmware & Applications"
          date="May 2023 - Oct 2023"
          className="border-l-[#F5F5F5]"
        />
        
        <ExperienceItem 
          company="omegaUp"
          logo="/omega-logo.png"
          role="Software Engineering"
          date="Jun. 2020 - Aug 2020"
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
