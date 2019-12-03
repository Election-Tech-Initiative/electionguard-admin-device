import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import StartPage from '../pages/StartPage'
import SetupTrusteesPage from '../pages/SetupTrusteesPage'
import KeyDistributionPage from '../pages/KeyDistributionPage'
import InsertCardScreen from '../pages/InsertCardScreen'
import SaveCardScreen from '../pages/SaveCardScreen'
import RemoveCardScreen from '../pages/RemoveCardScreen'
import SetupEncryptersPage from '../pages/SetupEncryptersPage'
import EncrypterDistributionPage from '../pages/EncrypterDistributionPage'
import InsertDriveScreen from '../pages/InsertDriveScreen'
import SaveDriveScreen from '../pages/SaveDriveScreen'
import RemoveDriveScreen from '../pages/RemoveDriveScreen'
import ElectionReadyPage from '../pages/ElectionReadyPage'
import TallyPage from '../pages/TallyPage'
import NotFoundPage from '../pages/NotFoundPage'

const Layout = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/start" />
      <Redirect exact path="/index.html" to="/start" />
      <Route path="/start" exact component={StartPage} />
      {/* Key Ceremony */}
      <Route path="/setup-keys" exact component={SetupTrusteesPage} />
      <Route path="/keys" exact component={KeyDistributionPage} />
      <Route path="/keys/:trusteeId" component={InsertCardScreen} />
      <Route path="/key/save" exact component={SaveCardScreen} />
      <Route path="/key/remove" exact component={RemoveCardScreen} />
      <Route path="/setup-encrypters" exact component={SetupEncryptersPage} />
      <Route path="/encrypters" exact component={EncrypterDistributionPage} />
      <Route
        path="/encrypters/:encrypterId"
        exact
        component={InsertDriveScreen}
      />
      <Route path="/encrypter/save" exact component={SaveDriveScreen} />
      <Route path="/encrypter/remove" exact component={RemoveDriveScreen} />
      <Route path="/ready" exact component={ElectionReadyPage} />
      {/* Tally Vote */}
      <Route path="/tally" exact component={TallyPage} />
      <Route path="/:path" component={NotFoundPage} />
    </Switch>
  )
}

export default Layout
