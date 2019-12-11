import React from 'react'
import { Route } from 'react-router-dom'

import { render } from '../../../test/testUtils'

import TallyPage from './TallyPage'

it('renders TallyPage', async () => {
  const { container } = render(<Route path="/" component={TallyPage} />, {
    route: '/',
  })
  expect(container.firstChild).toMatchSnapshot()
})
