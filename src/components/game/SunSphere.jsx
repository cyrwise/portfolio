import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const SunSphere = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial
        color="#FDB813"
        emissive="#FDB813"
        emissiveIntensity={0.5}
        metalness={0.1}
        roughness={0.6}
      />
    </mesh>
  );
};

export default SunSphere;
