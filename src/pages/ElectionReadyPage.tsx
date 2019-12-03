import React, { useContext } from 'react'
import styled from 'styled-components'
import Main, { MainChild } from '../components/Main'
import Sidebar from '../components/Sidebar'
import ElectionContext from '../contexts/electionContext'
import ElectionInfo from '../components/ElectionInfo'
import Screen from '../components/Screen'
import LinkButton from '../components/LinkButton'
import Prose from '../components/Prose'
import { ElectionGuardStatus } from '../config/types'

const LogoImage = styled.img`
  display: flex;
  margin: 0 auto;
  max-width: 12rem;
`

const ElectionReadyPage = () => {
  const { election, electionGuardStatus, setElectionGuardStatus } = useContext(
    ElectionContext
  )
  if (electionGuardStatus === ElectionGuardStatus.KeyCeremony) {
    setElectionGuardStatus(ElectionGuardStatus.TallyVotes)
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
            big
            primary
            to="/start"
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

export default ElectionReadyPage
