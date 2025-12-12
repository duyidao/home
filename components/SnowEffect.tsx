import React, { useMemo } from 'react';

export const SnowCap: React.FC = () => {
  // Generate random snow shape configuration on mount
  const { clipPath, flake1, flake2 } = useMemo(() => {
    // Generate the path for the snow cap
    // Start at top-left, go to top-right
    let pathPoints = ['0% 0%', '100% 0%'];
    
    // Generate bottom edge from right to left with random drips
    const steps = 12 + Math.floor(Math.random() * 8); // 12 to 20 segments
    const stepSize = 100 / steps;
    
    for (let i = steps; i >= 0; i--) {
      const x = i * stepSize;
      
      // Determine height of the bottom edge at this point
      // 100% y is the bottom of the container (deepest drip)
      // 40% y is high up (shallow snow)
      
      // Introduce randomness for "icicles"
      const isIcicle = Math.random() > 0.75; 
      let y;
      
      if (isIcicle) {
        // Deep drip: 80% to 100% height
        y = 80 + Math.random() * 20; 
      } else {
        // Standard uneven snow: 40% to 65% height
        y = 40 + Math.random() * 25;
      }

      // Smooth out the x slightly to avoid perfectly straight lines if desired, 
      // but strictly following grid is fine for CSS polygon.
      pathPoints.push(`${x}% ${y}%`);
    }
    
    // Construct the polygon string
    const path = `polygon(${pathPoints.join(', ')})`;

    // Randomize flake positions and animation timings
    const f1 = {
      left: `${5 + Math.random() * 40}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2.5 + Math.random() * 2}s`
    };
    
    const f2 = {
      left: `${50 + Math.random() * 45}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${3.5 + Math.random() * 2}s`
    };

    return { clipPath: path, flake1: f1, flake2: f2 };
  }, []);

  return (
    <div className="absolute -top-3 -left-[1%] w-[102%] h-8 z-20 pointer-events-none filter drop-shadow-sm">
      <div 
        className="w-full h-full bg-white opacity-95 transition-all duration-1000 ease-in-out" 
        style={{ clipPath }}
      />
      
      {/* Drifting snowflake 1 */}
      <div 
        className="absolute -top-2 w-2 h-2 bg-white rounded-full opacity-80 animate-bounce" 
        style={{ 
          left: flake1.left, 
          animationDuration: flake1.duration, 
          animationDelay: flake1.delay 
        }} 
      />
      
      {/* Drifting snowflake 2 */}
      <div 
        className="absolute -top-4 w-1.5 h-1.5 bg-white rounded-full opacity-80 animate-bounce" 
        style={{ 
          left: flake2.left, 
          animationDuration: flake2.duration, 
          animationDelay: flake2.delay 
        }} 
      />
    </div>
  );
};