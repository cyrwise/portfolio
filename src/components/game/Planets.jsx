import React from 'react';
import PlanetSphere from './PlanetSphere';
import Label from './Label';
import SunSphere from './SunSphere';

function Planets() {
    const planets = [
      { name: "Mercury", color: "#E5E5E5", size: 0.4, orbitRadius: 4, orbitSpeed: 0.8 },
      { name: "Venus", color: "#FFA500", size: 0.6, orbitRadius: 6, orbitSpeed: 0.7 },
      { name: "Earth", color: "#4169E1", size: 0.7, orbitRadius: 8, orbitSpeed: 0.6, emissive: "#4169E1" },
      { name: "Mars", color: "#FF4500", size: 0.5, orbitRadius: 10, orbitSpeed: 0.5 },
      { name: "Jupiter", color: "#DAA520", size: 1.5, orbitRadius: 13, orbitSpeed: 0.4 },
      { name: "Saturn", color: "#F4A460", size: 1.2, orbitRadius: 16, orbitSpeed: 0.3 },
      { name: "Uranus", color: "#40E0D0", size: 1.0, orbitRadius: 19, orbitSpeed: 0.2 },
      { name: "Neptune", color: "#4169E1", size: 0.9, orbitRadius: 22, orbitSpeed: 0.1 }
    ];
  
    return (
      <>
        <SunSphere />
        <Label text="Sun" position={[0, 4, 0]} />
        {planets.map((planet) => (
          <PlanetSphere 
            key={planet.name}
            {...planet}
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1.0}
          />
        ))}
      </>
    );
  }
  

export default Planets;
