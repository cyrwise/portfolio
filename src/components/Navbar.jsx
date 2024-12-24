// Navbar.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 top-0 bg-[rgba(13,12,34,0.8)] backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Portfolio
          </Link>
          
          <div className="hidden sm:flex space-x-8">
            {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="relative group"
              >
                <span className="text-gray-300 hover:text-white transition-colors">
                  {item}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
