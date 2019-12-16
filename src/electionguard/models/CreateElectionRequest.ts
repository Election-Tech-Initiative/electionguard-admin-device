import { Election } from '@votingworks/ballot-encoder'
import { ElectionGuardConfig } from './ElectionGuardConfig'

export interface CreateElectionRequest {
  config: ElectionGuardConfig
  election: Election
}
