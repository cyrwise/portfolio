// educationData.js
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

export const schools = [
  {
    name: "University of California, Berkeley",
    logo: ucbLogo,
    role: "Electrical Engineering & Computer Science Visitor",
    period: "2023 - present",
    courses: [
      "EECS 16A: Designing Information Devices and Systems I",
      "EECS 16B: Designing Information Devices and Systems II",
      "ENERES C100: Energy and Society",
      "CS 61A (Laney): Structure and Interpretation of Computer Programs"
    ],
    activities: [
      { name: "Anre AI Berkeley", logo: anreLogo },
      { name: "Computer Science Undergraduate Association", logo: csuaLogo },
      { name: "OpenProject", logo: openProjectLogo },
      { name: "International Software Product Management Association", logo: ispmaLogo }
    ]
  },
  {
    name: "Berkeley City College",
    logo: bccLogo,
    role: "Associate's Degree in Physics, Math, CS, Data Science",
    period: "2022 - 2025",
    courses: [
      "CIS 25: Object Orientated Programming C++",
      "CIS 27: Data Structures & Algorithms",
      "CIS 36A: Java Programming",
      "COMSC 260: Assembly Programming/Computer Organization",
      "MATH 3E: Linear Algebra"
    ],
    activities: [
      { name: "Berkeley Applied Mathematics", logo: bamLogo },
      { name: "Berkeley Electronics & Engineering", logo: beeLogo },
      { name: "Future Business Leaders of America", logo: fblaLogo },
      { name: "Women's Leadership Club at BCC", logo: wlcLogo }
    ]
  }
];
