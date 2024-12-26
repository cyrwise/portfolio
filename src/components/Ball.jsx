// Ball.jsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "./Loader";

const Ball = ({ icon, index, total, planetView = false }) => {
  const [decal] = useTexture([icon]);
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (planetView) {
      const time = clock.getElapsedTime();
      const radius = 4;
      const speed = 0.5;
      
      const angle = (index / total) * Math.PI * 2 + time * speed;
      const verticalOffset = Math.sin(time + index) * 0.5;
      
      meshRef.current.position.x = Math.cos(angle) * radius;
      meshRef.current.position.z = Math.sin(angle) * radius;
      meshRef.current.position.y = verticalOffset;
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={2.0} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#ffffff'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={0.8}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, index, total, planetView = false }) => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      linear
      flat
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball 
          icon={icon} 
          index={index} 
          total={total} 
          planetView={planetView} 
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export { BallCanvas, Ball };
