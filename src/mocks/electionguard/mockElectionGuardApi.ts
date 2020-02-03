import fetchMock, { MockOptionsMethodPost } from 'fetch-mock'
import createElectionResponse from './responses/create_election_response.json'
import recordBallotsResponse from './responses/record_ballots_response.json'
import tallyVotesResponse from './responses/tally_votes_response.json'
import { ElectionGuardConfig } from '../../electionguard'

const removeNumberValues = (object: { [key: string]: string }, max: number) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in Object.keys(object)) {
    if (((key as unknown) as number) >= max) {
      // eslint-disable-next-line no-param-reassign
      delete object[key]
    }
  }
  return object
}

export const mockElectionGuardApi = () => {
  fetchMock.post('/electionguard', (url, options: MockOptionsMethodPost) => {
    const request = JSON.parse((options.body as unknown) as string)
    const config = request.config as ElectionGuardConfig
    createElectionResponse.electionGuardConfig.numberOfTrustees =
      config.numberOfTrustees
    createElectionResponse.electionGuardConfig.threshold = config.threshold
    const newKeys = removeNumberValues(
      createElectionResponse.trusteeKeys,
      config.numberOfTrustees
    )
    return JSON.stringify({ ...createElectionResponse, trusteeKeys: newKeys })
  })

  fetchMock.post('/electionguard/RecordBallots', () => {
    return JSON.stringify(recordBallotsResponse)
  })

  fetchMock.post('/electionguard/TallyVotes', () => {
    return JSON.stringify(tallyVotesResponse)
  })
}

export default mockElectionGuardApi
