/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react'
import styled from 'styled-components'

import BallotContext from '../contexts/electionContext'

import LinkButton from '../components/LinkButton'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'

const Seal = styled.div`
  margin: 0 auto 1rem;
  max-width: 320px;
`

const SealImage = styled.img`
  max-width: 320px;
`

const ButtonOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > button {
    margin: 10px;
    width: 240px;
  }
`

const StartPage = () => {
  const { election } = useContext(BallotContext)
  const { title, state, county, date, seal, sealURL } = election!

  return (
    <Main>
      <MainChild center>
        {seal ? (
          <Seal aria-hidden="true" dangerouslySetInnerHTML={{ __html: seal }} />
        ) : sealURL ? (
          <Seal aria-hidden="true">
            <SealImage alt="" src={sealURL} />
          </Seal>
        ) : (
          <></>
        )}
        <Prose textCenter>
          <h1 aria-label={`${title}.`}>{title}</h1>
          <p aria-hidden="true">
            {date}
            <br />
            {county.name}, {state}
            <br />
          </p>
          <ButtonOptions>
            <LinkButton
              primary
              to="/setup"
              id="setup"
              aria-label="Select Setup to Setup Election"
            >
              Setup Election
            </LinkButton>
            <LinkButton
              disabled
              to="/tally"
              id="tally"
              aria-label="Select Tally to Tally Votes"
            >
              Tally Votes
            </LinkButton>
          </ButtonOptions>
        </Prose>
      </MainChild>
    </Main>
  )
}

export default StartPage
