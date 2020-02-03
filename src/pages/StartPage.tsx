/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import AdminContext from '../contexts/adminContext'
import Main, { MainChild } from '../components/Main'
import LinkButton from '../components/LinkButton'
import Screen from '../components/Screen'

import ElectionInfo from '../components/ElectionInfo'
import Sidebar from '../components/Sidebar'
import Prose from '../components/Prose'
import { ElectionGuardStatus } from '../electionguard'
import LoadAdminDrive from './LoadAdminDrive'
import UsbContext from '../contexts/usbContext'

const LogoImage = styled.img`
  display: flex;
  margin: 0 auto;
  max-width: 12rem;
`

const StartPage = (props: RouteComponentProps) => {
  const { adminDriveMounted } = useContext(UsbContext)
  const {
    election,
    electionGuardStatus,
    setElectionGuardConfig,
    existingElectionGuardConfig,
    setElectionGuardStatus,
    tally,
  } = useContext(AdminContext)
  const getElectionGuardStatus = () => {
    switch (electionGuardStatus) {
      case ElectionGuardStatus.KeyCeremony:
        return 'Election needs to be setup.'
      case ElectionGuardStatus.TallyVotes:
        return 'Ready to Tally Votes.'
      case ElectionGuardStatus.Complete:
        return 'Election Complete.'
      default:
        return 'Election Error.'
    }
  }
  if (!election || !adminDriveMounted) {
    return <LoadAdminDrive />
  }

  const tallyComplete =
    tally && electionGuardStatus === ElectionGuardStatus.Complete

  const loadElectionConfig = () => {
    setElectionGuardConfig(existingElectionGuardConfig)
    setElectionGuardStatus(ElectionGuardStatus.KeyCeremony)
    props.history.push('/setup-encrypters')
  }

  return (
    <Screen>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <h1>Welcome to ElectionGuard</h1>
            <hr />
            <p>{getElectionGuardStatus()}</p>
          </Prose>
        </MainChild>
      </Main>
      <Sidebar
        footer={
          <>
            <hr />
            <ElectionInfo election={election} precinctId="" horizontal />
            <hr />
            <LogoImage
              alt="Election Guard Logo"
              src="/images/electionguard.svg"
            />
          </>
        }
      >
        <p>
          <LinkButton
            primary={electionGuardStatus === ElectionGuardStatus.KeyCeremony}
            disabled={electionGuardStatus !== ElectionGuardStatus.KeyCeremony}
            to="/setup-keys"
            id="setup"
            aria-label="Select Setup to Setup Election"
          >
            Setup Election
          </LinkButton>
        </p>
        <p>
          <LinkButton
            primary={existingElectionGuardConfig !== undefined}
            disabled={existingElectionGuardConfig === undefined}
            onPress={loadElectionConfig}
            id="load"
            aria-label="Load an Existing Election"
          >
            Load Election
          </LinkButton>
        </p>
        <p>
          <LinkButton
            primary={
              electionGuardStatus === ElectionGuardStatus.TallyVotes ||
              electionGuardStatus === ElectionGuardStatus.Complete
            }
            disabled={
              electionGuardStatus !== ElectionGuardStatus.TallyVotes &&
              electionGuardStatus !== ElectionGuardStatus.Complete
            }
            to={tallyComplete ? '/tally' : '/trustees'}
            id="tally"
            aria-label={`Select to ${
              tallyComplete ? 'Review Votes' : 'Tally Votes'
            }`}
          >
            {tallyComplete ? 'Review Votes' : 'Tally Votes'}
          </LinkButton>
        </p>
      </Sidebar>
    </Screen>
  )
}

export default withRouter(StartPage)
