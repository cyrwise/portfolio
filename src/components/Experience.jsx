// Experience.jsx
import React from 'react';

const Experience = () => {
  return (
    <div className="bg-[#001018] p-8 max-w-4xl mx-auto">
      <h2 className="text-[#FF533D] text-3xl font-bold mb-8">&gt;&gt; Places I've Worked</h2>
      
      <div className="space-y-6">
        <ExperienceItem 
          company=".."
          logo="/s-logo.png"
          role="."
          date="."
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
