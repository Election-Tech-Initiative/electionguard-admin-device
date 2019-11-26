import { createContext } from 'react'
import GLOBALS from '../config/globals'

import { ElectionContextInterface, TextSizeSetting } from '../config/types'

const context: ElectionContextInterface = {
  election: undefined,
  resetElection: () => undefined,
  setUserSettings: () => undefined,
  userSettings: { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
}

const ElectionContext = createContext(context)

export default ElectionContext
