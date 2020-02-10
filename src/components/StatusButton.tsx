import React, { PointerEventHandler } from 'react'
import styled from 'styled-components'
import Button, { ButtonInterface } from './Button'
import { CompletionStatus } from '../config/types'

interface Props
  extends ButtonInterface,
    React.PropsWithoutRef<JSX.IntrinsicElements['button']> {}

interface Props {
  status: CompletionStatus
  onPress: PointerEventHandler
  icon?: string
  statusLabel?: string
  actionLabel?: string
  disabled?: boolean
  enabled?: boolean
}

interface CssProps {
  status: CompletionStatus
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
`

const Icon = styled.div<CssProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px rgb(211, 211, 211);
  border-right: none;
  background: #ffffff;
  width: 2rem;
  height: 2rem;
`

const Status = styled.div<CssProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  background: ${({ status = CompletionStatus.Incomplete }) =>
    (status === CompletionStatus.Error && 'red') ||
    (status === CompletionStatus.Warning && 'rgb(255, 193, 7)') ||
    (status === CompletionStatus.Complete && 'rgb(71, 167, 75)') ||
    'rgb(211, 211, 211)'};
  min-width: 10rem;
  height: 2rem;
  color: ${({ status = CompletionStatus.Incomplete }) =>
    (status === CompletionStatus.Error && '#FFFFFF') ||
    (status === CompletionStatus.Complete && '#FFFFFF') ||
    'black'};
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 6rem;
`

export const StatusButtonGrid = styled.div`
  display: grid;
  grid-auto-rows: minmax(auto, 1fr);
  grid-gap: 0.5rem;
`

const StatusButton = (props: Props) => {
  const {
    status,
    onPress,
    icon,
    statusLabel,
    actionLabel,
    disabled,
    enabled,
  } = props
  return (
    <Container>
      {icon ? <Icon status={status}>{icon}</Icon> : <></>}
      <Status status={status}>
        {statusLabel || CompletionStatus[props.status]}
      </Status>
      <ButtonContainer>
        <Button
          style={{ minWidth: '4.3rem' }}
          small
          onPress={onPress}
          disabled={
            (status === CompletionStatus.Complete && !enabled) || disabled
          }
        >
          {actionLabel || 'Complete'}
        </Button>
      </ButtonContainer>
    </Container>
  )
}

export default StatusButton
