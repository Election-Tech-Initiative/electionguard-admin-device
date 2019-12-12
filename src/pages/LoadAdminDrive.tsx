import React, { useContext } from 'react'
import { Election } from '@votingworks/ballot-encoder'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'
import Screen from '../components/Screen'
import UsbContext from '../contexts/usbContext'
import AdminContext from '../contexts/adminContext'
import { ElectionGuardConfig } from '../config/types'

const LoadAdminDrive = () => {
  const { adminDriveConnected } = useContext(UsbContext)
  const { setElection, setElectionGuardConfig } = useContext(AdminContext)
  if (adminDriveConnected) {
    setElection({} as Election)
    setElectionGuardConfig({} as ElectionGuardConfig)
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
