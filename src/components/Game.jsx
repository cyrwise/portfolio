// Game.jsx
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { Vector3 } from 'three';
import BackgroundStars from "./game/BackgroundStars";
import MilkyWay from "./game/MilkyWay";
import ShootingStar from "./game/ShootingStar";
import Controls from "./game/Controls";
import Planets from "./game/Planets";
import PlanetsSkills from "./game/PlanetsSkills";
import CanvasLoader from "./Loader";
import { useLocation } from 'react-router-dom';

function Game({ setIsGameLocked }) {
  const [cameraInfo, setCameraInfo] = useState({ x: 0, y: 0, z: 0, zoom: 1 });
  const [isLocked, setIsLocked] = useState(false);
  const controlsRef = useRef();
  const keysPressed = useRef(new Set());
  const location = useLocation();
  const skills = location.state?.skills || [];

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
        if (!controlsRef.current?.isLocked) return;
        
        const camera = controlsRef.current.getObject();
        const baseSpeed = 0.5;
        const speedMultiplier = keysPressed.current.has('e') ? 5 : 1;
        const moveSpeed = baseSpeed * speedMultiplier;
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
      
        movement.applyQuaternion(camera.quaternion);
        camera.position.add(movement);
        handleCameraChange(camera);
      };
      

    let animationFrameId = requestAnimationFrame(function animate() {
      updateCamera();
      animationFrameId = requestAnimationFrame(animate);
    });

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
    }
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        color: '#FF533D',
        fontSize: '12px',
        zIndex: 9999,
        background: 'rgba(0,0,0,0.5)',
        padding: '8px',
        borderRadius: '4px'
      }}>
        x: {cameraInfo.x} y: {cameraInfo.y} z: {cameraInfo.z}<br/>
        zoom: {cameraInfo.zoom}
      </div>

      <Controls keysPressed={keysPressed} />

      <div className="game-view-container" onClick={handleClick}>
        <Canvas
          camera={{ position: [-20, 10, 30], fov: 45, near: 0.1, far: 10000 }}
          onCreated={({ gl, camera }) => {
            handleCameraChange(camera);
            gl.setClearColor('#000000', 1);
          }}
          style={{ width: '100vw', height: '100vh' }}
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
            <spotLight
                position={[0, 0, 0]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                castShadow
            />

            <BackgroundStars />
            <Planets />
            <PlanetsSkills skills={skills} />
            {[...Array(3)].map((_, i) => (
              <ShootingStar key={`shooting-${i}`} />
            ))}
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default Game;
