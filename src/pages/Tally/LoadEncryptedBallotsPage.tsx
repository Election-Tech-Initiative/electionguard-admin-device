import React, { useContext } from 'react'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import LinkButton from '../../components/LinkButton'
import SidebarFooter from '../../components/SidebarFooter'
import TallyContext from '../../contexts/tallyContext'

interface EncrypterParams {
  encrypterId: string
}

const LoadEncryptedBallotsPage = () => {
  const { addEncryptedBallotPath } = useContext(TallyContext)
  const handleLoad = () => {
    // TODO Load EncryptedBallotPath from card
    const mockPath = 'path'
    addEncryptedBallotPath(mockPath)
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
            aria-label="Load encrypted ballots."
          >
            Load
          </LinkButton>
        </p>
        <p>
          <LinkButton small to="/ballots" id="back" aria-label="Navigate back.">
            Back
          </LinkButton>
        </p>
      </Sidebar>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <>
              <h1 aria-hidden>Insert Drive</h1>
              <p>Insert drive with encrypted ballots.</p>
            </>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default LoadEncryptedBallotsPage
