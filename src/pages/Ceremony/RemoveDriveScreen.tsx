import React, { useEffect, useCallback, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import UsbContext from '../../contexts/usbContext'

const RemoveDriveScreen = () => {
  const { storageDriveConnected, connect, disconnect } = useContext(UsbContext)
  const startMonitoringDrives = useCallback(connect, [])
  const stopMonitoringDrives = useCallback(disconnect, [])
  useEffect(() => {
    startMonitoringDrives()
    return () => stopMonitoringDrives()
  }, [startMonitoringDrives, stopMonitoringDrives])

  if (!storageDriveConnected) {
    return <Redirect to="/encrypters" />
  }
  return (
    <Screen white>
      <Main>
        <MainChild centerVertical maxWidth={false}>
          <Prose textCenter id="audiofocus">
            <p>Encrypter has been saved to the drive.</p>
            <h1 aria-label="Remove drive.">Remove Drive</h1>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default RemoveDriveScreen
