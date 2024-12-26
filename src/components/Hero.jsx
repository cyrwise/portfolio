import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random'
import { motion } from 'framer-motion'
import './Hero.css'

function ParticleField() {
  const points = useRef()
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(11900), { radius: 5.5 })
  )

  useFrame(() => {
    points.current.rotation.x += 0.0001
    points.current.rotation.y += 0.0001
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={sphere} stride={3}>
        <PointMaterial
          transparent
          color="#f5e6d3"  // Beige color that matches the portfolio theme
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}    // Added slight transparency for depth effect
        />
      </Points>
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
    <section className="hero-container">
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          background: '#001018'
        }}
      >
        <ParticleField />
      </Canvas>
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          Hello, I'm <span className="hero-name">Cyrus</span>
        </h1>
        <motion.p className="hero-description">
          {displayText}
          <motion.span
            className="cursor"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >|</motion.span>
        </motion.p>
      </motion.div>
      <motion.div 
        className="portrait-container"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="portrait-wrapper">
          <div className="portrait-glow"></div>
          <img src="/Cyrus-Wise.jpg" alt="Portrait" className="portrait-image" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
