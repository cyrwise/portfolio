// Education.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { schools } from './educationData';
import EducationScene from './EducationScene';
import EducationCard3D from './EducationCard3D';
import ExpandedView from './ExpandedView';
import DropdownSection from '../DropdownSection';

const EducationItem = ({ school }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="border-l-2 border-[#FF533D] pl-6 py-4"
  >
    <div className="flex items-center gap-4 mb-2">
      <img 
        src={school.logo} 
        alt={school.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{school.name}</h3>
          <span className="text-[#FF533D] text-sm">{school.period}</span>
        </div>
        <p className="text-gray-400 text-sm">{school.role}</p>
      </div>
    </div>

    <div className="mt-4 ml-2">
      <h4 className="text-[#FF533D] font-medium mb-2 text-sm">Relevant Coursework</h4>
      <ul className="space-y-1">
        {school.courses.map((course, index) => (
          <li key={index} className="text-gray-400 text-sm">{course}</li>
        ))}
      </ul>
    </div>

    <div className="mt-4 ml-2">
      <h4 className="text-[#FF533D] font-medium mb-2 text-sm">Activities</h4>
      <ul className="space-y-2">
        {school.activities.map((activity, index) => (
          <li key={index} className="flex items-center gap-2">
            <img 
              src={activity.logo} 
              alt={activity.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-gray-400 text-sm">{activity.name}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default function Education() {
  const [is3DView, setIs3DView] = useState(false);
  const [expandedSchool, setExpandedSchool] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const ViewToggleButton = (
    <button
      onClick={() => setIs3DView(!is3DView)}
      className="px-4 py-2 bg-[#FF533D]/10 text-[#FF533D] rounded hover:bg-[#FF533D]/20 transition-colors text-sm"
    >
      {is3DView ? '2D View' : '3D View'}
    </button>
  );

  const educationContent = (
    <>
      {is3DView ? (
        <div className="h-[800px]">
          <EducationScene>
            <EducationCard3D
              position={[-2, 0, 0]}
              school={schools[0]}
              isExpanded={expandedSchool === 0}
              onClick={() => {
                setExpandedSchool(0);
                setShowDetails(true);
              }}
            />
            <EducationCard3D
              position={[2, 0, 0]}
              school={schools[1]}
              isExpanded={expandedSchool === 1}
              onClick={() => {
                setExpandedSchool(1);
                setShowDetails(true);
              }}
            />
          </EducationScene>

          <ExpandedView
            show={showDetails}
            school={expandedSchool !== null ? schools[expandedSchool] : null}
            onClose={() => {
              setShowDetails(false);
              setExpandedSchool(null);
            }}
          />
        </div>
      ) : (
        <div className="space-y-8">
          {schools.map((school, index) => (
            <EducationItem key={index} school={school} />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="relative w-full bg-[#001018]">
      <DropdownSection 
        title="Education" 
        extraButton={ViewToggleButton}
      >
        {educationContent}
      </DropdownSection>
    </div>
  );
}
