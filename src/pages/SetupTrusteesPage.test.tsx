import React from 'react'
import { Route } from 'react-router-dom'

import { render } from '../../test/testUtils'

import SetupTrusteesPage from './SetupTrusteesPage'

it('renders SetupElectionPage', async () => {
  const { container } = render(
    <Route path="/" component={SetupTrusteesPage} />,
    {
      route: '/',
    }
  )
  expect(container.firstChild).toMatchSnapshot()
})
