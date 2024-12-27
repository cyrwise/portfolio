// Controls.jsx
import React, { useState } from 'react';
import './Controls.css';

function Controls({ keysPressed }) {
  const [speedToggle, setSpeedToggle] = useState(false);
  const [pressedButtons, setPressedButtons] = useState(new Set());

  const controls = [
    ['arrowup', '↑ Forward'],
    ['arrowdown', '↓ Backward'],
    ['arrowleft', '← Left'],
    ['arrowright', '→ Right'],
    ['shift', '⇧ Down'],
    [' ', '␣ Up'],
  ];

  const handleSpeedToggle = () => {
    setSpeedToggle(!speedToggle);
    if (!speedToggle) {
      keysPressed.current.add('e');
    } else {
      keysPressed.current.delete('e');
    }
  };

  const handlePointerDown = (key) => {
    keysPressed.current.add(key);
    setPressedButtons((prev) => new Set([...prev, key]));
  };

  const handlePointerUp = (key) => {
    keysPressed.current.delete(key);
    setPressedButtons((prev) => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 9999,
        background: 'rgba(0,0,0,0.5)',
        padding: '8px',
        borderRadius: '4px',
        width: '120px',
      }}
    >
      {controls.map(([key, label]) => (
        <button
          key={key}
          className={`control-button ${pressedButtons.has(key) ? 'active' : ''}`}
          onPointerDown={() => handlePointerDown(key)}
          onPointerUp={() => handlePointerUp(key)}
          onPointerLeave={() => handlePointerUp(key)}
        >
          {label}
        </button>
      ))}
      <button
        className={`control-button ${speedToggle ? 'active' : ''}`}
        onClick={handleSpeedToggle}
        style={{ marginTop: '8px' }}
      >
        E Speed 5x
      </button>
    </div>
  );
}

export default Controls;
