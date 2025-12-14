import React, { useState } from "react";
import { Plus } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const Wanted: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="relative bg-[#5d2906] p-4 rounded-lg shadow-2xl border-4 border-[#3e1b04] h-full">
          <div className="absolute inset-0 bg-wood-pattern opacity-50 pointer-events-none mix-blend-overlay"></div>
          {/* Nails */}
          <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-[#1a0f00]"></div>
          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#1a0f00]"></div>

          {/* Paper */}
          <div className="relative bg-[#fdfbf7] mx-1 my-1 p-8 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border border-[#d7c4a1] transform -rotate-[0.5deg] h-[97%] flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-paper-texture opacity-40 pointer-events-none"></div>
            <h2 className="text-3xl font-western uppercase text-[#5d2906] mb-4 text-center">
              Now Bug Fixed
            </h2>
            <div className="w-32 h-32 border-4 border-stone-800 mb-4 bg-stone-200 flex items-center justify-center shadow-inner">
              <span className="font-western text-6xl text-stone-400 opacity-50">
                ?
              </span>
            </div>
            <p className="font-typewriter text-stone-700 text-center mb-6">
              Unknown Bug <br /> Project: Unknown
            </p>
            <div className="w-full border-t border-stone-400 pt-4 text-center">
              <button className="flex items-center gap-2 mx-auto px-4 py-2 border-2 border-stone-800 rounded hover:bg-stone-200 transition-colors font-western text-stone-900">
                <Plus size={16} /> Report Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
