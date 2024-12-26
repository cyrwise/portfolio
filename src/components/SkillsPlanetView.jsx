import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Ball } from "./Ball";
import { Html } from '@react-three/drei';
import CanvasLoader from "./Loader";

const Label = ({ text, position }) => (
  <Html position={position}>
    <div style={{
      background: 'rgba(0,0,0,0.8)',
      padding: '2px 8px',
      borderRadius: '4px',
      color: 'white',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      {text}
    </div>
  </Html>
);

const SkillLabel = ({ text, position }) => (
  <Html position={position}>
    <div style={{
      padding: '2px 8px',
      color: '#FF533D', // Coral color
      fontSize: '12px',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      pointerEvents: 'none',
      fontWeight: '500',
    }}>
      {text}
    </div>
  </Html>
);

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
        emissive={emissive}
        metalness={0.4}
        roughness={0.7}
      />
      <Label text={name} position={[0, size + 0.5, 0]} />
    </mesh>
  );
};

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

const BackgroundStar = () => {
  const meshRef = useRef();
  
  // Generate random spherical coordinates
  const theta = Math.random() * Math.PI * 2; // Horizontal angle
  const phi = Math.random() * Math.PI; // Vertical angle
  const radius = 20 + Math.random() * 20; // Random distance from center
  
  // Convert to Cartesian coordinates
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);
  
  return (
    <mesh 
      ref={meshRef} 
      position={[x, y, z]}
    >
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial 
        color="#ffffff" 
        opacity={0.8 + Math.random() * 0.2}
        transparent
      />
    </mesh>
  );
};


const ShootingStar = () => {
  const meshRef = useRef();
  const active = useRef(Math.random() > 0.5);
  
  useFrame(() => {
    if (!active.current) return;
    
    meshRef.current.position.y -= 0.2;
    meshRef.current.position.x += 0.1;
    
    if (meshRef.current.position.y < -10) {
      meshRef.current.position.y = 15;
      meshRef.current.position.x = Math.random() * -10;
      active.current = Math.random() > 0.7;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[Math.random() * -10, Math.random() * 15, Math.random() * -5]}
      visible={active.current}
    >
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
};

const SkillsPlanetView = ({ skills }) => {
  const [cameraInfo, setCameraInfo] = useState({ x: 0, y: 0, z: 0, zoom: 1 });
  
  const handleCameraChange = (camera) => {
    setCameraInfo({
      x: camera.position.x.toFixed(2),
      y: camera.position.y.toFixed(2),
      z: camera.position.z.toFixed(2),
      zoom: camera.zoom.toFixed(2)
    });
  };

  return (
    <div className="planet-view-container">
      {/* Camera info overlay */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        color: '#FF533D',
        fontSize: '12px',
        zIndex: 100,
        background: 'rgba(0,0,0,0.5)',
        padding: '8px',
        borderRadius: '4px',
      }}>
        x: {cameraInfo.x} y: {cameraInfo.y} z: {cameraInfo.z}<br/>
        zoom: {cameraInfo.zoom}
      </div>

      <Canvas
        camera={{ 
          position: [-20, 10, 30],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        onCreated={({ camera }) => handleCameraChange(camera)}
      >
        <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={true}
          minDistance={10}
          maxDistance={100}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />

          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={2} />
          
          {/* Background stars */}
          {[...Array(3000)].map((_, i) => (
            <BackgroundStar key={`star-${i}`} />
          ))}
          
          {/* Solar System */}
          <SunSphere />
          <Label text="Sun" position={[0, 4, 0]} />
          <PlanetSphere name="Mercury" color="#E5E5E5" size={0.4} orbitRadius={4} orbitSpeed={0.8} />
          <PlanetSphere name="Venus" color="#FFA500" size={0.6} orbitRadius={6} orbitSpeed={0.7} />
          <PlanetSphere name="Earth" color="#4169E1" size={0.7} orbitRadius={8} orbitSpeed={0.6} emissive="#4169E1" />
          <PlanetSphere name="Mars" color="#FF4500" size={0.5} orbitRadius={10} orbitSpeed={0.5} />
          <PlanetSphere name="Jupiter" color="#DAA520" size={1.5} orbitRadius={13} orbitSpeed={0.4} />
          <PlanetSphere name="Saturn" color="#F4A460" size={1.2} orbitRadius={16} orbitSpeed={0.3} />
          <PlanetSphere name="Uranus" color="#40E0D0" size={1.0} orbitRadius={19} orbitSpeed={0.2} />
          <PlanetSphere name="Neptune" color="#4169E1" size={0.9} orbitRadius={22} orbitSpeed={0.1} />

          
          {/* Skills balls */}
          {skills?.map((skill, index) => (
            <Ball 
              key={skill.name}
              icon={skill.icon}
              index={index}
              total={skills.length}
              planetView={true}
            />
          ))}
          
          {/* Shooting stars */}
          {[...Array(3)].map((_, i) => (
            <ShootingStar key={`shooting-${i}`} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SkillsPlanetView;
