// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AnimatedCursor from "react-animated-cursor";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/education/Education'
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Resume from './components/Resume';
import CustomScrollbar from './components/CustomScrollbar';
import GameView from './components/GameView';
import Portfolio from './components/Portfolio';

import './App.css';

// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

library.add(fas, fab);

function App() {
  const [isGameLocked, setIsGameLocked] = useState(false);

  return (
    <CustomScrollbar>
      <Router>
        <AppContent isGameLocked={isGameLocked} setIsGameLocked={setIsGameLocked} />
      </Router>
    </CustomScrollbar>
  );
}

function AppContent({ isGameLocked, setIsGameLocked }) {
  const location = useLocation();
  const isGameRoute = location.pathname === '/game';

  return (
    <div className={`min-h-screen ${isGameRoute ? 'bg-[#000000]' : 'bg-[#001018]'}`}>
      {!isGameRoute && (
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          color='255, 255, 255'
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={2}
          clickables={[
            'a',
            'button',
            '.card-container',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="submit"]',
            '.link',
            'img',
            'canvas',
            '.three-canvas',
            '.interactive',
            '.model-viewer'
          ]}
        />
      )}
      {!isGameRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Portfolio setIsGameLocked={setIsGameLocked} />} />
        <Route path="/portfolio" element={<Portfolio setIsGameLocked={setIsGameLocked} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills setIsGameLocked={setIsGameLocked} />} />
        <Route path="/game" element={<GameView setIsGameLocked={setIsGameLocked} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </div>
  );
}

export default App;
