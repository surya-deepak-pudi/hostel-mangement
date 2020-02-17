import React, { Component, Fragment } from "react"
import { verifyAccount } from "../../actions/authActions"
import { connect } from "react-redux"
import { Typography, Button } from "@material-ui/core"

class Verify extends Component {
  componentDidMount() {
    this.props.verifyAccount({
      rand: this.props.match.params.value,
      id: this.props.match.params.id
    })
  }
  render() {
    if (
      this.props.auth.user.isVerified &&
      this.props.auth.user.isVerified === false
    ) {
      return (
        <Typography
          // color="primary"
          variant="h4"
          component="h3"
          style={{ marginTop: "20px", marginBottom: "30px" }}
        >
          Please check your mail for verification link
        </Typography>
      )
    } else {
      return (
        <Fragment>
          <Typography
            // color="primary"
            variant="h4"
            component="h3"
            style={{ marginTop: "20px", marginBottom: "30px" }}
          >
            Your mail is successfully verified
          </Typography>
          <br></br>
          <Button
            size="large"
            color="primary"
            variant="contained"
            style={{ marginTop: "30px" }}
            href="/login"
          >
            Login
          </Button>
        </Fragment>
      )
    }
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps, { verifyAccount })(Verify)
