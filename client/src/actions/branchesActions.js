import _ from "lodash"
import {
  FETCH_BRANCH,
  SHOW_BRANCH,
  UPDATE_BRANCH,
  DELETE_BRANCH,
  CREATE_BRANCH,
  CREATE_ROOMS
} from "./actionTypes"
// import { createRoomsAction } from "./roomsActions"
import backend from "../api/backendApi"
import history from "../history"

const createRooms = (id, rooms) => dispatch => {
  console.log("Im called too")
  let room = rooms.pop()
  backend.post(`/branches/${id}/rooms/`, room).then(rooms => {
    dispatch({ type: CREATE_ROOMS, payload: rooms.data })
  })
}

export const fetchBranches = () => dispatch => {
  backend.get("/branches").then(branches => {
    console.log(branches.data)
    dispatch({ type: FETCH_BRANCH, payload: branches.data })
  })
}
export const showBranches = id => dispatch => {
  backend.get(`/branches/${id}`).then(branches => {
    dispatch({ type: SHOW_BRANCH, payload: branches.data })
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
  backend.delete("/branches/" + id).then(branches => {
    dispatch({ type: DELETE_BRANCH, payload: branches.data })
  })
}
export const createBranches = (id, values) => dispatch => {
  backend.post("/branches", values).then(branches => {
    dispatch({ type: CREATE_BRANCH, payload: branches.data })
    history.push(`/branches/${branches.data._id}/rooms/new`)
  })
}
