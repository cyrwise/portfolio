// SkillsPV.jsx
import React from "react";
import { motion } from "framer-motion";
import { BallCanvas } from "./Ball";

function SkillsPV({ skills }) {
  // Removed the unused position generation logic since 
  // Skills.jsx handles the math for the actual minigame route.

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* FIXED GRID: 
        Base (Mobile): grid-cols-2 (3 rows of 2)
        MD (Tablet): grid-cols-3 (2 rows of 3)
        LG (Desktop): grid-cols-6 (1 row of 6)
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-16 gap-y-12 p-8 justify-items-center">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center justify-center interactive"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-[#FF533D] font-semibold text-lg mb-4 text-center">
              {skill.name}
            </p>
            <div className="w-24 h-24">
              <BallCanvas icon={skill.icon} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillsPV;