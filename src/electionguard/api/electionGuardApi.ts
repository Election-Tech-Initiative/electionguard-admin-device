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
// todfo follow the pattern above
import { InitializeEncryptionResponse } from '../models/InitializeEncryptionResponse'
import { InitializeEncryptionRequest } from '../models/InitializeEncryptionRequest'
import { LoadBallotsRequest } from '../models/LoadBallotsRequest'
import { LoadBallotsResponse } from '../models/LoadBallotsResponse'
import { EncryptedBallot } from '../models/EncryptedBallot'

export const DEFAULT_EXPORT_PATH = `.${GLOBAL.PATH_DELIMITER}data${GLOBAL.PATH_DELIMITER}election_results`
export const DEFAULT_ENCRYPTED_BALLOTS_EXPORT_PREFIX = 'encrypted-ballots_'
export const DEFAULT_BALLOT_EXPORT_PATH = `${DEFAULT_EXPORT_PATH}${GLOBAL.PATH_DELIMITER}ballots`
export const DEFAULT_BALLOT_EXPORT_PREFIX = 'registered-ballots'
export const DEFAULT_TALLY_EXPORT_PATH = `${DEFAULT_EXPORT_PATH}${GLOBAL.PATH_DELIMITER}tallies`
export const DEFAULT_TALLY_EXPORT_PREFIX = 'tallies'

const createElection = (
  election: Election,
  electionGuardConfig: ElectionGuardConfig
) => {
  return fetchJSON<CreateElectionResponse>('/electionguard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      election,
      config: electionGuardConfig,
    } as CreateElectionRequest),
  })
}

const initializeEncryption = (
  election: Election,
  electionGuardConfig: ElectionGuardConfig,
  exportPath: string = DEFAULT_EXPORT_PATH,
  exportFileName: string = DEFAULT_ENCRYPTED_BALLOTS_EXPORT_PREFIX
) => {
  return fetchJSON<InitializeEncryptionResponse>(
    '/electionguard/InitializeEncryption',
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        election,
        electionGuardConfig,
        exportPath,
        exportFileName,
      } as InitializeEncryptionRequest),
    }
  )
}

const deleteBallotFile = (path: string, fileName: string) => {
  return fetchJSON<CreateElectionResponse>(
    `/electionguard/BallotFile?path=${path}&fileName=${fileName}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

const loadBallots = (
  startIndex: number,
  count: number,
  importFileName: string,
  electionGuardConfig: ElectionGuardConfig,
  importPath: string
) => {
  return fetchJSON<LoadBallotsResponse>('/electionguard/LoadBallots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startIndex,
      count,
      importFileName,
      electionGuardConfig,
      importPath,
    } as LoadBallotsRequest),
  })
}

const recordBallots = (
  electionGuardConfig: ElectionGuardConfig,
  ballots: EncryptedBallot[] = [],
  castBallotIds: string[] = [],
  spoildBallotIds: string[] = [],
  exportPath: string | undefined = undefined,
  exportFileNamePrefix: string = DEFAULT_BALLOT_EXPORT_PREFIX
) => {
  return fetchJSON<RecordBallotsResponse>('/electionguard/RecordBallots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ballots,
      castBallotIds,
      spoildBallotIds,
      electionGuardConfig,
      exportPath,
      exportFileNamePrefix,
    } as RecordBallotsRequest),
  })
}

const tallyVotes = (
  electionGuardConfig: ElectionGuardConfig,
  electionMap: ElectionMap,
  trusteeKeys: KeyMap,
  registeredBallotsFileName: string,
  exportPath: string | undefined = undefined,
  exportFileNamePrefix: string = DEFAULT_TALLY_EXPORT_PREFIX
) => {
  return fetchJSON<TallyVoteResponse>('/electionguard/TallyVotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      electionGuardConfig,
      electionMap,
      trusteeKeys,
      registeredBallotsFileName,
      exportPath,
      exportFileNamePrefix,
    } as TallyVotesRequest),
  })
}

export const electionGuardApi = {
  createElection,
  initializeEncryption,
  deleteBallotFile,
  loadBallots,
  recordBallots,
  tallyVotes,
}

export default electionGuardApi
