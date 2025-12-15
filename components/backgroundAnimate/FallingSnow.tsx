import React from 'react';
import { motion } from 'framer-motion';

export const FallingSnow: React.FC = () => {
  // Generate a reasonable number of snowflakes
  const snowflakes = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {snowflakes.map((_, i) => {
        // Randomize starting properties
        const startX = Math.random() * 100;
        const size = 2 + Math.random() * 4;
        const duration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            initial={{ y: -20, x: `${startX}vw`, opacity: 0 }}
            animate={{
              y: '100vh',
              x: [
                `${startX}vw`,
                `${startX + (Math.random() * 10 - 5)}vw`, // Drift left/right
                `${startX + (Math.random() * 10 - 5)}vw`,
                `${startX}vw`
              ],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-white shadow-[0_0_2px_rgba(255,255,255,0.8)]"
            style={{
              width: size,
              height: size,
              filter: 'blur(0.5px)'
            }}
          />
        );
      })}
    </div>
  );
};