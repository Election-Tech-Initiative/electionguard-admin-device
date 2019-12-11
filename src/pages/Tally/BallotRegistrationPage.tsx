import React, { useContext } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import SidebarFooter from '../../components/SidebarFooter'
import LinkButton from '../../components/LinkButton'
import StatusButton, { StatusButtonGrid } from '../../components/StatusButton'
import { CompletionStatus } from '../../config/types'
import { CHECK_ICON, WARNING_ICON } from '../../config/globals'
import TallyContext from '../../contexts/tallyContext'

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
`

const BallotListButton = (
  list: string[],
  label: string,
  onPress: () => void
) => {
  const empty = list.length <= 0
  return (
    <StatusButton
      onPress={() => onPress()}
      icon={empty ? WARNING_ICON : CHECK_ICON}
      statusLabel={label}
      actionLabel="Upload"
      status={empty ? CompletionStatus.Error : CompletionStatus.Complete}
    />
  )
}

const BallotRegistrationPage = (props: RouteComponentProps) => {
  const { castIds, spoiledIds, encryptedBallotPaths } = useContext(TallyContext)
  const ready = (): boolean => {
    return (
      castIds.length > 0 &&
      spoiledIds.length > 0 &&
      encryptedBallotPaths.length > 0
    )
  }

  const navigate = (to: string) => {
    props.history.push(to)
  }

  return (
    <Screen>
      <Main>
        <MainChild>
          <Prose id="audiofocus">
            <Header>
              <h1>Upload Election Artifacts</h1>
            </Header>
          </Prose>
          <Prose textCenter>
            <p aria-label="Select trustee to announce">
              <b>Select artifact to upload</b>
            </p>
            <StatusButtonGrid>
              {BallotListButton(encryptedBallotPaths, 'Encrypted Ballots', () =>
                navigate('/encrypted')
              )}
              {BallotListButton(castIds, 'Cast Ballot Ids', () =>
                navigate('/cast')
              )}
              {BallotListButton(spoiledIds, 'Spoiled Ballot Ids', () =>
                navigate('/spoiled')
              )}
            </StatusButtonGrid>
          </Prose>
        </MainChild>
      </Main>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            big
            primary={ready()}
            disabled={!ready()}
            to="/tally"
            id="next"
          >
            Next
          </LinkButton>
        </p>
        <p>
          <LinkButton disabled small to="/trustees" id="back">
            Back
          </LinkButton>
        </p>
      </Sidebar>
    </Screen>
  )
}

export default BallotRegistrationPage
