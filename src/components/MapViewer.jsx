// MapViewer.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedPolygons from './AnimatedPolygons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapViewer.css';

const MapViewer = () => {
  useEffect(() => {
    const map = L.map('map').setView([37.7749, -122.4194], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      className: 'map-tiles',
    }).addTo(map);

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: '<i class="fas fa-map-marker-alt text-2xl"></i>',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });

    L.marker([37.7749, -122.4194], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="text-center">
          <h3 class="text-lg font-medieval">San Francisco</h3>
          <p class="text-sm">California</p>
        </div>
      `);

    return () => map.remove();
  }, []);

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
          <div id="map" className="w-full h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] md:h-[calc(100vh-160px)]" />
        </motion.div>
      </div>
    </section>
  );
};

export default MapViewer;
