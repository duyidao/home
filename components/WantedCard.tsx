import React from 'react';
import { clsx } from 'clsx';
import { SnowCap } from './SnowEffect';

interface WantedCardProps {
  children: React.ReactNode;
  className?: string;
  hasSnow?: boolean;
  title?: string;
}

const Screw: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx("w-3.5 h-3.5 rounded-full bg-stone-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),0_1px_1px_rgba(255,255,255,0.6)] border border-stone-500 flex items-center justify-center z-10", className)}>
    <div className="w-full h-[2px] bg-stone-600/80 shadow-[0_1px_0_rgba(255,255,255,0.4)] transform rotate-45"></div>
  </div>
);

export const WantedCard: React.FC<WantedCardProps> = ({ children, className, hasSnow, title }) => {
  return (
    <div className={clsx("relative p-6 bg-[#fdfbf7] shadow-2xl transition-all transform-gpu backface-hidden subpixel-antialiased", className)}>
      {/* Decorative Screws */}
      <Screw className="absolute top-3 left-3 transform -rotate-12" />
      <Screw className="absolute top-3 right-3 transform rotate-45" />
      <Screw className="absolute bottom-3 left-3 transform rotate-12" />
      <Screw className="absolute bottom-3 right-3 transform -rotate-90" />

      {/* Snow Overlay */}
      {hasSnow && <SnowCap />}

      {/* Border Image / Container Style */}
      <div className="absolute inset-0 border-4 border-double border-wood bg-paper-texture opacity-50 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-0 h-full flex flex-col items-center">
        {title && (
          <div className="mb-6 text-center border-b-2 border-stone-800 pb-2 w-full">
             <h2 className="text-4xl font-western uppercase tracking-widest text-stone-900 drop-shadow-sm">
              {title}
             </h2>
             <span className="text-xs font-serif tracking-widest text-stone-600">REWARD FOR READING</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};