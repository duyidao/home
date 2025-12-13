import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Settings, Moon, Sun, ArrowUp, BookOpen, X, ListTodo, Github } from 'lucide-react';

interface NavigationUIProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onScrollTo: (section: 'top' | 'module2' | 'module3' | 'module4') => void;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.8,
    transition: { duration: 0.2 } 
  }
};

// Wooden Button Component
const WoodenButton = ({ onClick, children, className = "" }: { onClick: () => void, children: React.ReactNode, className?: string }) => (
  <motion.button
    variants={itemVariants}
    whileHover={{ scale: 1.05, x: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative flex items-center justify-between w-40 px-4 py-3 bg-[#5d2906] border-2 border-[#8b4513] shadow-[4px_4px_0px_rgba(0,0,0,0.4)] text-[#fdfbf7] font-western text-sm tracking-wider overflow-hidden group transform-gpu [backface-visibility:hidden] z-10 ${className}`}
  >
     {/* Wood Texture Overlay */}
     <div className="absolute inset-0 bg-wood-pattern opacity-40 pointer-events-none mix-blend-overlay"></div>
     {/* Nails */}
     <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#2a1202] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
     <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#2a1202] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
     <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-[#2a1202] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
     <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#2a1202] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
     
     <div className="relative z-10 flex items-center justify-between w-full">
       {children}
     </div>
  </motion.button>
);

export const NavigationUI: React.FC<NavigationUIProps> = ({ 
  isDarkMode, 
  onToggleDarkMode, 
  onScrollTo 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuContainerVariants: Variants = {
    hidden: { 
      opacity: 0,
      transition: { 
        staggerChildren: 0.05, 
        staggerDirection: -1 
      }
    },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.1, // Wait for button animation
        staggerChildren: 0.1 
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  return (
    <>
      {/* --- TOP RIGHT SETTINGS MENU --- */}
      {/* Fixed Wrapper */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        
        {/* Interaction Zone Wrapper: Handles Hover */}
        <div 
          className="flex flex-col items-end pointer-events-auto"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Main Toggle Button */}
          <motion.div
            layout
            className="relative z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-[#5d2906] border-4 border-[#8b4513] text-[#fdfbf7] shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-wood-pattern opacity-40"></div>
              <div className="absolute inset-0 border-2 border-[#d4b996] rounded-full opacity-50"></div>
              
              <div className="relative z-10">
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={28} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="settings"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Settings size={28} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </motion.div>

          {/* Dropdown Menu Container */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-end pt-4 pr-2 relative pointer-events-auto"
              >
                {/* Rope visual - Aligned to the right side of the items to hang visually under the button */}
                <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: "100%" }}
                   exit={{ height: 0 }}
                   transition={{ duration: 0.3, ease: "easeInOut" }}
                   className="absolute top-0 right-[26px] w-[4px] bg-[url('https://www.transparenttextures.com/patterns/rope-texture.png')] bg-repeat-y bg-contain bg-amber-900 -z-10 shadow-lg origin-top"
                />

                {/* Menu Items */}
                <div className="flex flex-col gap-3">
                  <WoodenButton onClick={onToggleDarkMode}>
                    <span>{isDarkMode ? "Day" : "Night"}</span>
                    {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-200" />}
                  </WoodenButton>

                  <WoodenButton onClick={() => { onScrollTo('module2'); setIsOpen(false); }}>
                    <span>Github</span>
                    <Github size={18} />
                  </WoodenButton>

                  <WoodenButton onClick={() => { onScrollTo('module3'); setIsOpen(false); }}>
                    <span>Project</span>
                    <BookOpen size={18} />
                  </WoodenButton>

                  <WoodenButton onClick={() => { onScrollTo('module4'); setIsOpen(false); }}>
                    <span>Todo</span>
                    <ListTodo size={18} />
                  </WoodenButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- BOTTOM RIGHT SCROLL TO TOP --- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onScrollTo('top')}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded bg-[#8b4513] border-2 border-[#d4b996] text-[#fdfbf7] shadow-xl flex items-center justify-center overflow-hidden transform rotate-45 group transform-gpu [backface-visibility:hidden]"
          >
             <div className="absolute inset-0 bg-wood-pattern opacity-40"></div>
             <ArrowUp size={28} className="relative z-10 -rotate-45" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};