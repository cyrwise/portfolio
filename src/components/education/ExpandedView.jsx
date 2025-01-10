import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpandedView({ show, school, onClose }) {
  if (!school) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="bg-[#1a1a1a]/90 p-8 rounded-xl w-full max-w-2xl m-4 relative z-10 border border-red-500/20"
            layoutId={`card-${school.name}`}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-red-500 hover:text-red-400"
            >
              ×
            </button>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4">Key Courses</h3>
                <ul className="space-y-2">
                  {school.courses.map((course, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-zinc-300"
                    >
                      {course}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4">Activities</h3>
                <ul className="space-y-2">
                  {school.activities.map((activity, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-zinc-300 flex items-center gap-4"
                    >
                      <img
                        src={activity.logo}
                        alt={activity.name}
                        className="w-8 h-8 rounded-full object-cover bg-gray-800"
                      />
                      <span>{activity.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
