import React from 'react'
import { Route } from 'react-router-dom'

import { render } from '../../test/testUtils'

import SetupElectionPage from './SetupElectionPage'

it('renders SetupElectionPage', async () => {
  const { container } = render(
    <Route path="/" component={SetupElectionPage} />,
    {
      route: '/',
    }
  )
  expect(container.firstChild).toMatchSnapshot()
})
