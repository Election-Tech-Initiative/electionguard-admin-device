import {
  Election,
  Party,
  YesNoContest,
  CandidateContest,
} from '@votingworks/ballot-encoder'
import { BallotStatus } from '../models/BallotStatus'
import { ElectionResult } from '../models/ElectionResult'
import { Tally, YesNoVoteTally, CandidateVoteTally } from '../models'

const approximateCastTime = process.env.REACT_APP_POLLING_DATE || '01/01/2020'
const location = process.env.REACT_APP_POLLING_LOCATION || 'Location'
const seperator = '|'
const newLine = '\n'

const exportCsv = (csvFile: string): string => {
  return `data:text/csv;charset=utf-8,${csvFile}`
}

const trackerToRow = (ballotStatus: BallotStatus) => {
  return `${ballotStatus.trackingId}${seperator}${ballotStatus.approximateCastTime}${seperator}${ballotStatus.location}`
}

export const exportTrackerCsv = (trackers: string[]): string => {
  const statuses: BallotStatus[] = trackers.map(
    (tracker: string): BallotStatus => ({
      trackingId: tracker,
      approximateCastTime,
      location,
    })
  )
  const rows = statuses.map(status => trackerToRow(status)).join(newLine)
  return exportCsv(rows)
}

const resultToRow = (result: ElectionResult) => {
  return `${result.contestId}${seperator}${result.contestTitle}${seperator}${result.selectionId}${seperator}${result.selectionName}${seperator}${result.party}${seperator}${result.voteCount}`
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
): string => {
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
    switch (contest.type) {
      case 'candidate':
        results.push(
          ...getCandidateLines(
            contest as CandidateContest,
            tally[index] as CandidateVoteTally,
            parties
          )
        )
        break
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
  const rows = results.map(result => resultToRow(result)).join(newLine)
  return exportCsv(rows)
}
