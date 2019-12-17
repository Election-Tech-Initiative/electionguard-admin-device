import { Election } from '@votingworks/ballot-encoder'
import {
  ElectionGuardConfig,
  ElectionMap,
  Tally,
  ElectionGuardStatus,
} from '../electionguard'

// ElectionGuard
export enum CompletionStatus {
  Warning = -2,
  Error = -1,
  Incomplete = 0,
  Complete = 1,
}

export interface TrusteeKeyVault {
  [trusteeId: string]: TrusteeKey
}

export interface TrusteeKey {
  id: string
  data: string
  status: CompletionStatus
}

export const createTrusteeKey = (
  id: string,
  data: string,
  status: CompletionStatus = CompletionStatus.Complete
) => {
  return {
    id,
    data,
    status,
  } as TrusteeKey
}

export interface EncrypterStore {
  [encrypterId: string]: Encrypter
}

export interface Encrypter {
  id: string
  data: string
  status: CompletionStatus
}

export interface SmartcardState {
  isCardConnected: boolean
  isWritingToCard: boolean
}

// Generic
export type VoidFunction = () => void

// Events
export type EventTargetFunction = (event: React.FormEvent<EventTarget>) => void

// Admin Context
export interface AdminContextInterface {
  readonly election: Election
  setElection: (election: Election) => void
  resetElection: (path?: string) => void
  readonly electionMap: ElectionMap
  setElectionMap: (electionMap: ElectionMap) => void
  tally: Tally
  setTally: (tally: Tally) => void
  electionGuardStatus: ElectionGuardStatus
  setElectionGuardStatus: (status: ElectionGuardStatus) => void
  electionGuardConfig: ElectionGuardConfig
  setElectionGuardConfig: (electionGuardConfig: ElectionGuardConfig) => void
  userSettings: UserSettings
  setUserSettings: (partial: PartialUserSettings) => void
}

export interface CeremonyContextInterface {
  numberOfTrustees: number
  setNumberOfTrustees: (numberOfTrustees: number) => void
  threshold: number
  setThreshold: (threshold: number) => void
  keyVault: TrusteeKeyVault
  setKeyVault: (vault: TrusteeKeyVault) => void
  claimTrusteeKey: (id: string) => void
  numberOfEncrypters: number
  setNumberOfEncrypters: (numberOfEncrypters: number) => void
  encrypterStore: EncrypterStore
  setEncrypterStore: (store: EncrypterStore) => void
  claimEncrypterDrive: (id: string) => void
  createElection: () => Promise<void>
}

export interface TallyContextInterface {
  castIds: string[]
  setCastIds: (castIds: string[]) => void
  spoiledIds: string[]
  setSpoiledIds: (spoiledIds: string[]) => void
  encryptedBallots: string[]
  setEncryptedBallots: (encryptedBallots: string[]) => void
  numberOfTrustees: number
  threshold: number
  trustees: TrusteeKey[]
  trusteesDispatch: (action: Action) => void
  announceTrustee: (trustee: TrusteeKey) => void
  recordBallots: () => Promise<void>
  castTrackers: string[]
  spoiledTrackers: string[]
  tallyVotes: () => Promise<void>
}

export interface SmartcardContextInterface {
  isCardConnected: boolean
  isReadingCard: boolean
  isWritingToCard: boolean
  currentCard: CardData
  connect: () => void
  disconnect: () => void
  read: <T extends CardData>() => Promise<T>
  readValue: <T>() => Promise<T>
  write: <T>(data: T) => Promise<void>
}

export interface UsbContextInterface {
  adminDriveConnected: boolean
  storageDriveConnected: boolean
  connect: () => void
  disconnect: () => void
  read: <T>(driveId: number, file: string) => Promise<T>
  write: (
    driveId: number,
    file: string,
    data: object
  ) => Promise<UsbWriteResult>
  eject: (driveId: string) => void
}

export interface UsbWriteResult {
  success: boolean
  message: string
}

export type OptionalElection = Election | undefined

// Smart Card Content
export type CardDataTypes = 'voter' | 'pollworker' | 'clerk' | 'trustee' | 'new'
export interface CardData {
  readonly t: CardDataTypes
}
export interface VoterCardData extends CardData {
  readonly t: 'voter'
  readonly c: number // created date
  readonly bs: string // ballot style id
  readonly pr: string // precinct id
  readonly uz?: number // used (voided)
  readonly bp?: number // ballot printed date
  readonly u?: number // updated date
  readonly m?: string // mark machine id
}
export interface PollworkerCardData extends CardData {
  readonly t: 'pollworker'
  readonly h: string
}
export interface ClerkCardData extends CardData {
  readonly t: 'clerk'
  readonly h: string
}

export interface NewCardData extends CardData {
  readonly t: 'new'
}

export interface TrusteeCardData extends CardData {
  readonly t: 'trustee'
  readonly h: string
}

export interface CardAbsentAPI {
  present: false
}
export interface CardPresentAPI {
  present: true
  shortValue: string
  longValueExists?: boolean
}
export type CardAPI = CardAbsentAPI | CardPresentAPI

// Machine ID API
export interface MachineIdAPI {
  machineId: string
}

// User Interface
export type ScrollDirections = 'up' | 'down'
export interface ScrollShadows {
  showBottomShadow: boolean
  showTopShadow: boolean
}
export interface Scrollable {
  isScrollable: boolean
}

export type TextSizeSetting = 0 | 1 | 2 | 3

export type ValidTrusteeCount = 1 | 2 | 3 | 4 | 5

export interface UserSettings {
  textSize: TextSizeSetting
}
export type SetUserSettings = (partial: PartialUserSettings) => void
export type PartialUserSettings = Partial<UserSettings>

export interface Action {
  type: string
}

export interface SetTrusteesAction extends Action {
  type: 'set-trustees'
  payload: TrusteeKey[]
}

export const setTrusteesAction = (
  trustees: TrusteeKey[]
): SetTrusteesAction => {
  return {
    type: 'set-trustees',
    payload: trustees,
  } as SetTrusteesAction
}

export interface UpdateTrusteeAction extends Action {
  type: 'update-trustee'
  payload: TrusteeKey
}

export const updateTrusteeAction = (
  trustee: TrusteeKey
): UpdateTrusteeAction => {
  return {
    type: 'update-trustee',
    payload: trustee,
  } as UpdateTrusteeAction
}

export interface UpdateTrusteesAction extends Action {
  type: 'update-trustees'
  payload: TrusteeKey[]
}

export const updateTrusteesAction = (
  trustees: TrusteeKey[]
): UpdateTrusteesAction => {
  return {
    type: 'update-trustees',
    payload: trustees,
  } as UpdateTrusteesAction
}

export default {}
