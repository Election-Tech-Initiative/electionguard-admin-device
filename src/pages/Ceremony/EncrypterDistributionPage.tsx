import React, { useContext } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { CompletionStatus, EncrypterStore } from '../../config/types'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import StatusButton, { StatusButtonGrid } from '../../components/StatusButton'
import LinkButton from '../../components/LinkButton'
import SidebarFooter from '../../components/SidebarFooter'
import { CHECK_ICON, WARNING_ICON } from '../../config/globals'
import CeremonyContext from '../../contexts/ceremonyContext'

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
`

const getEncrypters = (numberOfEncrypters: number): EncrypterStore => {
  const encrypterStore = {} as EncrypterStore
  for (let i = 0; i < numberOfEncrypters; i += 1) {
    encrypterStore[i] = {
      id: `${i}`,
      data: `${i}`,
      status: CompletionStatus.Incomplete,
    }
  }
  return encrypterStore
}

const EncryptionDistributionPage = (props: RouteComponentProps) => {
  const { numberOfEncrypters, encrypterStore, setEncrypterStore } = useContext(
    CeremonyContext
  )

  if (Object.keys(encrypterStore).length === 0) {
    setEncrypterStore(getEncrypters(numberOfEncrypters))
  }

  const allEncrypters = Object.keys(encrypterStore).map(
    key => encrypterStore[key]
  )
  const allClaimed = allEncrypters.reduce(
    (claimed, key) => claimed && key.status === CompletionStatus.Complete,
    true
  )

  const handlePress = (id: string, status: CompletionStatus) => {
    const { history } = props
    if (status !== CompletionStatus.Complete) {
      history.push(`/encrypters/${id}`)
    }
  }

  const getIcon = (status: CompletionStatus) => {
    return status === CompletionStatus.Complete ? CHECK_ICON : WARNING_ICON
  }

  const getStatus = (status: CompletionStatus) => {
    return status === CompletionStatus.Complete ? 'Provisioned' : 'Available'
  }

  return (
    <Screen>
      <Main>
        <MainChild>
          <Prose id="audiofocus">
            <Header>
              <h1>Download Encrypter</h1>
            </Header>
          </Prose>
          <Prose textCenter>
            <p aria-label="Select unclaimed key to distribute">
              <b>Select to download</b>
            </p>
            <StatusButtonGrid>
              {allEncrypters.map(encrypter => {
                return (
                  <StatusButton
                    key={encrypter.id}
                    onPress={() => handlePress(encrypter.id, encrypter.status)}
                    icon={getIcon(encrypter.status)}
                    statusLabel={getStatus(encrypter.status)}
                    actionLabel="Download"
                    status={encrypter.status}
                  />
                )
              })}
            </StatusButtonGrid>
          </Prose>
        </MainChild>
      </Main>
      <Sidebar footer={<SidebarFooter />}>
        <p>
          <LinkButton big primary={allClaimed} to="/ready" id="next">
            {allClaimed ? 'Next' : 'Skip'}
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

export default withRouter(EncryptionDistributionPage)
