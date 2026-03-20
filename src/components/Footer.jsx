import React from 'react';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#001018] text-center py-6 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4">
        {/* Social Icons */}
        <div className="flex justify-center items-center space-x-6 mb-4">
          <a 
            href="mailto:cyr@berkeley.edu" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-[#FF533D] transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
          </a>
          <a 
            href="https://linkedin.com/in/cyruswise/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-[#FF533D] transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
          </a>
          <a 
            href="https://github.com/cyrwise" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-[#FF533D] transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faGithub} className="text-xl" />
          </a>
          
          {/* FIXED: Custom SVG X Logo with hover-to-coral effect.
             We use the 'mask' approach, but instead of using a JS import,
             we define the URL path directly to ensure it loads correctly.
          */}
          <a 
            href="https://x.com/cyruwise" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center transition-colors duration-300"
          >
            <span 
              className="block w-[20px] h-[20px] bg-gray-400 group-hover:bg-[#FF533D] transition-colors duration-300"
              style={{
                // Explicitly define the path from the root. Adjust if your asset structure is different.
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
          
          <a 
            href="https://youtube.com/@cyrwise" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-[#FF533D] transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faYoutube} className="text-xl" />
          </a>
        </div>
        
        {/* Copyright Text - Year explicitly set to 2024 */}
        <p className="text-xs sm:text-sm text-gray-500">
          Copyright &copy; 2024 | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;