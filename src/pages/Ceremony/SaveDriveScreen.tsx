import React, { useContext, useState, useCallback, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import CeremonyContext from '../../contexts/ceremonyContext'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import LinkButton from '../../components/LinkButton'
import SidebarFooter from '../../components/SidebarFooter'
import UsbContext from '../../contexts/usbContext'
import {
  storageDriveIndex,
  electionConfigFile,
  electionFile,
} from '../../components/UsbManager'
import AdminContext from '../../contexts/adminContext'

interface EncrypterParams {
  encrypterId: string
}

const SaveDriveScreen = (props: RouteComponentProps<EncrypterParams>) => {
  const [isWriting, setIsWriting] = useState(false)
  const { election, electionGuardConfig } = useContext(AdminContext)
  const { storageDriveMounted, connect, disconnect, eject, write } = useContext(
    UsbContext
  )
  const { encrypterId } = props.match.params
  const { claimEncrypterDrive } = useContext(CeremonyContext)

  const handleWrite = async (id: string) => {
    setIsWriting(true)

    try {
      const { history } = props
      const configResult = await write(
        storageDriveIndex,
        electionConfigFile,
        electionGuardConfig
      )
      if (!configResult.success) {
        console.log(JSON.stringify(configResult))
        throw new Error(configResult.message)
      }

      const electionResult = await write(
        storageDriveIndex,
        electionFile,
        election
      )
      if (!electionResult.success) {
        console.log(JSON.stringify(configResult))
        throw new Error(configResult.message)
      }

      eject(storageDriveIndex)
      claimEncrypterDrive(id)
      history.push('/encrypter/remove')
    } catch (error) {
      setIsWriting(false)
      // eslint-disable-next-line no-console
      console.error('Failed to write election config to encryptor drive', error)
      throw error
    }
  }

  const startMonitoringDrives = useCallback(connect, [])
  const stopMonitoringDrives = useCallback(disconnect, [])
  useEffect(() => {
    startMonitoringDrives()
    return () => stopMonitoringDrives()
  }, [startMonitoringDrives, stopMonitoringDrives])

  return (
    <Screen flexDirection="row-reverse" white>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            big
            primary={storageDriveMounted && !isWriting}
            disabled={!storageDriveMounted || isWriting}
            onPress={() => handleWrite(encrypterId)}
            id="save"
            aria-label="Save encryter to drive."
          >
            Save
          </LinkButton>
        </p>
        <p>
          <LinkButton
            small
            to="/encrypters"
            id="encrypters"
            aria-label="Return to encrypter distribution."
          >
            Back
          </LinkButton>
        </p>
      </Sidebar>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <>
              <h1 aria-hidden>Insert Drive</h1>
              <p>Insert drive for encrypter.</p>
            </>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default SaveDriveScreen
