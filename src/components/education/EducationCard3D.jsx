// EducationCard3D.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { animated, useSpring } from '@react-spring/three';
import { Text } from '@react-three/drei';

export default function EducationCard3D({ position, rotation, school, degree, isExpanded, onClick }) {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, school.logo);
  
  useFrame((state) => {
    meshRef.current.rotation.y += 0.003;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002;
  });

  const springs = useSpring({
    scale: isExpanded ? [1.2, 1.2, 1.2] : [1, 1, 1],
    position: isExpanded ? [position[0], position[1] + 1, position[2]] : position,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <animated.mesh
      ref={meshRef}
      position={springs.position}
      scale={springs.scale}
      onClick={onClick}
    >
      <boxGeometry args={[3, 4, 0.2]} />
      <meshPhongMaterial
        map={texture}
        emissive="#444"
        metalness={0.8}
        roughness={0.2}
      />
      <Text
        position={[0, -1.5, 0.2]}
        fontSize={0.2}
        color="#ff4444"
        anchorX="center"
        anchorY="middle"
      >
        {school.name}
      </Text>
    </animated.mesh>
  );
}
