import React, { useContext, useEffect, useCallback } from 'react'
import { Election } from '@votingworks/ballot-encoder'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'
import Screen from '../components/Screen'
import UsbContext from '../contexts/usbContext'
import AdminContext from '../contexts/adminContext'
import {
  ElectionGuardConfig,
  ElectionGuardState,
  ElectionMap,
  Tally,
} from '../electionguard'
import {
  adminDriveIndex,
  electionFile,
  stateFile,
  mapFile,
  tallyFile,
} from '../components/UsbManager'

const LoadAdminDrive = () => {
  const { adminDriveMounted, connect, disconnect, read } = useContext(
    UsbContext
  )
  const {
    election,
    setElection,
    electionGuardConfig,
    setElectionGuardConfig,
    electionMap,
    setElectionMap,
    tally,
    setTally,
    setElectionGuardStatus,
  } = useContext(AdminContext)

  const startMonitoringDrives = useCallback(connect, [])
  const stopMonitoringDrives = useCallback(disconnect, [])
  useEffect(() => {
    startMonitoringDrives()
    return () => stopMonitoringDrives()
  }, [startMonitoringDrives, stopMonitoringDrives])

  const loadFilesFromAdminDrive = async () => {
    if (!election) {
      const currentElection = await read<Election>(
        adminDriveIndex,
        electionFile
      )
      setElection(currentElection)
    }

    if (!electionGuardConfig) {
      try {
        const currentState = await read<ElectionGuardState>(
          adminDriveIndex,
          stateFile
        )
        setElectionGuardConfig(currentState)

        const { status } = currentState
        if (status !== undefined) {
          setElectionGuardStatus(status)
        }
      } catch (error) {
        setElectionGuardConfig({} as ElectionGuardConfig)
      }
    }

    if (!electionMap) {
      try {
        const currentMap = await read<ElectionMap>(adminDriveIndex, mapFile)
        setElectionMap(currentMap)
      } catch (error) {
        setElectionMap({} as ElectionMap)
      }
    }

    if (!tally) {
      try {
        const currentTally = await read<Tally>(adminDriveIndex, tallyFile)
        setTally(currentTally)
      } catch (error) {
        setTally((undefined as unknown) as Tally)
      }
    }
  }

  if (adminDriveMounted) {
    loadFilesFromAdminDrive().catch(error =>
      console.log(
        `Failed to load election files from drive ${adminDriveIndex}`,
        error
      )
    )
  }
  return (
    <Screen white>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <>
              <h1 aria-hidden>Insert Admin Drive</h1>
              <p>Insert designated ElectionGuard admin drive.</p>
            </>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default LoadAdminDrive
