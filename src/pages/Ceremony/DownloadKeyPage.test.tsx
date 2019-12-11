import React from 'react'
import { Route } from 'react-router-dom'

import { render } from '../../../test/testUtils'

import DownloadKeyPage from './DownloadKeyPage'

it('renders DownloadKeyPage', async () => {
  const { container } = render(<Route path="/" component={DownloadKeyPage} />, {
    route: '/',
  })
  expect(container.firstChild).toMatchSnapshot()
})
