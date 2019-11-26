import React, { useState } from 'react'
import styled from 'styled-components'
import Main, { MainChild } from '../components/Main'
import RangeInput from '../components/RangeInput'
import Button from '../components/Button'
import ButtonBar from '../components/ButtonBar'
import LinkButton from '../components/LinkButton'
import Prose from '../components/Prose'
import { ValidTrusteeCount, ButtonEvent, InputEvent } from '../config/types'

const Filler = styled.div`
  flex: 2;
`

const FontSizeControlsContainer = styled.div`
  display: flex;
  & input {
    flex: 1;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
  button {
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0 0 0.2rem;
  }
`

const SetupElectionPage = () => {
  const [numberOfTrustees, setNumberOfTrustees] = useState(
    1 as ValidTrusteeCount
  )

  const [threshold, setThreshold] = useState(1 as ValidTrusteeCount)

  const onNumberOfTrusteesChange = (event: InputEvent): void => {
    const target = event.target as HTMLInputElement
    const value = +target.value as ValidTrusteeCount
    if (value < threshold) {
      setThreshold(value)
    }
    setNumberOfTrustees(value)
  }

  const adjustNumberOfTrustees = (event: ButtonEvent) => {
    const target = event.target as HTMLButtonElement
    const value = (numberOfTrustees + +target.value) as ValidTrusteeCount
    if (value < threshold) {
      setThreshold(value)
    }
    setNumberOfTrustees(value)
  }

  const onThresholdChange = (event: InputEvent): void => {
    const target = event.target as HTMLInputElement
    const value = +target.value as ValidTrusteeCount
    if (value > numberOfTrustees) {
      setThreshold(numberOfTrustees)
    } else {
      setThreshold(value)
    }
  }

  const adjustThreshold = (event: ButtonEvent) => {
    const target = event.target as HTMLButtonElement
    const value = (threshold + +target.value) as ValidTrusteeCount
    setThreshold(value)
  }

  return (
    <>
      <Main>
        <MainChild center>
          <Prose textCenter>
            <h1>Setup Election</h1>
            <br />
            <p>
              <b>How many trustees available? </b>
            </p>
            <p> {numberOfTrustees} trustee(s) </p>
            <FontSizeControlsContainer>
              <Button
                aria-hidden
                data-testid="decrease-trustees-button"
                disabled={numberOfTrustees === 1}
                onClick={adjustNumberOfTrustees}
                value={-1}
              >
                -
              </Button>
              <RangeInput
                id="numberOfTrustees"
                min={1}
                max={5}
                step={1}
                value={numberOfTrustees}
                onChange={onNumberOfTrusteesChange}
              />
              <Button
                aria-hidden
                data-testid="increase-trustees-button"
                disabled={numberOfTrustees === 5}
                onClick={adjustNumberOfTrustees}
                value={1}
              >
                +
              </Button>
            </FontSizeControlsContainer>
            <p>
              <b>How many trustees required to decrypt?</b>
            </p>
            <p> {threshold} trustee(s) </p>
            <FontSizeControlsContainer>
              <Button
                aria-hidden
                data-testid="decrease-threshold-button"
                disabled={threshold === 1}
                onClick={adjustThreshold}
                value={-1}
              >
                -
              </Button>
              <RangeInput
                id="threshold"
                min={1}
                max={5}
                step={1}
                value={threshold}
                onChange={onThresholdChange}
              />
              <Button
                aria-hidden
                data-testid="increase-threshold-button"
                disabled={threshold >= numberOfTrustees}
                onClick={adjustThreshold}
                value={1}
              >
                +
              </Button>
            </FontSizeControlsContainer>
          </Prose>
        </MainChild>
      </Main>
      <ButtonBar>
        <>
          <LinkButton primary to="/keys" id="create-keys">
            Create Keys
          </LinkButton>
          <LinkButton to="/start" id="back">
            Back
          </LinkButton>
          <Filler />
        </>
      </ButtonBar>
    </>
  )
}

export default SetupElectionPage
