// Education.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EducationScene from './EducationScene';
import EducationCard3D from './EducationCard3D';
import ExpandedView from './ExpandedView';

import ucbLogo from '/src/assets/images/education/berkeley-logo.jpg';
import bccLogo from '/src/assets/images/education/bcc-logo.png';


const schools = {
  berkeley: {
    name: "UC Berkeley",
    logo: ucbLogo,
    degree: "Computer Science, B.S.",
    courses: [
      "CS 61A: Structure and Interpretation of Computer Programs",
      "CS 61B: Data Structures",
      "CS 70: Discrete Mathematics and Probability Theory",
      "EECS 126: Probability and Random Processes",
    ],
    activities: [
      "Computer Science Mentors (CSM)",
      "Berkeley Innovation",
      "Web Development Club",
    ]
  },
  bcc: {
    name: "Berkeley City College",
    logo: bccLogo,
    degree: "Associate's Degree",
    courses: [
      "Introduction to Programming",
      "Linear Algebra",
      "Multivariable Calculus",
      "Physics for Scientists and Engineers"
    ],
    activities: [
      "Mathematics Club President",
      "Coding Club Member",
      "Peer Tutor"
    ]
  }
};

export default function Education() {
  const [expandedSchool, setExpandedSchool] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative w-full h-screen bg-[#001018]">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-10 left-1/2 transform -translate-x-1/2 text-5xl font-bold text-red-500 z-10"
      >
        Education
      </motion.h1>

      <EducationScene>
        <EducationCard3D
          position={[-2, 0, 0]}
          school={schools.berkeley}
          isExpanded={expandedSchool === 'berkeley'}
          onClick={() => {
            setExpandedSchool('berkeley');
            setShowDetails(true);
          }}
        />
        <EducationCard3D
          position={[2, 0, 0]}
          school={schools.bcc}
          isExpanded={expandedSchool === 'bcc'}
          onClick={() => {
            setExpandedSchool('bcc');
            setShowDetails(true);
          }}
        />
      </EducationScene>

      <ExpandedView
        show={showDetails}
        school={expandedSchool ? schools[expandedSchool] : null}
        onClose={() => {
          setShowDetails(false);
          setExpandedSchool(null);
        }}
      />
    </div>
  );
}
