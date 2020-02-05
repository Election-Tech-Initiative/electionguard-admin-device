import { ElectionGuardConfig } from './ElectionGuardConfig'
import { ElectionMap } from './ElectionMap'
import { KeyMap } from './KeyMap'

export interface TallyVotesRequest {
  electionGuardConfig: ElectionGuardConfig
  electionMap: ElectionMap
  trusteeKeys: KeyMap
  registeredBallotsFileName: string
  exportPath: string | undefined
  exportFileNamePrefix: string
}
