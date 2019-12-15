import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import branchesReducer from "./branchesReducer"
import roomReducer from "./roomReducer"

export default combineReducers({
  form: formReducer,
  branches: branchesReducer,
  rooms: roomReducer
})
