import React, { useContext } from 'react'
import styled from 'styled-components'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import LinkButton from '../../components/LinkButton'
import TallyContext from '../../contexts/tallyContext'
import SidebarFooter from '../../components/SidebarFooter'
import { CompletionStatus, createTrusteeKey } from '../../config/types'

const InsertCardImage = styled.img`
  margin: 0 auto -1rem;
  height: 30vw;
`

const LoadTrusteePage = () => {
  const { announceTrustee, trustees } = useContext(TallyContext)

  const handleLoad = () => {
    // TODO Load Trustee from card
    const mockId = trustees.filter(
      trustee => trustee.status !== CompletionStatus.Complete
    )[0].id
    announceTrustee(createTrusteeKey(mockId, ''))
  }

  return (
    <Screen flexDirection="row-reverse" white>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            onPress={() => handleLoad()}
            big
            primary
            to="/trustees"
            id="load"
            aria-label="Load trustee from card."
          >
            Load
          </LinkButton>
        </p>
        <p>
          <LinkButton
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
