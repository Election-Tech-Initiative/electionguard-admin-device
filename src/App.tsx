import React from 'react'
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'

import { Election } from '@votingworks/ballot-encoder'

import * as GLOBALS from './config/globals'
import * as eletionUtils from './utils/election'

import 'normalize.css'
import './App.css'

import {
  PartialUserSettings,
  TextSizeSetting,
  UserSettings,
  ElectionGuardConfig,
  EncrypterStore,
  TrusteeKeyVault,
  ClaimStatus,
  ElectionGuardStatus,
  TrusteeKey,
  OptionalElection,
} from './config/types'

import Layout from './components/Layout'
import ElectionContext from './contexts/electionContext'

import electionSample from './data/electionPrimarySample.json'
import FocusManager from './components/FocusManager'

interface State {
  election: OptionalElection
  electionGuardStatus: ElectionGuardStatus
  electionGuardConfig: ElectionGuardConfig
  keyVault: TrusteeKeyVault
  encrypterStore: EncrypterStore
  loadingElection: boolean
  userSettings: UserSettings
}

export const electionKey = 'election'

const initialState = {
  election: undefined,
  electionGuardConfig: {
    electionMetadata: '',
  } as ElectionGuardConfig,
  keyVault: {} as TrusteeKeyVault,
  encrypterStore: {} as EncrypterStore,
  electionGuardStatus: ElectionGuardStatus.KeyCeremony,
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

  public setEncrypterStore = (encrypterStore: EncrypterStore) => {
    this.setState({ encrypterStore })
  }

  public setNumberOfTrustees = (numberOfTrustees: number) => {
    this.setState(prevState => ({
      electionGuardConfig: {
        ...prevState.electionGuardConfig,
        numberOfTrustees,
      },
    }))
  }

  public setThreshold = (threshold: number) => {
    this.setState(prevState => ({
      electionGuardConfig: {
        ...prevState.electionGuardConfig,
        threshold,
      },
    }))
  }

  public setNumberOfEncrypters = (numberOfEncrypters: number) => {
    this.setState(prevState => ({
      electionGuardConfig: {
        ...prevState.electionGuardConfig,
        numberOfEncrypters,
      },
    }))
  }

  public claimTrusteeKey = (trusteeId: string) => {
    this.setState(prevState => ({
      keyVault: {
        ...prevState.keyVault,
        [trusteeId]: {
          ...prevState.keyVault[trusteeId],
          status: ClaimStatus.Claimed,
        },
      },
    }))
  }

  public claimEncrypterDrive = (encrypterId: string) => {
    this.setState(prevState => ({
      encrypterStore: {
        ...prevState.encrypterStore,
        [encrypterId]: {
          ...prevState.encrypterStore[encrypterId],
          status: ClaimStatus.Claimed,
        },
      },
    }))
  }

  public setElectionGuardStatus = (status: ElectionGuardStatus) => {
    this.setState({
      electionGuardStatus: status,
    })
  }

  public setDocumentFontSize = (textSize: number = GLOBALS.TEXT_SIZE) => {
    document.documentElement.style.fontSize = `${GLOBALS.FONT_SIZES[textSize]}px`
  }

  public createElection = async () => {
    try {
      const {
        electionGuardConfig,
        trusteeKeys,
      } = await eletionUtils.createElection(this.state)
      const updatedTrusteeKeys = {} as TrusteeKeyVault
      Object.keys(trusteeKeys).forEach(keyId => {
        const keyValue = trusteeKeys[keyId]
        updatedTrusteeKeys[keyId] = {
          id: keyId,
          data: keyValue,
          status: ClaimStatus.Unclaimed,
        } as TrusteeKey
      })

      this.setState({
        keyVault: updatedTrusteeKeys,
        electionGuardConfig,
      })
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  }

  public render() {
    const {
      election,
      electionGuardConfig,
      keyVault,
      encrypterStore,
      userSettings,
      electionGuardStatus,
    } = this.state
    return (
      <ElectionContext.Provider
        value={{
          election: election as Election,
          createElection: this.createElection,
          resetElection: this.resetElection,
          electionGuardStatus,
          setElectionGuardStatus: this.setElectionGuardStatus,
          electionGuardConfig,
          setNumberOfTrustees: this.setNumberOfTrustees,
          setThreshold: this.setThreshold,
          setElectionGuardConfig: this.setElectionGuardConfig,
          keyVault,
          claimTrusteeKey: this.claimTrusteeKey,
          encrypterStore,
          setNumberOfEncrypters: this.setNumberOfEncrypters,
          setEncrypterStore: this.setEncrypterStore,
          claimEncrypterDrive: this.claimEncrypterDrive,
          setUserSettings: this.setUserSettings,
          userSettings,
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
