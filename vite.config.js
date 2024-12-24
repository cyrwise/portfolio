import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Import the React plugin
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [react(), glsl()], // Include the React plugin
});
