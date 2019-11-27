import { Election } from '@votingworks/ballot-encoder'

// ElectionGuard
export interface BallotEncryptionConfig {
  subgroupOrder: string
  electionMetadata: string
  jointPublicKey: string
}

export interface ElectionGuardConfig extends BallotEncryptionConfig {
  numberOfSelections: number
  numberOfTrustees: number
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
  setUserSettings: (partial: PartialUserSettings) => void
  userSettings: UserSettings
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
