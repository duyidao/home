import type { ILanguages } from './languages'

export interface IPrimaryLanguage {
  name: string
  color: string
}

export interface ILicenseInfo {
  spdxId: string
  name: string
  key: string
}

export interface IRepoHistoryNode {
  committedDate: string
  message: string
  oid: string
  url: string
}

export interface IRepositoryNode {
  name: string
  description: string
  nameWithOwner: string
  url: string
  stargazerCount: number
  forkCount: number
  isPrivate: boolean
  forks: {
    totalCount: number
  }
  pullRequests: {
    totalCount: number
  }
  issues: {
    totalCount: number
  }
  defaultBranchRef: {
    name: string
  }
  object: {
    history: {
      nodes: IRepoHistoryNode[]
    }
  }
  createdAt: string
  primaryLanguage: IPrimaryLanguage
  licenseInfo: ILicenseInfo
  languages: ILanguages
}

export interface IRepositories {
  nodes: IRepositoryNode[]
  totalCount: number
}
