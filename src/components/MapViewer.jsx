// MapViewer.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedPolygons from './AnimatedPolygons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapViewer.css';

const MapViewer = () => {
  useEffect(() => {
    // Prevent map from re-initializing if React Strict Mode fires twice
    const container = L.DomUtil.get('map');
    if (container != null) {
      container._leaflet_id = null;
    }

    const map = L.map('map').setView([37.7749, -122.4194], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      className: 'map-tiles',
    }).addTo(map);

    // Using a raw inline SVG string so it doesn't rely on missing CSS classes.
    const markerSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="30" height="30">
        <path fill="#FF533D" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
      </svg>
    `;

    const customIcon = L.divIcon({
      className: 'custom-marker bg-transparent', 
      html: markerSvg,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30] // Pushes the popup up so it doesn't overlap the pin
    });

    L.marker([37.7749, -122.4194], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="text-center">
          <h3 class="text-lg font-medieval text-[#FF533D]" style="margin: 0;">San Francisco</h3>
          <p class="text-sm text-gray-700" style="margin: 0; margin-top: 4px;">California</p>
        </div>
      `);

    return () => map.remove();
  }, []);

  return (
    <section className="min-h-screen bg-[#001018] relative overflow-hidden pt-16">
      <AnimatedPolygons side="left" />
      <AnimatedPolygons side="right" />
      
      <div className="container mx-auto px-4 sm:px-8 py-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#001018]/80 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm border border-white/10"
        >
          <div id="map" className="w-full h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] md:h-[calc(100vh-160px)]" />
        </motion.div>
      </div>
    </section>
  );
};

export default MapViewer;