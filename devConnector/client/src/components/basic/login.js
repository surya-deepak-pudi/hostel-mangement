import React, { Component, Fragment } from "react"
import { Field, reduxForm } from "redux-form"
import { withRouter, Link } from "react-router-dom"
import { Container, Typography, Button, Paper } from "@material-ui/core"
import { TextFieldComponent } from "../utilities/FieldComponets"
import { connect } from "react-redux"
import { loginUser } from "../../actions/authActions"

class Login extends Component {
  renderAlert = data => {
    return (
      <Paper
        style={{
          color: "black",
          backgroundColor: "#ffcdd2",
          width: "420px",
          marginRight: "7px",
          marginBottom: "20px",
          padding: "5px"
        }}
      >
        <Typography variant="subtitle1" component="h3">
          {data}
        </Typography>
      </Paper>
    )
  }
  render() {
    return (
      <Fragment>
        <Container maxWidth="xl" align="center">
          <Typography
            // color="primary"
            variant="h4"
            component="h3"
            style={{ marginTop: "20px", marginBottom: "30px" }}
          >
            Login
          </Typography>
          {this.props.errors.msg && this.renderAlert(this.props.errors.msg)}
          <form
            onSubmit={this.props.handleSubmit(formValues => {
              this.props.loginUser(formValues, this.props.history)
            })}
          >
            <Field
              name="mail"
              label="Enter email id"
              component={TextFieldComponent}
              size="md"
              variant="outlined"
            ></Field>
            <br />
            <Field
              name="password"
              label="Enter password"
              component={TextFieldComponent}
              size="md"
              type="password"
              variant="outlined"
            ></Field>
            <br />
            <Button
              color="primary"
              size="large"
              variant="contained"
              style={{ marginBottom: "30px" }}
              type="submit"
            >
              Log in
            </Button>
          </form>
          <Link to="/register" style={{ marginTop: "10px" }}>
            <Typography variant="caption" component="p">
              Not a user? SignUp
            </Typography>
          </Link>
        </Container>
      </Fragment>
    )
  }
}

const validate = (values, props) => {
  //   console.log(props)
  let errors = {}
  const requiredFields = ["mail", "password"]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required!"
    }
  })
  if (
    values.mail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)
  ) {
    errors.mail = "Invalid email address!"
  }
  return errors
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { loginUser })(
  reduxForm({ form: "loginForm", validate })(withRouter(Login))
)
