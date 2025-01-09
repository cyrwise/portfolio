import React, { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { animated, useSpring } from '@react-spring/three';
import { Text } from '@react-three/drei';

export default function EducationCard3D({ position, school, isExpanded, onClick }) {
  const meshRef = useRef();
  const textRef = useRef();
  const texture = useLoader(TextureLoader, school.logo);
  const { camera } = useThree();
  
  useFrame((state) => {
    const hoverY = Math.sin(state.clock.elapsedTime) * 0.1;
    const hoverX = Math.cos(state.clock.elapsedTime * 0.5) * 0.05;
    
    if (meshRef.current) {
      meshRef.current.position.y = hoverY;
      meshRef.current.position.x = hoverX;
    }
    
    if (textRef.current) {
      textRef.current.position.set(
        hoverX,
        2.3 + hoverY,
        0
      );
      textRef.current.lookAt(camera.position);
    }
  });

  const springs = useSpring({
    scale: isExpanded ? [1.2, 1.2, 1.2] : [1, 1, 1],
    position: isExpanded ? [position[0], position[1] + 1, position[2]] : position,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <animated.group position={springs.position} scale={springs.scale}>
      <Text
        ref={textRef}
        position={[0, 2.3, 0]}
        fontSize={0.3}
        color="#FF533D"
        anchorX="center"
        anchorY="middle"
      >
        {school.years}
      </Text>
      <mesh
        ref={meshRef}
        onClick={onClick}
      >
        <boxGeometry args={[3, 4, 0.2]} />
        <meshBasicMaterial 
          map={texture}
          transparent={true}
          opacity={1}
        />
        <Text
          position={[0, -1.8, 0.2]}
          fontSize={0.2}
          color="#FF533D"
          anchorX="center"
          anchorY="middle"
        >
          {school.name}
        </Text>
      </mesh>
    </animated.group>
  );
}
