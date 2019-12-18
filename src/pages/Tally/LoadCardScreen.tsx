import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import Main, { MainChild } from '../../components/Main'
import ProgressBar from '../../components/ProgressBar'
import Prose from '../../components/Prose'
import Screen from '../../components/Screen'
import Loading from '../../components/Loading'
import SmartcardContext from '../../contexts/smartcardContext'

const LoadCardScreen = () => {
  const saveDelay = 3000
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const { isReadingCard } = useContext(SmartcardContext)

  useEffect(() => {
    setTimeout(() => {
      setProgress(1)
    }, 1)
    setTimeout(() => {
      setDone(true)
    }, saveDelay)
  }, [])

  if (done && !isReadingCard) {
    return <Redirect to="/trustee/remove" />
  }
  return (
    <Screen white>
      <Main>
        <MainChild centerVertical maxWidth={false}>
          <Prose textCenter id="audiofocus">
            <ProgressBar progress={progress} duration={saveDelay} />
            <h1>
              <Loading>Loading trustee from the card</Loading>
            </h1>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default LoadCardScreen
