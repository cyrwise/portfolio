import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [displayText, setDisplayText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const fullText = "Cyrus Wise";
  
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

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
    { name: 'Resume', path: '/resume' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-40 top-0 bg-[#001018]/90 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-[#FF533D]">{displayText}</span>
            <span className="animate-blink text-[#FF533D]">_</span>
          </Link>
          
          <div className="hidden sm:flex space-x-8">
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="relative group"
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
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
