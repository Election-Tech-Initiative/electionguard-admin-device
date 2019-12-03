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
import { MAX_ENCRYPTERS } from '../config/globals'

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
`

const LogoImage = styled.img`
  display: flex;
  margin: 0 auto;
  max-width: 12rem;
`

const SetupEncryptersPage = () => {
  const { election, electionGuardConfig, setNumberOfEncrypters } = useContext(
    ElectionContext
  )
  const { numberOfEncrypters } = electionGuardConfig

  const onNumberOfEncryptersChange: PointerEventHandler = event => {
    const target = event.target as HTMLInputElement
    const value = +target.value as number
    setNumberOfEncrypters(value)
  }

  const encrypterOptions = Array.from(Array(MAX_ENCRYPTERS).keys()).map(
    x => x + 1
  )

  return (
    <Screen>
      <Main>
        <MainChild>
          <Prose id="audiofocus">
            <Header>
              <h1>Setup Encrypters</h1>
            </Header>
          </Prose>
          <Prose textCenter>
            <p
              aria-label={`Select number of encrypters available. You have selected ${numberOfEncrypters} encrypters.`}
            >
              <b>How many encrypters available? </b>
            </p>
            <p> {numberOfEncrypters} encrypter(s) </p>
            <SegmentedButton data-testid="change-number-of-encrypters-buttons">
              {encrypterOptions.map((value: number, index: number) => (
                <Button
                  key={value}
                  data-size={index}
                  small
                  onPress={onNumberOfEncryptersChange}
                  value={value}
                  primary={value === numberOfEncrypters}
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
          <LinkButton big primary to="/encrypters" id="next">
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

export default SetupEncryptersPage
