import React, { useContext } from 'react'
import styled from 'styled-components'
import { ClaimStatus, EncrypterStore } from '../config/types'
import ElectionContext from '../contexts/electionContext'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'
import Screen from '../components/Screen'
import ElectionInfo from '../components/ElectionInfo'
import Sidebar from '../components/Sidebar'
import ClaimButton from '../components/ClaimButton'
import LinkButton from '../components/LinkButton'

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
`

const LogoImage = styled.img`
  display: flex;
  margin: 0 auto;
  max-width: 12rem;
`

const KeysGrid = styled.div`
  display: grid;
  grid-auto-rows: minmax(auto, 1fr);
  grid-gap: 0.5rem;
`

const getEncrypters = (numberOfEncrypters: number): EncrypterStore => {
  const encrypterStore = {} as EncrypterStore
  for (let i = 0; i < numberOfEncrypters; i += 1) {
    encrypterStore[i] = {
      id: `${i}`,
      data: `${i}`,
      status: ClaimStatus.Unclaimed,
    }
  }
  return encrypterStore
}

const EncryptionDistributionPage = () => {
  const {
    election,
    electionGuardConfig,
    encrypterStore,
    setEncrypterStore,
  } = useContext(ElectionContext)

  if (Object.keys(encrypterStore).length === 0) {
    setEncrypterStore(getEncrypters(electionGuardConfig.numberOfEncrypters))
  }

  const allEncrypters = Object.keys(encrypterStore).map(
    key => encrypterStore[key]
  )
  const allClaimed = allEncrypters.reduce(
    (claimed, key) => claimed && key.status === ClaimStatus.Claimed,
    true
  )
  return (
    <Screen>
      <Main>
        <MainChild>
          <Prose id="audiofocus">
            <Header>
              <h1>Download Encrypter</h1>
            </Header>
          </Prose>
          <Prose textCenter>
            <p aria-label="Select unclaimed key to distribute">
              <b>Select to download</b>
            </p>
            <KeysGrid>
              {allEncrypters.map(encrypter => {
                return (
                  <ClaimButton
                    key={encrypter.id}
                    claimId={encrypter.id}
                    status={encrypter.status}
                    to="/encrypters"
                  />
                )
              })}
            </KeysGrid>
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
            primary={allClaimed}
            disabled={!allClaimed}
            to="/ready"
            id="next"
          >
            Next
          </LinkButton>
        </p>
        <p>
          <LinkButton disabled small to="/start" id="back">
            Back
          </LinkButton>
        </p>
      </Sidebar>
    </Screen>
  )
}

export default EncryptionDistributionPage
