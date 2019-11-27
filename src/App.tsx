import React from 'react'
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'

import { Election, OptionalElection } from '@votingworks/ballot-encoder'

import * as GLOBALS from './config/globals'

import 'normalize.css'
import './App.css'

import {
  PartialUserSettings,
  TextSizeSetting,
  UserSettings,
} from './config/types'

import Layout from './components/Layout'
import ElectionContext from './contexts/electionContext'

import electionSample from './data/electionSampleWithSeal.json'
import FocusManager from './components/FocusManager'

interface State {
  election: OptionalElection
  loadingElection: boolean
  userSettings: UserSettings
}

export const electionKey = 'election'

const initialState = {
  election: undefined,
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

  public setDocumentFontSize = (textSize: number = GLOBALS.TEXT_SIZE) => {
    document.documentElement.style.fontSize = `${GLOBALS.FONT_SIZES[textSize]}px`
  }

  public render() {
    const { election } = this.state
    return (
      <ElectionContext.Provider
        value={{
          election: election as Election,
          resetElection: this.resetElection,
          setUserSettings: this.setUserSettings,
          userSettings: this.state.userSettings,
        }}
      >
        <Layout />
      </ElectionContext.Provider>
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
