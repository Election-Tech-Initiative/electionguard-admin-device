import { ElectionGuardConfig } from './ElectionGuardConfig'
import { ElectionMap } from './ElectionMap'
import { KeyMap } from './KeyMap'

export interface CreateElectionResponse {
  electionGuardConfig: ElectionGuardConfig
  trusteeKeys: KeyMap
  electionMap: ElectionMap
}
