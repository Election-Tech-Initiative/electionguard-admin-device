import { Election } from '@votingworks/ballot-encoder'

// ElectionGuard
export enum ElectionGuardStatus {
  Error = -1,
  KeyCeremony = 0,
  TallyVotes = 1,
  Complete = 2,
}

export enum ClaimStatus {
  Error = -1,
  Unclaimed = 0,
  Claimed = 1,
}

export interface ElectionGuardConfig {
  numberOfSelections: number
  numberOfTrustees: number
  threshold: number
  numberOfEncrypters: number
  subgroupOrder: string
  electionMetadata: string
  jointPublicKey: string
}

export interface TrusteeKeyVault {
  [trusteeId: string]: TrusteeKey
}

export interface TrusteeKey {
  id: string
  data: string
  status: ClaimStatus
}

export interface EncrypterStore {
  [encrypterId: string]: Encrypter
}

export interface Encrypter {
  id: string
  data: string
  status: ClaimStatus
}

// Generic
export type VoidFunction = () => void

// Events
export type EventTargetFunction = (event: React.FormEvent<EventTarget>) => void

// Votes
export interface WriteInCandidateTally {
  name: string
  tally: number
}
export type TallyCount = number
export interface CandidateVoteTally {
  candidates: TallyCount[]
  writeIns: WriteInCandidateTally[]
}
export interface YesNoVoteTally {
  yes: TallyCount
  no: TallyCount
}
export type Tally = (CandidateVoteTally | YesNoVoteTally)[]

// ElectionContext
export interface ElectionContextInterface {
  readonly election: Election
  resetElection: (path?: string) => void
  electionGuardStatus: ElectionGuardStatus
  setElectionGuardStatus: (status: ElectionGuardStatus) => void
  electionGuardConfig: ElectionGuardConfig
  setNumberOfTrustees: (numberOfTrustees: number) => void
  setThreshold: (threshold: number) => void
  setElectionGuardConfig: (electionGuardConfig: ElectionGuardConfig) => void
  keyVault: TrusteeKeyVault
  setKeyVault: (keyVault: TrusteeKeyVault) => void
  claimTrusteeKey: (trusteeId: string) => void
  encrypterStore: EncrypterStore
  setNumberOfEncrypters: (numberOfEncrypters: number) => void
  setEncrypterStore: (encrypterStore: EncrypterStore) => void
  claimEncrypterDrive: (encrypterId: string) => void
  userSettings: UserSettings
  setUserSettings: (partial: PartialUserSettings) => void
}

export type OptionalElection = Election | undefined

// Smart Card Content
export type CardDataTypes = 'voter' | 'pollworker' | 'clerk'
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

export default {}
