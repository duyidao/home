import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Tumbleweed {
  id: number;
  yBase: number; // Vertical base position %
  size: number; // Size in px
  duration: number; // Time to cross screen
  delay: number;
  direction: 'left' | 'right';
}

export const TumbleweedEffect: React.FC = () => {
  const [tumbleweeds, setTumbleweeds] = useState<Tumbleweed[]>([]);

  useEffect(() => {
    // Generate a set of tumbleweeds
    const count = 3 + Math.floor(Math.random() * 2); 
    const newWeeds: Tumbleweed[] = [];
    
    for (let i = 0; i < count; i++) {
      newWeeds.push(generateTumbleweed(i));
    }
    setTumbleweeds(newWeeds);
  }, []);

  const generateTumbleweed = (id: number): Tumbleweed => {
    return {
      id,
      yBase: 65 + Math.random() * 25, // Bottom area 65% - 90%
      size: 80 + Math.random() * 70, // Slightly larger: 80px to 150px
      duration: 5 + Math.random() * 6, // 5s to 11s speed
      delay: Math.random() * 8, 
      direction: Math.random() > 0.5 ? 'right' : 'left',
    };
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {tumbleweeds.map((weed) => (
        <TumbleweedItem key={weed.id} weed={weed} />
      ))}
    </div>
  );
};

const TumbleweedItem: React.FC<{ weed: Tumbleweed }> = ({ weed }) => {
  const startX = weed.direction === 'right' ? -200 : '110vw';
  const endX = weed.direction === 'right' ? '110vw' : -200;
  
  // Rolling rotation
  const rotateEnd = weed.direction === 'right' ? 1080 : -1080; 

  return (
    <motion.div
      initial={{ x: startX, opacity: 0 }}
      animate={{ 
        x: endX,
        opacity: [0, 1, 1, 1, 0], 
        rotate: rotateEnd 
      }}
      transition={{
        duration: weed.duration,
        delay: weed.delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
        ease: "linear",
      }}
      style={{
        top: `${weed.yBase}%`,
        width: weed.size,
        height: weed.size,
      }}
      className="absolute"
    >
      {/* Irregular Bounce Animation */}
      <motion.div
        animate={{ y: [0, -40, -10, -50, 0] }} // Double bounce pattern
        transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 0.8, 1]
        }}
        className="w-full h-full"
      >
        <img 
          src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/9108/tumbleweed-clipart-md.png" 
          alt="Tumbleweed"
          className="w-full h-full object-contain sepia-[30%] brightness-75 contrast-125 drop-shadow-md"
        />
      </motion.div>
    </motion.div>
  );
};