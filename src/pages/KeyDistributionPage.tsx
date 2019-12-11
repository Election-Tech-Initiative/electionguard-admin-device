import React, { useContext } from 'react'
import styled from 'styled-components'
import ElectionContext from '../contexts/electionContext'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'
import Screen from '../components/Screen'
import ElectionInfo from '../components/ElectionInfo'
import Sidebar from '../components/Sidebar'
import ClaimButton from '../components/ClaimButton'
import LinkButton from '../components/LinkButton'
import { ClaimStatus } from '../config/types'

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

const KeyDistributionPage = () => {
  const { election, keyVault } = useContext(ElectionContext)

  const allKeys = Object.keys(keyVault).map(key => keyVault[key])
  const allClaimed = allKeys.reduce(
    (claimed, key) => claimed && key.status === ClaimStatus.Claimed,
    true
  )

  return (
    <Screen>
      <Main>
        <MainChild>
          <Prose id="audiofocus">
            <Header>
              <h1>Distribute Keys</h1>
            </Header>
          </Prose>
          <Prose textCenter>
            <p aria-label="Select unclaimed key to distribute">
              <b>Select key to distribute </b>
            </p>
            <KeysGrid>
              {allKeys.map(key => {
                return (
                  <ClaimButton
                    key={key.id}
                    claimId={key.id}
                    status={key.status}
                    to="/keys"
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
            to="/setup-encrypters"
            id="next"
          >
            Next
          </LinkButton>
        </p>
        <p>
          <LinkButton disabled small to="/setup-keys" id="back">
            Back
          </LinkButton>
        </p>
      </Sidebar>
    </Screen>
  )
}

export default KeyDistributionPage
