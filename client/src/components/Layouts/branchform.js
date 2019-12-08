import React, { Fragment, Component } from "react"
import { Field, reduxForm } from "redux-form"
import { TextField, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import FileBase from "react-file-base64"

class BranchForm extends Component {
  useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(3),
      width: 400
    },
    smallTextField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(3),
      width: 200
    },
    input: {
      display: "none"
    }
  }))

  textFieldComponent = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => {
    const classes = this.useStyles()
    return (
      <Fragment>
        <TextField
          label={label}
          placeholder={label}
          error={touched && invalid}
          helperText={touched && error}
          variant="outlined"
          {...input}
          {...custom}
          className={
            custom.size !== "small" ? classes.textField : classes.smallTextField
          }
        />
      </Fragment>
    )
  }
  inputFieldComponent = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => {
    const classes = this.useStyles()
    return (
      <Fragment>
        <FileBase
          type="file"
          multiple={false}
          onDone={files => {
            console.log(files)
            input.value = files.base64
            input.onChange(input.value)
          }}
        />
        <img
          src={input.value}
          alt="upload image"
          style={{ height: "200px", width: "200px" }}
        ></img>
      </Fragment>
    )
  }
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <Field
          name="name"
          label="Enter the Branch name"
          component={this.textFieldComponent}
        ></Field>
        <br></br>
        <Field
          name="careTaker"
          label="Enter the care taker name"
          component={this.textFieldComponent}
        ></Field>
        <br></br>
        <Field
          name="number"
          label="Enter the care taker number"
          type="tel"
          component={this.textFieldComponent}
        ></Field>
        <br></br>
        <Field
          name="floors"
          label="Enter floors"
          type="number"
          size="small"
          component={this.textFieldComponent}
        ></Field>
        <br></br>
        <Field
          name="address"
          label="Enter address"
          component={this.textFieldComponent}
          multiline
          rowsMax="4"
        ></Field>
        <br></br>
        <Field
          name="image"
          label="upload an image"
          component={this.inputFieldComponent}
        ></Field>
        <br></br>
        <Button size="large" color="primary" type="submit" variant="contained" style={{marginTop:"30px"}}>
          Submit
        </Button>
      </form>
    )
  }
}

const validate = values => {
  console.log(values)
  const errors = {}
  const requiredFields = [
    "name",
    "careTaker",
    "number",
    "floors",
    "address",
    "photo"
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required"
    }
  })
  if (values.number && !values.number.match(/^\d{10}$/)) {
    errors.number = "invalid phone number"
  }
  // if (
  //   values.email &&
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  // ) {
  //   errors.email = 'Invalid email address'
  // }
  return errors
}

export default reduxForm({ form: "branchForm", validate })(BranchForm)
