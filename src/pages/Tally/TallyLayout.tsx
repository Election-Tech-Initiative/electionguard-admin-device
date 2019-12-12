import React, { useState, useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import BallotRegistrationPage from './BallotRegistrationPage'
import TallyPage from './TallyPage'
import NotFoundPage from '../NotFoundPage'
import TallyContext from '../../contexts/tallyContext'
import {
  TrusteeKey,
  Tally,
  CompletionStatus,
  createTrusteeKey,
} from '../../config/types'
import AdminContext from '../../contexts/adminContext'
import LoadTrusteePage from './LoadTrusteePage'
import LoadCastBallotsPage from './LoadCastBallotsPage'
import LoadSpoiledBallotsPage from './LoadSpoiledBallotsPage'
import LoadEncryptedBallotsPage from './LoadEncryptedBallotsPage'
import TrusteeAnnouncementPage from './TrusteeAnnouncementPage'

const TallyLayout = () => {
  const { electionGuardConfig } = useContext(AdminContext)
  const { numberOfTrustees, threshold } = electionGuardConfig
  const [castIds, setCastIds] = useState([] as string[])
  const [spoiledIds, setSpoiledIds] = useState([] as string[])
  const [trustees, setTrustees] = useState([] as TrusteeKey[])
  const [encryptedBallotPaths, setEncryptedBallotPaths] = useState(
    [] as string[]
  )
  const [tally, setTally] = useState((undefined as unknown) as Tally)

  const announceTrustee = (announcedTrustee: TrusteeKey) => {
    const completedTrustees = trustees.filter(
      trustee => trustee.status === CompletionStatus.Complete
    )
    if (
      completedTrustees.filter(trustee => trustee.id === announcedTrustee.id)
        .length > 0
    ) {
      return
    }
    const missingTrustees = []
    const missing = numberOfTrustees - (completedTrustees.length + 1)
    let required = threshold - (completedTrustees.length + 1)
    if (missing > 0) {
      for (let i = 0; i < missing; i += 1) {
        const newTrustee = createTrusteeKey('', '', CompletionStatus.Warning)
        if (required > 0) {
          newTrustee.status = CompletionStatus.Error
          required -= 1
        }
        missingTrustees.push(newTrustee)
      }
    }
    setTrustees([...completedTrustees, ...missingTrustees, announcedTrustee])
  }

  const addEncryptedBallotPath = (path: string) => {
    setEncryptedBallotPaths([...encryptedBallotPaths, path])
  }

  return (
    <TallyContext.Provider
      value={{
        castIds,
        setCastIds,
        spoiledIds,
        setSpoiledIds,
        trustees,
        setTrustees,
        announceTrustee,
        encryptedBallotPaths,
        addEncryptedBallotPath,
        tally,
        setTally,
      }}
    >
      <Switch>
        <Route path="/trustees" exact component={TrusteeAnnouncementPage} />
        <Route path="/trustee" exact component={LoadTrusteePage} />
        <Route path="/ballots" exact component={BallotRegistrationPage} />
        <Route path="/cast" exact component={LoadCastBallotsPage} />
        <Route path="/spoiled" exact component={LoadSpoiledBallotsPage} />
        <Route path="/encrypted" exact component={LoadEncryptedBallotsPage} />
        <Route path="/tally" exact component={TallyPage} />
        <Route path="/:path" component={NotFoundPage} />
      </Switch>
    </TallyContext.Provider>
  )
}

export default TallyLayout
