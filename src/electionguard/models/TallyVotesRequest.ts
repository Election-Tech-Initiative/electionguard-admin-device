import { ElectionGuardConfig } from './ElectionGuardConfig'
import { ElectionMap } from './ElectionMap'
import { KeyMap } from './KeyMap'

export interface TallyVotesRequest {
  electionGuardConfig: ElectionGuardConfig
  electionMap: ElectionMap
  trusteeKeys: KeyMap
  encryptedBallotsFileName: string
  exportPath: string
  exportFileNamePrefix: string
}
