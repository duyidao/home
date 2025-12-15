import React from 'react';
import { motion } from 'framer-motion';

export const DustEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* 
        Gust 1: Left to Right with Downward Tilt
        Position: Upper section (approx 10vh - 30vh)
        Timing: Starts at 1s, Duration 8s, Repeats after 12s wait (Total 20s cycle)
      */}
      <GustGroup 
        direction="ltr"
        top="10%"
        height="25vh"
        delay={1}
        duration={8}
        repeatDelay={12} 
        cloudColor="#9a3412" // Dark Rust/Brown
        sandColor="#78350f"
      />

      {/* 
        Gust 2: Right to Left with Downward Tilt
        Position: Lower section (approx 60vh - 85vh)
        Timing: Starts at 11s (offset by 10s), Duration 8s, Repeats after 12s wait
      */}
      <GustGroup 
        direction="rtl"
        top="60%"
        height="25vh"
        delay={11} 
        duration={8}
        repeatDelay={12}
        cloudColor="#fde047" // Light Yellow
        sandColor="#fffbeb"
      />
    </div>
  );
};

interface GustGroupProps {
  direction: 'ltr' | 'rtl';
  top: string;
  height: string;
  delay: number;
  duration: number;
  repeatDelay: number;
  cloudColor: string;
  sandColor: string;
}

const GustGroup: React.FC<GustGroupProps> = ({ 
  direction, 
  top, 
  height, 
  delay, 
  duration, 
  repeatDelay, 
  cloudColor,
  sandColor
}) => {
  // Define trajectory far off-screen to ensure full passage
  const startX = direction === 'ltr' ? '-50vw' : '150vw';
  const endX = direction === 'ltr' ? '150vw' : '-50vw';
  
  // Define diagonal tilt: Start high, end low (simulating wind + gravity)
  // This creates an angled path of approx 20vh drop over the width
  const startY = "-10vh";
  const endY = "10vh";

  // Large Dust Clouds (Blurry bases)
  const clouds = Array.from({ length: 4 });
  // Sharp Sand Grains (Details)
  const grains = Array.from({ length: 15 });

  return (
    <div 
      className="absolute w-full"
      style={{ top, height }}
    >
      {/* Clouds Layer */}
      {clouds.map((_, i) => {
        // Randomize placement within the horizontal band
        const yPos = Math.random() * 80 + 10; // 10% to 90% of band height
        const sizeW = 300 + Math.random() * 200; // Wide clouds
        const sizeH = 60 + Math.random() * 40;
        
        // Randomize duration slightly for natural feel, but keep synced to cycle
        const variance = Math.random() * 1; 
        const thisDuration = duration + variance;
        const cycleTime = duration + repeatDelay;
        const thisRepeatDelay = cycleTime - thisDuration;

        return (
          <motion.div
            key={`cloud-${i}`}
            initial={{ x: startX, y: startY, opacity: 0 }}
            animate={{
              x: endX,
              y: endY,
              opacity: [0, 0.4, 0.4, 0], // Smooth fade in/out
            }}
            transition={{
              duration: thisDuration,
              delay: delay + (Math.random() * 0.5),
              repeat: Infinity,
              repeatDelay: thisRepeatDelay,
              ease: "easeInOut"
            }}
            className="absolute rounded-full blur-[50px]"
            style={{
              backgroundColor: cloudColor,
              top: `${yPos}%`,
              left: 0, 
              width: `${sizeW}px`,
              height: `${sizeH}px`,
            }}
          />
        );
      })}

      {/* Sand Grains Layer (Faster, Sharper) */}
      {grains.map((_, i) => {
         const yPos = Math.random() * 100;
         const grainSize = 2 + Math.random() * 3;
         // Grains might move faster than the cloud
         const speedFactor = 0.8 + Math.random() * 0.2; 
         const thisDuration = duration * speedFactor;
         
         const cycleTime = duration + repeatDelay;
         const thisRepeatDelay = cycleTime - thisDuration;

         return (
            <motion.div
             key={`grain-${i}`}
             initial={{ x: startX, y: startY, opacity: 0 }}
             animate={{
                x: endX,
                y: endY,
                opacity: [0, 1, 1, 0],
             }}
             transition={{
                duration: thisDuration,
                delay: delay + (Math.random() * 2), // Spread out arrival
                repeat: Infinity,
                repeatDelay: thisRepeatDelay,
                ease: "linear"
             }}
             className="absolute rounded-sm opacity-90"
             style={{ 
               backgroundColor: sandColor,
               top: `${yPos}%`,
               left: 0,
               width: `${grainSize}px`,
               height: `${grainSize}px`,
               boxShadow: `0 0 2px ${sandColor}`
             }}
            />
         )
      })}
    </div>
  );
};