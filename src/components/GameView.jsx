// GameView.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Game from "./Game";
import "./GameView.css";

function GameView({ skills, setIsGameLocked, onClose }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleReturnToSkills = () => {
    navigate("/", { state: { scrollToSkills: true } });
  };

  return (
    <motion.div
      className="game-view-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Game 
        skills={skills}
        setIsGameLocked={setIsGameLocked}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        onClose={onClose}
      />
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="game-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="game-menu"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="menu-content">
                <h2>Space Navigation</h2>
                <div className="game-menu-buttons">
                  <motion.button
                    className="menu-button resume"
                    onClick={() => {
                      setShowMenu(false);
                      document.body.requestPointerLock();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Exploration
                  </motion.button>
                  <motion.button
                    className="menu-button"
                    onClick={handleReturnToSkills}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Return to Base
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default GameView;
