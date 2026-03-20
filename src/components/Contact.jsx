// Contact.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Contact.css';

// Assets
import cardBackImage from '/src/assets/images/CardBack.png';
import xLogo from '/src/assets/images/xlogo.svg';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

function ContactCard({ method, icon, link, flipped, onClick }) {
  return (
    <motion.div
      className="w-64 h-96 relative cursor-pointer"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={onClick}
    >
      {/* Back */}
      <div
        className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg"
        style={{ 
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden' // Prevents 3D clipping bugs on webkit browsers
        }}
      >
        <img
          src={cardBackImage}
          alt="Card Back"
          className="interactive w-full h-full object-cover"
        />
      </div>

      {/* Front */}
      <div
        className="absolute w-full h-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-2xl bg-white"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <div className="w-full h-full p-6 relative">
          {/* Top left */}
          <div className="absolute top-4 left-4 flex flex-col items-center">
            <div className="text-sm font-bold text-black">{method[0]}</div>
            {typeof icon === 'string' ? (
              <img src={icon} alt={`${method} logo`} className="w-6 h-6 mt-1" />
            ) : (
              <FontAwesomeIcon icon={icon} className="text-black text-xl mt-1" />
            )}
          </div>

          {/* Center icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {typeof icon === 'string' ? (
              <img src={icon} alt={`${method} logo`} className="w-16 h-16" />
            ) : (
              <FontAwesomeIcon icon={icon} className="text-black text-7xl" />
            )}
          </div>

          {/* Bottom right */}
          <div className="absolute bottom-4 right-4 flex flex-col items-center transform rotate-180">
            <div className="text-sm font-bold text-black">{method[0]}</div>
            {typeof icon === 'string' ? (
              <img src={icon} alt={`${method} logo`} className="w-6 h-6 mt-1" />
            ) : (
              <FontAwesomeIcon icon={icon} className="text-black text-xl mt-1" />
            )}
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/5 transition-opacity duration-300"
            onClick={(e) => {
              e.stopPropagation();
              window.open(link, '_blank');
            }}
          >
            <div className="absolute inset-x-0 bottom-16 flex items-center justify-center">
              <span className="text-[#FF7F50] hover:underline py-4 font-semibold">
                Connect on {method}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [deckOpen, setDeckOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // New state to track when the initial fan-out is done
  const [initialAnimComplete, setInitialAnimComplete] = useState(false);

  const contactMethods = [
    { method: 'Email', icon: faEnvelope, link: 'mailto:cyr@berkeley.edu' },
    { method: 'LinkedIn', icon: faLinkedin, link: 'https://linkedin.com/in/cyruswise/' },
    { method: 'GitHub', icon: faGithub, link: 'https://github.com/cyrwise' },
    { method: 'X', icon: xLogo, link: 'https://x.com/cyruwise' },
    { method: 'YouTube', icon: faYoutube, link: 'https://youtube.com/@cyrwise' },
  ];

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (index) => {
    if (!deckOpen) return;
    setFlippedCards((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const openDeck = () => {
    setDeckOpen(true);
    contactMethods.forEach((_, i) => {
      setTimeout(() => {
        setFlippedCards((prev) => {
          const newFlipped = [...prev];
          newFlipped[i] = true;
          return newFlipped;
        });
      }, i * 300); // staggered flip
    });

    // Remove the staggered delay permanently once the fan-out is complete
    setTimeout(() => {
      setInitialAnimComplete(true);
    }, contactMethods.length * 300 + 400); 
  };

  // Calculate offsets for centered fan on desktop
  const totalCards = contactMethods.length;
  const cardSpacing = 180; // horizontal spacing
  const middleIndex = Math.floor(totalCards / 2);

  // Dynamically calculate the wrapper height so the background doesn't cut off
  const mobileCardGap = 420; // 384px card height + gap
  const wrapperHeight = deckOpen && windowWidth < 768 
    ? contactMethods.length * mobileCardGap 
    : 500; // Default height for desktop/closed state

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#001018] py-20 px-4 flex flex-col items-center"
    >
      {!deckOpen && (
        <button
          className="mb-12 px-6 py-2 bg-[#FF7F50] rounded-lg text-white hover:bg-[#FF9933] transition-colors z-10"
          onClick={openDeck}
        >
          Open Contact Deck
        </button>
      )}

      <motion.div 
        animate={{ height: wrapperHeight }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative w-full max-w-7xl flex justify-center items-start md:items-center mt-10"
      >
        {contactMethods.map((contact, index) => {
          let x = 0, y = 0, rotate = 0, zIndex = index, scale = 1;

          if (deckOpen) {
            if (windowWidth < 768) {
              // Mobile: Fully spaced vertical stack
              x = 0;
              y = index * mobileCardGap; 
              rotate = 0;
            } else {
              // Desktop: centered fan
              x = (index - middleIndex) * cardSpacing;
              y = 0;
              rotate = [-15, -7, 0, 7, 15][index] || 0;
            }

            // Hover effects (Pop-out logic)
            if (hoveredCard === index) {
              zIndex = 30; // Bring hovered card to the absolute front
              if (windowWidth >= 768) {
                y -= 60; // Pop out vertically from the fan
                rotate = 0; // Straighten it out
                scale = 1.05; // Make it slightly larger
              } else {
                scale = 1.02; // Subtle scale on mobile
              }
            }
          }

          return (
            <motion.div
              key={contact.method}
              className="absolute"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{ x, y, rotate, zIndex, scale }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 12,
                // Only stagger during the initial opening. After that, hover is instant.
                delay: initialAnimComplete ? 0 : index * 0.1, 
              }}
            >
              <ContactCard
                {...contact}
                flipped={flippedCards[index] || false}
                onClick={() => handleCardClick(index)}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}