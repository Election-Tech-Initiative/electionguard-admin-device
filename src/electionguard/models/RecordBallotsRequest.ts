import { ElectionGuardConfig } from './ElectionGuardConfig'

export interface RecordBallotsRequest {
  electionGuardConfig: ElectionGuardConfig
  encryptedBallots: string[]
  castBallotIndicies: string[]
  spoiledBallotIndicies: string[]
  exportPath: string
  exportFileNamePrefix: string
}
