import { Election } from '@votingworks/ballot-encoder'
import {
  ElectionGuardConfig,
  ElectionMap,
  CreateElectionRequest,
  CreateElectionResponse,
  RecordBallotsRequest,
  RecordBallotsResponse,
  TallyVotesRequest,
  TallyVoteResponse,
} from '../models'
import fetchJSON from './fetchJSON'
import { KeyMap } from '../models/KeyMap'
import * as GLOBAL from '../../config/globals'

export const DEFAULT_BALLOT_EXPORT_PATH = `.${GLOBAL.PATH_DELIMITER}election_results/ballots`
export const DEFAULT_BALLOT_EXPORT_PREFIX = 'my_election_ballots'
export const DEFAULT_TALLY_EXPORT_PATH = '~/election_results/tallies'
export const DEFAULT_TALLY_EXPORT_PREFIX = 'my_election_tallies'

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

const recordBallots = (
  electionGuardConfig: ElectionGuardConfig,
  encryptedBallots: string[] = [],
  castBallotIndicies: string[] = [],
  spoiledBallotIndicies: string[] = [],
  exportPath: string = DEFAULT_BALLOT_EXPORT_PATH,
  exportFileNamePrefix: string = DEFAULT_BALLOT_EXPORT_PREFIX
) => {
  return fetchJSON<RecordBallotsResponse>('/election/RecordBallots', {
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
