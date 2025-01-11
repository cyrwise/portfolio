import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [displayText, setDisplayText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const fullText = "Cyrus Wise";
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!hasAnimated) {
      setDisplayText("");
      let index = 0;
      
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setDisplayText(fullText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setHasAnimated(true);
        }
      }, 65);

      return () => {
        clearInterval(timer);
        setDisplayText(fullText);
      };
    }
  }, [hasAnimated, fullText]);

  useEffect(() => {
    setHasAnimated(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Photography', path: '/photography'},
    { name: 'Contact', path: '/contact' },
    { name: 'Resume', path: '/resume' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-40 top-0 bg-[#001018]/90 backdrop-blur-md border-b border-white/10"
    >
      <div className="w-full h-full px-6">
        <div className="flex items-center justify-between h-16 max-w-[2000px] mx-auto">
          <Link to="/" className="text-2xl font-bold flex-shrink-0 min-w-fit">
            <span className="text-[#FF533D]">{displayText}</span>
            <span className="animate-blink text-[#FF533D]">_</span>
          </Link>
          
          <div className="hidden sm:flex items-center space-x-8 ml-auto">
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="relative group whitespace-nowrap"
              >
                <span className={`${
                  currentPath === path ? 'text-[#FF533D]' : 'text-gray-300'
                } hover:text-[#FF533D] transition-colors duration-300`}>
                  {name}
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
                  <svg width="100%" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
                    <path 
                      d="M0,1 Q25,0 50,1 T100,1"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      className="group-hover:animate-wave"
                    />
                  </svg>
                </span>
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <motion.button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden flex-shrink-0 p-2 z-50"
            animate={isOpen ? "open" : "closed"}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <motion.span 
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 }
                }}
                className="h-0.5 w-full bg-[#FF533D] block origin-center"
              />
              <motion.span 
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="h-0.5 w-full bg-[#FF533D] block"
              />
              <motion.span 
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 }
                }}
                className="h-0.5 w-full bg-[#FF533D] block origin-center"
              />
            </div>
          </motion.button>
        </div>
      </div>

      <motion.div 
        ref={menuRef}
        initial={{ x: '100%' }}
        animate={{ 
          x: isOpen ? 0 : '100%',
        }}
        transition={{ 
          type: "spring", 
          stiffness: 100,
          damping: 20
        }}
        className="fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-[#001018]/95 sm:hidden overflow-y-auto"
      >
        <div className="flex flex-col space-y-4 p-6">
          {navItems.map(({ name, path }) => (
            <motion.div
              key={name}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to={path}
                onClick={() => setIsOpen(false)}
                className={`${
                  currentPath === path ? 'text-[#FF533D]' : 'text-gray-300'
                } hover:text-[#FF533D] transition-colors duration-300 text-lg`}
              >
                {name}
              </Link>
            </motion.div>
          ))}
          <ThemeToggle />
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
