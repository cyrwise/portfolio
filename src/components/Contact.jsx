// Contact.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import './Contact.css';

// Import card back image
import cardBackImage from '/src/assets/images/CardBack.png';

// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

function ContactCard({ method, icon, link, flipped, onClick }) {
  return (
    <div className="card-container">
      <motion.div
        className="w-64 h-96 relative cursor-pointer"
        onClick={!flipped ? onClick : undefined} // Only allow clicking if card isn't flipped
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Initial visible side - Playing card pattern */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img 
            src={cardBackImage}
            alt="Card Back"
            className="interactive w-full h-full object-cover"
          />
        </div>
        
        {/* Flipped side - Playing card style */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden interactive"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-full h-full bg-white p-6 relative">
            {/* Top left letter and icon */}
            <div className="absolute top-4 left-4 flex flex-col items-center">
              <div className="text-sm font-bold text-black">{method[0]}</div>
              <FontAwesomeIcon icon={icon} className="text-black text-xl mt-1" />
            </div>

            {/* Center icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FontAwesomeIcon icon={icon} className="text-black text-7xl" />
            </div>

            {/* Bottom right letter and icon (rotated) */}
            <div className="absolute bottom-4 right-4 flex flex-col items-center transform rotate-180">
              <div className="text-sm font-bold text-black">{method[0]}</div>
              <FontAwesomeIcon icon={icon} className="text-black text-xl mt-1" />
            </div>

            {/* Full card hover effect */}
            <div 
              className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/5 transition-opacity duration-300"
              onClick={(e) => {
                e.stopPropagation();
                window.open(link, '_blank');
              }}
            >
              <div className="absolute inset-x-0 bottom-16 flex items-center justify-center">
                <span className="text-[#FF7F50] hover:underline py-4">
                  Connect on {method}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Contact() {
  const [flippedCards, setFlippedCards] = useState(new Set());
  
  const handleCardClick = (method) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      newSet.add(method);
      return newSet;
    });
  };

  const contactMethods = [
    { method: 'Email', icon: faEnvelope, link: 'mailto:cyr@berkeley.edu' },
    { method: 'LinkedIn', icon: faLinkedin, link: 'https://linkedin.com/in/cyruswise/' },
    { method: 'GitHub', icon: faGithub, link: 'https://github.com/cyrwise' },
    { method: 'Twitter', icon: faTwitter, link: 'https://twitter.com' },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#001018] py-20 px-4"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactMethods.map((contact) => (
          <ContactCard
            key={contact.method}
            {...contact}
            flipped={flippedCards.has(contact.method)}
            onClick={() => handleCardClick(contact.method)}
          />
        ))}
      </div>
    </motion.section>
  );
}


export default Contact;
