import _ from "lodash"
import {
  FETCH_BRANCH,
  SHOW_BRANCH,
  DELETE_BRANCH,
  UPDATE_BRANCH,
  CREATE_BRANCH
} from "../actions/actionTypes"

const branchesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BRANCH:
      return { ...state, ..._.mapKeys(action.payload, "_id") }
    case CREATE_BRANCH:
      return { ...state, [action.payload._id]: [action.payload] }
    case SHOW_BRANCH:
      return { ...state, [action.payload._id]: [action.payload] }
    case UPDATE_BRANCH:
      return { ...state, [action.payload._id]: [action.payload] }
    case DELETE_BRANCH:
      return _.omit(state, action.payload)
    default:
      return state
  }
}

export default branchesReducer
