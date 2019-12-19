import React from "react"
import Header from "./Layouts/header"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./basic/home"
import Login from "./basic/login"
import Balance from "./basic/balance"
import Branches from "./branches/branches"
import BranchesShow from "./branches/branchesShow"
import BranchesEdit from "./branches/branchesEdit"
import BranchesCreate from "./branches/branchesCreate"
import Tenents from "./tenents/tenents"
import TenentsShow from "./tenents/tenentsShow"
import TenentsEdit from "./tenents/tenentsEdit"
import TenentsCreate from "./tenents/tenentsCreate"
import Rooms from "./rooms/rooms"
import RoomsCreate from "./rooms/roomsCreate"
import RoomsEdit from "./rooms/roomsEdit"
// "#006064"-aqaua-#e0f7fa
//"#01579b"-blue-
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#428e92",
      main: "#006064",
      dark: "#00363a",
      contrastText: "white"
    },
    secondary: {
      light: "#92ffc6",
      main: "#5cdb95",
      dark: "#1aa867",
      contrastText: "#000"
    },
    background: "#5cdb95"
  }
})
export default () => {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Header></Header>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/branches" exact component={Branches} />
        <Route path="/branches/:id" exact component={BranchesShow} />
        <Route path="/branches/new" exact component={BranchesCreate} />
        <Route path="/branches/edit/:id" exact component={BranchesEdit} />
        <Route path="/branches/:id/rooms" exact component={Rooms} />
        <Route path="/branches/:id/rooms/new" exact component={RoomsCreate} />
        <Route
          path="/branches/:id/rooms/edit/:rid"
          exact
          component={RoomsEdit}
        />
        <Route path="/tenents" exact component={Tenents} />
        <Route path="/tenents/:id" component={TenentsShow} />
        <Route path="/tenents/new" component={TenentsCreate} />
        <Route path="/tenents/edit/:id" component={TenentsEdit} />
        <Route path="/balances" component={Balance} />
      </BrowserRouter>
    </MuiThemeProvider>
  )
}
