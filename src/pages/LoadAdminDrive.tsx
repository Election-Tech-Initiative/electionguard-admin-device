import React, { useContext, useState, useEffect } from 'react'
import { Election } from '@votingworks/ballot-encoder'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'
import Screen from '../components/Screen'
import UsbContext from '../contexts/usbContext'
import AdminContext from '../contexts/adminContext'
import { ElectionGuardConfig, ElectionMap } from '../config/types'
import * as GLOBALS from '../config/globals'
import {
  adminDriveIndex,
  electionFile,
  configFile,
  mapFile,
} from '../components/UsbManager'

const LoadAdminDrive = () => {
  const [pollInterval, setPollInterval] = useState(0)
  const { adminDriveConnected, updateDriveStatus, read } = useContext(
    UsbContext
  )
  const {
    election,
    setElection,
    electionGuardConfig,
    setElectionGuardConfig,
    electionMap,
    setElectionMap,
    setElectionGuardStatus,
  } = useContext(AdminContext)
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
        const currentConfig = await read<ElectionGuardConfig>(
          adminDriveIndex,
          configFile
        )
        setElectionGuardConfig(currentConfig)

        const { status } = currentConfig as any
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
  }

  if (adminDriveConnected) {
    window.clearInterval(pollInterval)
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
