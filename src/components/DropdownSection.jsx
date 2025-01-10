// DropdownSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownSection = ({ title, children, extraButton }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-[#001018] p-8 max-w-4xl mx-auto relative">
      <div className="flex justify-between items-center">
        <h2 
          className="text-[#FF533D] text-3xl font-bold cursor-pointer flex items-center gap-2 interactive group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="inline-flex items-center"
          >
            <svg 
              className="w-6 h-6"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.span>
          <span>{title}</span>
        </h2>
        {extraButton}
      </div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="overflow-hidden"
          >
            <div className="pt-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownSection;
