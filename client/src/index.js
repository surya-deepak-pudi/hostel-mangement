import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import reducers from "./reducers"
import Thunk from "redux-thunk"
import { Helmet } from "react-helmet"
import App from "./components/App"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(Thunk)))

ReactDOM.render(
  <Provider store={store}>
    <Helmet bodyAttributes={{ style: "background-color : #e0f7fa" }} />
    <App />
  </Provider>,
  document.querySelector("#root")
)
