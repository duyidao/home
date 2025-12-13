import axios from 'axios'
import type { IGraphql, IUserStatisticsTrend } from '../types/graphql.d.ts'
import {
  userInfoQuery,
  contributionsQuery,
  repositoriesQuery,
  organizationsQuery,
  sponsorQuery,
  starredRepositoriesQuery,
  trendingQuery,
} from '@/utils/query'

export const githubGraphql = (query: string, variables: object) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://api.github.com/graphql',
        { query, variables },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
            Accept: 'application/vnd.github+json',
          },
        }
      )
      .then((response) => {
        if (!response.data.data) {
          reject(false)
        }

        resolve(response.data.data)
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

// 获取 GitHub 用户数据
export const fetchGithubUser = async (username: string = 'duyidao') => {
  return await axios.get(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  })
}

// 获取 GitHub 用户数据
export const fetchAggregateGithubUserData = async (
  username: string = 'duyidao'
): Promise<IGraphql> => {
  const query = `
    query ($login: String!) {
      user(login: $login) {
        ${userInfoQuery}
        ${contributionsQuery()}
        ${repositoriesQuery}
        ${starredRepositoriesQuery}
        ${organizationsQuery}
        ${sponsorQuery}
      }
      rateLimit { # 限速信息
        cost
        limit
        remaining
        used
        resetAt
      }
    }`

  return (await githubGraphql(query, { login: username })) as IGraphql
}

// 获取 Github 用户的统计趋势
export const fetchGithubUserStatisticsTrend = async (
  username: string = 'duyidao'
): Promise<IUserStatisticsTrend> => {
  const query = `
    query ($login: String!) {
        user(login: $login) {
            ${trendingQuery}
        }
    }`

  return (await githubGraphql(query, {
    login: username,
  })) as IUserStatisticsTrend
}