import React from 'react'
import { Route } from 'react-router-dom'
import { fireEvent } from '@testing-library/react'

import { render } from '../../test/testUtils'

import NotFoundPage from './NotFoundPage'

it('renders NotFoundPage', () => {
  const resetElection = jest.fn()
  const { container, getByText } = render(
    <Route path="/" component={NotFoundPage} />,
    {
      resetElection,
      route: '/foobar-not-found-path',
    }
  )
  expect(container.firstChild).toMatchSnapshot()
  fireEvent.click(getByText('Return to Start'))
  expect(resetElection).toHaveBeenCalled()
})
