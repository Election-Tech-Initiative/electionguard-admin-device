import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import { render as testRender } from '@testing-library/react'

import GLOBALS from '../src/config/globals'

// it's necessary to use the no-seal version, which has neither
// of the two optional seal fields, because otherwise
// typescript concludes that sealURL is required.
import electionSampleNoSeal from '../src/data/electionSampleNoSeal.json'

import { Election, TextSizeSetting } from '../src/config/types'

import { mergeWithDefaults } from '../src/App'
import ElectionContext from '../src/contexts/electionContext'

export function render(
  component: React.ReactNode,
  {
    route = '/',
    election = electionSampleNoSeal,
    history = createMemoryHistory({ initialEntries: [] }),
    resetElection = jest.fn(),
    setUserSettings = jest.fn(),
    userSettings = { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
  } = {}
) {
  return {
    ...testRender(
      <ElectionContext.Provider
        value={{
          election: mergeWithDefaults(election as Election),
          resetElection,
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
