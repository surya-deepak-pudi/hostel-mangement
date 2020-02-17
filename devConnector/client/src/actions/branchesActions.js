import {
  FETCH_BRANCH,
  SHOW_BRANCH,
  UPDATE_BRANCH,
  DELETE_BRANCH,
  CREATE_BRANCH,
  UNAUTHORIZED,
  NORECORDS
} from "./actionTypes"
// import { createRoomsAction } from "./roomsActions"
import backend from "../api/backendApi"
import history from "../history"

export const fetchBranches = (fields = []) => dispatch => {
  let str = ""
  if (fields.length) {
    str = "?properties=" + fields.join(",")
  }
  str += "&filter=floors[lte]2&name[gte]kk"
  console.log(str)
  backend
    .get("/branches" + str)
    .then(branches => {
      if (branches.data.length) {
        dispatch({ type: FETCH_BRANCH, payload: branches.data })
      } else {
        dispatch({ type: NORECORDS, payload: true })
      }
    })
    .catch(err => {
      if (err.response.data === "Unauthorized") {
        dispatch({ type: UNAUTHORIZED, payload: err.response.data })
      }
      console.log(err.response.data)
    })
}
export const showBranches = (id, fields = []) => dispatch => {
  let str = ""
  if (fields.length) {
    str = "?properties=" + fields.join(",")
  }
  console.log(str)
  backend
    .get(`/branches/${id}/${str}`)
    .then(branches => {
      console.log(branches)
      dispatch({ type: SHOW_BRANCH, payload: branches.data })
    })
    .catch(err => {
      console.log(err.response)
    })
}
export const updateBranches = (id, values) => dispatch => {
  console.log("im called")
  console.log(id)
  backend.put(`/branches/${id}`, values).then(branches => {
    console.log(branches.data)
    dispatch({ type: UPDATE_BRANCH, payload: branches.data })
  })
}
export const deleteBranches = id => dispatch => {
  console.log("im called")
  backend.delete("/branches/" + id).then(branches => {
    dispatch({ type: DELETE_BRANCH, payload: branches.data })
  })
}
export const createBranches = (id, values) => dispatch => {
  backend.post("/branches", values).then(branches => {
    dispatch({ type: CREATE_BRANCH, payload: branches.data })
    history.push(`/branches/${branches.data._id}/rooms/new`)
    window.location.reload(false)
  })
}
