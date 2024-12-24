// components/Loader.jsx
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <p className="text-xl font-bold text-[#f1f1f1]">
          {progress.toFixed(2)}%
        </p>
      </div>
    </Html>
  );
};

export default CanvasLoader;
