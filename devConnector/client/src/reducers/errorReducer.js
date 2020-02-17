import { GET_ERRORS, UNAUTHORIZED, NORECORDS } from "../actions/actionTypes"

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, ...action.payload }
    case UNAUTHORIZED:
      return { ...state, unauthorized: true }
    case NORECORDS:
      return { ...state, noRecords: true }
    default:
      return state
  }
}

export default errorReducer
