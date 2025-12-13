import React from 'react';

interface GithubCalendarProps {
  year?: string;
  weeks?: Array<any>;
}

export const GithubCalendar: React.FC<GithubCalendarProps> = ({ year, weeks }) => {
  let commitTotal = 0
  // 格式化提交的数据格式
  const weeksData = weeks?.flatMap((week: any) =>
    week.contributionDays.map((day: any) => {
      commitTotal += day.contributionCount
      return {
        date: day.date,
        count: day.contributionCount,
      }
    })
  ) || []
  
  // Western color palette for contributions (Paper/Leather style)
  const getContributionColor = (level: number) => {
    switch(level) {
      case 0: return 'bg-[#e8dec5]/50'; // Empty/Paper
      case 1: return 'bg-[#d4b996]'; // Light Leather
      case 2: return 'bg-[#a67c52]'; // Leather
      case 3: return 'bg-[#8b4513]'; // Saddle Brown
      case 4: return 'bg-[#5d2906]'; // Dark Chocolate
      default: return 'bg-[#e8dec5]';
    }
  };

  const generateGrid = () => {
    const grid = [];
    for (let w = 0; w < weeksData.length; w+=7) {
      const weekCol = [];
      // 计算是否足够一星期7天
      let days = weeksData.length > w + 7 ? 7 : weeksData.length - w;
      for (let d = 0; d < days; d++) {
        // Randomize mock data
        weekCol.push(
          <div 
            key={`${w}-${d}`}
            className={`w-2.5 h-2.5 rounded-[1px] ${getContributionColor(weeksData[w+d].count)} hover:scale-125 transition-transform duration-200 cursor-pointer`}
            title={`date ${weeksData[w+d].date} : ${weeksData[w+d].count} commits`}
          />
        );
      }
      grid.push(<div key={w} className="flex flex-col gap-[2px]">{weekCol}</div>);
    }
    return grid;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2 px-1">
         <span className="font-western text-sm text-stone-600">{year}</span>
         <span className="font-typewriter text-xs text-stone-500">{commitTotal} Contributions</span>
      </div>
      <div className="w-full overflow-x-auto p-2 bg-paper/50 rounded border border-stone-300/50">
        <div className="flex gap-[2px] min-w-max">
          {generateGrid()}
        </div>
      </div>
    </div>
  );
};