import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import AdminContext from '../contexts/adminContext'
import CeremonyLayout from './Ceremony/CeremonyLayout'
import TallyLayout from './Tally/TallyLayout'

import StartPage from './StartPage'
import NotFoundPage from './NotFoundPage'
import { ElectionGuardStatus } from '../electionguard'

const Layout = () => {
  const { electionGuardStatus } = useContext(AdminContext)
  const getLayout = () => {
    switch (electionGuardStatus) {
      case ElectionGuardStatus.KeyCeremony:
        return CeremonyLayout
      case ElectionGuardStatus.TallyVotes:
      case ElectionGuardStatus.Complete:
        return TallyLayout
      default:
        return NotFoundPage
    }
  }

  return (
    <Switch>
      <Redirect exact path="/" to="/start" />
      <Redirect exact path="/index.html" to="/start" />
      <Route path="/start" exact component={StartPage} />
      <Route path="/:path" component={getLayout()} />
    </Switch>
  )
}

export default Layout
