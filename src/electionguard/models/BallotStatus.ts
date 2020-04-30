import { CsvAsJson } from './CsvAsJson'

export interface BallotStatus {
  trackingId: string
  status: number
  approximateCastTime: string
  location: string
}

export interface BallotStatusesFile extends CsvAsJson {
  data: BallotStatus[]
}
