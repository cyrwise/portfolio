// MouseTrackingText.jsx
import React from 'react';
import useMousePosition from '../hooks/useMousePosition';

const MouseTrackingText = ({ text, position }) => {
  const mousePosition = useMousePosition();
  
  const calculateRotation = () => {
    const dx = mousePosition.x - window.innerWidth / 2;
    const dy = mousePosition.y - window.innerHeight / 2;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return angle;
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: position[0],
        top: position[1],
        transform: `rotate(${calculateRotation()}deg)`,
        color: '#FF533D',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        transition: 'transform 0.1s ease-out',
        zIndex: 20,
      }}
    >
      {text}
    </div>
  );
};

export default MouseTrackingText;
