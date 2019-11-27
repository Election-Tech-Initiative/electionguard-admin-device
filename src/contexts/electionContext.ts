import { createContext } from 'react'
import { Election } from '@votingworks/ballot-encoder'
import * as GLOBALS from '../config/globals'

import {
  ElectionContextInterface,
  TextSizeSetting,
  // ElectionGuardConfig,
} from '../config/types'

const context: ElectionContextInterface = {
  election: (undefined as unknown) as Election,
  resetElection: () => undefined,

  // // ElectionInfo
  // electionGuardConfig: (undefined as unknown) as ElectionGuardConfig

  // // Trustee Key
  // privateKeyVault: ElectionGuardConfig,
  // storePrivateKeys: () => undefined,
  // claimPrivateKey: () => undefined,

  // // Encrypters
  // storeEncrypterInfo: () => undefined,
  // EncrypterInfo

  // User Settings
  setUserSettings: () => undefined,
  userSettings: { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
}

const ElectionContext = createContext(context)

export default ElectionContext

// const ballot: BallotContextInterface = {
//   activateBallot: () => undefined,
//   appMode: VxMarkOnly,
//   ballotStyleId: '',
//   contests: [],
//   election: (undefined as unknown) as Election,
//   isLiveMode: false,
//   markVoterCardVoided: async () => false,
//   markVoterCardPrinted: async () => false,
//   precinctId: '',
//   printer: new NullPrinter(),
//   resetBallot: () => undefined,
//   setUserSettings: () => undefined,
//   updateTally: () => undefined,
//   updateVote: () => undefined,
//   userSettings: { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
//   votes: {},
// }
