import {
  FC,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { User, Star, GitCommit, GitPullRequest, CircleDot } from "lucide-react";
import { GithubCalendar } from "./githubRecord/GithubCalendar";
import { GithubRepo } from "./githubRecord/GithubRepo";
import { GithubCommit } from "./githubRecord/GithubCommit";
import {
  fetchGithubUser,
  fetchAggregateGithubUserData,
  fetchGithubUserStatisticsTrend,
} from "@/apis/github";
import dayjs from "dayjs";
import type { IPullRequestNode } from "@/types/state.d.ts";
import type { IRepoHistoryNode } from "@/types/repositories.d.d.ts";

interface commitListType {
  committedDate: string;
  message: string;
  oid: string;
  repoUrl: string;
  repository: string;
  url: string;
  repoBranch: string;
  type: "pr" | "commit";
}

const year = Number(dayjs().format("YYYY"));

const RibbonTitle: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={`relative h-10 flex items-center justify-center mb-6`}>
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

export const CowboyDashboard: FC = () => {
  const [githubUser, setGithubUser] = useState({});
  const [aggregateGithubUserData, setAggregateGithubUserData] = useState({
    user: {},
    rateLimit: {},
  });
  const [githubUserStatisticsTrend, setGithubUserStatisticsTrend] = useState(
    {}
  );

  // 获取全部数据
  const init = useCallback(() => {
    fetchGithubUser().then((res) => {
      setGithubUser(res.data);
    });
    fetchAggregateGithubUserData().then((res) => {
      setAggregateGithubUserData(res);
    });
    fetchGithubUserStatisticsTrend().then((res) => {
      setGithubUserStatisticsTrend(res.user);
    });
  });
  // 使用 useEffect 替代直接调用 init()
  useEffect(() => {
    init();
  }, []); // 空依赖数组表示只在组件挂载时执行一次

  // 我的commit总数
  const commitTotal = useMemo(() => {
    // 先检查必要的属性是否存在
    if (
      !githubUserStatisticsTrend?.commitsTrend?.commitContributionsByRepository
    ) {
      return 0; // 或者返回其他默认值
    }
    return githubUserStatisticsTrend.commitsTrend?.commitContributionsByRepository.reduce(
      (acc, pre) => {
        return acc + pre.contributions.totalCount;
      },
      0
    );
  }, [githubUserStatisticsTrend]);

  // 我的pr总数
  const prTotal = useMemo(() => {
    // 先检查必要的属性是否存在
    if (!githubUserStatisticsTrend?.pullRequestsTrend?.nodes) {
      return 0; // 或者返回其他默认值
    }
    return githubUserStatisticsTrend.pullRequestsTrend?.nodes
      .filter((item) => item.headRefName !== "du")
      .filter((item) => item.state === "MERGED").length;
  }, [githubUserStatisticsTrend]);

  // 获取常用语言
  const languagesPercentage = useMemo(() => {
    if (!aggregateGithubUserData.user?.repositories?.nodes) return;
    const languageMap = new Map<string, { size: number; color: string }>();
    for (const repo of aggregateGithubUserData.user?.repositories?.nodes) {
      const edges = repo.languages?.edges || [];
      for (const edge of edges) {
        const { name, color } = edge.node;
        const size = edge.size as number;

        if (languageMap.has(name)) {
          languageMap.get(name)!.size += size;
        } else {
          languageMap.set(name, { size, color });
        }
      }
    }
    // 转为数组
    const languageArray = Array.from(languageMap.entries()).map(
      ([name, data]) => ({
        name,
        color: data.color,
        size: data.size,
      })
    );

    // 计算总字节数
    const totalSize = languageArray.reduce((sum, lang) => sum + lang.size, 0);
    // 计算百分比（保留 2 位小数）
    return languageArray.map((lang) => ({
      ...lang,
      percent: parseFloat(((lang.size / totalSize) * 100).toFixed(2)),
    }));
  }, [aggregateGithubUserData.user?.repositories?.nodes]);

  const commitAndPrList = useMemo(() => {
    const commitList = aggregateGithubUserData.user?.repositories?.nodes;
    const prList = githubUserStatisticsTrend?.pullRequestsTrend?.nodes;
    if (!commitList || !prList) return [];
    const formatPullRequestsTrend = prList.map((item: IPullRequestNode) => ({
      committedDate: item.mergedAt,
      message: item.title,
      oid: "" + item.additions + item.number + item.title,
      repoUrl: item.repository.url,
      repository: item.repository.nameWithOwner,
      url: item.url,
      repoBranch: item.baseRefName,
      type: "pr" as const,
    }));
    const formatCommitTrend = [];
    commitList.forEach((repo: any) => {
      if (repo.object?.history?.nodes) {
        repo.object.history.nodes.forEach((commit: IRepoHistoryNode) => {
          formatCommitTrend.push({
            ...commit,
            repository: repo.nameWithOwner,
            repoUrl: repo.url,
            repoBranch: repo.defaultBranchRef?.name,
            type: "commit",
          } as commitListType);
        });
      }
    });
    return [...formatCommitTrend, ...formatPullRequestsTrend]
      .sort((a: commitListType, b: commitListType) => {
        // 确保 committedDate 是字符串类型
        const dateAString =
          typeof a.committedDate === "string" ? a.committedDate : "";
        const dateBString =
          typeof b.committedDate === "string" ? b.committedDate : "";

        // 创建日期对象
        const dateA = new Date(dateAString);
        const dateB = new Date(dateBString);

        // 返回时间差（降序排列）
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 35);
  }, [
    aggregateGithubUserData.user?.repositories?.nodes,
    githubUserStatisticsTrend?.pullRequestsTrend?.nodes,
  ]);

  return (
    <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-2">
      {/* Left Column: Profile & Stats (Span 3) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-[#fdfbf7] p-4 rounded shadow-xl border-2 border-[#d7c4a1] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-wood"></div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-wood-light overflow-hidden mb-3 shadow-inner">
              <img
                src={githubUser.avatar_url}
                alt="Avatar"
                className="w-full h-full object-cover grayscale-[20%] sepia-[20%]"
              />
            </div>
            <h2 className="font-western text-2xl text-wood-dark">
              {githubUser.login}
            </h2>
            <p className="font-typewriter text-sm text-stone-500 mb-4">
              @{githubUser.name}
            </p>

            <div className="flex gap-4 text-xs font-bold text-stone-700 font-typewriter w-full justify-center border-t border-dashed border-stone-300 pt-3">
              <div className="flex items-center gap-1">
                <User size={14} /> {githubUser.followers} followers
              </div>
              <div className="flex items-center gap-1">
                <User size={14} /> {githubUser.following} following
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-6">
            <StatBox
              label="Commit"
              value={commitTotal}
              icon={<GitCommit size={14} />}
            />
            <StatBox
              label="Star"
              value={
                aggregateGithubUserData.user.starredRepositories?.totalCount ||
                0
              }
              icon={<Star size={14} />}
            />
            <StatBox
              label="PR"
              value={prTotal}
              icon={<GitPullRequest size={14} />}
            />
            <StatBox
              label="Issue"
              value={githubUserStatisticsTrend.issuesTrend?.totalCount || 0}
              icon={<CircleDot size={14} />}
            />
          </div>
        </div>

        {/* Languages */}
        <div className="bg-[#fdfbf7] p-4 rounded shadow-xl border border-[#d7c4a1] relative">
          <RibbonTitle>常用语言</RibbonTitle>
          <div className="flex h-3 w-full rounded-full overflow-hidden bg-stone-200 mb-4 border border-stone-300">
            {languagesPercentage?.map((lang) => (
              <div
                key={lang.name}
                style={{
                  width: `${lang.percent}%`,
                  backgroundColor: lang.color,
                }}
                title={lang.name}
              ></div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-y-2">
            {languagesPercentage?.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-2 text-xs font-typewriter text-stone-700"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: lang.color }}
                ></div>
                <span className="font-bold">{lang.name}</span>
                <span className="text-stone-400">{lang.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Column: Activity & Repos (Span 6) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Activity */}
        <div className="bg-[#fdfbf7] p-4 rounded shadow-xl border border-[#d7c4a1]">
          <RibbonTitle>活跃度</RibbonTitle>
          <div className="flex flex-col gap-4">
            {[0, 1].map((i) => (
              <GithubCalendar
                key={i}
                year={year - i}
                weeks={
                  aggregateGithubUserData.user[`Y${year - i}`]
                    ?.contributionCalendar.weeks
                }
              />
            ))}
            {/*<GithubCalendar year="2024" total={125} />*/}
          </div>
        </div>

        {/* Repos */}
        <div className="bg-[#fdfbf7] p-4 rounded shadow-xl border border-[#d7c4a1] flex-grow">
          <RibbonTitle>项目仓库</RibbonTitle>
          <GithubRepo
            list={aggregateGithubUserData.user?.repositories?.nodes || []}
          ></GithubRepo>
        </div>
      </div>

      {/* Right Column: Commits (Span 3) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-[#fdfbf7] p-4 rounded shadow-xl border border-[#d7c4a1] h-full relative">
          {/* Decorative paper holes */}
          <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around py-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-stone-200 shadow-inner"
              ></div>
            ))}
          </div>

          <div className="pl-6 h-full flex flex-col">
            <RibbonTitle>提交记录</RibbonTitle>
            <GithubCommit list={commitAndPrList}></GithubCommit>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
}) => (
  <div className="bg-stone-100 p-2 rounded flex flex-col items-center justify-center border border-stone-200">
    <div className="flex items-center gap-1 text-[10px] uppercase text-stone-500 mb-1">
      {icon} {label}
    </div>
    <span className="font-western text-lg text-wood">{value}</span>
  </div>
);
