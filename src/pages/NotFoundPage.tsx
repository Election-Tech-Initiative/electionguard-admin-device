import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import BallotContext from '../contexts/electionContext'

import Button from '../components/Button'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'

const NotFoundPage = (props: RouteComponentProps) => {
  const { resetElection } = useContext(BallotContext)
  const { pathname } = props.location
  const requestResetElection = () => {
    resetElection()
  }
  return (
    <Main>
      <MainChild center>
        <Prose textCenter>
          <h1>Page Not Found.</h1>
          <p>
            No page exists at <code>{pathname}</code>.
          </p>
          <p>
            <Button onClick={requestResetElection}>Return to Start</Button>
          </p>
        </Prose>
      </MainChild>
    </Main>
  )
}

export default NotFoundPage
