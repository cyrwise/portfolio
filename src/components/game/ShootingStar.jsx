// ShootingStar.jsx
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ShootingStar = () => {
  const mainStar = useRef();
  const trail = useRef();
  const active = useRef(Math.random() > 0.5);
  const trailPoints = useRef([]);
  const maxTrailLength = 20;
  
  const trailGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const trailMaterial = useMemo(() => 
    new THREE.LineBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.6,
    }), []
  );

  const resetPosition = () => {
    const startX = Math.random() * 500 - 250;
    const startY = Math.random() * 500 - 250;
    const startZ = Math.random() * 200 - 100;
    
    mainStar.current.position.set(startX, startY, startZ);
    trailPoints.current = [];
    active.current = Math.random() > 0.3;
  };

  useFrame(() => {
    if (!active.current) {
      if (Math.random() > 0.99) {
        resetPosition();
      }
      return;
    }

    // Update main star position
    mainStar.current.position.x += 2;
    mainStar.current.position.y -= 1;

    // Update trail
    trailPoints.current.unshift([
      mainStar.current.position.x,
      mainStar.current.position.y,
      mainStar.current.position.z
    ]);

    if (trailPoints.current.length > maxTrailLength) {
      trailPoints.current.pop();
    }

    // Update trail geometry
    const positions = new Float32Array(trailPoints.current.flat());
    trailGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    // Reset when out of view
    if (mainStar.current.position.x > 250 || 
        Math.abs(mainStar.current.position.y) > 250) {
      resetPosition();
    }
  });

  return (
    <group>
      <mesh ref={mainStar} position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <line ref={trail} geometry={trailGeometry} material={trailMaterial} />
    </group>
  );
};

export default ShootingStar;
