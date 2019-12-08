import React from "react"
import Header from "./Layouts/header"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import lightBlue from "@material-ui/core/colors/lightBlue"
import blue from "@material-ui/core/colors/blue"
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

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue
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
        <Route path="/branches/show" exact component={BranchesShow} />
        <Route path="/branches/new" exact component={BranchesCreate} />
        <Route path="/branches/edit" exact component={BranchesEdit} />
        <Route path="/tenents" exact component={Tenents} />
        <Route path="/tenents/show" component={TenentsShow} />
        <Route path="/tenents/new" component={TenentsCreate} />
        <Route path="/tenents/edit" component={TenentsEdit} />
        <Route path="/balances" component={Balance} />
      </BrowserRouter>
    </MuiThemeProvider>
  )
}
