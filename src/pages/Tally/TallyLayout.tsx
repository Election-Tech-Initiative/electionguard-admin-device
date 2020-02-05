import React, { useState, useContext, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import * as GLOBALS from '../../config/globals'
import BallotRegistrationPage from './BallotRegistrationPage'
import TallyPage from './TallyPage'
import NotFoundPage from '../NotFoundPage'
import TallyContext from '../../contexts/tallyContext'
import {
  updateTrusteesAction,
  TrusteeKey,
  CompletionStatus,
} from '../../config/types'
import { EncryptedBallot } from '../../electionguard/models/EncryptedBallot'
import AdminContext from '../../contexts/adminContext'
import LoadTrusteePage from './LoadTrusteePage'
import LoadCastBallotsPage from './LoadCastBallotsPage'
import LoadSpoiledBallotsPage from './LoadSpoiledBallotsPage'
import LoadEncryptedBallotsPage from './LoadEncryptedBallotsPage'
import TrusteeAnnouncementPage from './TrusteeAnnouncementPage'
import { electionGuardApi } from '../../electionguard'
import LoadCardScreen from './LoadCardScreen'
import RemoveCardScreen from './RemoveCardScreen'
import trusteeReducer from '../../reducers/trusteeReducer'
import UsbContext from '../../contexts/usbContext'
import { defaultExportPathNoDelimeter } from '../../components/UsbManager'

const TallyLayout = () => {
  const { electionGuardConfig, electionMap, setTally } = useContext(
    AdminContext
  )
  const { numberOfTrustees, threshold } = electionGuardConfig
  const { adminDriveMountpoint } = useContext(UsbContext)

  const exportPath = `${adminDriveMountpoint}${GLOBALS.PATH_DELIMITER}${defaultExportPathNoDelimeter}`

  const [castIds, setCastIds] = useState((undefined as unknown) as string[])
  const [spoiledIds, setSpoiledIds] = useState(
    (undefined as unknown) as string[]
  )
  const [castTrackers, setCastTrackers] = useState([] as string[])
  const [spoiledTrackers, setSpoiledTrackers] = useState([] as string[])
  const [encryptedBallots, setEncryptedBallots] = useState(
    (undefined as unknown) as EncryptedBallot[]
  )
  const [remainingThreshold, setRemainingThreshold] = useState(() => threshold)
  const [trustees, trusteesDispatch] = useReducer(
    trusteeReducer,
    [] as TrusteeKey[]
  )

  const recalculateThresholdStatus = (
    announcedTrustee: TrusteeKey,
    remaining: number
  ) => {
    const completedTrustees = trustees.filter(
      trustee => trustee.status === CompletionStatus.Complete
    )

    const missingTrustees = trustees.filter(
      trustee =>
        trustee.status !== CompletionStatus.Complete &&
        trustee.id !== announcedTrustee.id
    )

    let required = remaining

    const newTrustees: TrusteeKey[] = [...completedTrustees, announcedTrustee]
    missingTrustees.forEach(i => {
      const trustee = i
      if (required > 0) {
        trustee.status = CompletionStatus.Error
        required -= 1
      } else {
        trustee.status = CompletionStatus.Warning
      }
      newTrustees.push(trustee)
    })
    return newTrustees
  }

  const announceTrustee = (announcedTrustee: TrusteeKey) => {
    const index = trustees.findIndex(i => i.id === announcedTrustee.id)
    if (index < 0) {
      return
    }

    const trustee = { ...trustees[index] }
    if (trustee.status === CompletionStatus.Complete) {
      return
    }

    const newRemainingThreshold = remainingThreshold - 1
    setRemainingThreshold(newRemainingThreshold)
    const newTrustees = recalculateThresholdStatus(
      announcedTrustee,
      newRemainingThreshold
    )
    trusteesDispatch(updateTrusteesAction(newTrustees))
  }

  const normalizeTrustees = (
    array: TrusteeKey[],
    predicate?: (trustee: TrusteeKey) => boolean
  ) => {
    const normalizedObject: { [id: string]: string } = {}
    for (let i = 0; i < array.length; i += 1) {
      if (!predicate || predicate(array[i])) {
        const key = array[i].id
        normalizedObject[key] = array[i].data
      }
    }
    return normalizedObject
  }

  const recordAndTallyBallots = async () => {
    try {
      const {
        registeredBallotsFileName,
        spoiledBallotTrackers,
        castedBallotTrackers,
      } = await electionGuardApi.recordBallots(
        electionGuardConfig,
        encryptedBallots,
        castIds,
        spoiledIds,
        exportPath
      )

      if (registeredBallotsFileName === undefined) {
        throw Error('registeredBallotsFileName is undefined')
      }

      const announcedTrusteeKeys = normalizeTrustees(trustees, trusteeKey => {
        const didLoadTrusteeKey = !!trusteeKey.data
        return didLoadTrusteeKey
      })
      const { tallyResults } = await electionGuardApi.tallyVotes(
        electionGuardConfig,
        electionMap,
        announcedTrusteeKeys,
        registeredBallotsFileName,
        exportPath
      )

      if (tallyResults === undefined) {
        throw Error('tallyResults is undefined')
      }

      setCastTrackers(castedBallotTrackers)
      setSpoiledTrackers(spoiledBallotTrackers)
      setTally(tallyResults)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error casting and tallying', error)
      // eslint-disable-next-line no-empty
      throw error
    }
  }

  return (
    <TallyContext.Provider
      value={{
        castIds,
        setCastIds,
        spoiledIds,
        setSpoiledIds,
        numberOfTrustees,
        threshold,
        trustees,
        trusteesDispatch,
        announceTrustee,
        encryptedBallots,
        setEncryptedBallots,
        recordAndTallyBallots,
        castTrackers,
        spoiledTrackers,
      }}
    >
      <Switch>
        <Route path="/trustees" exact component={TrusteeAnnouncementPage} />
        <Route path="/trustee" exact component={LoadTrusteePage} />
        <Route path="/trustee/load" exact component={LoadCardScreen} />
        <Route path="/trustee/remove" exact component={RemoveCardScreen} />
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
