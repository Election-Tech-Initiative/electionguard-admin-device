import React, { useContext, useEffect, useState } from 'react'
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
  storageDriveIndex,
  spoiledBallotsFile,
} from '../../components/UsbManager'

const LoadSpoiledBallotsPage = (props: RouteComponentProps) => {
  const { setSpoiledIds } = useContext(TallyContext)
  const [pollInterval, setPollInterval] = useState(0)
  const [isWriting, setIsWriting] = useState(false)
  const { storageDriveConnected, updateDriveStatus, read } = useContext(
    UsbContext
  )
  const handleLoad = async () => {
    setIsWriting(true)

    try {
      const { history } = props
      const spoiledBallots = await read<string[]>(
        storageDriveIndex,
        spoiledBallotsFile
      )
      setSpoiledIds(spoiledBallots)
      history.goBack()
    } catch (error) {
      // toast message?
      console.error(
        'Failed to read spoiled ballots from the drive. They may not exist.',
        error
      )
    }
  }

  useEffect(() => {
    if (!pollInterval) {
      const interval = window.setInterval(async () => {
        updateDriveStatus()
      }, GLOBALS.USB_POLLING_INTERVAL)
      setPollInterval(interval)
    }

    return () => {
      window.clearInterval(pollInterval)
    }
  }, [pollInterval, setPollInterval, updateDriveStatus])

  if (storageDriveConnected) {
    window.clearInterval(pollInterval)
  }

  return (
    <Screen flexDirection="row-reverse" white>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            big
            primary={storageDriveConnected && !isWriting}
            disabled={!storageDriveConnected || isWriting}
            onPress={() => handleLoad()}
            id="load"
            aria-label="Load spoiled ballot ids from drive."
          >
            Load
          </LinkButton>
        </p>
        <p>
          <LinkButton small to="/ballots" id="back" aria-label="Navigate back">
            Back
          </LinkButton>
        </p>
      </Sidebar>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <>
              <h1 aria-hidden>Insert Drive</h1>
              <p>Insert spoiled ballot box drive.</p>
            </>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default withRouter(LoadSpoiledBallotsPage)
