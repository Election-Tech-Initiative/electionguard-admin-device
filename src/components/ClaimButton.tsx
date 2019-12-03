import React, { PointerEventHandler } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import Button, { ButtonInterface } from './Button'
import { ClaimStatus } from '../config/types'

interface Props
  extends ButtonInterface,
    RouteComponentProps<{}>,
    React.PropsWithoutRef<JSX.IntrinsicElements['button']> {}

interface Props {
  claimId: string
  status: ClaimStatus
  to?: string
}

const KeyClaimer = (props: Props) => {
  const { history, status } = props
  const handlePress: PointerEventHandler = () => {
    if (props.status !== ClaimStatus.Claimed) {
      history.push(`${props.to}/${props.claimId}`)
    }
  }

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
        id={`button-${props.claimId}`}
        onPress={handlePress}
        primary={props.status === ClaimStatus.Claimed}
      >
        {ClaimStatus[status]}
      </Button>
    </div>
  )
}

export default withRouter(KeyClaimer)
