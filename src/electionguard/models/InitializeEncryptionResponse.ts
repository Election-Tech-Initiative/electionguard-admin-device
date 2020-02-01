import { Election } from '@votingworks/ballot-encoder'
import { ElectionGuardConfig } from './ElectionGuardConfig'
import { ElectionMap } from './ElectionMap'

export interface InitializeEncryptionResponse {
  electionGuardConfig: ElectionGuardConfig
  election: Election
  electionMap: ElectionMap
}
