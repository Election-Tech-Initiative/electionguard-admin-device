// Voting Works Tally format
export interface WriteInCandidateTally {
  name: string
  tally: number
}
export type TallyCount = number

export interface CandidateVoteTally {
  candidates: TallyCount[]
  writeIns: WriteInCandidateTally[]
}

export interface YesNoVoteTally {
  yes: TallyCount
  no: TallyCount
}

export type Tally = (CandidateVoteTally | YesNoVoteTally)[]
