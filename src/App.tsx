import React from 'react'
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'

import { Election } from '@votingworks/ballot-encoder'

import * as GLOBALS from './config/globals'

import 'normalize.css'
import './App.css'

import {
  PartialUserSettings,
  TextSizeSetting,
  UserSettings,
  ElectionGuardConfig,
  ElectionGuardStatus,
  OptionalElection,
} from './config/types'

import Layout from './pages/Layout'
import AdminContext from './contexts/adminContext'

import electionSample from './data/electionSample.json'
import FocusManager from './components/FocusManager'

interface State {
  election: OptionalElection
  electionGuardStatus: ElectionGuardStatus
  electionGuardConfig: ElectionGuardConfig
  electionMapping: any
  loadingElection: boolean
  userSettings: UserSettings
}

export const electionKey = 'election'

const initialState = {
  election: undefined,
  electionGuardStatus: ElectionGuardStatus.KeyCeremony,
  electionGuardConfig: {} as ElectionGuardConfig,
  electionMapping: {},
  loadingElection: false,
  userSettings: { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
}

export class App extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = initialState
  }

  public componentDidMount = () => {
    this.setElection(electionSample as Election)
    document.documentElement.setAttribute('data-useragent', navigator.userAgent)
    this.setDocumentFontSize()
  }

  public componentDidCatch() {
    this.reset()
    window.location.reload()
  }

  public reset = /* istanbul ignore next - triggering keystrokes issue - https://github.com/votingworks/bmd/issues/62 */ () => {
    this.setState(initialState)
    window.localStorage.removeItem(electionKey)
    this.props.history.push('/')
  }

  public resetElection = (path = '/') => {
    this.setState(
      {
        ...initialState,
        election: this.getElection(),
      },
      () => {
        this.props.history.push(path)
      }
    )
  }

  public getElection = (): OptionalElection => {
    const election = window.localStorage.getItem(electionKey)
    return election
      ? JSON.parse(election)
      : ((undefined as unknown) as Election)
  }

  public setElection = (electionConfigFile: Election) => {
    const election = electionConfigFile
    this.setState({ election })
    window.localStorage.setItem(electionKey, JSON.stringify(election))
  }

  public setUserSettings = (partial: PartialUserSettings) => {
    this.setState(
      prevState => ({
        userSettings: { ...prevState.userSettings, ...partial },
      }),
      () => {
        const { textSize } = partial
        const isValidTextSize =
          'textSize' in partial &&
          typeof textSize === 'number' &&
          textSize >= 0 &&
          textSize <= GLOBALS.FONT_SIZES.length - 1
        /* istanbul ignore else */
        if (isValidTextSize) {
          this.setDocumentFontSize(textSize!)
        }
      }
    )
  }

  public setElectionGuardConfig = (
    electionGuardConfig: ElectionGuardConfig
  ) => {
    this.setState({ electionGuardConfig })
  }

  public setElectionGuardStatus = (status: ElectionGuardStatus) => {
    this.setState({
      electionGuardStatus: status,
    })
  }

  public setDocumentFontSize = (textSize: number = GLOBALS.TEXT_SIZE) => {
    document.documentElement.style.fontSize = `${GLOBALS.FONT_SIZES[textSize]}px`
  }

  public render() {
    const {
      election,
      electionGuardConfig,
      userSettings,
      electionMapping,
      electionGuardStatus,
    } = this.state
    return (
      <AdminContext.Provider
        value={{
          election: election as Election,
          resetElection: this.resetElection,
          electionGuardStatus,
          setElectionGuardStatus: this.setElectionGuardStatus,
          electionGuardConfig,
          setElectionGuardConfig: this.setElectionGuardConfig,
          electionMapping,
          setElectionMapping: () => {},
          setUserSettings: this.setUserSettings,
          userSettings,
        }}
      >
        <Layout />
      </AdminContext.Provider>
    )
  }
}

const Root = () => (
  <BrowserRouter>
    <FocusManager>
      <Route path="/" component={App} />
    </FocusManager>
  </BrowserRouter>
)

export default Root
