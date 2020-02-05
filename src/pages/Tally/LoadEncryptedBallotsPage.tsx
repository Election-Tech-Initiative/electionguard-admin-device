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
import * as GLOBALS from '../../config/globals'
import {
  electionGuardApi,
  DEFAULT_ENCRYPTED_BALLOTS_EXPORT_PREFIX,
} from '../../electionguard'
import {
  defaultExportPathNoDelimeter,
  storageDriveIndex,
} from '../../components/UsbManager'
import AdminContext from '../../contexts/adminContext'

const LoadEncryptedBallotsPage = (props: RouteComponentProps) => {
  const { setEncryptedBallots } = useContext(TallyContext)
  const { electionGuardConfig } = useContext(AdminContext)
  const [isWriting, setIsWriting] = useState(false)
  const {
    storageDriveMounted,
    storageDriveMountpoint,
    connect,
    disconnect,
    eject,
  } = useContext(UsbContext)
  const handleLoad = async () => {
    setIsWriting(true)

    try {
      const { history } = props
      const now = new Date()
      const realMonth = now.getMonth() + 1
      const ballotFileName = `${DEFAULT_ENCRYPTED_BALLOTS_EXPORT_PREFIX}${now.getFullYear()}_${realMonth}_${now.getDate()}`
      const encryptedBallots = await electionGuardApi.loadBallots(
        0,
        GLOBALS.MAX_BALLOT_PAYLOAD,
        `${ballotFileName}`,
        electionGuardConfig,
        `${storageDriveMountpoint}${GLOBALS.PATH_DELIMITER}${defaultExportPathNoDelimeter}`
      )

      setEncryptedBallots(encryptedBallots)
      await eject(storageDriveIndex)
      history.goBack()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Failed to read encrypted ballots from the drive. They may not exist.',
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
