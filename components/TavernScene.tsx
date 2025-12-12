import React from 'react';
import { motion } from 'framer-motion';

export const TavernScene: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[35vh] pointer-events-none z-0 overflow-hidden flex flex-col justify-end">
      
      {/* Ambient Shadow/Glow from the bar */}
      <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

      {/* --- The Bar Counter (Table) --- */}
      <div className="relative w-full h-[15vh] bg-[#3e1b04] border-t-8 border-[#2a1202] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex items-end justify-around z-20">
         {/* Wood Texture Overlay */}
         <div className="absolute inset-0 bg-wood-pattern opacity-50 mix-blend-overlay"></div>
         
         {/* Highlight on edge */}
         <div className="absolute top-0 w-full h-[2px] bg-white/10"></div>

         {/* --- PROPS ON TABLE --- */}
         
         {/* Beer Mug Left */}
         <div className="absolute bottom-[16vh] left-[15%] md:left-[20%] w-10 h-12">
            <div className="w-full h-full bg-amber-500/80 border-2 border-amber-900 rounded-sm relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 w-full h-2 bg-white/80 animate-pulse"></div> {/* Foam */}
                <div className="absolute bottom-0 w-full h-[80%] bg-gradient-to-t from-amber-700 to-transparent opacity-50"></div>
            </div>
            <div className="absolute top-3 -right-3 w-3 h-6 border-2 border-amber-900 rounded-r-md"></div>
         </div>

         {/* Wine Glass Center-ish */}
         <div className="absolute bottom-[16vh] left-[45%] w-6 h-10 flex flex-col items-center opacity-80">
            <div className="w-6 h-6 rounded-b-full border-2 border-stone-400 bg-red-900/40 relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-[60%] bg-red-800"></div>
                <div className="absolute top-1 left-1 w-1 h-2 bg-white/20 rounded-full"></div>
            </div>
            <div className="w-[2px] h-4 bg-stone-400"></div>
            <div className="w-6 h-[2px] bg-stone-400"></div>
         </div>

         {/* Whiskey Bottle */}
         <div className="absolute bottom-[16vh] right-[30%] w-8 h-20 bg-[#4a2c18] rounded-t-lg border border-[#2a1202] flex items-center justify-center shadow-lg">
             <div className="w-6 h-10 bg-[#fdfbf7] opacity-80 mt-4 flex flex-col items-center justify-center">
                 <div className="w-4 h-[1px] bg-black mb-1"></div>
                 <div className="text-[4px] font-western text-black">WHISKEY</div>
                 <div className="w-4 h-[1px] bg-black mt-1"></div>
             </div>
             <div className="absolute -top-2 w-3 h-4 bg-[#2a1202]"></div>
         </div>

         {/* Playing Cards */}
         <div className="absolute bottom-[15.5vh] right-[25%] w-8 h-10 bg-[#fdfbf7] border border-stone-300 rounded-[1px] shadow-sm transform rotate-12 flex items-center justify-center">
             <span className="text-red-700 font-serif text-xs">♥ A</span>
         </div>
         <div className="absolute bottom-[15.5vh] right-[27%] w-8 h-10 bg-[#fdfbf7] border border-stone-300 rounded-[1px] shadow-sm transform -rotate-6 flex items-center justify-center">
             <span className="text-black font-serif text-xs">♠ K</span>
         </div>

      </div>

      {/* --- CHAIRS (Foreground) --- */}
      
      {/* Chair 1 (Left) */}
      <motion.div 
         initial={{ y: 20 }}
         whileInView={{ y: 0 }}
         transition={{ duration: 1 }}
         className="absolute bottom-[-20px] left-[5%] md:left-[10%] w-28 h-48 z-30 transform -rotate-3"
      >
          {/* Backrest */}
          <div className="w-full h-32 border-4 border-[#3e1b04] bg-[#5d2906] rounded-t-lg relative shadow-2xl">
              <div className="absolute inset-0 bg-wood-pattern opacity-40 mix-blend-overlay"></div>
              {/* Slats */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-24 bg-[#3e1b04]"></div>
              <div className="absolute top-2 left-[20%] w-2 h-24 bg-[#3e1b04]"></div>
              <div className="absolute top-2 right-[20%] w-2 h-24 bg-[#3e1b04]"></div>
          </div>
          {/* Legs/Seat connection hint */}
          <div className="w-[110%] -ml-[5%] h-4 bg-[#2a1202] rounded-full shadow-lg"></div>
      </motion.div>

      {/* Chair 2 (Center-Right, slightly messy) */}
      <motion.div 
         initial={{ y: 20 }}
         whileInView={{ y: 0 }}
         transition={{ duration: 1, delay: 0.2 }}
         className="absolute bottom-[-10px] right-[35%] w-28 h-52 z-30 transform rotate-6 scale-95 origin-bottom"
      >
          {/* Backrest */}
          <div className="w-full h-36 border-4 border-[#3e1b04] bg-[#5d2906] rounded-t-lg relative shadow-2xl">
              <div className="absolute inset-0 bg-wood-pattern opacity-40 mix-blend-overlay"></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-[#3e1b04] rounded-full"></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-28 bg-[#3e1b04]"></div>
          </div>
          <div className="w-[110%] -ml-[5%] h-4 bg-[#2a1202] rounded-full shadow-lg"></div>
      </motion.div>

      {/* Chair 3 (Far Right, turned away slightly) */}
      <motion.div 
         initial={{ y: 20 }}
         whileInView={{ y: 0 }}
         transition={{ duration: 1, delay: 0.4 }}
         className="absolute bottom-[-30px] right-[5%] w-28 h-48 z-30 transform -rotate-2 opacity-90"
      >
          {/* Backrest */}
          <div className="w-full h-32 border-4 border-[#3e1b04] bg-[#5d2906] rounded-t-lg relative shadow-2xl">
               <div className="absolute inset-0 bg-wood-pattern opacity-40 mix-blend-overlay"></div>
               <div className="absolute top-0 left-0 w-full h-full flex justify-around px-2 pt-2">
                   <div className="w-3 h-24 bg-[#3e1b04] rounded-t"></div>
                   <div className="w-3 h-24 bg-[#3e1b04] rounded-t"></div>
                   <div className="w-3 h-24 bg-[#3e1b04] rounded-t"></div>
               </div>
          </div>
          <div className="w-[110%] -ml-[5%] h-4 bg-[#2a1202] rounded-full shadow-lg"></div>
      </motion.div>

    </div>
  );
};