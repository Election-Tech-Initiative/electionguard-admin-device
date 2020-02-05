import { Tally } from './Tally'

export interface TallyVoteResponse {
  encryptedTallyFilename: string
  tallyResults: Tally
}
