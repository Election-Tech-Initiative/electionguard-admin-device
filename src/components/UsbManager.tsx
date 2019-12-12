import React, { FC, ReactNode, useState } from 'react'
import UsbContext from '../contexts/usbContext'
import fetchJSON from '../utils/fetchJSON'

export const adminDriveIndex = 0
export const storageDriveIndex = 1

const initialDriveState: UsbDrives = {
  0: false,
  1: false,
}

interface Props {
  children?: ReactNode
  test?: boolean
}

type UsbDrive = {
  id: number
  description: string
  path: string
  mountpoints: string[]
}
type UsbDrives = { [driveIndex: number]: boolean }

// TODO Fill in implementation (poll, read, etc) for USB Manager
const UsbManager: FC<Props> = (props: Props) => {
  const [usbDrives, setUsbDrives] = useState({
    ...initialDriveState,
  } as UsbDrives)
  const adminDriveConnected = usbDrives[adminDriveIndex] || !!props.test
  const storageDriveConnected = usbDrives[storageDriveIndex] || !!props.test
  const read = async <T extends unknown>(
    driveId: number,
    file: string
  ): Promise<T> => {
    return fetchJSON<T>(`/usb/${driveId}/file?path=${file}`)
  }
  const write = () => {}

  const updateDriveStatus = async () => {
    console.log('updating drive states')
    const availableDrives = (await fetchJSON<UsbDrive[]>('/usb')) || []

    const currentDrives: UsbDrives = { ...initialDriveState }
    availableDrives.forEach((drive, index) => {
      const driveIsMounted = drive.mountpoints && drive.mountpoints.length
      currentDrives[index] = !!driveIsMounted
    })

    const keys = Object.keys(currentDrives)
    for (let i = 0; i < keys.length; i += 1) {
      const key = +keys[i]
      if (currentDrives[key] !== usbDrives[key]) {
        setUsbDrives(currentDrives)
        break
      }
    }
  }

  const eject = () => {}

  return (
    <UsbContext.Provider
      value={{
        adminDriveConnected,
        storageDriveConnected,
        read,
        write,
        updateDriveStatus,
        eject,
      }}
    >
      {props.children}
    </UsbContext.Provider>
  )
}

export default UsbManager
