import { createContext } from 'react'
import { UsbContextInterface, UsbWriteResult } from '../config/types'

const context: UsbContextInterface = {
  adminDriveConnected: false,
  storageDriveConnected: false,
  updateDriveStatus: () => {},
  read: <T>() => Promise.resolve({} as T),
  write: () => Promise.resolve({} as UsbWriteResult),
  eject: () => {},
}

const UsbContext = createContext(context)

export default UsbContext
