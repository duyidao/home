import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, Youtube, Code2, Plus } from 'lucide-react';
import { Typewriter } from './components/Typewriter';
import { WantedCard } from './components/WantedCard';
import { CowboyDashboard } from './components/CowboyDashboard';
import { DustEffect } from './components/DustEffect';
import { LeafEffect } from './components/LeafEffect';
import { NavigationUI } from './components/NavigationUI';
import { TodoList } from './components/TodoList';
import { FallingSnow } from './components/FallingSnow';

const App: React.FC = () => {
  // Navigation & State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const section4Ref = useRef<HTMLElement>(null);

  const handleScrollTo = (section: 'top' | 'module2' | 'module3' | 'module4') => {
    if (section === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'module2' && section2Ref.current) {
      section2Ref.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'module3' && section3Ref.current) {
      section3Ref.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'module4' && section4Ref.current) {
      section4Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Global Scroll Animation Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Module 2 Scroll Setup
  const { scrollYProgress: section2Progress } = useScroll({
    target: section2Ref,
    offset: ["start start", "end start"]
  });

  // --- BACKGROUND OPACITY TRANSITIONS ---
  // Adjusted: Module 1 -> 2 transition happens earlier and faster
  const springOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  // Summer (Module 2) starts fading in at 0.12 and is fully visible by 0.22 (approx start of Module 2)
  const summerOpacity = useTransform(scrollYProgress, [0.12, 0.22, 0.45, 0.55], [0, 1, 1, 0]);
  const winterOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const blendOpacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);


  // --- MODULE ANIMATIONS ---
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]); 

  const section2Opacity = useTransform(section2Progress, [0.6, 0.9], [1, 0]);
  const section2Scale = useTransform(section2Progress, [0.6, 0.9], [1, 0.9]);
  const section2Y = useTransform(section2Progress, [0.6, 0.9], [0, 50]);

  const projectList = [
    {
      title: '刀刀博客',
      subTitle: 'Daodao Blog',
      description: '刀刀前端学习博客，记录着学习的知识积累',
      tags: ['Blog', 'Learn', 'Vitepress', 'Vue'],
      url: 'https://blog.duyidao.cn/',
    },
    {
      title: '刀刀音乐',
      subTitle: 'Daodao Music',
      description: '刀刀音乐项目，一个基于 Vue3 + TypeScript 的音乐播放器',
      tags: ['Music', 'TypeScript', 'Vue'],
      url: 'https://music.duyidao.cn/',
    },
  ]

  // Updated Tag Renderer
  const renderTags = (tags: string[]) => (
    <div className="mt-4 flex flex-wrap gap-3">
      {tags.map(tag => (
        <span 
          key={tag} 
          className="relative px-3 py-1.5 bg-[#8b4513] text-[#e6d5b8] font-western text-[10px] tracking-wider rounded-sm shadow-[1px_1px_2px_rgba(0,0,0,0.5)] hover:scale-105 hover:bg-[#a0522d] hover:text-white transition-all cursor-pointer select-none group"
        >
          <span className="absolute top-[3px] left-[3px] w-1 h-1 rounded-full bg-[#3e1b04] shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.3)]"></span>
          <span className="absolute top-[3px] right-[3px] w-1 h-1 rounded-full bg-[#3e1b04] shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.3)]"></span>
          <span className="absolute bottom-[3px] left-[3px] w-1 h-1 rounded-full bg-[#3e1b04] shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.3)]"></span>
          <span className="absolute bottom-[3px] right-[3px] w-1 h-1 rounded-full bg-[#3e1b04] shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.3)]"></span>
          <span className="absolute inset-0 bg-wood-pattern opacity-20 pointer-events-none mix-blend-overlay"></span>
          <span className="relative z-10">{tag.toUpperCase()}</span>
        </span>
      ))}
    </div>
  );

  const SocialButton = ({ href, label, icon }: { href: string, label: string, icon: React.ReactNode }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="relative flex items-center justify-center gap-2 px-6 py-3 bg-[#5d2906] text-[#fdfbf7] font-western text-sm border-2 border-[#8b4513] rounded shadow-lg hover:bg-[#8b4513] hover:-translate-y-1 transition-all group overflow-hidden"
    >
       <div className="absolute inset-0 bg-wood-pattern opacity-30 pointer-events-none"></div>
       <span className="relative z-10 flex items-center gap-2">
         {icon} {label}
       </span>
    </a>
  );

  return (
    <div className="relative min-h-[400vh] font-sans" ref={containerRef}>
      
      <NavigationUI 
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onScrollTo={handleScrollTo}
      />

      {/* --- GLOBAL FIXED BACKGROUND CONTAINER --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Layer 1: Spring (Module 1) */}
        <motion.div 
          style={{ opacity: springOpacity }}
          className="absolute inset-0 bg-[#e8cd9a]"
        >
           <LeafEffect />
           <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-orange-100/50 to-transparent"></div>
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] mix-blend-multiply"></div>
        </motion.div>

        {/* Layer 2: Summer (Module 2) */}
        <motion.div 
          style={{ opacity: summerOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#fcd34d] via-[#d97706] to-[#78350f]"
        >
           <DustEffect />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        </motion.div>

        {/* Layer 3: Winter (Module 3) */}
        <motion.div 
          style={{ opacity: winterOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#94a3b8] via-[#cbd5e1] to-[#f1f5f9]"
        >
           {/* Added Falling Snow Effect here */}
           <FallingSnow />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-30 animate-pulse"></div>
        </motion.div>

        {/* Layer 4: Blend (Module 4) */}
        <motion.div 
          style={{ opacity: blendOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#cbd5e1] to-[#e8cd9a]"
        >
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-15"></div>
           <div className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        </motion.div>

        {/* Global Texture Overlay */}
        <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>

        {/* --- NIGHT MODE OVERLAY --- */}
        <motion.div
            initial={false}
            animate={{ opacity: isDarkMode ? 0.85 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-[#0f172a] mix-blend-multiply z-50"
        />
         <motion.div
            initial={false}
            animate={{ opacity: isDarkMode ? 0.6 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen z-50"
        />
      </div>


      {/* --- MODULE 1: HERO SECTION --- */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative h-screen w-full flex items-center justify-center p-4 z-10"
      >
        <div className="max-w-screen-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left: Text Info */}
          <div className="text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start">
            <h1 className="text-6xl md:text-1200 font-western mb-6 relative select-none tracking-wide">
              <span className={`bg-clip-text text-transparent bg-gradient-to-b ${isDarkMode ? 'from-[#a67c52] to-[#d4b996]' : 'from-[#5d2906] to-[#8b4513]'} drop-shadow-[2px_2px_0px_rgba(255,255,255,0.4)] filter transition-colors duration-700`}>
                刀刀小站
              </span>
            </h1>
            
            <div className="flex items-center justify-center h-16 md:h-12 mb-8 md:justify-start w-full">
              <Typewriter 
                texts={[
                  "Oasis in the Code Desert",
                  "Full Stack Gunslinger",
                  "React & Node.js Outlaw",
                  "Wanted: Clean Code"
                ]} 
                className={`text-xl md:text-2xl font-typewriter ${isDarkMode ? 'text-[#d4b996]' : 'text-[#422006]'} font-bold tracking-tight transition-colors duration-700`}
                typingSpeed={120}
              />
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <SocialButton href="https://github.com/duyidao" label="Github" icon={<Github size={18}/>} />
              <SocialButton href="https://gitee.com/duyidao" label="Gitee" icon={<Code2 size={18}/>} />
              <SocialButton href="https://space.bilibili.com/383875686?spm_id_from=333.1365.0.0" label="Bilibili" icon={<Youtube size={18}/>} />
            </div>
          </div>

          {/* Right: Avatar/Logo */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="group relative w-64 h-64 md:w-80 md:h-80">
               {/* Decorative Frame */}
               <div className="absolute inset-0 border-8 border-[#5d2906] rounded-full shadow-2xl z-20 bg-wood-pattern"></div>
               <div className="absolute inset-2 border-4 border-[#d4b996] rounded-full z-20 border-dashed"></div>
               {/* Avatar Image */}
               <div className="absolute inset-4 rounded-full overflow-hidden z-10 bg-sepia shadow-inner">
                  <img 
                    src="https://avatars.githubusercontent.com/u/83811542?v=4&size=64" 
                    alt="Avatar" 
                    className="w-full h-full object-cover grayscale-[30%] sepia-[40%] group-hover:scale-110 transition-transform duration-700" 
                  />
               </div>
               {/* Background decoration - Optimized for Dark Mode - Warm Brown/Amber instead of Blue */}
               <div className={`absolute -inset-4 rounded-full blur-xl z-0 animate-pulse transition-colors duration-1000 ${isDarkMode ? 'bg-[#4a2c18]/50' : 'bg-[#8b4513]/20'}`}></div>
            </div>
          </div>

        </div>
      </motion.section>


      {/* --- MODULE 2: MY Github RECORD --- */}
      <section 
        ref={section2Ref}
        className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 z-10"
      >
        <motion.div 
          style={{ opacity: section2Opacity, scale: section2Scale, y: section2Y }}
          className="w-full max-w-screen-2xl px-4"
        >
          <div className="mb-10 text-center relative">
             <h2 className={`text-5xl font-western ${isDarkMode ? 'text-[#e6d5b8]' : 'text-[#5d2906]'} drop-shadow-[0_2px_0_rgba(255,223,186,0.8)] tracking-widest transition-colors duration-700`}>
               MY Github RECORD
             </h2>
             <div className="w-32 h-2 bg-[#5d2906] mx-auto mt-2 rounded-full opacity-80"></div>
          </div>

          <CowboyDashboard />
        </motion.div>
      </section>


      {/* --- MODULE 3: MY PROJECT WORK --- */}
      <section 
        ref={section3Ref}
        className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-12 z-10 pb-32"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-western text-slate-800 bg-white/60 px-8 py-4 rounded-lg shadow-xl border-4 border-slate-400 rotate-1 mb-16 backdrop-blur-sm"
        >
          My Project Work
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-2xl w-full">
          {/* Original 4 Cards */}
          {
            projectList.map((project, idx) => (
              <WantedCard key={idx} title={project.title} subTitle={project.subTitle} className={`hover:rotate-0 hover:scale-[1.02] duration-300transform-gpu will-change-transform cursor-pointer ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}`} hasSnow={true} onClick={() => window.open(project.url, '_blank')}>
                <div className="font-paper text-justify leading-relaxed text-sm flex flex-col h-full justify-between">
                  <p>{project.description}</p>
                  {renderTags(project.tags)}
                </div>
              </WantedCard>
            ))
          }
        </div>
      </section>

      {/* --- MODULE 4: BOUNTIES & TASKS --- */}
      <section 
        ref={section4Ref}
        className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 z-10 overflow-hidden"
      >
        {/* Module specific ambient effects: None requested */}

        <div className="relative z-10 w-full max-w-screen-2xl flex flex-col items-center mb-24">
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
             {/* Left Column: Todo List */}
             <div className="flex justify-center">
                <TodoList />
             </div>

             {/* Right Column: Additional Bounty Board or Stats */}
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
                          <h2 className="text-3xl font-western uppercase text-[#5d2906] mb-4 text-center">Most Wanted</h2>
                          <div className="w-32 h-32 border-4 border-stone-800 mb-4 bg-stone-200 flex items-center justify-center shadow-inner">
                             <span className="font-western text-6xl text-stone-400 opacity-50">?</span>
                          </div>
                          <p className="font-typewriter text-stone-700 text-center mb-6">Unknown Bug <br/> Reward: 500 Stars</p>
                          <div className="w-full border-t border-stone-400 pt-4 text-center">
                             <button className="flex items-center gap-2 mx-auto px-4 py-2 border-2 border-stone-800 rounded hover:bg-stone-200 transition-colors font-western text-stone-900">
                                <Plus size={16}/> Report Sighting
                             </button>
                          </div>
                       </div>
                    </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default App;