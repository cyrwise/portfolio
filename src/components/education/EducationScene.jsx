// EducationScene.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

export default function EducationScene({ children }) {
  return (
    <div className="h-screen w-full">
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
          <EffectComposer>
            <Bloom 
              intensity={1.5}
              luminanceThreshold={0.9}
              luminanceSmoothing={0.9}
            />
            <ChromaticAberration offset={[0.002, 0.002]} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
