import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Ball } from "./Ball";
import CanvasLoader from "./Loader";

const CenterSphere = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#FF533D"
        metalness={0.8}
        roughness={0.2}
        transparent={false}
      />
    </mesh>
  );
};

const SkillScene = ({ skills }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ height: "500px" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <CenterSphere />
        {skills.map((skill, index) => (
          <Ball 
            key={skill.name}
            icon={skill.icon}
            index={index}
            total={skills.length}
            planetView={true}
          />
        ))}
      </Suspense>
    </Canvas>
  );
};

export default SkillScene;
