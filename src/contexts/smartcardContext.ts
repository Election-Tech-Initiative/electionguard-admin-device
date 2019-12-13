/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react'
import { CardData, SmartcardContextInterface } from '../config/types'

const context: SmartcardContextInterface = {
  isCardConnected: false,
  isReadingCard: false,
  isWritingToCard: false,
  currentCard: (undefined as unknown) as CardData,
  connect: () => {},
  disconnect: () => {},
  read: async <T extends CardData>() => {
    return {} as T
  },
  readValue: <T>() => {
    return {} as T
  },
  write: async <T>(data: T) => {},
}

const SmartcardContext = createContext(context)

export default SmartcardContext
