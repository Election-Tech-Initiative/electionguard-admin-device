import {
  Action,
  UpdateTrusteeAction,
  UpdateTrusteesAction,
  SetTrusteesAction,
  TrusteeKey,
} from '../config/types'

const trusteeReducer = (state: TrusteeKey[], action: Action) => {
  switch (action.type) {
    case 'set-trustees': {
      const { payload } = action as SetTrusteesAction
      return payload
    }
    case 'update-trustee': {
      const { payload } = action as UpdateTrusteeAction
      const index = state.findIndex(i => i.id === payload.id)
      const item = { ...state[index] }
      item.data = payload.data
      item.status = payload.status

      const items = Object.assign([], state)
      items.splice(index, 1, item)
      return items
    }
    case 'update-trustees': {
      const { payload } = action as UpdateTrusteesAction
      const items = Object.assign([], state)
      payload.forEach(member => {
        const index = state.findIndex(i => i.id === member.id)
        const item = { ...state[index] }
        item.data = member.data
        item.status = member.status
        items.splice(index, 1, item)
      })
      return items
    }
    default: {
      return state
    }
  }
}

export default trusteeReducer
