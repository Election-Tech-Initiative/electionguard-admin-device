import React from 'react'
import Button from './Button'

interface Props {
  id: number
  claimed: boolean
  onClaim: (id: number) => void
}

// enum ClaimStatus {
//   Error = 'Error',
//   Claimed = 'Claimed',
//   Unclaimed = 'Unclaimed',
// }

// const getClaimStatus = (claimed: boolean): ClaimStatus => {
//   return claimed ? ClaimStatus.Claimed : ClaimStatus.Unclaimed
// }

const KeyClaimer = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        id={`button-${props.id}`}
        onPress={() => props.onClaim(props.id)}
        disabled={props.claimed}
      >
        Claim
      </Button>
    </div>
  )
}

export default KeyClaimer
