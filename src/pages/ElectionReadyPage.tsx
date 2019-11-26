import React from 'react'
import Main, { MainChild } from '../components/Main'
import LinkButton from '../components/LinkButton'
import Prose from '../components/Prose'

const ElectionReadyPage = () => {
  return (
    <Main>
      <MainChild center>
        <Prose textCenter>
          <h1>Election Ready</h1>
          <p>Election setup is complete. Please return to main menu.</p>
          <LinkButton
            to="/start"
            id="return-to-start"
            aria-label="Return to Start"
          >
            Return
          </LinkButton>
        </Prose>
      </MainChild>
    </Main>
  )
}

export default ElectionReadyPage
