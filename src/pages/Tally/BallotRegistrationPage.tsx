import React, { useContext, useState } from 'react'
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
import { EncryptedBallot } from '../../electionguard/models/EncryptedBallot'

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
`

const BallotListButton = (
  label: string,
  onPress: () => void,
  list?: string[]
) => {
  const warning = list === undefined || list.length <= 0
  let status = CompletionStatus.Error
  if (list !== undefined) {
    status = CompletionStatus.Warning
    if (!warning) {
      status = CompletionStatus.Complete
    }
  }

  return (
    <StatusButton
      onPress={() => onPress()}
      icon={warning ? WARNING_ICON : CHECK_ICON}
      statusLabel={label}
      actionLabel="Upload"
      status={status}
    />
  )
}

const BallotRegistrationPage = (props: RouteComponentProps) => {
  const [isRecordingBallots, setIsRecordingBallots] = useState(false)
  const {
    castIds,
    spoiledIds,
    encryptedBallots,
    recordAndTallyBallots,
    setEncryptedBallots,
    setCastIds,
    setSpoiledIds,
  } = useContext(TallyContext)

  const back = (to: string) => {
    setEncryptedBallots((undefined as unknown) as EncryptedBallot[])
    setCastIds((undefined as unknown) as string[])
    setSpoiledIds((undefined as unknown) as string[])
    props.history.push(to)
  }

  const disable = (): boolean => {
    return (
      castIds === undefined ||
      spoiledIds === undefined ||
      encryptedBallots === undefined
    )
  }

  const complete = (): boolean => {
    if (
      castIds === undefined ||
      spoiledIds === undefined ||
      encryptedBallots === undefined
    ) {
      return false
    }
    return (
      castIds.length > 0 && spoiledIds.length > 0 && encryptedBallots.length > 0
    )
  }

  const navigate = (to: string) => {
    props.history.push(to)
  }

  const tallyVotes = async () => {
    setIsRecordingBallots(true)
    try {
      await recordAndTallyBallots()
      navigate('/tally')
    } catch (error) {
      setIsRecordingBallots(false)
      throw error
    }
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
            <p aria-label="Select artifact to upload">
              <b>Select artifact to upload</b>
            </p>
            <StatusButtonGrid>
              {BallotListButton(
                'Encrypted Ballots',
                () => navigate('/encrypted'),
                encryptedBallots ? encryptedBallots.map(i => i.id) : undefined
              )}
              {BallotListButton(
                'Cast Ballot Ids',
                () => navigate('/cast'),
                castIds
              )}
              {BallotListButton(
                'Spoiled Ballot Ids',
                () => navigate('/spoiled'),
                spoiledIds
              )}
            </StatusButtonGrid>
          </Prose>
        </MainChild>
      </Main>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            big
            primary={complete() && !isRecordingBallots}
            disabled={disable() || isRecordingBallots}
            id="next"
            onPress={tallyVotes}
          >
            Next
          </LinkButton>
        </p>
        <p>
          <LinkButton small onPress={() => back('/trustees')} id="back">
            Back
          </LinkButton>
        </p>
      </Sidebar>
    </Screen>
  )
}

export default BallotRegistrationPage
