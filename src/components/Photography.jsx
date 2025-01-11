// Photography.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Photography.css';

function Photography() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const importImages = async () => {
      try {
        const imageContext = import.meta.glob('/src/assets/images/photography/*.jpg');
        const imagePromises = Object.entries(imageContext).map(async ([path, importFunc]) => {
          const module = await importFunc();
          return {
            src: module.default,
            alt: path.split('/').pop().replace('.jpg', '')
          };
        });
        
        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    importImages();
  }, []);

  const openViewer = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeViewer = () => {
    setSelectedImage(null);
  };

  const navigate = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex >= images.length) newIndex = 0;
    if (newIndex < 0) newIndex = images.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleKeyDown = (event) => {
    if (selectedImage) {
      if (event.key === 'ArrowRight') navigate(1);
      if (event.key === 'ArrowLeft') navigate(-1);
      if (event.key === 'Escape') closeViewer();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#001018] py-20 px-4"
    >
      {/* Introduction Text */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-[#FF533D] mb-4">
          NATURE
        </h1>
        <div className="text-center mb-2">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="inline-block w-1 h-1 bg-[#FF533D] rounded-full mx-1"></span>
          ))}
        </div>
        <p className="text-gray-300 text-lg">
          Some of my Nature photography (I have 40,000+ images on iCloud)
        </p>
      </div>

      {/* Image Grid */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-800"
              onClick={() => openViewer(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Viewer Modal */}
        {selectedImage && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center"
        >
            <button
            className="absolute top-4 right-4 text-white text-4xl p-2 hover:text-[#FF533D]"
            onClick={closeViewer}
            >
            ×
            </button>
            
            <div className="relative w-full flex items-center justify-center">
            <button
                className="absolute left-[5%] top-1/2 -translate-y-1/2 text-white text-6xl hover:text-[#FF533D]"
                onClick={() => navigate(-1)}
            >
                ‹
            </button>
            
            <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[75vh] max-w-[90vw] object-contain"
            />
            
            <button
                className="absolute right-[5%] top-1/2 -translate-y-1/2 text-white text-6xl hover:text-[#FF533D]"
                onClick={() => navigate(1)}
            >
                ›
            </button>
            </div>

        {/* Thumbnail Gallery */}
            <div className="absolute bottom-4 left-0 right-0">
                <div className="relative">
                    {/* Left fade gradient */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/90 to-transparent z-10"></div>
                    
                    {/* Right fade gradient */}
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/90 to-transparent z-10"></div>
                    
                    {/* Scrollable container */}
                    <div className="overflow-x-auto scrollbar-hide">
                        <div 
                            className="flex gap-2 px-32 py-2 min-w-max"
                            style={{
                                // Edit the transforms + to shift the bottom gallery
                                transform: `translateX(calc(50vw - ${(currentIndex * 72) + 150}px))`,
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => openViewer(index)}
                                    className={`w-16 h-16 flex-shrink-0 cursor-pointer transition-all duration-200 ${
                                        currentIndex === index ? 'border-2 border-[#FF533D]' : 'opacity-50 hover:opacity-100'
                                    }`}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
        )}
    </motion.section>
  );
}

export default Photography;
