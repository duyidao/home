import React from 'react';

interface GithubRepoState {
  name: string
  description: string
  primaryLanguage: { name: string, color: string}
  url: string
  isPrivate: boolean
}

interface GithubRepoProps {
  list?: Array<GithubRepoState>;
}

export const GithubRepo: React.FC<GithubRepoProps> = ({ list }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[440px] overflow-y-auto">
      {list.map((repo: GithubRepoState, idx: number) => (
        <div
          key={idx}
          className="p-3 border border-stone-300 rounded bg-paper-old/20 cursor-pointer transform-gpu [backface-visibility:hidden] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-wood hover:bg-[#fff9e6] group"
          onClick={() => window.open(repo.url, '_blank')} // Open in new tab or window
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-wood-dark text-sm truncate pr-2 group-hover:text-[#8b4513] transition-colors" title={repo.name}>{repo.name}</span>
            <span className="text-[10px] px-1 border border-stone-400 rounded text-stone-500 bg-white">{repo.isPrivate ? 'Private' : 'Public'}</span>
          </div>
          <p className="text-xs text-stone-600 font-typewriter h-8 overflow-hidden line-clamp-2 mb-2 group-hover:text-stone-800" title={repo.description}>{repo.description}</p>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className={`w-2 h-2 rounded-full bg-[${repo.primaryLanguage?.color}]`}></span>
            {repo.primaryLanguage?.name}
          </div>
        </div>
      ))}
    </div>
  );
};