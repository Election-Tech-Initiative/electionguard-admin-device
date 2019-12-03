import React, { useContext } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import ElectionContext from '../contexts/electionContext'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'
import Screen from '../components/Screen'
import Sidebar from '../components/Sidebar'
import ElectionInfo from '../components/ElectionInfo'
import LinkButton from '../components/LinkButton'

const InsertCardImage = styled.img`
  margin: 0 auto -1rem;
  height: 30vw;
`

const LogoImage = styled.img`
  display: flex;
  margin: 0 auto;
  max-width: 12rem;
`

interface TrusteeKeyParams {
  trusteeId: string
}

const InsertCardScreen = (props: RouteComponentProps<TrusteeKeyParams>) => {
  const { trusteeId } = props.match.params
  const { election, claimTrusteeKey } = useContext(ElectionContext)
  return (
    <Screen flexDirection="row-reverse" white>
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
            onPress={() => claimTrusteeKey(trusteeId)}
            big
            primary
            to="/key/save"
            id="save"
            aria-label="Save trustee to card."
          >
            Save
          </LinkButton>
        </p>
        <p>
          <LinkButton
            small
            to="/keys"
            id="keys"
            aria-label="Return to key distribution."
          >
            Back
          </LinkButton>
        </p>
      </Sidebar>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <p>
              <InsertCardImage
                aria-hidden
                src="/images/insert-card.svg"
                alt="Insert Card Diagram"
              />
            </p>
            <>
              <h1 aria-hidden>Insert Card</h1>
              <p>Insert trustee to load ballot.</p>
            </>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default InsertCardScreen
