import React, { useContext } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import ElectionContext from '../contexts/electionContext'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'
import Screen from '../components/Screen'
import Sidebar from '../components/Sidebar'
import ElectionInfo from '../components/ElectionInfo'
import LinkButton from '../components/LinkButton'

const LogoImage = styled.img`
  display: flex;
  margin: 0 auto;
  max-width: 12rem;
`
interface EncrypterParams {
  encrypterId: string
}

const InsertDriveScreen = (props: RouteComponentProps<EncrypterParams>) => {
  const { encrypterId } = props.match.params
  const { election, claimEncrypterDrive } = useContext(ElectionContext)
  return (
    <Screen flexDirection="row-reverse" white>
      <Sidebar
        footer={
          <>
            <hr />
            <ElectionInfo election={election} precinctId="" horizontal />
            <hr />
            <LogoImage
              alt="Election Guard Logo"
              src="/images/electionguard.svg"
            />
          </>
        }
      >
        <p>
          <LinkButton
            big
            primary
            onPress={() => claimEncrypterDrive(encrypterId)}
            to="/encrypter/save"
            id="save"
            aria-label="Save encryter to drive."
          >
            Save
          </LinkButton>
        </p>
        <p>
          <LinkButton
            small
            to="/encrypters"
            id="encrypters"
            aria-label="Return to encrypter distribution."
          >
            Back
          </LinkButton>
        </p>
      </Sidebar>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <>
              <h1 aria-hidden>Insert Drive</h1>
              <p>Insert drive for encrypter.</p>
            </>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default InsertDriveScreen
