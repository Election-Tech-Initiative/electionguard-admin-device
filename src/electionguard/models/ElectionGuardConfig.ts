export interface ElectionGuardConfig {
  numberOfSelections: number
  numberOfTrustees: number
  threshold: number
  numberOfEncrypters: number
  subgroupOrder: string
  electionMetadata: string
  jointPublicKey: string
}
