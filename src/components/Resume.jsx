// Resume.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPolygons from './AnimatedPolygons';
import * as pdfjsLib from 'pdfjs-dist';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
    return (
      <section className="min-h-screen bg-[#001018] relative overflow-hidden pt-16">
        <AnimatedPolygons side="left" />
        <AnimatedPolygons side="right" />
        
        <div className="container mx-auto px-8 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#001018]/80 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm"
          >
            {/* PDF Viewer */}
            <div className="w-full h-[calc(100vh-120px)] bg-white">
              <iframe
                src="/resume.pdf"
                title="Resume"
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>
        </div>
      </section>
    );
  };
  
  
  

export default Resume;
