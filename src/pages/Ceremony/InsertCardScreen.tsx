import React, { useCallback, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import LinkButton from '../../components/LinkButton'
import CeremonyContext from '../../contexts/ceremonyContext'
import SmartcardContext from '../../contexts/smartcardContext'
import SidebarFooter from '../../components/SidebarFooter'

const InsertCardImage = styled.img`
  margin: 0 auto -1rem;
  height: 30vw;
`

interface TrusteeKeyParams {
  trusteeId: string
}

const InsertCardScreen = (props: RouteComponentProps<TrusteeKeyParams>) => {
  const { trusteeId } = props.match.params
  const { claimTrusteeKey } = useContext(CeremonyContext)
  const { isCardConnected, connect, disconnect } = useContext(SmartcardContext)

  const startMonitoring = useCallback(connect, [])
  useEffect(startMonitoring, [!isCardConnected, startMonitoring])

  return (
    <Screen flexDirection="row-reverse" white>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            onPress={() => claimTrusteeKey(trusteeId)}
            big
            to="/key/save"
            id="save"
            primary={isCardConnected}
            disabled={!isCardConnected}
            aria-label="Save trustee to card."
          >
            Save
          </LinkButton>
        </p>
        <p>
          <LinkButton
            onPress={() => disconnect()}
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
