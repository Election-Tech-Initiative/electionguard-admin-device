import { ElectionGuardConfig } from './ElectionGuardConfig'
import { EncryptedBallot } from './EncryptedBallot'

export interface RecordBallotsRequest {
  ballots: EncryptedBallot[]
  castBallotIds: string[]
  spoildBallotIds: string[]
  electionGuardConfig: ElectionGuardConfig
  exportPath: string | undefined
  exportFileNamePrefix: string
}
