import { ElectionGuardConfig } from './ElectionGuardConfig'

export interface LoadBallotsRequest {
  startIndex: number
  count: number
  importFileName: string
  electionGuardConfig: ElectionGuardConfig
  importPath: string
}
