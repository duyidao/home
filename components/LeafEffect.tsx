import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export const LeafEffect: React.FC = () => {
  // Low count for "occasional" feel
  const leaves = Array.from({ length: 8 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {leaves.map((_, i) => {
        // Randomize starting position
        const startX = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            initial={{ y: "-10vh", x: `${startX}vw`, opacity: 0, rotate: 0 }}
            animate={{
              y: "110vh",
              x: [
                `${startX}vw`,
                `${startX + (Math.random() * 20 - 10)}vw`,
                `${startX + (Math.random() * 20 - 10)}vw`
              ],
              rotate: [0, 180 + Math.random() * 180, 360 + Math.random() * 180],
              opacity: [0, 0.8, 0.8, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10, // 15-25s duration (very slow)
              delay: Math.random() * 15, // 0-15s initial delay
              repeat: Infinity,
              repeatDelay: Math.random() * 10, // Wait between repeats
              ease: "linear"
            }}
            className={`absolute ${
              i % 3 === 0 ? 'text-emerald-700' : i % 3 === 1 ? 'text-green-600' : 'text-emerald-500'
            }`}
            style={{ 
              width: 20 + Math.random() * 15 + 'px',
              height: 20 + Math.random() * 15 + 'px'
            }}
          >
            <Leaf className="w-full h-full opacity-60" fill="currentColor" />
          </motion.div>
        );
      })}
    </div>
  );
};