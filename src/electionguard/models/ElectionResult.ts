import { CsvAsJson } from './CsvAsJson'

export interface ElectionResult {
  contestId: string
  contestTitle: string
  selectionId: string
  selectionName: string
  party: string
  voteCount: number
}

export interface ElectionResultsFile extends CsvAsJson {
  data: ElectionResult[]
}
