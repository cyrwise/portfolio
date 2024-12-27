// PlanetsSkills.jsx
import React, { useEffect, useState } from 'react';
import { Ball } from '../Ball';

const PlanetsSkills = ({ skills }) => {
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const newPositions = {};
    const minDistance = 100; // Minimum distance between planets

    const calculateDistance = (pos1, pos2) => {
      const dx = pos1.x - pos2.x;
      const dy = pos1.y - pos2.y;
      const dz = pos1.z - pos2.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

    const isTooClose = (newPos) => {
      for (const existingPos of Object.values(newPositions)) {
        if (calculateDistance(newPos, existingPos) < minDistance) {
          return true;
        }
      }
      return false;
    };

    skills?.forEach((skill) => {
      let attempts = 0;
      let position;
      
      do {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 300 + Math.random() * 100;
        
        position = {
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: Math.abs(radius * Math.cos(phi)) // Force positive z values
        };
      
        // Ensure minimum distance from Milky Way
        if (position.z < -400) { // Keep away from Milky Way at z=-500
          continue;
        }
      
        attempts++;
      } while (isTooClose(position) && attempts < 100);
        // Prevent infinite loops

      newPositions[skill.name] = position;
    });

    setPositions(newPositions);
  }, [skills]);

  return (
    <>
      {skills?.map((skill, index) => (
        <Ball
          key={skill.name}
          icon={skill.icon}
          name={skill.name}
          index={index}
          total={skills.length}
          gameView={true}
          position={[
            positions[skill.name]?.x || 0,
            positions[skill.name]?.y || 0,
            positions[skill.name]?.z || 0
          ]}
          scale={3}
        />
      ))}
    </>
  );
};

export default PlanetsSkills;
