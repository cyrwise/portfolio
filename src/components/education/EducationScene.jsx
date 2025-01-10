// EducationScene.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing';

export default function EducationScene({ children }) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <Stars 
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
          />
          {children}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}