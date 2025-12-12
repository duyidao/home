import type { IUser } from './user'

export interface IMembersWithRole {
  nodes: IUser[]
  totalCount: number
}
