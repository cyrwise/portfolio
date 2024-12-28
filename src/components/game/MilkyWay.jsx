// MilkyWay.jsx
import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, DoubleSide } from "three";
import milkyWay from '/src/assets/images/skills/milky-way.png';

const MilkyWay = () => {
  const texture = useLoader(TextureLoader, milkyWay);
  return (
    <mesh rotation={[0, 0, 0]} position={[0, 0, -500]}>
      <planeGeometry args={[1000, 1000]} />
      <meshBasicMaterial map={texture} side={DoubleSide} transparent opacity={0.8} />
    </mesh>
  );
};

export default MilkyWay;
