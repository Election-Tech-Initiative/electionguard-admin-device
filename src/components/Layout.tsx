import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import StartPage from '../pages/StartPage'
import SetupTrusteesPage from '../pages/SetupTrusteesPage'
import SetupEncryptersPage from '../pages/SetupEncryptersPage'
import KeyDistributionPage from '../pages/KeyDistributionPage'
import TallyPage from '../pages/TallyPage'
import NotFoundPage from '../pages/NotFoundPage'
import ElectionReadyPage from '../pages/ElectionReadyPage'

const Layout = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/start" />
      <Redirect exact path="/index.html" to="/start" />
      <Route path="/start" exact component={StartPage} />
      <Route path="/setup" exact component={SetupTrusteesPage} />
      <Route path="/encrypters" exact component={SetupEncryptersPage} />
      <Route path="/keys" exact component={KeyDistributionPage} />
      <Route path="/ready" exact component={ElectionReadyPage} />
      <Route path="/tally" exact component={TallyPage} />
      <Route path="/:path" component={NotFoundPage} />
    </Switch>
  )
}

export default Layout
