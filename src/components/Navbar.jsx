// Navbar.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [displayText, setDisplayText] = useState("");
  const fullText = "Cyrus Wise";
  
  useEffect(() => {
    setDisplayText(""); // Reset text when component mounts
    let index = 0;
    
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 65);

    return () => {
      clearInterval(timer);
      setDisplayText(fullText); // Ensure full text is displayed on cleanup
    };
  }, [location.pathname]); // Re-run animation when route changes

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
    { name: 'Resume', path: '/resume' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-40 top-0 bg-[#0F1626]/90 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold"
            onClick={() => setDisplayText("")} // Reset text on logo click
          >
            <span className="text-coral">{displayText}</span>
            <span className="animate-blink text-coral">_</span>
          </Link>
          
          <div className="hidden sm:flex space-x-8">
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="relative group"
              >
                <span className={`${
                  currentPath === path ? 'text-coral' : 'text-gray-300'
                } hover:text-coral transition-colors duration-300`}>
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
