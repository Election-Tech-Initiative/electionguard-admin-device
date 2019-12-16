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
  ElectionGuardStatus,
  OptionalElection,
} from './config/types'

import { ElectionGuardConfig, ElectionMap } from './electionguard'

import Layout from './pages/Layout'
import AdminContext from './contexts/adminContext'

import FocusManager from './components/FocusManager'
import SmartcardManager from './components/SmartcardManager'
import UsbManager from './components/UsbManager'

interface State {
  election: OptionalElection
  electionMap: ElectionMap
  electionGuardStatus: ElectionGuardStatus
  electionGuardConfig: ElectionGuardConfig
  loadingElection: boolean
  userSettings: UserSettings
}

export const electionKey = 'election'

const initialState = {
  election: undefined,
  electionMap: (undefined as unknown) as ElectionMap,
  electionGuardStatus: ElectionGuardStatus.KeyCeremony,
  electionGuardConfig: (undefined as unknown) as ElectionGuardConfig,
  loadingElection: false,
  userSettings: { textSize: GLOBALS.TEXT_SIZE as TextSizeSetting },
}

export class App extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = initialState
  }

  public componentDidMount = () => {
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

  public setElectionMap = (electionMap: ElectionMap) => {
    this.setState({ electionMap })
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
      electionMap,
      electionGuardConfig,
      userSettings,
      electionGuardStatus,
    } = this.state
    return (
      <AdminContext.Provider
        value={{
          election: election as Election,
          setElection: this.setElection,
          resetElection: this.resetElection,
          electionMap,
          setElectionMap: this.setElectionMap,
          electionGuardStatus,
          setElectionGuardStatus: this.setElectionGuardStatus,
          electionGuardConfig,
          setElectionGuardConfig: this.setElectionGuardConfig,
          setUserSettings: this.setUserSettings,
          userSettings,
        }}
      >
        <SmartcardManager>
          <UsbManager>
            <Layout />
          </UsbManager>
        </SmartcardManager>
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
