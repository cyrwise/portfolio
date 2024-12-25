// Contact.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import './Contact.css';

function ContactCard({ method, icon, link, flipped, onClick }) {
  return (
    <div className="card-container">
      <motion.div
        className="w-64 h-96 relative cursor-pointer"
        onClick={onClick}
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
            src="src/assets/images/CardBack.png"
            alt="Card Back"
            className="interactive w-full h-full object-cover"
          />
        </div>
        
        {/* Flipped side - Gradient with content */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden interactive"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col items-center justify-center">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-2xl font-bold text-white">{method}</h3>
            <div 
              className="mt-4 cursor-pointer hover:underline text-white interactive"
              onClick={(e) => {
                e.stopPropagation();
                window.open(link, '_blank');
              }}
            >
              Connect on {method}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Contact() {
  const [flipped, setFlipped] = useState(null);
  
  const contactMethods = [
    { method: 'Email', icon: '✉️', link: 'mailto:your@email.com' },
    { method: 'LinkedIn', icon: '💼', link: 'https://linkedin.com' },
    { method: 'GitHub', icon: '💻', link: 'https://github.com' },
    { method: 'Twitter', icon: '🐦', link: 'https://twitter.com' },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#001018] py-20 px-4"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactMethods.map((contact, index) => (
          <ContactCard
            key={contact.method}
            {...contact}
            flipped={flipped === index}
            onClick={() => setFlipped(flipped === index ? null : index)}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default Contact;
