import { createContext } from 'react'
import { UsbContextInterface } from '../config/types'

const context: UsbContextInterface = {
  adminDriveConnected: false,
  storageDriveConnected: false,
  poll: () => {},
  read: <T>() => {
    return {} as T
  },
  write: () => {},
  eject: () => {},
}

const UsbContext = createContext(context)

export default UsbContext
