import React, { useContext } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import Main, { MainChild } from '../../components/Main'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import SmartcardContext from '../../contexts/smartcardContext'

const Graphic = styled.img`
  margin: 0 auto -1rem;
  height: 30vw;
`

const RemoveCardScreen = () => {
  const { isCardConnected } = useContext(SmartcardContext)

  if (!isCardConnected) {
    return <Redirect to="/keys" />
  }
  return (
    <Screen white>
      <Main>
        <MainChild centerVertical maxWidth={false}>
          <Prose textCenter id="audiofocus">
            <p>Trustee has been saved to the card.</p>
            <p>
              <Graphic
                aria-hidden
                src="/images/take-card-to-printer.svg"
                alt="Remove Card"
              />
            </p>
            <h1 aria-label="Remove card. Safekeep for decryption.">
              Remove card. Safekeep for decryption.
            </h1>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default RemoveCardScreen
