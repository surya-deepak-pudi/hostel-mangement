import React from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid
} from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import MenuIcon from "@material-ui/icons/Menu"
import { logoutUser } from "../../actions/authActions"

class Header extends React.Component {
  componentDidMount() {
    if (
      !this.props.auth.isAuthenticated &&
      this.props.location.pathname !== "/login" &&
      this.props.location.pathname !== "/register"
    ) {
      this.props.history.push("/")
    }
  }
  buttonRender = () => {
    if (this.props.auth.isAuthenticated) {
      return (
        <Button
          onClick={() => this.props.logoutUser(this.props.history)}
          color="inherit"
          style={{marginLeft:"3px"}}
        >
          Logout
        </Button>
      )
    } else {
      return (
        <Button href="/login" color="inherit">
          Login
        </Button>
      )
    }
  }
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container justify="flex-start" alignItems="center">
                <Grid item>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    href="/"
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Hostel Name</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button href="/branches" color="inherit" style={{marginLeft:"3px"}}>
                Branches
              </Button>
              <Button href="/tenents" color="inherit" style={{marginLeft:"3px"}}>
                Tenents
              </Button>
              <Button href="/balances" color="inherit" style={{marginLeft:"3px"}}>
                Balance
              </Button>
              {this.buttonRender()}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

const MapStateToProps = state => {
  return { auth: state.auth }
}
export default connect(MapStateToProps, { logoutUser })(withRouter(Header))
