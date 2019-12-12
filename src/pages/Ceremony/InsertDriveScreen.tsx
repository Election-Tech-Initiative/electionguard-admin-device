import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import CeremonyContext from '../../contexts/ceremonyContext'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Sidebar from '../../components/Sidebar'
import LinkButton from '../../components/LinkButton'
import SidebarFooter from '../../components/SidebarFooter'

interface EncrypterParams {
  encrypterId: string
}

const InsertDriveScreen = (props: RouteComponentProps<EncrypterParams>) => {
  const { encrypterId } = props.match.params
  const { claimEncrypterDrive } = useContext(CeremonyContext)
  return (
    <Screen flexDirection="row-reverse" white>
      <Sidebar footer={<SidebarFooter />}>
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
