import { Contest } from '@votingworks/ballot-encoder'

export interface ElectionMap {
  numberOfSelections: number
  contestMaps: Map<string, ContestMap>
  ballotStyleMaps: Map<string, BallotStyleMap>
}

export interface BallotStyleMap {
  expectedNumberOfSelected: number
  contestMaps: Map<string, ContestMap>
}

export interface ContestMap {
  contest: Contest // TODO Change to id reference
  selectionMap: Map<string, number>
  numberOfSelections: number
  expectedNumberOfSelected: number
  startIndex: number
  endIndex: number
  writeInStartIndex: number
  nullVoteStartIndex: number
}
