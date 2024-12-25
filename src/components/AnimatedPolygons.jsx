import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const AnimatedPolygons = ({ side = 'right' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 300 / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(300, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    const triangles = [];
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -1.0, -1.0, 0,
      1.0, -1.0, 0,
      0, 1.0, 0,
    ]);
    
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    const colors = [0xff0000, 0xF5F5DC]; // Red and beige

    for (let i = 0; i < 10; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: colors[i % 2],
        transparent: true,
        opacity: 0.3,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        Math.random() * 2 - 1,
        Math.random() * 20 - 10,
        Math.random() * 2 - 1
      );
      mesh.scale.setScalar(Math.random() * 0.3 + 0.2);
      scene.add(mesh);
      triangles.push({
        mesh,
        speed: Math.random() * 0.02 + 0.01
      });
    }

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      
      triangles.forEach(triangle => {
        triangle.mesh.position.y -= triangle.speed;
        triangle.mesh.rotation.z += 0.01;
        
        if (triangle.mesh.position.y < -10) {
          triangle.mesh.position.y = 10;
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'fixed',
        [side]: 0,
        top: 0,
        bottom: 0,
        width: '300px',
        pointerEvents: 'none',
        zIndex: 0
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default AnimatedPolygons;
