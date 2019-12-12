import React, { useContext } from 'react'
import Main, { MainChild } from '../../components/Main'
import Sidebar from '../../components/Sidebar'
import AdminContext from '../../contexts/adminContext'
import Screen from '../../components/Screen'
import LinkButton from '../../components/LinkButton'
import Prose from '../../components/Prose'
import { ElectionGuardStatus } from '../../config/types'
import SidebarFooter from '../../components/SidebarFooter'

const ElectionReadyPage = () => {
  const { setElectionGuardStatus } = useContext(AdminContext)

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
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            big
            primary
            onPress={() =>
              setElectionGuardStatus(ElectionGuardStatus.TallyVotes)
            }
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
