import React, { FC, ReactNode, useState } from 'react'
import UsbContext from '../contexts/usbContext'

const adminDriveIndex = 0
const storageDriveIndex = 1

interface Props {
  children?: ReactNode
  test?: boolean
}

type UsbDrives = { [driveIndex: number]: boolean }

// TODO Fill in implementation (poll, read, etc) for USB Manager
const UsbManager: FC<Props> = (props: Props) => {
  const [usbDrives, setUsbDrives] = useState({} as UsbDrives)
  const adminDriveConnected = usbDrives[adminDriveIndex] || !!props.test
  const storageDriveConnected = usbDrives[storageDriveIndex] || !!props.test
  const read = <T extends unknown>(): T => {
    return {} as T
  }
  const write = () => {}

  const poll = () => {
    setUsbDrives({
      [adminDriveIndex]: false,
      [storageDriveIndex]: false,
    })
  }

  const eject = () => {}

  return (
    <UsbContext.Provider
      value={{
        adminDriveConnected,
        storageDriveConnected,
        read,
        write,
        poll,
        eject,
      }}
    >
      {props.children}
    </UsbContext.Provider>
  )
}

export default UsbManager
