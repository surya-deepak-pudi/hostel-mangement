import {
  FETCH_TENENTS,
  SHOW_TENENTS,
  DELETE_TENENTS,
  EDIT_TENENTS,
  CREATE_TENENTS
} from "../actions/actionTypes"
// import { createRoomsAction } from "./roomsActions"
import backend from "../api/backendApi"
import history from "../history"

export const fetchTenents = () => dispatch => {
  backend.get("/tenents").then(tenents => {
    console.log(tenents.data)
    dispatch({ type: FETCH_TENENTS, payload: tenents.data })
  })
}
export const showTenents = id => dispatch => {
  backend.get(`/tenents/${id}`).then(tenents => {
    let date = tenents.data.date
    date = date.slice(0, 10)
    console.log(typeof tenents.data._id)
    dispatch({
      type: SHOW_TENENTS,
      payload: { ...tenents.data, date: date }
    })
  })
}
export const updateTenents = (values, id) => dispatch => {
  console.log("im called")
  backend.put(`/tenents/${id}`, values).then(branches => {
    console.log(branches.data)
    dispatch({ type: EDIT_TENENTS, payload: branches.data })
  })
}
export const deleteTenents = id => dispatch => {
  console.log("im called")
  backend.delete("/tenents/" + id).then(tenents => {
    dispatch({ type: DELETE_TENENTS, payload: tenents.data })
  })
}
export const createTenents = values => dispatch => {
  console.log("m called")
  console.log(values)
  backend.post("/tenents", values).then(branches => {
    dispatch({ type: CREATE_TENENTS, payload: branches.data })
  })
}
