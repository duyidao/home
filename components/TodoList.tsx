import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const INITIAL_TODOS: Todo[] = [
  { id: 1, text: "Refactor the Saloon API", completed: true },
  { id: 2, text: "Fix the tumbleweed animation glitch", completed: false },
  { id: 3, text: "Update wanted posters (documentation)", completed: false },
  { id: 4, text: "Brew some strong coffee", completed: true },
  { id: 5, text: "Deploy to the Wild West (Production)", completed: false },
];

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto perspective-1000">
      {/* Outer Wood Board */}
      <div className="relative bg-[#5d2906] p-4 rounded-lg shadow-2xl border-4 border-[#3e1b04]">
        {/* Wood Texture Overlay */}
        <div className="absolute inset-0 bg-wood-pattern opacity-50 pointer-events-none mix-blend-overlay"></div>
        
        {/* Nails */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-[#1a0f00] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"></div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#1a0f00] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-[#1a0f00] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-[#1a0f00] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"></div>

        {/* Inner Paper (Inset effect) */}
        {/* The inset effect is achieved by the dark background of the wood showing through the gap, 
            plus a shadow on the paper itself to look sunk in, or standard shadow to look pinned on. 
            Request said "inset 5px". We will use a margin/padding trick. */}
        <div className="relative bg-[#fdfbf7] mx-1 my-1 p-8 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border border-[#d7c4a1] transform rotate-[0.5deg]">
           {/* Paper texture */}
           <div className="absolute inset-0 bg-paper-texture opacity-40 pointer-events-none"></div>
           
           {/* "TODO LIST" Header */}
           <div className="text-center mb-8 border-b-2 border-stone-800 pb-2 border-double">
             <h2 className="text-4xl font-western tracking-[0.2em] text-[#5d2906] drop-shadow-sm uppercase">
               Bounty List
             </h2>
             <span className="font-typewriter text-xs text-stone-500 tracking-widest">DEAD OR ALIVE (BUGS)</span>
           </div>

           {/* List Items */}
           <ul className="space-y-4 font-paper text-lg text-stone-800">
             {todos.map((todo) => (
               <motion.li 
                 key={todo.id}
                 layout
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-4 group cursor-pointer"
                 onClick={() => toggleTodo(todo.id)}
               >
                 {/* Custom Checkbox */}
                 <div className={`w-6 h-6 border-2 border-[#5d2906] rounded-sm flex items-center justify-center transition-colors ${todo.completed ? 'bg-[#5d2906]' : 'bg-transparent'}`}>
                    {todo.completed && <Check size={16} className="text-[#fdfbf7]" />}
                 </div>
                 
                 {/* Text with strike-through animation */}
                 <span className={`relative transition-all duration-300 ${todo.completed ? 'text-stone-400' : 'text-stone-800'}`}>
                   {todo.text}
                   {todo.completed && (
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: '100%' }}
                       className="absolute top-1/2 left-0 h-[2px] bg-stone-500 content-['']"
                     />
                   )}
                 </span>
               </motion.li>
             ))}
           </ul>

           {/* Footer Stamp */}
           <div className="mt-8 flex justify-end opacity-70 transform -rotate-12">
              <div className="border-4 border-red-800 text-red-800 rounded px-2 py-1 font-western text-xl uppercase tracking-widest mask-image-grunge">
                Approved
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};