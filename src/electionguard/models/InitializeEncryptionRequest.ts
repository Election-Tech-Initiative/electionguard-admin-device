import { Election } from '@votingworks/ballot-encoder'
import { ElectionGuardConfig } from './ElectionGuardConfig'

export interface InitializeEncryptionRequest {
  electionGuardConfig: ElectionGuardConfig
  election: Election
  exportPath: string
  exportFileName: string
}
