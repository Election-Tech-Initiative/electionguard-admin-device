import React, { FC, ReactNode, useState } from 'react'
import UsbContext from '../contexts/usbContext'
import fetchJSON from '../utils/fetchJSON'
import { UsbWriteResult } from '../config/types'
import * as GLOBALS from '../config/globals'

export const adminDriveIndex = 0
export const storageDriveIndex = 1
export const electionFile = `data${GLOBALS.PATH_DELIMITER}election.json`
export const configFile = `data${GLOBALS.PATH_DELIMITER}election.config.json`
export const mapFile = `data${GLOBALS.PATH_DELIMITER}election.map.json`
export const spoiledBallotsFile = `data${GLOBALS.PATH_DELIMITER}spoiledBallots.json`

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
  const write = async (driveId: number, file: string, data: object) => {
    return fetchJSON<UsbWriteResult>(`/usb/${driveId}/file?path=${file}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  const updateDriveStatus = async () => {
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
