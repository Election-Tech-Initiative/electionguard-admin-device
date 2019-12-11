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

import {
  TextSizeSetting,
  ElectionGuardConfig,
  TrusteeKeyVault,
  EncrypterStore,
  ElectionGuardStatus,
} from '../src/config/types'

import ElectionContext from '../src/contexts/electionContext'

export function render(
  component: React.ReactNode,
  {
    route = '/',
    election = electionSampleNoSeal,
    createElection = jest.fn(),
    electionGuardStatus = ElectionGuardStatus.KeyCeremony,
    setElectionGuardStatus = jest.fn(),
    history = createMemoryHistory({ initialEntries: [] }),
    resetElection = jest.fn(),
    electionGuardConfig = {} as ElectionGuardConfig,
    setNumberOfTrustees = jest.fn(),
    setThreshold = jest.fn(),
    setElectionGuardConfig = jest.fn(),
    keyVault = {} as TrusteeKeyVault,
    claimTrusteeKey = jest.fn(),
    encrypterStore = {} as EncrypterStore,
    setNumberOfEncrypters = jest.fn(),
    setEncrypterStore = jest.fn(),
    claimEncrypterDrive = jest.fn(),
    userSettings = { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
    setUserSettings = jest.fn(),
  } = {}
) {
  return {
    ...testRender(
      <ElectionContext.Provider
        value={{
          election: election as Election,
          createElection,
          electionGuardStatus,
          resetElection,
          setElectionGuardStatus,
          electionGuardConfig,
          setNumberOfTrustees,
          setThreshold,
          setElectionGuardConfig,
          keyVault,
          claimTrusteeKey,
          encrypterStore,
          setNumberOfEncrypters,
          setEncrypterStore,
          claimEncrypterDrive,
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
      </ElectionContext.Provider>
    ),
    history,
  }
}

export default undefined
