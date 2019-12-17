import { ElectionGuardConfig } from './ElectionGuardConfig'
import { ElectionGuardStatus } from './ElectionGuardStatus'

export interface ElectionGuardState extends ElectionGuardConfig {
  status: ElectionGuardStatus
}
