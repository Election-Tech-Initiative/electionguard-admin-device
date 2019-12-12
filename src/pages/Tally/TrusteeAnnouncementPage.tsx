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
import { TrusteeKey, CompletionStatus } from '../../config/types'
import { CHECK_ICON, WARNING_ICON } from '../../config/globals'
import TallyContext from '../../contexts/tallyContext'

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
`

const mockKeys: TrusteeKey[] = [
  { id: '0', data: '', status: CompletionStatus.Error },
  { id: '1', data: '', status: CompletionStatus.Error },
  { id: '2', data: '', status: CompletionStatus.Error },
  { id: '3', data: '', status: CompletionStatus.Error },
]

const getStatus = (status: CompletionStatus) => {
  switch (status) {
    case CompletionStatus.Complete:
      return 'Present'
    case CompletionStatus.Error:
      return 'Required'
    case CompletionStatus.Warning:
      return 'Missing'
    default:
      return ''
  }
}

const getIcon = (status: CompletionStatus) => {
  switch (status) {
    case CompletionStatus.Complete:
      return CHECK_ICON
    case CompletionStatus.Warning:
    case CompletionStatus.Error:
      return WARNING_ICON
    default:
      return 'O'
  }
}

const thresholdMet = (keys: TrusteeKey[]) => {
  return keys.reduce((prev, current) => {
    return prev && current.status !== CompletionStatus.Error
  }, true)
}

const TrusteeAnnouncementPage = (props: RouteComponentProps) => {
  const { trustees, setTrustees } = useContext(TallyContext)
  if (trustees.length <= 0) {
    setTrustees(mockKeys)
  }

  const handlePress = () => {
    props.history.push('/trustee')
  }

  return (
    <Screen>
      <Main>
        <MainChild>
          <Prose id="audiofocus">
            <Header>
              <h1>Announce Trustees</h1>
            </Header>
          </Prose>
          <Prose textCenter>
            <p aria-label="Select trustee to announce">
              <b>Select trustee to announce</b>
            </p>
            <StatusButtonGrid>
              {trustees
                .sort((a, b) => b.status - a.status)
                .map(expectedKey => {
                  return (
                    <StatusButton
                      key={expectedKey.id}
                      onPress={() => handlePress()}
                      icon={getIcon(expectedKey.status)}
                      statusLabel={getStatus(expectedKey.status)}
                      actionLabel="Announce"
                      status={expectedKey.status}
                    />
                  )
                })}
            </StatusButtonGrid>
          </Prose>
        </MainChild>
      </Main>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton
            big
            primary={thresholdMet(trustees)}
            disabled={!thresholdMet(trustees)}
            to="/ballots"
            id="next"
          >
            Next
          </LinkButton>
        </p>
        <p>
          <LinkButton disabled small to="/start" id="back">
            Back
          </LinkButton>
        </p>
      </Sidebar>
    </Screen>
  )
}

export default TrusteeAnnouncementPage
