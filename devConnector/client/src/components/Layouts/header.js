import React, { Fragment } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  Paper
} from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import MenuIcon from "@material-ui/icons/Menu"
import { logoutUser } from "../../actions/authActions"

class Header extends React.Component {
  componentDidMount() {
    // console.log(this.props.location.pathname)
    if (
      !this.props.auth.isAuthenticated &&
      this.props.location.pathname !== "/login" &&
      this.props.location.pathname !== "/register" &&
      this.props.location.pathname.slice(0, 8) !== "/verify/"
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
          style={{ marginLeft: "3px" }}
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
      <Fragment>
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
                <Button
                  href="/branches"
                  color="inherit"
                  style={{ marginLeft: "3px" }}
                >
                  Branches
                </Button>
                <Button
                  href="/tenents"
                  color="inherit"
                  style={{ marginLeft: "3px" }}
                >
                  Tenents
                </Button>
                <Button
                  href="/balances"
                  color="inherit"
                  style={{ marginLeft: "3px" }}
                >
                  Balance
                </Button>
                {this.buttonRender()}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {this.props.auth.isVerified === false && (
          <Paper style={{ backgroundColor: "red" }}>
            <Typography
              // color="primary"
              variant="h4"
              component="h3"
              style={{ marginTop: "20px", marginBottom: "30px" }}
            >
              Please check your mail for verification link
            </Typography>
          </Paper>
        )}
      </Fragment>
    )
  }
}

const MapStateToProps = state => {
  return { auth: state.auth, errors: state.errors }
}
export default connect(MapStateToProps, { logoutUser })(withRouter(Header))
