import backend from "./backendApi"

const setAuthToken = token => {
  if (token) {
    backend.defaults.headers.common["Authorization"] = token
  } else {
    delete backend.defaults.headers.common["Authorization"]
  }
}

export default setAuthToken
