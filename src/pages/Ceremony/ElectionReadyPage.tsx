import React, { useContext, useState, useEffect, useCallback } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Main, { MainChild } from '../../components/Main'
import Sidebar from '../../components/Sidebar'
import AdminContext from '../../contexts/adminContext'
import Screen from '../../components/Screen'
import LinkButton from '../../components/LinkButton'
import Prose from '../../components/Prose'
import { ElectionGuardStatus } from '../../electionguard'
import SidebarFooter from '../../components/SidebarFooter'
import LoadAdminDrive from '../LoadAdminDrive'
import UsbContext from '../../contexts/usbContext'
import {
  adminDriveIndex,
  electionFile,
  configFile,
  mapFile,
} from '../../components/UsbManager'

const ElectionReadyPage = (props: RouteComponentProps) => {
  const {
    election,
    electionMap,
    electionGuardConfig,
    setElectionGuardStatus,
  } = useContext(AdminContext)
  const { adminDriveConnected, connect, disconnect, write } = useContext(
    UsbContext
  )
  const [savingElectionData, setSavingElectionData] = useState(false)

  const startMonitoringDrives = useCallback(connect, [])
  const stopMonitoringDrives = useCallback(disconnect, [])
  useEffect(() => {
    startMonitoringDrives()
    return () => stopMonitoringDrives()
  }, [startMonitoringDrives, stopMonitoringDrives])

  const completeElectionSetup = () => {
    setSavingElectionData(true)
  }

  if (savingElectionData && !adminDriveConnected) {
    return <LoadAdminDrive />
  }

  if (savingElectionData && adminDriveConnected) {
    const writeFilesToAdminDrive = async () => {
      let result = await write(adminDriveIndex, electionFile, election)
      if (!result.success) {
        throw new Error('failed to write election data')
      }

      result = await write(adminDriveIndex, configFile, {
        ...electionGuardConfig,
        status: ElectionGuardStatus.TallyVotes,
      })
      if (!result.success) {
        throw new Error('failed to write election configuration data')
      }

      result = await write(adminDriveIndex, mapFile, electionMap)
      if (!result.success) {
        throw new Error('failed to write election map data')
      }
    }

    const { history } = props
    writeFilesToAdminDrive().then(() => {
      setElectionGuardStatus(ElectionGuardStatus.TallyVotes)
      history.push('/start')
    })
  }

  return (
    <Screen>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <h1>Election Ready</h1>
            <hr />
            <p>Election setup is complete. </p>
          </Prose>
        </MainChild>
      </Main>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            big
            primary={!savingElectionData}
            disabled={savingElectionData}
            onPress={completeElectionSetup}
            id="election-complete"
            aria-label="Election Complete"
          >
            Complete
          </LinkButton>
        </p>
      </Sidebar>
    </Screen>
  )
}

export default withRouter(ElectionReadyPage)
