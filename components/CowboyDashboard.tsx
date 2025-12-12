import React, { useState, useEffect } from 'react';
import { User, Star, GitCommit, GitPullRequest, CircleDot, GitBranch } from 'lucide-react';
import { GithubCalendar } from './GithubCalendar';
import { fetchGithubUser } from '@/apis/github';
import type { IUserInfo } from '@/types/user.info.d.ts'

// Mock Data matching screenshot
const LANGUAGES = [
  { name: 'Vue', color: '#41b883', percent: 68.69 },
  { name: 'TypeScript', color: '#3178c6', percent: 12.21 },
  { name: 'JavaScript', color: '#f1e05a', percent: 9.53 },
  { name: 'Less', color: '#1d365d', percent: 4.54 },
  { name: 'HTML', color: '#e34c26', percent: 1.52 },
  { name: 'CSS', color: '#563d7c', percent: 2.54 },
  { name: 'SCSS', color: '#c6538c', percent: 0.97 },
];

const REPOS = [
  { name: 'excellent-medical-consultation', desc: 'vue3+ts优医问诊项目学习', lang: 'Vue', public: true },
  { name: 'daodao_try', desc: '暂无描述', lang: 'CSS', public: true },
  { name: 'duyidao-home', desc: '刀刀项目首页', lang: 'Vue', public: true },
  { name: 'music-web', desc: '刀刀音乐在线代码仓库', lang: 'Vue', public: true },
  { name: 'watch_pic', desc: '阅读文件夹下全部的图片', lang: 'TypeScript', public: true },
  { name: 'blog_review', desc: '刀刀博客评论存放仓库', lang: 'TypeScript', public: true },
  { name: 'duyidao.github.io', desc: '刀刀博客入口库', lang: 'HTML', public: true },
  { name: 'doctor', desc: '暂无描述', lang: 'Vue', public: true }
];

const COMMITS = [
  { date: '2025-11-19', time: '10:44:39', repo: 'duyidao/duyidao.github.io', msg: 'docs: css阅读文档第九章添加' },
  { date: '2025-10-11', time: '16:02:05', repo: 'duyidao/music-web', msg: 'feat: 实现音乐列表缩放功能，调整ui布局' },
  { date: '2025-10-10', time: '16:41:07', repo: 'duyidao/duyidao-home', msg: 'feat: 可视化剩余模块完成,ts类型完成' },
  { date: '2025-10-09', time: '18:06:22', repo: 'duyidao/duyidao-home', msg: 'feat: 项目创建,初步实现个人github可视化模块' },
  { date: '2025-09-28', time: '18:03:12', repo: 'duyidao/music-web', msg: 'fix: 修改自动播放完不会激活下一首歌' },
  { date: '2025-09-28', time: '16:49:10', repo: 'duyidao/music-web', msg: 'fix: 全部数据均来源于接口获取,不再前...' },
];

const RibbonTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative h-10 mb-6 flex items-center justify-center">
    <div className="absolute inset-0 bg-wood flex items-center justify-center shadow-md transform skew-x-12 border border-wood-dark"></div>
    <div className="absolute inset-0 bg-[#8b4513] flex items-center justify-center transform -skew-x-12 border border-wood-light opacity-90"></div>
    <h3 className="relative z-10 font-western text-lg text-[#fdfbf7] px-8 tracking-wider drop-shadow-md">
      {children}
    </h3>
    {/* Decorative stars */}
    <div className="absolute left-2 z-10 text-wood-light">★</div>
    <div className="absolute right-2 z-10 text-wood-light">★</div>
  </div>
);

export const CowboyDashboard: React.FC = () => {
  const [githubUser, setGithubUser] = useState({})
  const init = () => {
    fetchGithubUser().then(res => {
      setGithubUser(res.data)
    })
  }
   // 使用 useEffect 替代直接调用 init()
  useEffect(() => {
    init();
  }, []); // 空依赖数组表示只在组件挂载时执行一次
  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-2">
      
      {/* Left Column: Profile & Stats (Span 3) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-[#fdfbf7] p-4 rounded shadow-xl border-2 border-[#d7c4a1] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-wood"></div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-wood-light overflow-hidden mb-3 shadow-inner">
               <img src={githubUser.avatar_url} alt="Avatar" className="w-full h-full object-cover grayscale-[20%] sepia-[20%]" />
            </div>
            <h2 className="font-western text-2xl text-wood-dark">{githubUser.login}</h2>
            <p className="font-typewriter text-sm text-stone-500 mb-4">@{githubUser.name}</p>
            
            <div className="flex gap-4 text-xs font-bold text-stone-700 font-typewriter w-full justify-center border-t border-dashed border-stone-300 pt-3">
              <div className="flex items-center gap-1"><User size={14}/> {githubUser.followers} followers</div>
              <div className="flex items-center gap-1"><User size={14}/> {githubUser.following} following</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-6">
            <StatBox label="Commit" value="70" icon={<GitCommit size={14}/>} />
            <StatBox label="Star" value="11" icon={<Star size={14}/>} />
            <StatBox label="PR" value="7" icon={<GitPullRequest size={14}/>} />
            <StatBox label="Issue" value="0" icon={<CircleDot size={14}/>} />
          </div>
        </div>

        {/* Languages */}
        <div className="bg-[#fdfbf7] p-4 rounded shadow-xl border border-[#d7c4a1] relative">
          <RibbonTitle>常用语言</RibbonTitle>
          <div className="flex h-3 w-full rounded-full overflow-hidden bg-stone-200 mb-4 border border-stone-300">
             {LANGUAGES.map(lang => (
               <div key={lang.name} style={{ width: `${lang.percent}%`, backgroundColor: lang.color }} title={lang.name}></div>
             ))}
          </div>
          <div className="grid grid-cols-2 gap-y-2">
            {LANGUAGES.map(lang => (
              <div key={lang.name} className="flex items-center gap-2 text-xs font-typewriter text-stone-700">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }}></div>
                <span className="font-bold">{lang.name}</span>
                <span className="text-stone-400">{lang.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Column: Activity & Repos (Span 6) */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        {/* Activity */}
        <div className="bg-[#fdfbf7] p-4 rounded shadow-xl border border-[#d7c4a1]">
          <RibbonTitle>活跃度</RibbonTitle>
          <div className="flex flex-col gap-4">
            <GithubCalendar year="2025" total={122} />
            <GithubCalendar year="2024" total={125} />
          </div>
        </div>

        {/* Repos */}
        <div className="bg-[#fdfbf7] p-4 rounded shadow-xl border border-[#d7c4a1] flex-grow">
          <RibbonTitle>项目仓库</RibbonTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {REPOS.map((repo, idx) => (
               <div 
                  key={idx} 
                  // Added [backface-visibility:hidden] and transform-gpu to fix text flickering
                  className="p-3 border border-stone-300 rounded bg-paper-old/20 cursor-pointer transform-gpu [backface-visibility:hidden] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-wood hover:bg-[#fff9e6] group"
               >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-wood-dark text-sm truncate pr-2 group-hover:text-[#8b4513] transition-colors">{repo.name}</span>
                    <span className="text-[10px] px-1 border border-stone-400 rounded text-stone-500 bg-white">Public</span>
                  </div>
                  <p className="text-xs text-stone-600 font-typewriter h-8 overflow-hidden mb-2 group-hover:text-stone-800">{repo.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className={`w-2 h-2 rounded-full ${getLangColor(repo.lang)}`}></span>
                    {repo.lang}
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Right Column: Commits (Span 3) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="bg-[#fdfbf7] p-4 rounded shadow-xl border border-[#d7c4a1] h-full relative">
           {/* Decorative paper holes */}
           <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around py-4">
              {[...Array(8)].map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-stone-200 shadow-inner"></div>)}
           </div>
           
           <div className="pl-6 h-full flex flex-col">
             <RibbonTitle>提交记录</RibbonTitle>
             <div className="flex-grow overflow-y-auto pr-1 space-y-4 max-h-[600px] scrollbar-thin">
                {COMMITS.map((commit, idx) => (
                  <div key={idx} className="relative pb-4 border-b border-dashed border-stone-300 last:border-0 hover:bg-stone-50 transition-colors p-1 rounded">
                    <div className="text-[10px] text-stone-400 font-typewriter mb-1 flex justify-between">
                       <span>{commit.date}</span>
                       <span>{commit.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-wood font-bold mb-1">
                      <GitBranch size={10} />
                      <span className="truncate max-w-[150px]">{commit.repo}</span>
                    </div>
                    <p className="text-xs text-stone-700 font-typewriter leading-relaxed">
                      {commit.msg}
                    </p>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>

    </div>
  );
};

const StatBox = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-stone-100 p-2 rounded flex flex-col items-center justify-center border border-stone-200">
     <div className="flex items-center gap-1 text-[10px] uppercase text-stone-500 mb-1">
        {icon} {label}
     </div>
     <span className="font-western text-lg text-wood">{value}</span>
  </div>
);

const getLangColor = (lang: string) => {
  if (lang === 'Vue') return 'bg-[#41b883]';
  if (lang === 'TypeScript') return 'bg-[#3178c6]';
  if (lang === 'JavaScript') return 'bg-[#f1e05a]';
  if (lang === 'CSS') return 'bg-[#563d7c]';
  if (lang === 'HTML') return 'bg-[#e34c26]';
  return 'bg-gray-400';
}