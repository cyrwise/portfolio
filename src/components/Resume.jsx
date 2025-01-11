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
      
      <div className="container mx-auto px-4 sm:px-8 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#001018]/80 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm"
        >
          {/* Disclaimer Banner */}
          <div className="text-white text-center py-2 bg-red-500 text-sm sm:text-base">
            <p>If you are using a Download Manager (like IDM), it may interfere with the PDF display. Please disable it for this page or adjust its settings.</p>
          </div>

          {/* PDF Viewer */}
          <div className="w-full bg-white pdf-viewer">
            <object
              data="/resume.pdf"
              type="application/pdf"
              className="w-full h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] md:h-[calc(100vh-160px)]"
              style={{
                maxWidth: '100%',
                aspectRatio: '1/1.414',
              }}
            >
              <p>Unable to display PDF file.</p>
            </object>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .pdf-viewer {
            width: 100%;
            height: auto;
            aspect-ratio: 1/1.414;
          }
        }

        @media (max-width: 480px) {
          .pdf-viewer {
            width: 100%;
            height: auto;
            aspect-ratio: 1/1.414;
            transform: scale(0.8);
            transform-origin: top left;
          }
        }
      `}</style>
    </section>
  );
};

export default Resume;
