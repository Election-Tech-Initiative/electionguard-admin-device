import React, { FC, ReactNode, useState } from 'react'
import UsbContext from '../contexts/usbContext'
import { fetchJSON } from '../electionguard'
import { UsbWriteResult, UsbUnmountResult } from '../config/types'
import * as GLOBALS from '../config/globals'
import UseInterval from '../hooks/useInterval'

export const adminDriveIndex = 0
export const storageDriveIndex = 1
export const electionFile = `data${GLOBALS.PATH_DELIMITER}election.json`
export const stateFile = `data${GLOBALS.PATH_DELIMITER}election.state.json`
export const mapFile = `data${GLOBALS.PATH_DELIMITER}election.map.json`
export const spoiledBallotsFile = `data${GLOBALS.PATH_DELIMITER}spoiledBallots.json`
export const castBallotsFile = `data${GLOBALS.PATH_DELIMITER}castBallots.json`
export const encryptedBallotsFile = `data${GLOBALS.PATH_DELIMITER}encryptedBallots.json`
export const tallyFile = `data${GLOBALS.PATH_DELIMITER}tally.json`

export const fileNames = {
  electionFile,
  stateFile,
  mapFile,
  spoiledBallotsFile,
  castBallotsFile,
  encryptedBallotsFile,
  tallyFile,
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
type DriveAvailability = {
  present: boolean
  mounted: boolean
}
type UsbDrives = { [driveIndex: number]: DriveAvailability }

const UsbManager: FC<Props> = (props: Props) => {
  const [usbDrives, setUsbDrives] = useState({
    0: { present: false, mounted: false },
    1: { present: false, mounted: false },
  } as UsbDrives)
  const [isRunning, setIsRunning] = useState(false)
  const adminDriveConnected = usbDrives[adminDriveIndex].present || !!props.test
  const adminDriveMounted = usbDrives[adminDriveIndex].mounted || !!props.test
  const storageDriveConnected =
    usbDrives[storageDriveIndex].present || !!props.test
  const storageDriveMounted =
    usbDrives[storageDriveIndex].mounted || !!props.test
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

  const disconnect = () => {
    setIsRunning(false)
  }

  UseInterval(
    async () => {
      try {
        const availableDrives = (await fetchJSON<UsbDrive[]>('/usb')) || []
        const currentDrives: UsbDrives = {
          0: { present: false, mounted: false },
          1: { present: false, mounted: false },
        }
        availableDrives.forEach((drive, index) => {
          currentDrives[index].present = true
          currentDrives[index].mounted =
            drive.mountpoints && drive.mountpoints.length > 0
        })

        const keys = Object.keys(currentDrives)
        for (let i = 0; i < keys.length; i += 1) {
          const key = +keys[i]
          const driveStateChanged =
            currentDrives[key].mounted !== usbDrives[key].mounted ||
            currentDrives[key].present !== usbDrives[key].present
          if (driveStateChanged) {
            setUsbDrives(currentDrives)
            break
          }
        }
      } catch (error) {
        disconnect()
      }
    },
    isRunning ? GLOBALS.USB_POLLING_INTERVAL : undefined
  )

  const connect = () => {
    setIsRunning(true)
  }

  const eject = async (driveId: number) => {
    const unmountResult = await fetchJSON<UsbUnmountResult>(
      `/usb/${driveId}/unmount`,
      {
        method: 'POST',
      }
    )

    if (!unmountResult.success) {
      throw new Error(unmountResult.message)
    }
  }

  return (
    <UsbContext.Provider
      value={{
        adminDriveConnected,
        adminDriveMounted,
        storageDriveConnected,
        storageDriveMounted,
        read,
        write,
        connect,
        disconnect,
        eject,
      }}
    >
      {props.children}
    </UsbContext.Provider>
  )
}

export default UsbManager
