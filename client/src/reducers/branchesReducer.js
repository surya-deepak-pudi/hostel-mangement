import _ from "lodash"
import {
  FETCH_BRANCH,
  SHOW_BRANCH,
  DELETE_BRANCH,
  UPDATE_BRANCH,
  CREATE_BRANCH
} from "../actions/actionTypes"

const flooring = branches => {
  let sortedRooms = []
  for (let i = 0; i < branches.floors; i++) {
    sortedRooms[i] = [i + 1]
  }
  let rooms = branches.rooms
  for (let room of rooms) {
    sortedRooms[room.floor - 1].push(room)
  }
  branches.rooms = sortedRooms
  return branches
}

const branchesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BRANCH:
      return { ...state, ..._.mapKeys(action.payload, "_id") }
    case CREATE_BRANCH:
      return { ...state, [action.payload._id]: action.payload }
    case SHOW_BRANCH:
      action.payload = flooring(action.payload)
      return { ...state, [action.payload._id]: action.payload }
    case UPDATE_BRANCH:
      return { ...state, [action.payload._id]: action.payload }
    case DELETE_BRANCH:
      return _.omit(state, action.payload._id)
    default:
      return state
  }
}

export default branchesReducer
