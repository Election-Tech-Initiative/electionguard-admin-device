import React from 'react'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'

const TallyPage = () => {
  return (
    <Main>
      <MainChild center>
        <Prose textCenter>
          <h1>Tally Votes</h1>
        </Prose>
      </MainChild>
    </Main>
  )
}

export default TallyPage
