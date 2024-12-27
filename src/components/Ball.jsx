import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture, Html } from "@react-three/drei";
import CanvasLoader from "./Loader";

const SkillLabel = ({ text, position }) => (
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

const Ball = ({ icon, index, total, planetView = false, position, rotation, scale, name }) => {
  const [decal] = useTexture([icon]);
  const meshRef = useRef();
  const initialRotation = useRef([0, Math.random() * Math.PI * 2, 0]);
  
  useFrame(({ clock }) => {
    if (planetView) {
      // Smooth continuous rotation
      meshRef.current.rotation.y = initialRotation.current[1] + clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group position={position || [0, 0, 0]}>
      <Float speed={1.75} rotationIntensity={0.5} floatIntensity={0.5}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 0, 0.05]} />
        <mesh 
          ref={meshRef} 
          castShadow 
          receiveShadow 
          scale={planetView ? 2.75 : 2.75}
        >
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
        {planetView && name && (
          <Html position={[0, 3, 0]}>
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
              {name}
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
};

const BallCanvas = ({ icon, index, total, planetView = false }) => {
  return (
    <Canvas
      frameloop={planetView ? 'always' : 'demand'}
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={planetView ? {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-20, 3, 5]
      } : undefined}
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
