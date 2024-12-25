// Navbar.jsx
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
    { name: 'Resume', path: '/resume' }  // Add this line
  ];
  

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 top-0 bg-[rgba(13,12,34,0.8)] backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-[#F5F5DC] bg-clip-text text-transparent">
            Portfolio
          </Link>
          
          <div className="hidden sm:flex space-x-8">
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="relative group"
              >
                <span className={`${
                  currentPath === path ? 'text-white' : 'text-gray-300'
                } hover:text-white transition-colors`}>
                  {name}
                </span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-500 to-[#F5F5DC] transition-all duration-300 ${
                  currentPath === path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
