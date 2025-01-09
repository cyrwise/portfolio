// Education.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EducationScene from './EducationScene';
import EducationCard3D from './EducationCard3D';
import ExpandedView from './ExpandedView';

import ucbLogo from '/src/assets/images/education/berkeley-logo.jpg';
import bccLogo from '/src/assets/images/education/bcc-logo.png';

import anreLogo from '/src/assets/images/education/anre-logo.png';
import csuaLogo from '/src/assets/images/education/csua-logo.png';
import openProjectLogo from '/src/assets/images/education/openproject-logo.png';
import ispmaLogo from '/src/assets/images/education/ispma-logo.png';

import bamLogo from '/src/assets/images/education/bam-logo.png';
import beeLogo from '/src/assets/images/education/bee-logo.png';
import fblaLogo from '/src/assets/images/education/fbla-logo.png';
import wlcLogo from '/src/assets/images/education/wlc-logo.png';
// import designClubLogo from '/src/assets/images/education/designclub-logo.png';

const schools = {
  berkeley: {
    name: "UC Berkeley",
    logo: ucbLogo,
    years: "2023 - present",
    degree: "Computer Science, B.S.",
    courses: [
      "EECS 16A: Designing Information Devices and Systems I",
      "EECS 16B: Designing Information Devices and Systems II",
      "ENERES C100: Energy and Society",
      "CS 61A (Laney): Structure and Interpretation of Computer Programs"
    ],
    activities: [
      "Anre AI Berkeley",
      "Computer Science Undergraduate Association",
      "OpenProject",
      "International Software Product Management Association",
    ],
    activityImages: [
      anreLogo,
      csuaLogo,
      openProjectLogo,
      ispmaLogo
    ]
  },
  bcc: {
    name: "Berkeley City College",
    logo: bccLogo,
    years: "2022 - 2025",
    degree: "Associate's Degree",
    courses: [
      "CIS 25: Object Orientated Programming C++",
      "CIS 27: Data Structures & Algorithms",
      "CIS 36A: Java Programming",
      "COMSC 260: Assembly Programming/Computer Organization",
      "MATH 3E: Linear Algebra",
    ],
    activities: [
      "Berkeley Applied Mathematics",
      "Berkeley Electronics & Engineering",
      "Future Business Leaders of America",
      "Women's Leadership Club at BCC",
      // "Design Club at BCC"
    ],
    activityImages: [
      bamLogo,
      beeLogo,
      fblaLogo,
      wlcLogo,
      // designClubLogo
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
        className="text-center absolute w-full top-10 text-5xl font-bold text-red-500 z-10"
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
