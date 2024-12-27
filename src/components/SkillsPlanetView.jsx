import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, PointerLockControls } from "@react-three/drei";
import { TextureLoader, DoubleSide, Vector3, MOUSE, TOUCH } from 'three';
import { Ball } from "./Ball";
import CanvasLoader from "./Loader";

const controlButtonStyle = {
  position: 'fixed',
  zIndex: 1000,
  background: 'rgba(255,83,61,0.2)',
  border: '1px solid #FF533D',
  color: '#FF533D',
  padding: '4px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: 'monospace',
  fontSize: '12px',
  touchAction: 'none',
  userSelect: 'none'
};


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
      background: 'rgba(0,0,0,0.8)',
      padding: '2px 8px',
      borderRadius: '4px',
      color: '#FF533D', // Coral color for skills
      fontSize: '12px',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      {text}
    </div>
  </Html>
);


const generateSkillPosition = () => {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI;
  const radius = 100 + Math.random() * 50; // Range
  
  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: (Math.random() * 600) - 300, // Vertical spread
    z: radius * Math.sin(phi) * Math.sin(theta)
  };
};

const MilkyWay = () => {
  const texture = useLoader(TextureLoader, '/src/assets/images/skills/milky-way.png');
  
  return (
    <mesh rotation={[0, 0, 0]} position={[0, 0, -500]}>
      <planeGeometry args={[1000, 1000]} />
      <meshBasicMaterial 
        map={texture} 
        side={DoubleSide}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
};

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

const BackgroundStars = React.memo(() => {
  // Generate star positions once when component mounts
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 20 + Math.random() * 180;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      const distance = Math.sqrt(x*x + y*y + z*z);
      const size = 0.05 + (0.05 * (1 - distance/200));
      
      starArray.push({ position: [x, y, z], size, opacity: 0.3 + Math.random() * 0.7 });
    }
    return starArray;
  }, []);

  return (
    <group>
      {stars.map((star, i) => (
        <mesh key={i} position={star.position}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial 
            color="#ffffff" 
            opacity={star.opacity}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
});

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

const SkillsPlanetView = ({ skills, skillPositions, setIsGameLocked, isFullScreen, toggleFullScreen }) => {
  const [cameraInfo, setCameraInfo] = useState({ x: 0, y: 0, z: 0, zoom: 1 });
  const [isLocked, setIsLocked] = useState(false);
  const controlsRef = useRef();
  const velocityRef = useRef({ x: 0, z: 0 });
  const keysPressed = useRef(new Set());

  const handleCameraChange = (camera) => {
    setCameraInfo({
      x: camera.position.x.toFixed(2),
      y: camera.position.y.toFixed(2),
      z: camera.position.z.toFixed(2),
      zoom: camera.zoom.toFixed(2)
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      keysPressed.current.add(event.key.toLowerCase());
    };
  
    const handleKeyUp = (event) => {
      keysPressed.current.delete(event.key.toLowerCase());
    };
  
    const updateCamera = () => {
      if (!controlsRef.current || !controlsRef.current.isLocked) return;
    
      const camera = controlsRef.current.getObject();
      const moveSpeed = 0.5;
    
      // Calculate movement
      const movement = new Vector3(0, 0, 0);
      if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) {
        movement.z -= moveSpeed;
      }
      if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) {
        movement.z += moveSpeed;
      }
      if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) {
        movement.x -= moveSpeed;
      }
      if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) {
        movement.x += moveSpeed;
      }
      if (keysPressed.current.has('shift')) {
        movement.y -= moveSpeed;
      }
      if (keysPressed.current.has(' ')) {
        movement.y += moveSpeed;
      }
    
      // Apply movement relative to camera rotation
      movement.applyQuaternion(camera.quaternion);
      camera.position.add(movement);
    
      handleCameraChange(camera);
    };
    
  
    // Use requestAnimationFrame instead of setInterval for smoother performance
    let animationFrameId;
    const animate = () => {
      updateCamera();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    setIsGameLocked(isLocked);
  }, [isLocked, setIsGameLocked]);
  
  const handleClick = () => {
    if (!isLocked) {
      setIsLocked(true);
      document.body.requestPointerLock();
      if (!isFullScreen) {
        toggleFullScreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
  
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);  

  useEffect(() => {
    const handleResize = () => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);  
  
  return (
    <div className="planet-view-container" onClick={handleClick}>
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
  
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        color: '#FF533D',
        fontSize: '12px',
        zIndex: 100,
        background: 'rgba(0,0,0,0.5)',
        padding: '8px',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        <button 
          style={controlButtonStyle}
          onPointerDown={() => keysPressed.current.add('arrowup')}
          onPointerUp={() => keysPressed.current.delete('arrowup')}
          onPointerLeave={() => keysPressed.current.delete('arrowup')}
        >↑ Forward</button>
        <button 
          style={controlButtonStyle}
          onPointerDown={() => keysPressed.current.add('arrowdown')}
          onPointerUp={() => keysPressed.current.delete('arrowdown')}
          onPointerLeave={() => keysPressed.current.delete('arrowdown')}
        >↓ Backward</button>
        <button 
          style={controlButtonStyle}
          onPointerDown={() => keysPressed.current.add('arrowleft')}
          onPointerUp={() => keysPressed.current.delete('arrowleft')}
          onPointerLeave={() => keysPressed.current.delete('arrowleft')}
        >← Left</button>
        <button 
          style={controlButtonStyle}
          onPointerDown={() => keysPressed.current.add('arrowright')}
          onPointerUp={() => keysPressed.current.delete('arrowright')}
          onPointerLeave={() => keysPressed.current.delete('arrowright')}
        >→ Right</button>
        <button 
          style={controlButtonStyle}
          onPointerDown={() => keysPressed.current.add('shift')}
          onPointerUp={() => keysPressed.current.delete('shift')}
          onPointerLeave={() => keysPressed.current.delete('shift')}
        >⇧ Down</button>
        <button 
          style={controlButtonStyle}
          onPointerDown={() => keysPressed.current.add(' ')}
          onPointerUp={() => keysPressed.current.delete(' ')}
          onPointerLeave={() => keysPressed.current.delete(' ')}
        >␣ Up</button>
      </div>
  
      <Canvas camera={{ position: [-20, 10, 30], fov: 45, near: 0.1, far: 10000 }}
        onCreated={({ gl, scene, camera }) => {
          handleCameraChange(camera);
          gl.setClearColor('#000000', 1);
        }}
        style={{ width: '100%', height: '100%', cursor: 'pointer' }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <MilkyWay />
          <PointerLockControls
            ref={controlsRef}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            onLock={() => setIsLocked(true)}
            onUnlock={() => setIsLocked(false)}
          />
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={2} />
          <BackgroundStars />
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
          {skills?.map((skill, index) => (
            <Ball 
              key={skill.name}
              icon={skill.icon}
              name={skill.name}
              index={index}
              total={skills.length}
              planetView={true}
              position={[
                skillPositions[skill.name]?.x || 0,
                skillPositions[skill.name]?.y || 0,
                skillPositions[skill.name]?.z || 0
              ]}
              scale={3}
            />
          ))}
          {[...Array(3)].map((_, i) => (
            <ShootingStar key={`shooting-${i}`} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );  
};

export default SkillsPlanetView;
