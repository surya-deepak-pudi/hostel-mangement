import jwt_decode from "jwt-decode"
import { GET_ERRORS, SET_USER } from "./actionTypes"
import backend from "../api/backendApi"
import setAuthToken from "../api/setAuthToken"

export const registerUser = (values, history) => dispatch => {
  backend
    .post("/register", values)
    .then(res => {
      const { token } = res.data
      localStorage.setItem("jwtToken", token)
      setAuthToken(token)
      const decodedToken = jwt_decode(token)
      dispatch(setCurrentUser(decodedToken))
      history.push("/")
    })
    .catch(err => {
      console.log(err.response.data)
      dispatch({ type: GET_ERRORS, payload: err.response.data })
    })
}

export const loginUser = (values, history) => dispatch => {
  backend
    .post("/login", values)
    .then(res => {
      const { token } = res.data
      localStorage.setItem("jwtToken", token)
      setAuthToken(token)
      const decodedToken = jwt_decode(token)
      dispatch(setCurrentUser(decodedToken))
      history.push("/")
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const verifyAccount = value => dispatch => {
  backend.post("/verify", value).then(res => {
    if (res.data.verified) {
      localStorage.removeItem("jwtToken")
      setAuthToken(false)
      dispatch(setCurrentUser({}))
    }
  })
}

export const setCurrentUser = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  }
}

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken")
  setAuthToken(false)
  dispatch(setCurrentUser({}))
  history.push("/")
}
