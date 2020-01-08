import { SET_USER } from "../actions/actionTypes"
import _ from "lodash"

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state
  }
}
