import React, { useContext, PointerEventHandler } from 'react'
import styled from 'styled-components'
import ElectionContext from '../contexts/electionContext'
import Main, { MainChild } from '../components/Main'
import Button, { SegmentedButton } from '../components/Button'
import TextIcon from '../components/TextIcon'
import Screen from '../components/Screen'
import LinkButton from '../components/LinkButton'
import ElectionInfo from '../components/ElectionInfo'
import Sidebar from '../components/Sidebar'
import Prose from '../components/Prose'
import { ValidTrusteeCount } from '../config/types'
import { MAX_TRUSTEES } from '../config/globals'

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
`

const LogoImage = styled.img`
  display: flex;
  margin: 0 auto;
  max-width: 12rem;
`

const SetupTrusteesPage = () => {
  const {
    election,
    electionGuardConfig,
    setNumberOfTrustees,
    setThreshold,
  } = useContext(ElectionContext)
  const { numberOfTrustees, threshold } = electionGuardConfig

  if (!threshold && !numberOfTrustees) {
    setNumberOfTrustees(1)
    setThreshold(1)
  }

  const onNumberOfTrusteesChange: PointerEventHandler = event => {
    const target = event.target as HTMLInputElement
    const value = +target.value as ValidTrusteeCount
    if (value < electionGuardConfig.threshold) {
      setThreshold(value)
    }
    setNumberOfTrustees(value)
  }

  const onThresholdChange: PointerEventHandler = event => {
    const target = event.target as HTMLInputElement
    const value = +target.value as ValidTrusteeCount
    if (value > numberOfTrustees) {
      setThreshold(numberOfTrustees)
    } else {
      setThreshold(value)
    }
  }

  const trusteeOptions = Array.from(Array(MAX_TRUSTEES).keys()).map(x => x + 1)
  const thresholdOptions = Array.from(Array(numberOfTrustees).keys()).map(
    x => x + 1
  )

  return (
    <Screen>
      <Main>
        <MainChild>
          <Prose id="audiofocus">
            <Header>
              <h1>Setup Trustees</h1>
            </Header>
          </Prose>
          <Prose textCenter>
            <p
              aria-label={`Select number of trustees available. You have selected ${numberOfTrustees} trustee(s). Use the down arrow to hear your options. Use the right arrow to move to the next contest.`}
            >
              <b>How many trustees available? </b>
            </p>
            <p> {numberOfTrustees} trustee(s) </p>
            <SegmentedButton data-testid="change-number-of-trustee-buttons">
              {trusteeOptions.map((value: number, index: number) => (
                <Button
                  key={value}
                  data-size={index}
                  small
                  onPress={onNumberOfTrusteesChange}
                  value={value}
                  primary={value === numberOfTrustees}
                >
                  {value}
                </Button>
              ))}
            </SegmentedButton>
            <p
              aria-label={`Select number of trustees required to decrypt. You have selected ${threshold} trustee(s). Use the down arrow to hear your options. Use the right arrow to move to the next contest.`}
            >
              <b>How many trustees required to decrypt?</b>
            </p>
            <p> {threshold} trustee(s) </p>
            <SegmentedButton data-testid="change-threshold-buttons">
              {thresholdOptions.map((value: number, index: number) => (
                <Button
                  key={value}
                  data-size={index}
                  small
                  onPress={onThresholdChange}
                  value={value}
                  primary={value === threshold}
                >
                  {value}
                </Button>
              ))}
            </SegmentedButton>
          </Prose>
        </MainChild>
      </Main>
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
          <LinkButton big primary to="/keys" id="next">
            <TextIcon arrowRight white>
              Next
            </TextIcon>
          </LinkButton>
        </p>
        <p>
          <LinkButton small to="/start" id="back">
            <TextIcon arrowLeft>Back</TextIcon>
          </LinkButton>
        </p>
      </Sidebar>
    </Screen>
  )
}

export default SetupTrusteesPage
