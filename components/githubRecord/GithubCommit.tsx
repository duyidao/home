import React from "react";
import { GitBranch, GitPullRequestIcon } from 'lucide-react';
import dayjs from 'dayjs';
interface GithubCommitProps {
  list?: Array<any>;
}

export const GithubCommit: React.FC<GithubCommitProps> = ({ list }) => {
  return (
    <div className="flex-grow overflow-y-auto pr-1 space-y-4 max-h-[800px] scrollbar-thin">
      {list.map((commit, idx) => (
        <div
          key={idx}
          className="relative pb-4 border-b border-dashed border-stone-300 last:border-0 hover:bg-stone-50 transition-colors p-1 rounded cursor-pointer"
          onClick={() => window.open(commit.url, '_blank')}
        >
          <div className="text-[10px] text-stone-400 font-typewriter mb-1 flex justify-between">
            <span>{dayjs(commit.committedDate).format('YYYY-MM-DD')}</span>
            <span>{dayjs(commit.committedDate).format('HH:mm:ss')}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-wood font-bold mb-1">
            {commit.type === 'commit' ? (
              <GitBranch size={10} />
            ) : (
              <GitPullRequestIcon size={10} />
            )}
            <span className="truncate max-w-[150px]">{commit.repository}</span>
          </div>
          <p className="text-xs text-stone-700 font-typewriter leading-relaxed">
            {commit.message}
          </p>
        </div>
      ))}
    </div>
  )
}