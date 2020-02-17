import {
  DELETE_ROOMS,
  CREATE_ROOMS,
  EDIT_ROOMS,
  SHOW_ROOMS
} from "./actionTypes"
import backend from "../api/backendApi"

export const createRoomsAction = (id, values) => dispatch => {
  const room = { ...values, vacancies: values.beds }
  console.log(room)
  backend.post(`/branches/${id}/rooms/`, room).then(rooms => {
    dispatch({ type: CREATE_ROOMS, payload: rooms.data })
  })
}

export const showRoomsAction = (id, rid) => dispatch => {
  backend.get(`/branches/${id}/rooms/${rid}`).then(room => {
    dispatch({ type: SHOW_ROOMS, payload: room.data })
  })
}

export const editRoomsAction = (id, rid, values) => dispatch => {
  console.log("IM called action")
  backend.put(`/branches/${id}/rooms/${rid}`, values).then(rooms => {
    dispatch({ type: EDIT_ROOMS, payload: rooms.data })
  })
}

export const deleteRoomsAction = (id, rid) => dispatch => {
  backend.delete(`/branches/${id}/rooms/${rid}`).then(rooms => {
    console.log("im called")
    dispatch({ type: DELETE_ROOMS, payload: rooms.data })
  })
}
