// PlanetSphere.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Label from "./Label";

const PlanetSphere = ({ color, size, orbitRadius, orbitSpeed, emissive, name }) => {
    const meshRef = useRef();
    
    useFrame(({ clock }) => {
      const time = clock.getElapsedTime();
      meshRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
      meshRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
      meshRef.current.rotation.y = time * 0.5;
    });
  
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          emissive={emissive || color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.0}
        />
        <Label text={name} position={[0, size + 0.5, 0]} />
      </mesh>
    );
  };
  

export default PlanetSphere;
