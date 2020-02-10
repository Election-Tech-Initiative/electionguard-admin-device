import React, { useContext, useEffect, useState, useCallback } from 'react'
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
  spoiledBallotsFile,
} from '../../components/UsbManager'

const LoadSpoiledBallotsPage = (props: RouteComponentProps) => {
  const { spoiledIds, setSpoiledIds } = useContext(TallyContext)
  const [isWriting, setIsWriting] = useState(false)
  const { storageDriveMounted, connect, disconnect, read, eject } = useContext(
    UsbContext
  )
  const handleLoad = async () => {
    setIsWriting(true)
    const { history } = props

    try {
      const newSpoiledIds = await read<string[]>(
        storageDriveIndex,
        spoiledBallotsFile
      )
      if (spoiledIds === undefined) {
        setSpoiledIds(newSpoiledIds)
      } else {
        setSpoiledIds([...spoiledIds, ...newSpoiledIds])
      }
      await eject(storageDriveIndex)
      history.goBack()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Failed to read spoiled ballots from the drive. They may not exist.',
        error
      )

      // failure to load the file is a valid case as it may not exist
      setSpoiledIds([])
      await eject(storageDriveIndex)
      history.goBack()
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
