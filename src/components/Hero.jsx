import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Grid, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import AsciiPortrait from './AsciiPortrait'
import { Link } from 'react-router-dom';
import './Hero.css'

// Font Awesome & Custom Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; 
import { faLinkedin, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

// 🎮 GAMIFIED COMPONENT 1: The Interactive "Power-Up" Cube
function InteractiveCube() {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [clicked, setClick] = useState(false)

  useFrame((state, delta) => {
    // Spins slowly normally, spins rapidly when hovered like a collectible
    const spinSpeed = hovered ? 3 : 0.5
    meshRef.current.rotation.x += delta * spinSpeed
    meshRef.current.rotation.y += delta * spinSpeed
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        // Positioned slightly to the right to balance the text
        position={[2, 0, -2]} 
        scale={clicked ? 1.5 : 1}
        onClick={() => setClick(!clicked)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial 
          color={hovered ? '#FF533D' : '#333333'} 
          wireframe={true} // Wireframe gives it that retro hit-box look
          wireframeLinewidth={2}
        />
      </mesh>
    </Float>
  )
}

// 🎮 GAMIFIED COMPONENT 2: Retro Moving Grid Map
function RetroGrid() {
  const gridRef = useRef()

  useFrame((state, delta) => {
    // Gives the illusion of moving forward endlessly
    gridRef.current.position.z = (gridRef.current.position.z + delta * 2) % 1
  })

  return (
    <group ref={gridRef}>
      <Grid 
        position={[0, -2, 0]} 
        args={[20, 20]} 
        cellSize={0.5} 
        cellThickness={1} 
        cellColor="#e0e0e0" 
        sectionSize={2.5} 
        sectionThickness={1.5} 
        sectionColor="#FF533D" 
        fadeDistance={15} 
        fadeStrength={1} 
      />
    </group>
  )
}

function Hero() {
  const description = "A passionate full-stack developer crafting digital experiences"
  const [displayText, setDisplayText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < description.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + description[index])
        setIndex(index + 1)
      }, 15)
      return () => clearTimeout(timer)
    }
  }, [index, description])

  return (
    <section className="hero-container relative w-full h-screen bg-[#f5f5f5] overflow-hidden">
      
      {/* 3D Canvas Background */}
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          zIndex: 1,
          // Prevents the canvas from swallowing scroll events for the rest of the page
          pointerEvents: 'auto' 
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <RetroGrid />
        <InteractiveCube />
        <Environment preset="city" />
      </Canvas>

      {/* Hero Content Wrapper */}
      <div className="hero-content-wrapper relative z-10 flex h-full items-center justify-between px-10 pointer-events-none">
        
        {/* Text Content - Make sure buttons/links have pointer-events-auto */}
        <motion.div 
          className="hero-text-content pointer-events-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title text-5xl font-bold text-gray-900 mb-4">
            Hello, I'm <span className="hero-name text-[#FF533D]">Cyrus</span>
          </h1>
          <motion.p className="hero-description text-xl text-gray-700 h-8">
            {displayText}
            <motion.span
              className="cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >|</motion.span>
          </motion.p>
          
          <motion.div 
            className="location-container flex items-center gap-2 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#FF533D] text-xl" />
            <Link 
              to="/map" 
              className="text-gray-700 text-lg font-typewriter hover:text-[#FF533D] transition-colors"
            >
              San Francisco, CA
            </Link>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            className="social-icons flex gap-5 mt-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a href="mailto:cyr@berkeley.edu" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF533D] hover:-translate-y-1 transition-all duration-300">
              <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
            </a>
            <a href="https://linkedin.com/in/cyruswise/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF533D] hover:-translate-y-1 transition-all duration-300">
              <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
            </a>
            <a href="https://github.com/cyrwise" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF533D] hover:-translate-y-1 transition-all duration-300">
              <FontAwesomeIcon icon={faGithub} className="text-2xl" />
            </a>
            <a 
              href="https://x.com/cyruwise" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center hover:-translate-y-1 transition-all duration-300"
            >
              <span 
                className="block w-[24px] h-[24px] bg-gray-600 group-hover:bg-[#FF533D] transition-colors duration-300"
                style={{
                  maskImage: 'url(/src/assets/images/xlogo.svg)',
                  WebkitMaskImage: 'url(/src/assets/images/xlogo.svg)', 
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center'
                }}
              />
            </a>
            <a href="https://youtube.com/@cyrwise" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF533D] hover:-translate-y-1 transition-all duration-300">
              <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
            </a>
          </motion.div>
        </motion.div>
        
        {/* ASCII Portrait */}
        <motion.div 
          className="portrait-container pointer-events-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="portrait-wrapper border-4 border-[#FF533D] p-2 bg-[#f5f5f5] shadow-[8px_8px_0px_0px_rgba(51,51,51,1)] transition-transform hover:-translate-y-2 duration-300">
            <AsciiPortrait />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero