import React, { useContext } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import CeremonyContext from '../../contexts/ceremonyContext'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import StatusButton, { StatusButtonGrid } from '../../components/StatusButton'
import LinkButton from '../../components/LinkButton'
import { CompletionStatus } from '../../config/types'
import { KEY_ICON, CHECK_ICON } from '../../config/globals'
import SidebarFooter from '../../components/SidebarFooter'

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
`

const KeyDistributionPage = (props: RouteComponentProps) => {
  const { keyVault } = useContext(CeremonyContext)

  const allKeys = Object.keys(keyVault).map(key => keyVault[key])
  const allClaimed = allKeys.reduce(
    (claimed, key) => claimed && key.status === CompletionStatus.Complete,
    true
  )

  const handlePress = (id: string, status: CompletionStatus) => {
    const { history } = props
    if (status !== CompletionStatus.Complete) {
      history.push(`/keys/${id}`)
    }
  }

  const getIcon = (status: CompletionStatus) => {
    return status === CompletionStatus.Complete ? CHECK_ICON : KEY_ICON
  }

  const getStatus = (status: CompletionStatus) => {
    return status === CompletionStatus.Complete ? 'Claimed' : 'Unclaimed'
  }

  return (
    <Screen>
      <Main>
        <MainChild>
          <Prose id="audiofocus">
            <Header>
              <h1>Distribute Keys</h1>
            </Header>
          </Prose>
          <Prose textCenter>
            <p aria-label="Select unclaimed key to distribute">
              <b>Select key to distribute </b>
            </p>
            <StatusButtonGrid>
              {allKeys.map(key => {
                return (
                  <StatusButton
                    key={key.id}
                    onPress={() => handlePress(key.id, key.status)}
                    icon={getIcon(key.status)}
                    statusLabel={getStatus(key.status)}
                    actionLabel="Claim"
                    status={key.status}
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
            primary={allClaimed}
            disabled={!allClaimed}
            to="/setup-encrypters"
            id="next"
          >
            Next
          </LinkButton>
        </p>
        <p>
          <LinkButton disabled small to="/setup-keys" id="back">
            Back
          </LinkButton>
        </p>
      </Sidebar>
    </Screen>
  )
}

export default withRouter(KeyDistributionPage)
