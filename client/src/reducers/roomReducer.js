import _ from "lodash"
import {
  CREATE_ROOMS,
  EDIT_ROOMS,
  DELETE_ROOMS,
  SHOW_ROOMS
} from "../actions/actionTypes"

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_ROOMS:
      return { ...state, [action.payload._id]: action.payload }
    case DELETE_ROOMS:
      return _.omit(state, action.payload._id)
    case SHOW_ROOMS:
      return { ...state, [action.payload._id]: action.payload }
    case EDIT_ROOMS:
      return { ...state, [action.payload._id]: action.payload }
    default:
      return state
  }
}
