import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Main, { MainChild } from '../components/Main'
import Prose from '../components/Prose'
import Screen from '../components/Screen'

const RemoveDriveScreen = () => {
  const saveDelay = 2500
  const [done, setDone] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDone(true)
    }, saveDelay)
  }, [])

  if (done) {
    return <Redirect to="/encrypters" />
  }
  return (
    <Screen white>
      <Main>
        <MainChild centerVertical maxWidth={false}>
          <Prose textCenter id="audiofocus">
            <p>Encrypter has been saved to the drive.</p>
            <h1 aria-label="Remove drive.">Remove Drive</h1>
          </Prose>
        </MainChild>
      </Main>
    </Screen>
  )
}

export default RemoveDriveScreen
