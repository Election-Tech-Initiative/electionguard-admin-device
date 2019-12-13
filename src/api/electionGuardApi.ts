import { Election } from '@votingworks/ballot-encoder'
import {
  ElectionGuardConfig,
  KeyMap,
  ElectionMap,
  Tally,
} from '../config/types'
import fetchJSON from '../utils/fetchJSON'

const DEFAULT_BALLOT_EXPORT_PATH = '~/election_results/ballots'
const DEFAULT_BALLOT_EXPORT_PREFIX = 'my_election_ballots'
const DEFAULT_TALLY_EXPORT_PATH = '~/election_results/tallies'
const DEFAULT_TALLY_EXPORT_PREFIX = 'my_election_tallies'

export interface CreateElectionRequest {
  config: ElectionGuardConfig
  election: Election
}

export interface CreateElectionResponse {
  electionGuardConfig: ElectionGuardConfig
  trusteeKeys: KeyMap
  electionMap: ElectionMap
}

const createElection = (
  election: Election,
  electionGuardConfig: ElectionGuardConfig
) => {
  return fetchJSON<CreateElectionResponse>('/election', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      election,
      config: electionGuardConfig,
    } as CreateElectionRequest),
  })
}

export interface RecordBallotsRequest {
  electionGuardConfig: ElectionGuardConfig
  encryptedBallots: string[]
  castBallotIndicies: string[]
  spoiledBallotIndicies: string[]
  exportPath: string
  exportFileNamePrefix: string
}

export type RecordBallotsResponse = {
  encryptedBallotsFilename: string
  castedBallotTrackers: string[]
  spoiledBallotTrackers: string[]
}

const recordBallots = (
  electionGuardConfig: ElectionGuardConfig,
  encryptedBallots: string[] = [],
  castBallotIndicies: string[] = [],
  spoiledBallotIndicies: string[] = [],
  exportPath: string = DEFAULT_BALLOT_EXPORT_PATH,
  exportFileNamePrefix: string = DEFAULT_BALLOT_EXPORT_PREFIX
) => {
  return fetchJSON<RecordBallotsResponse>('/election', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      electionGuardConfig,
      encryptedBallots,
      castBallotIndicies,
      spoiledBallotIndicies,
      exportPath,
      exportFileNamePrefix,
    } as RecordBallotsRequest),
  })
}

export interface TallyVotesRequest {
  electionGuardConfig: ElectionGuardConfig
  electionMap: ElectionMap
  trusteeKeys: KeyMap
  encryptedBallotsFileName: string
  exportPath: string
  exportFileNamePrefix: string
}

export type TallyVoteResponse = Tally

const tallyVotes = (
  electionGuardConfig: ElectionGuardConfig,
  electionMap: ElectionMap,
  trusteeKeys: KeyMap,
  encryptedBallotsFileName: string,
  exportPath: string = DEFAULT_TALLY_EXPORT_PATH,
  exportFileNamePrefix: string = DEFAULT_TALLY_EXPORT_PREFIX
) => {
  return fetchJSON<TallyVoteResponse>('/election', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      electionGuardConfig,
      electionMap,
      trusteeKeys,
      encryptedBallotsFileName,
      exportPath,
      exportFileNamePrefix,
    } as TallyVotesRequest),
  })
}

export const electionGuardApi = {
  createElection,
  recordBallots,
  tallyVotes,
}

export default electionGuardApi
