import { useEffect, useRef, useState } from 'react'
import NET from 'vanta/dist/vanta.net.min'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import './Hero.css'

function Hero() {
  const [vantaEffect, setVantaEffect] = useState(null)
  const heroRef = useRef(null)
  
  useEffect(() => {
    if (!vantaEffect) {
      const effect = NET({
        el: heroRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xfffff,
        backgroundColor: 0x001018,
        points: 12.00,
        maxDistance: 25.00,
        spacing: 16.00,
        showDots: false
      })

      setVantaEffect(effect)
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

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
    <section 
      ref={heroRef} 
      className="hero-container"
    >
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          <span className="hero-greeting">Hello, I'm </span>
          <span className="hero-name">Cyrus</span>
        </h1>

        <motion.p 
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {displayText}
          <motion.span
            className="cursor"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >
            |
          </motion.span>
        </motion.p>
      </motion.div>
    </section>
  )
}

export default Hero
