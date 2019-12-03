import React from 'react'
import { Route } from 'react-router-dom'

import { render } from '../../test/testUtils'

import KeyDistributionPage from './KeyDistributionPage'

it('renders KeyDistributionPage', async () => {
  const { container } = render(
    <Route path="/" component={KeyDistributionPage} />,
    {
      route: '/',
    }
  )
  expect(container.firstChild).toMatchSnapshot()
})
