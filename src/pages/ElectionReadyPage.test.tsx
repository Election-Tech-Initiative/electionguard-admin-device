import React from 'react'
import { Route } from 'react-router-dom'

import { render } from '../../test/testUtils'

import ElectionReadyPage from './ElectionReadyPage'

it('renders ElectionReadyPage', async () => {
  const { container } = render(
    <Route path="/" component={ElectionReadyPage} />,
    {
      route: '/',
    }
  )
  expect(container.firstChild).toMatchSnapshot()
})
