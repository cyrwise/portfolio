// BackgroundStars.jsx
import React, { useMemo } from "react";

const BackgroundStars = React.memo(() => {
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 3000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      // Increased radius range from (20-200) to (100-500)
      const radius = 50 + Math.random() * 400;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      // Adjusted size calculation for larger distances
      const size = 0.08 + 0.08 * (1 - Math.sqrt(x ** 2 + y ** 2 + z ** 2) / 500);
      starArray.push({ 
        position: [x, y, z], 
        size, 
        opacity: 0.4 + Math.random() * 0.6 
      });
    }
    return starArray;
  }, []);

  return (
    <group>
      {stars.map((star, i) => (
        <mesh key={i} position={star.position}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial color="#ffffff" opacity={star.opacity} transparent />
        </mesh>
      ))}
    </group>
  );
});

export default BackgroundStars;
