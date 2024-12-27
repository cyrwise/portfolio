import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, DoubleSide } from "three";

const MilkyWay = () => {
  const texture = useLoader(TextureLoader, '/src/assets/images/skills/milky-way.png');
  return (
    <mesh rotation={[0, 0, 0]} position={[0, 0, -500]}>
      <planeGeometry args={[1000, 1000]} />
      <meshBasicMaterial map={texture} side={DoubleSide} transparent opacity={0.8} />
    </mesh>
  );
};

export default MilkyWay;
