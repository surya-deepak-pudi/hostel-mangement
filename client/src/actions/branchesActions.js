import {
  FETCH_BRANCH,
  SHOW_BRANCH,
  UPDATE_BRANCH,
  DELETE_BRANCH,
  CREATE_BRANCH
} from "./actionTypes"
import backend from "../api/backendApi"
export const fetchBranches = () => dispatch => {
  backend.get("/branches").then(branches => {
    console.log(branches.data)
    return dispatch({ type: FETCH_BRANCH, payload: branches.data })
  })
}
export const showBranches = id => dispatch => {
  backend.get("/branches/" + id).then(branches => {
    console.log(branches.data)
    return dispatch({ type: SHOW_BRANCH, payload: branches.data })
  })
}
export const updateBranches = (id, values) => dispatch => {
  backend.post("/branches/" + id, values).then(branches => {
    console.log(branches.data)
    return dispatch({ type: UPDATE_BRANCH, payload: branches.data })
  })
}
export const deleteBranches = id => dispatch => {
  backend.delete("/branches/" + id).then(branches => {
    return dispatch({ type: DELETE_BRANCH, payload: branches.data })
  })
}
export const createBranches = values => dispatch => {
  backend.delete("/branches", values).then(branches => {
    console.log(branches)
    return dispatch({ type: CREATE_BRANCH, payload: branches.data })
  })
}
