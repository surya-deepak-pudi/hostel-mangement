import _ from "lodash"
import {
  FETCH_TENENTS,
  SHOW_TENENTS,
  DELETE_TENENTS,
  EDIT_TENENTS,
  CREATE_TENENTS
} from "../actions/actionTypes"

const tenentsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TENENTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") }
    case CREATE_TENENTS:
      return { ...state, [action.payload._id]: action.payload }
    case SHOW_TENENTS:
      return { ...state, [action.payload._id]: action.payload }
    case EDIT_TENENTS:
      return { ...state, [action.payload._id]: action.payload }
    case DELETE_TENENTS:
      return _.omit(state, action.payload._id)
    default:
      return state
  }
}

export default tenentsReducer
