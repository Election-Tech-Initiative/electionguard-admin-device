import React, { useContext, useState, useEffect, useCallback } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import TallyContext from '../../contexts/tallyContext'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import LinkButton from '../../components/LinkButton'
import SidebarFooter from '../../components/SidebarFooter'
import UsbContext from '../../contexts/usbContext'
import {
  storageDriveIndex,
  encryptedBallotsFile,
} from '../../components/UsbManager'

const LoadEncryptedBallotsPage = (props: RouteComponentProps) => {
  const { setEncryptedBallots } = useContext(TallyContext)
  const [isWriting, setIsWriting] = useState(false)
  const { storageDriveMounted, connect, disconnect, read } = useContext(
    UsbContext
  )
  const handleLoad = async () => {
    setIsWriting(true)

    try {
      const { history } = props
      const encryptedBallots = await read<string[]>(
        storageDriveIndex,
        encryptedBallotsFile
      )
      setEncryptedBallots(encryptedBallots)
      history.goBack()
    } catch (error) {
      console.error(
        'Failed to read cast ballots from the drive. They may not exist.',
        error
      )
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
            onPress={() => handleLoad()}
            id="load"
            aria-label="Load encrypted ballots."
          >
            Load
          </LinkButton>
        </p>
        <p>
          <LinkButton small to="/ballots" id="back" aria-label="Navigate back.">
            Back
          </LinkButton>
        </p>
      </Sidebar>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <>
              <h1 aria-hidden>Insert Drive</h1>
              <p>Insert drive with encrypted ballots.</p>
            </>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default withRouter(LoadEncryptedBallotsPage)
