import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { render as testRender } from '@testing-library/react'
import { Election } from '@votingworks/ballot-encoder'

import * as GLOBALS from '../src/config/globals'

// it's necessary to use the no-seal version, which has neither
// of the two optional seal fields, because otherwise
// typescript concludes that sealURL is required.
import electionSampleNoSeal from '../src/data/electionSampleNoSeal.json'

import { TextSizeSetting } from '../src/config/types'
import {
  ElectionGuardConfig,
  ElectionMap,
  ElectionGuardStatus,
  Tally,
} from '../src/electionguard'
import AdminContext from '../src/contexts/adminContext'

export function render(
  component: React.ReactNode,
  {
    route = '/',
    election = electionSampleNoSeal,
    setElection = jest.fn(),
    resetElection = jest.fn(),
    electionMap = {} as ElectionMap,
    setElectionMap = jest.fn(),
    tally = (undefined as unknown) as Tally,
    setTally = jest.fn(),
    electionGuardStatus = ElectionGuardStatus.KeyCeremony,
    setElectionGuardStatus = jest.fn(),
    history = createMemoryHistory({ initialEntries: [] }),
    electionGuardConfig = {} as ElectionGuardConfig,
    setElectionGuardConfig = jest.fn(),
    existingElectionGuardConfig = {} as ElectionGuardConfig,
    setExistingElectionGuardConfig = jest.fn(),
    userSettings = { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
    setUserSettings = jest.fn(),
  } = {}
) {
  return {
    ...testRender(
      <AdminContext.Provider
        value={{
          election: election as Election,
          setElection,
          resetElection,
          electionMap,
          setElectionMap,
          tally,
          setTally,
          electionGuardStatus,
          setElectionGuardStatus,
          electionGuardConfig,
          setElectionGuardConfig,
          existingElectionGuardConfig,
          setExistingElectionGuardConfig,
          setUserSettings,
          userSettings,
        }}
      >
        <Router
          history={
            route ? createMemoryHistory({ initialEntries: [route] }) : history
          }
        >
          {component}
        </Router>
      </AdminContext.Provider>
    ),
    history,
  }
}

export default undefined
