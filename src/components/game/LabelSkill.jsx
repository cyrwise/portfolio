// LabelSkill.jsx
import React from "react";
import { Html } from "@react-three/drei";

const LabelSkill = ({ text, position }) => (
  <Html position={position}>
    <div style={{
      background: 'rgba(0,0,0,0.8)',
      padding: '2px 8px',
      borderRadius: '4px',
      color: '#FF533D',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      {text}
    </div>
  </Html>
);

export default LabelSkill;
