import { createContext } from 'react'
import { Election } from '@votingworks/ballot-encoder'
import * as GLOBALS from '../config/globals'

import {
  ElectionContextInterface,
  TextSizeSetting,
  ElectionGuardConfig,
  EncrypterStore,
  TrusteeKeyVault,
  ElectionGuardStatus,
} from '../config/types'

const context: ElectionContextInterface = {
  election: (undefined as unknown) as Election,
  createElection: () => Promise.resolve(undefined),
  resetElection: () => undefined,
  electionGuardStatus: ElectionGuardStatus.KeyCeremony,
  setElectionGuardStatus: () => undefined,
  electionGuardConfig: (undefined as unknown) as ElectionGuardConfig,
  setNumberOfTrustees: () => undefined,
  setThreshold: () => undefined,
  setElectionGuardConfig: () => undefined,
  keyVault: (undefined as unknown) as TrusteeKeyVault,
  claimTrusteeKey: () => undefined,
  encrypterStore: (undefined as unknown) as EncrypterStore,
  setNumberOfEncrypters: () => undefined,
  setEncrypterStore: () => undefined,
  claimEncrypterDrive: () => undefined,
  userSettings: { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
  setUserSettings: () => undefined,
}

const ElectionContext = createContext(context)

export default ElectionContext
