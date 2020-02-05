import {
  Election,
  Party,
  YesNoContest,
  CandidateContest,
} from '@votingworks/ballot-encoder'
import { BallotStatus, BallotStatusesFile } from '../models/BallotStatus'
import { ElectionResult, ElectionResultsFile } from '../models/ElectionResult'
import { Tally, YesNoVoteTally, CandidateVoteTally } from '../models'
import { Json2CsvOptions } from '../models/CsvAsJson'

const approximateCastTime = process.env.REACT_APP_POLLING_DATE || '01/01/2020'
const location = process.env.REACT_APP_POLLING_LOCATION || 'Location'

const defaultCsvOptions: Json2CsvOptions = {
  fields: [],
  delimiter: '|',
  quote: '', // Removes quotes
  header: false,
}

export const exportTrackerCsv = (trackers: string[]): BallotStatusesFile => {
  const statuses: BallotStatus[] = trackers.map(
    (tracker: string): BallotStatus => ({
      trackingId: tracker,
      approximateCastTime,
      location,
    })
  )
  return {
    options: {
      ...defaultCsvOptions,
      fields: ['trackingId', 'approximateCastTime', 'location'],
    },
    data: statuses,
  }
}

const getCandidateLines = (
  contest: CandidateContest,
  tally: CandidateVoteTally,
  parties: { [id: string]: Party }
): ElectionResult[] => {
  const line = {
    contestId: contest.id,
    contestTitle: contest.title,
  } as ElectionResult
  const results: ElectionResult[] = contest.candidates.map(
    (candidate, index) => ({
      ...line,
      selectionId: candidate.id,
      selectionName: candidate.name,
      voteCount: tally.candidates[index],
      party:
        candidate.partyId && parties[candidate.partyId]
          ? parties[candidate.partyId].name
          : '',
    })
  )
  if (contest.allowWriteIns) {
    results.push({
      ...line,
      selectionId: 'write-ins',
      selectionName: tally.writeIns[0].name,
      party: '',
      voteCount: tally.writeIns[0].tally,
    })
  }
  return results
}

const getYesNoLines = (
  contest: YesNoContest,
  tally: YesNoVoteTally
): ElectionResult[] => {
  const line = {
    contestId: contest.id,
    contestTitle: contest.title,
    party: '',
  } as ElectionResult
  return [
    {
      ...line,
      selectionId: 'yes',
      selectionName: 'Yes',
      voteCount: tally.yes,
    },
    {
      ...line,
      selectionId: 'no',
      selectionName: 'No',
      party: '',
    },
  ]
}

export const exportElectionResultsCsv = (
  tally: Tally,
  election: Election
): ElectionResultsFile => {
  const parties = election.parties.reduce(
    (dictionary: { [id: string]: Party }, party: Party) => {
      // eslint-disable-next-line no-param-reassign
      dictionary[party.id] = party
      return dictionary
    },
    {}
  )
  const results: ElectionResult[] = []
  election.contests.forEach((contest, index) => {
    const contestType = contest.type.toString().toLowerCase()
    switch (contestType) {
      case '1':
      case 'candidate':
        results.push(
          ...getCandidateLines(
            contest as CandidateContest,
            tally[index] as CandidateVoteTally,
            parties
          )
        )
        break
      case '2':
      case 'yesno':
        results.push(
          ...getYesNoLines(
            contest as YesNoContest,
            tally[index] as YesNoVoteTally
          )
        )
        break
      default:
        break
    }
  })

  return {
    options: {
      ...defaultCsvOptions,
      fields: [
        'contestId',
        'contestTitle',
        'selectionId',
        'selectionName',
        'party',
        'voteCount',
      ],
    },
    data: results,
  }
}
