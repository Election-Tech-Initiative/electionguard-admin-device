import { createContext } from 'react'
import { Election } from '@votingworks/ballot-encoder'
import * as GLOBALS from '../config/globals'

import {
  AdminContextInterface,
  TextSizeSetting,
  ElectionGuardConfig,
  ElectionGuardStatus,
} from '../config/types'

// TODO Refactor to ceremonyContext?
const context: AdminContextInterface = {
  election: (undefined as unknown) as Election,
  resetElection: () => undefined,
  electionGuardStatus: ElectionGuardStatus.KeyCeremony,
  setElectionGuardStatus: () => undefined,
  electionGuardConfig: (undefined as unknown) as ElectionGuardConfig,
  setElectionGuardConfig: () => undefined,
  electionMapping: undefined,
  setElectionMapping: () => undefined,
  userSettings: { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
  setUserSettings: () => undefined,
}

const AdminContext = createContext(context)

export default AdminContext
