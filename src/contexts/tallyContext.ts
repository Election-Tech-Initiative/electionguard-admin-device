import { createContext } from 'react'
import { TallyContextInterface } from '../config/types'

const context: TallyContextInterface = {
  castIds: [],
  setCastIds: () => undefined,
  spoiledIds: [],
  setSpoiledIds: () => undefined,
  encryptedBallots: [],
  setEncryptedBallots: () => undefined,
  numberOfTrustees: 0,
  threshold: 0,
  trustees: [],
  trusteesDispatch: () => undefined,
  announceTrustee: () => undefined,
  recordBallots: () => Promise.resolve(undefined),
  castTrackers: [],
  spoiledTrackers: [],
  tally: [],
  setTally: () => undefined,
  tallyVotes: () => Promise.resolve(undefined),
}

const TallyContext = createContext(context)

export default TallyContext
