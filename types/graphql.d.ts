import type { IStatesTrend } from './state'
import type { IContributions } from './contribution'
import type { IRepositories } from './repositories'
import type { IOrganizations } from './organizations'
import type { IUser } from './user'

export interface IRateLimit {
  cost: number
  limit: number
  remaining: number
  used: number
  resetAt: string
}

export interface ISocialAccountNode {
  displayName: string
  provider: string
  url: string
}

export interface ISocialAccounts {
  nodes: ISocialAccountNode[]
}

export interface ISponsor {
  nodes: IUser[]
  totalCount: number
}

export interface IUserBaseData extends IContributions {
  id: string
  login: string
  name: string
  bio: string
  avatarUrl: string
  company: string
  createdAt: string
  email: string
  location: string
  twitterUsername: string | null
  url: string
  websiteUrl: string
  status: string | null
  isBountyHunter: boolean
  isCampusExpert: boolean
  isDeveloperProgramMember: boolean
  isEmployee: boolean
  isGitHubStar: boolean
  socialAccounts: ISocialAccounts | null
  followers: {
    totalCount: number
  }
  following: {
    totalCount: number
  }
  starredRepositories: {
    totalCount: number
  }
  repositories: IRepositories
  organizations: IOrganizations
  sponsors: ISponsor
  sponsoring: ISponsor
}

export interface IGraphql {
  user: IUserBaseData
  rateLimit: IRateLimit
}

export interface IUserStatisticsTrend {
  user: IStatesTrend
}
