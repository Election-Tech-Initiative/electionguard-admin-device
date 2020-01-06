import { createContext } from 'react'
import { UsbContextInterface, UsbWriteResult } from '../config/types'

const context: UsbContextInterface = {
  adminDriveConnected: false,
  adminDriveMounted: false,
  storageDriveConnected: false,
  storageDriveMounted: false,
  connect: () => {},
  disconnect: () => {},
  read: <T>() => Promise.resolve({} as T),
  write: () => Promise.resolve({} as UsbWriteResult),
  eject: () => {},
}

const UsbContext = createContext(context)

export default UsbContext
