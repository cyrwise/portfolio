// Hero.jsx
import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Grid, Edges, Text, PresentationControls, Html, Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import AsciiPortrait from './AsciiPortrait'
import { Link } from 'react-router-dom';
import './Hero.css'

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, faMapMarkerAlt, faTimes, faUndo, faRedo 
} from '@fortawesome/free-solid-svg-icons'; 
import { faLinkedin, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

// ---------------------------------------------------------
// 🎮 3D COMPONENT: Individual Cubie
// ---------------------------------------------------------
function Cubie({ cState, cubeStateRef, currentMoveRef, onSliceSelect, selectedSlice }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  const state = cubeStateRef.current.find(c => c.id === cState.id);
  const isSelected = selectedSlice && Math.round(state.pos[selectedSlice.axis]) === selectedSlice.sliceIndex;

  useFrame(() => {
    if (!meshRef.current) return;
    const move = currentMoveRef.current;

    if (move && Math.round(state.pos[move.axis]) === move.slice) {
      const pivot = new THREE.Object3D();
      pivot.rotation[move.axis] = move.angle * move.dir;
      pivot.updateMatrix();

      const temp = new THREE.Object3D();
      temp.position.copy(state.pos);
      temp.quaternion.copy(state.rot);
      temp.applyMatrix4(pivot.matrix);

      meshRef.current.position.copy(temp.position);
      meshRef.current.quaternion.copy(temp.quaternion);
    } else {
      meshRef.current.position.copy(state.pos);
      meshRef.current.quaternion.copy(state.rot);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (currentMoveRef.current) return; 

    const localNormal = e.face.normal.clone().applyQuaternion(state.rot).round();
    
    let axis = 'x';
    if (Math.abs(localNormal.y) === 1) axis = 'y';
    if (Math.abs(localNormal.z) === 1) axis = 'z';

    onSliceSelect({ axis, sliceIndex: Math.round(state.pos[axis]) });
  };

  const getTextProps = (colorCode) => ({
    fontSize: 0.55,
    color: colorCode,
    anchorX: "center",
    anchorY: "middle",
    fontWeight: "bold"
  });

  return (
    <mesh 
      ref={meshRef} 
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      <meshStandardMaterial color={isSelected ? "#1a1a1a" : "#111111"} roughness={0.2} metalness={0.8} />
      <Edges linewidth={isSelected ? 4 : 2} threshold={15} color={isSelected ? "#FF533D" : "#444444"} />
      
      {/* FIX: New Pastel Color Palette applied to the text faces */}
      {cState.initialPos.x === 1 && <Text position={[0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]} {...getTextProps("#FF9AA2")}>C</Text>} {/* Pastel Red/Pink */}
      {cState.initialPos.x === -1 && <Text position={[-0.51, 0, 0]} rotation={[0, -Math.PI / 2, 0]} {...getTextProps("#FFDAC1")}>Y</Text>} {/* Pastel Orange/Peach */}
      {cState.initialPos.y === 1 && <Text position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]} {...getTextProps("#ffffff")}>R</Text>} {/* Crisp White */}
      {cState.initialPos.y === -1 && <Text position={[0, -0.51, 0]} rotation={[Math.PI / 2, 0, 0]} {...getTextProps("#FDFD96")}>U</Text>} {/* Pastel Yellow */}
      {cState.initialPos.z === 1 && <Text position={[0, 0, 0.51]} rotation={[0, 0, 0]} {...getTextProps("#B5EAD7")}>S</Text>} {/* Pastel Green/Mint */}
      {cState.initialPos.z === -1 && <Text position={[0, 0, -0.51]} rotation={[0, Math.PI, 0]} {...getTextProps("#AEC6CF")}>W</Text>} {/* Pastel Blue */}
    </mesh>
  );
}

// ---------------------------------------------------------
// 🎮 3D COMPONENT: Playable Rubik's Engine 
// ---------------------------------------------------------
function PlayableRubiksCube({ scrambleTrigger, windowWidth, onScramble }) {
  const cubeState = useRef([]);
  const moveQueue = useRef([]);
  const currentMove = useRef(null);
  
  const [selectedSlice, setSelectedSlice] = useState(null);
  
  // FIX: Unifying the responsive logic with Tailwind's 1024px 'lg' breakpoint
  const isVerticalLayout = windowWidth < 1024;

  if (cubeState.current.length === 0) {
    let id = 1;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          cubeState.current.push({
            id: id++, pos: new THREE.Vector3(x, y, z), initialPos: new THREE.Vector3(x, y, z), rot: new THREE.Quaternion()
          });
        }
      }
    }
  }

  useEffect(() => {
    if (scrambleTrigger > 0) {
      setSelectedSlice(null); 
      const axes = ['x', 'y', 'z'];
      const slices = [-1, 0, 1];
      const dirs = [1, -1];
      for (let i = 0; i < 15; i++) {
        moveQueue.current.push({ axis: axes[Math.floor(Math.random() * 3)], slice: slices[Math.floor(Math.random() * 3)], dir: dirs[Math.floor(Math.random() * 2)], angle: 0 });
      }
    }
  }, [scrambleTrigger]);

  useFrame((state, delta) => {
    if (!currentMove.current && moveQueue.current.length > 0) currentMove.current = moveQueue.current.shift();
    if (currentMove.current) {
      const move = currentMove.current;
      const speedMult = moveQueue.current.length > 0 ? 3 : 1.5; 
      move.angle += delta * 5 * speedMult; 

      if (move.angle >= Math.PI / 2) {
        move.angle = Math.PI / 2;
        const q = new THREE.Quaternion();
        const axisVec = new THREE.Vector3();
        axisVec[move.axis] = 1;
        q.setFromAxisAngle(axisVec, (Math.PI / 2) * move.dir);

        cubeState.current.forEach(c => {
          if (Math.round(c.pos[move.axis]) === move.slice) {
            c.pos.applyQuaternion(q);
            c.pos.x = Math.round(c.pos.x); c.pos.y = Math.round(c.pos.y); c.pos.z = Math.round(c.pos.z);
            c.rot.premultiply(q);
          }
        });
        currentMove.current = null;
      }
    }
  });

  const handleRotate = (dir) => {
    if (!selectedSlice) return;
    moveQueue.current.push({ axis: selectedSlice.axis, slice: selectedSlice.sliceIndex, dir, angle: 0 });
  };

  const getScale = () => {
    if (windowWidth < 768) return 0.55; // Mobile stack
    if (isVerticalLayout) return 0.65;  // Tablet stack (shrunk drastically to fit vertically)
    if (windowWidth < 1280) return 0.95; // Small desktop side-by-side
    return 1.1; // Large desktop side-by-side
  };

  const getPosition = () => {
    if (windowWidth < 768) return [0, -1.2, 0]; 
    if (isVerticalLayout) return [0, -1.5, 0]; // Keep it centered and slightly elevated for tablets
    if (windowWidth < 1280) return [2.5, 0, 0]; 
    return [3.5, 0, 0]; 
  };

  return (
    <group position={getPosition()} scale={getScale()}>
      <PresentationControls
        global={false}
        cursor={true}
        snap={false}
        speed={1.5}
        zoom={1}
        polar={[-Math.PI, Math.PI]} 
        azimuth={[-Infinity, Infinity]} 
        rotation={[Math.PI / 6, -Math.PI / 4, 0]} 
      >
        <group>
          {cubeState.current.map(c => (
            <Cubie 
              key={c.id} 
              cState={c} 
              cubeStateRef={cubeState} 
              currentMoveRef={currentMove} 
              selectedSlice={selectedSlice}
              onSliceSelect={setSelectedSlice} 
            />
          ))}
        </group>
      </PresentationControls>

      {selectedSlice && (
        <Html center zIndexRange={[100, 0]} position={[0, -2.4, 0]}>
          <div className="flex flex-col items-center gap-3 w-max scale-90 md:scale-100">
            <span className="text-[#FF533D] font-mono text-xs md:text-sm font-bold bg-gray-900/90 px-4 py-1 rounded-full border border-[#FF533D] shadow-lg">
              SLICE SELECTED
            </span>
            <div className="bg-gray-900/95 p-2 rounded-full border-2 border-[#FF533D] flex items-center gap-2 shadow-[0_0_30px_rgba(255,83,61,0.5)] pointer-events-auto">
              <button onClick={() => handleRotate(-1)} className="w-12 h-12 md:w-14 md:h-14 bg-gray-800 hover:bg-[#FF533D] text-white rounded-full flex items-center justify-center text-lg md:text-xl transition-all shadow-md active:scale-90"><FontAwesomeIcon icon={faUndo} /></button>
              <div className="w-px h-6 md:h-8 bg-gray-700 mx-1 md:mx-2"></div>
              <button onClick={() => handleRotate(1)} className="w-12 h-12 md:w-14 md:h-14 bg-gray-800 hover:bg-[#FF533D] text-white rounded-full flex items-center justify-center text-lg md:text-xl transition-all shadow-md active:scale-90"><FontAwesomeIcon icon={faRedo} /></button>
              <div className="w-px h-6 md:h-8 bg-gray-700 mx-1 md:mx-2"></div>
              <button onClick={() => setSelectedSlice(null)} className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-base md:text-lg transition-all shadow-md active:scale-90"><FontAwesomeIcon icon={faTimes} /></button>
            </div>
          </div>
        </Html>
      )}

      {!selectedSlice && (
        <Html position={[0, isVerticalLayout ? -2.6 : -2.8, 0]} center className="flex flex-col items-center gap-3 md:gap-4 pointer-events-none transition-all duration-300">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-[#FF533D] font-mono text-[10px] md:text-sm whitespace-nowrap bg-[#f5f5f5] bg-opacity-80 px-3 py-1 rounded shadow-sm border border-[#FF533D]/20"
          >
            ⟷ Click on the cube to rotate it ⟷
          </motion.div>
          
          <button 
            onClick={onScramble} 
            className="pointer-events-auto px-5 py-2 md:px-6 md:py-2 bg-[#FF533D] text-white font-mono text-xs md:text-sm hover:bg-white hover:text-[#FF533D] border-2 border-[#FF533D] transition-colors rounded shadow-[4px_4px_0px_0px_rgba(51,51,51,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 whitespace-nowrap"
          >
            SCRAMBLE CUBE
          </button>
        </Html>
      )}
    </group>
  );
}

// ---------------------------------------------------------
// 🎮 3D COMPONENT: Backgrounds
// ---------------------------------------------------------
function RetroGrid() {
  const gridRef = useRef();
  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (state.clock.elapsedTime * 2) % 2.5;
  });
  return (
    <group ref={gridRef}>
      <Grid position={[0, -3.5, 0]} args={[40, 40]} cellSize={0.5} cellThickness={1} cellColor="#e0e0e0" sectionSize={2.5} sectionThickness={1.5} sectionColor="#FF533D" fadeDistance={25} fadeStrength={1} />
    </group>
  );
}

function DigitalPortal({ windowWidth }) {
  const portalRef = useRef();

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      portalRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const isVerticalLayout = windowWidth < 1024;
  
  // Ensures the portal stays correctly positioned behind the top UI block whenever the layout is vertical
  const portalPos = isVerticalLayout ? [0, 5.5, -15] : [-15, 5, -20];
  const portalScale = windowWidth < 768 ? 0.45 : (isVerticalLayout ? 0.55 : 1);

  return (
    <group position={portalPos} scale={portalScale}>
      <mesh ref={portalRef}>
        <torusKnotGeometry args={[6, 1.5, 200, 32]} />
        <meshStandardMaterial color="#FF533D" wireframe={true} emissive="#FF533D" emissiveIntensity={0.5} transparent opacity={0.15} />
      </mesh>
      <Sparkles count={windowWidth < 768 ? 200 : 500} scale={35} size={windowWidth < 768 ? 8 : 4} speed={0.4} opacity={0.3} color="#FF533D" />
    </group>
  );
}

// ---------------------------------------------------------
// UI COMPONENT: Hero Section
// ---------------------------------------------------------
function Hero() {
  const description = "A passionate full-stack developer crafting digital experiences";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  
  const [scrambleTrigger, setScrambleTrigger] = useState(0); 
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (index < description.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + description[index]);
        setIndex(index + 1);
      }, 15);
      return () => clearTimeout(timer);
    }
  }, [index, description]);

  return (
    <section className="relative w-full min-h-screen bg-[#f5f5f5] overflow-x-hidden flex flex-col lg:flex-row">
      
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }} style={{ width: '100%', height: '100%' }}>
          <fog attach="fog" args={['#f5f5f5', 10, 35]} />
          
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#FF533D" />
            
            <RetroGrid />
            <DigitalPortal windowWidth={windowWidth} />
            <PlayableRubiksCube 
              scrambleTrigger={scrambleTrigger} 
              windowWidth={windowWidth} 
              onScramble={() => setScrambleTrigger(v => v + 1)} 
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full h-full min-h-screen max-w-[1400px] mx-auto pointer-events-none pt-24 lg:pt-0 pb-12 lg:pb-0">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-start lg:justify-center items-center px-6 lg:pl-16 xl:pl-24 gap-10 pointer-events-auto z-20">
          
          <motion.div 
            className="flex flex-col items-center text-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-gray-900 mb-2 md:mb-4">
              Hello, I'm <span className="hero-name text-[#FF533D]">Cyrus</span>
            </h1>
            <motion.p className="hero-description text-sm md:text-lg text-gray-700 h-16 lg:h-20 font-mono max-w-md">
              {displayText}
              <motion.span className="cursor" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}>|</motion.span>
            </motion.p>
            
            <motion.div className="location-container flex items-center gap-2 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#FF533D] text-lg md:text-xl" />
              <Link to="/map" className="text-gray-700 text-sm md:text-lg font-mono hover:text-[#FF533D] transition-colors">
                San Francisco, CA
              </Link>
            </motion.div>

            <motion.div className="social-icons flex gap-5 mt-6 items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <a href="mailto:cyr@berkeley.edu" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF533D] hover:-translate-y-1 transition-all"><FontAwesomeIcon icon={faEnvelope} className="text-xl md:text-2xl" /></a>
              <a href="https://linkedin.com/in/cyruswise/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF533D] hover:-translate-y-1 transition-all"><FontAwesomeIcon icon={faLinkedin} className="text-xl md:text-2xl" /></a>
              <a href="https://github.com/cyrwise" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF533D] hover:-translate-y-1 transition-all"><FontAwesomeIcon icon={faGithub} className="text-xl md:text-2xl" /></a>
              <a href="https://x.com/cyruwise" target="_blank" rel="noopener noreferrer" className="group flex items-center hover:-translate-y-1 transition-all duration-300">
                <span className="block w-[20px] h-[20px] md:w-[24px] md:h-[24px] bg-gray-600 group-hover:bg-[#FF533D] transition-colors duration-300" style={{ maskImage: 'url(/src/assets/images/xlogo.svg)', WebkitMaskImage: 'url(/src/assets/images/xlogo.svg)', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }} />
              </a>
              <a href="https://youtube.com/@cyrwise" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF533D] hover:-translate-y-1 transition-all"><FontAwesomeIcon icon={faYoutube} className="text-xl md:text-2xl" /></a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full flex justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="transform scale-[0.6] md:scale-90 lg:scale-100 origin-top">
              <div className="portrait-wrapper border-4 border-[#FF533D] p-2 bg-[#f5f5f5] shadow-[8px_8px_0px_0px_rgba(51,51,51,1)] transition-transform hover:-translate-y-2 duration-300">
                <AsciiPortrait />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Increased min-height specifically for the md breakpoint to give that layout plenty of breathing room at the bottom */}
        <div className="w-full lg:w-1/2 flex flex-col justify-end items-center pointer-events-none mt-20 lg:mt-0 relative min-h-[55vh] md:min-h-[65vh] lg:min-h-0"></div>
      </div>
    </section>
  )
}

export default Hero