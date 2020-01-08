import React, { Component, Fragment } from "react"
import { Field, reduxForm } from "redux-form"
import { withRouter } from "react-router-dom"
import _ from "lodash"
import { Container, Typography, Button } from "@material-ui/core"
import { TextFieldComponent } from "../utilities/FieldComponets"
import { connect } from "react-redux"
import { registerUser } from "../../actions/authActions"

class Register extends Component {
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
            Register
          </Typography>
          <form
            onSubmit={this.props.handleSubmit(formValues => {
              //   console.log(formValues)
              //   console.log(this.props.history)
              formValues = _.omit(formValues, "retype")
              this.props.registerUser(formValues, this.props.history)
            })}
          >
            <Field
              name="name"
              label="Enter username"
              component={TextFieldComponent}
              size="md"
              variant="outlined"
            ></Field>
            <br />
            <Field
              name="mail"
              label="Enter email id"
              component={TextFieldComponent}
              provideError={!_.isEmpty(this.props.errors) ? true : false}
              size="md"
              variant="outlined"
              helperText={
                !_.isEmpty(this.props.errors) ? this.props.errors.mail : null
              }
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
            <Field
              name="retype"
              label="Re-type password"
              type="password"
              component={TextFieldComponent}
              size="md"
              variant="outlined"
            ></Field>
            <br />
            <Button
              color="primary"
              size="large"
              variant="contained"
              style={{ marginTop: "30px" }}
              type="submit"
            >
              SignUp
            </Button>
          </form>
        </Container>
      </Fragment>
    )
  }
}

const validate = (values, props) => {
  //   console.log(props)
  const errors = {}
  const requiredFields = ["name", "mail", "password", "retype"]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required"
    }
  })
  if (values["password"] !== values["retype"]) {
    errors["retype"] = "Not Matching"
  }
  if (
    values.mail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)
  ) {
    errors.mail = "Invalid email address"
  }
  //   console.log(props.users.errors)
  return errors
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps, { registerUser })(
  reduxForm({ form: "registerForm", validate })(withRouter(Register))
)
