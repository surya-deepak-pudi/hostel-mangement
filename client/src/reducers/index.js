import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import branchesReducer from "./branchesReducer"

export default combineReducers({
  form: formReducer,
  branches: branchesReducer
})
