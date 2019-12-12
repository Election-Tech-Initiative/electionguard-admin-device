import React, { useContext } from 'react'
import TallyContext from '../../contexts/tallyContext'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import LinkButton from '../../components/LinkButton'
import SidebarFooter from '../../components/SidebarFooter'

const LoadSpoiledBallotsPage = () => {
  const { setSpoiledIds } = useContext(TallyContext)
  const handleLoad = () => {
    // TODO Load Trustee from card
    const mockIds = ['1B', '2B', '3B', '4B', '5B']
    setSpoiledIds(mockIds)
  }

  return (
    <Screen flexDirection="row-reverse" white>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            big
            primary
            onPress={() => handleLoad()}
            to="/ballots"
            id="load"
            aria-label="Load spoiled ballot ids from drive."
          >
            Load
          </LinkButton>
        </p>
        <p>
          <LinkButton small to="/ballots" id="back" aria-label="Navigate back">
            Back
          </LinkButton>
        </p>
      </Sidebar>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <>
              <h1 aria-hidden>Insert Drive</h1>
              <p>Insert spoiled ballot box drive.</p>
            </>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default LoadSpoiledBallotsPage
