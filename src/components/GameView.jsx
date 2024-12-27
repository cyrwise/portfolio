import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SkillsPlanetView from './SkillsPlanetView';

const GameView = ({ setIsGameLocked }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { skills, skillPositions } = location.state || {};

  useEffect(() => {
    // Force proper scaling on mount
    window.dispatchEvent(new Event('resize'));
  }, []);

  // Redirect if no skills data
  if (!skills || !skillPositions) {
    navigate('/skills');
    return null;
  }

  return (
    <div 
      className="game-container" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: '#000',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <SkillsPlanetView 
        skills={skills}
        skillPositions={skillPositions}
        setIsGameLocked={setIsGameLocked}
      />
      <button
        onClick={() => navigate('/skills')}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
          background: 'rgba(255,83,61,0.2)',
          border: '1px solid #FF533D',
          color: '#FF533D',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Exit Game
      </button>
    </div>
  );
};

export default GameView;
