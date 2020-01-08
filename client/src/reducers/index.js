import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import branchesReducer from "./branchesReducer"
import roomReducer from "./roomReducer"
import tenentsReducer from "./tenentsReducer"
import errorReducer from "./errorReducer"
import authReducer from "./authReducer"

export default combineReducers({
  form: formReducer,
  branches: branchesReducer,
  rooms: roomReducer,
  tenents: tenentsReducer,
  errors: errorReducer,
  auth: authReducer
})
