// ThemeToggle.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="relative p-2 text-gray-300 hover:text-[#FF533D] transition-colors"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDarkMode ? 1 : 0,
          rotate: isDarkMode ? 0 : 45,
        }}
        transition={{ duration: 0.2 }}
        className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDarkMode ? 0 : 1,
          rotate: isDarkMode ? -45 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
          />
        </svg>
      </motion.div>
    </button>
  );
}

export default ThemeToggle;
