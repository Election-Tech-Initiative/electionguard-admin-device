import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import AdminContext from '../contexts/adminContext'

import Button from '../components/Button'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'
import Screen from '../components/Screen'

const NotFoundPage = (props: RouteComponentProps) => {
  const { resetElection } = useContext(AdminContext)
  const { pathname } = props.location
  const requestResetElection = () => {
    resetElection()
  }
  return (
    <Screen>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <h1>Page Not Found.</h1>
            <p>
              No page exists at <code>{pathname}</code>.
            </p>
            <p>
              <Button onPress={requestResetElection}>Start Over</Button>
            </p>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default NotFoundPage
