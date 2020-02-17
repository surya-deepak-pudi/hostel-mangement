import {
  FETCH_TENENTS,
  SHOW_TENENTS,
  DELETE_TENENTS,
  EDIT_TENENTS,
  CREATE_TENENTS,
  NORECORDS
} from "../actions/actionTypes"
// import { createRoomsAction } from "./roomsActions"
import backend from "../api/backendApi"

export const fetchTenents = () => dispatch => {
  backend.get("/tenents").then(tenents => {
    if (tenents.data.length) {
      console.log(tenents.data)
      dispatch({ type: FETCH_TENENTS, payload: tenents.data })
    } else {
      dispatch({ type: NORECORDS, payload: true })
    }
  })
}
export const showTenents = id => dispatch => {
  backend.get(`/tenents/${id}`).then(tenents => {
    let date = tenents.data.date
    date = date.slice(0, 10)
    dispatch({
      type: SHOW_TENENTS,
      payload: { ...tenents.data, date: date }
    })
  })
}
export const updateTenents = (values, id) => dispatch => {
  backend.put(`/tenents/${id}`, values).then(branches => {
    console.log(branches.data)
    dispatch({ type: EDIT_TENENTS, payload: branches.data })
  })
}
export const deleteTenents = id => dispatch => {
  backend.delete("/tenents/" + id).then(tenents => {
    dispatch({ type: DELETE_TENENTS, payload: tenents.data })
  })
}
export const createTenents = values => dispatch => {
  console.log(values)
  backend.post("/tenents", values).then(branches => {
    dispatch({ type: CREATE_TENENTS, payload: branches.data })
  })
}

export const fetchBalances = () => dispatch => {
  backend.get("/tenents/balances").then(tenents => {
    if (tenents.data.length) {
      dispatch({ type: FETCH_TENENTS, payload: tenents.data })
    } else {
      dispatch({ type: NORECORDS, payload: true })
    }
  })
}

export const payRent = id => dispatch => {
  backend.put(`/tenents/${id}/pay`).then(tenents => {
    dispatch({ type: DELETE_TENENTS, payload: tenents.data })
  })
}
