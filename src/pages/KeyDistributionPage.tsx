import React, { useState } from 'react'
import styled from 'styled-components'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'
import KeyClaimer from '../components/KeyClaimer'
import ButtonBar from '../components/ButtonBar'
import LinkButton from '../components/LinkButton'

const Filler = styled.div`
  flex: 2;
`

const KeysGrid = styled.div`
  display: grid;
  grid-auto-rows: minmax(auto, 1fr);
  grid-gap: 0.5rem;
`

const mockKeys: { [id: string]: Key } = {
  '1': {
    id: 1,
    claimed: false,
    data: '',
  },
  '2': {
    id: 2,
    claimed: false,
    data: '',
  },
  '3': {
    id: 3,
    claimed: false,
    data: '',
  },
  '4': {
    id: 4,
    claimed: false,
    data: '',
  },
  '5': {
    id: 5,
    claimed: false,
    data: '',
  },
}

interface Key {
  id: number
  claimed: boolean
  data: string
}

const KeyDistributionPage = () => {
  const [keys, setKeys] = useState<{ [id: string]: Key }>(mockKeys)
  const test = (id: number) => {
    setKeys({
      ...keys,
      [id]: {
        ...keys[id],
        claimed: true,
      },
    })
  }
  const allKeys = Object.keys(keys).map(key => keys[key])
  const allClaimed = allKeys.reduce(
    (claimed, key) => claimed && key.claimed,
    true
  )
  return (
    <>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <h1>Distribute Keys</h1>
            <KeysGrid>
              {allKeys.map(key => {
                return (
                  <KeyClaimer
                    key={key.id}
                    id={key.id}
                    claimed={key.claimed}
                    onClaim={test}
                  />
                )
              })}
            </KeysGrid>
          </Prose>
        </MainChild>
      </Main>
      <ButtonBar>
        <>
          <LinkButton
            disabled={!allClaimed}
            primary={allClaimed}
            to="/ready"
            id="next"
          >
            Next
          </LinkButton>
          <LinkButton disabled to="/setup" id="back">
            Back
          </LinkButton>
          <Filler />
        </>
      </ButtonBar>
    </>
  )
}

export default KeyDistributionPage
