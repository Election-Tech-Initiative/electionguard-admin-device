import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import LinkButton from '../../components/LinkButton'
import TallyContext from '../../contexts/tallyContext'
import SmartcardContext from '../../contexts/smartcardContext'
import SidebarFooter from '../../components/SidebarFooter'
import { createTrusteeKey, TrusteeKey } from '../../config/types'

const InsertCardImage = styled.img`
  margin: 0 auto -1rem;
  height: 30vw;
`

const LoadTrusteePage = () => {
  const { announceTrustee } = useContext(TallyContext)
  const { isCardConnected, connect, disconnect, readValue } = useContext(
    SmartcardContext
  )
  const [done, setDone] = useState(false)

  const startMonitoring = useCallback(connect, [])
  useEffect(startMonitoring, [!isCardConnected, startMonitoring])

  const handleLoad = async () => {
    const trustee: TrusteeKey = await readValue()
    announceTrustee(createTrusteeKey(trustee.id, trustee.data))
    setDone(true)
  }

  if (done) {
    disconnect()
    return <Redirect to="/trustees" />
  }

  return (
    <Screen flexDirection="row-reverse" white>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            onPress={() => handleLoad()}
            big
            primary
            id="load"
            aria-label="Load trustee from card."
          >
            Load
          </LinkButton>
        </p>
        <p>
          <LinkButton
            onPress={() => disconnect()}
            small
            to="/trustees"
            id="trustees"
            aria-label="Return to announcing trustees."
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
              <p>Insert provisioned trustee card.</p>
            </>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default LoadTrusteePage
