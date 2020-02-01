import { createContext } from 'react'
import { UsbContextInterface, UsbWriteResult } from '../config/types'

const context: UsbContextInterface = {
  adminDriveConnected: false,
  adminDriveMounted: false,
  adminDriveMountpoint: undefined,
  storageDriveConnected: false,
  storageDriveMounted: false,
  storageDriveMountpoint: undefined,
  connect: () => {},
  disconnect: () => {},
  read: <T>() => Promise.resolve({} as T),
  write: () => Promise.resolve({} as UsbWriteResult),
  eject: async () => {},
}

const UsbContext = createContext(context)

export default UsbContext
