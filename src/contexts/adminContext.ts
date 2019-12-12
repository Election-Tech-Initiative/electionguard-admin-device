import { createContext } from 'react'
import { Election } from '@votingworks/ballot-encoder'
import * as GLOBALS from '../config/globals'

import {
  AdminContextInterface,
  TextSizeSetting,
  ElectionGuardConfig,
  ElectionGuardStatus,
  ElectionMap,
} from '../config/types'

const context: AdminContextInterface = {
  election: (undefined as unknown) as Election,
  setElection: () => undefined,
  resetElection: () => undefined,
  electionMap: (undefined as unknown) as ElectionMap,
  setElectionMap: () => undefined,
  electionGuardStatus: ElectionGuardStatus.KeyCeremony,
  setElectionGuardStatus: () => undefined,
  electionGuardConfig: (undefined as unknown) as ElectionGuardConfig,
  setElectionGuardConfig: () => undefined,
  userSettings: { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
  setUserSettings: () => undefined,
}

const AdminContext = createContext(context)

export default AdminContext
