import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import reducers from "./reducers"
import Thunk from "redux-thunk"
import jwt_decode from "jwt-decode"
import { Helmet } from "react-helmet"
import setAuthToken from "./api/setAuthToken"
import { setCurrentUser } from "./actions/authActions"
import App from "./components/App"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(Thunk)))

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decodedToken = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decodedToken))
}

ReactDOM.render(
  <Provider store={store}>
    {/* <Helmet bodyAttributes={{ style: "background-color : #e0f7fa" }} /> */}
    <App />
  </Provider>,
  document.querySelector("#root")
)
