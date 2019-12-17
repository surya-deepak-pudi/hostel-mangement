import React, { Component, Fragment } from "react"
import { Field, reduxForm } from "redux-form"
import { Button } from "@material-ui/core"
import FileBase from "react-file-base64"
import { TextFieldComponent } from "../utilities/FieldComponets"

class BranchForm extends Component {
  inputFieldComponent = ({ input }) => {
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
    console.log(this.props.branches)
    return (
      <form
        onSubmit={this.props.handleSubmit(formValues => {
          this.props.onSubmit(this.props.id, formValues)
        })}
      >
        <Field
          name="name"
          label="Enter the Branch name"
          component={TextFieldComponent}
          size="md"
          variant="outlined"
        ></Field>
        <br></br>
        <Field
          name="careTaker"
          label="Enter the care taker name"
          component={TextFieldComponent}
          variant="outlined"
          size="md"
        ></Field>
        <br></br>
        <Field
          name="number"
          label="Enter the care taker number"
          type="tel"
          variant="outlined"
          size="md"
          component={TextFieldComponent}
        ></Field>
        <br></br>
        <Field
          name="floors"
          label="Enter floors"
          type="number"
          variant="outlined"
          size="sm"
          component={TextFieldComponent}
        ></Field>
        <br></br>
        <Field
          name="address"
          label="Enter address"
          variant="outlined"
          size="md"
          component={TextFieldComponent}
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
        <Button
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          style={{ marginTop: "30px" }}
        >
          Submit
        </Button>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    "name",
    "careTaker",
    "number",
    "floors",
    "address",
    "image"
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required"
    }
  })
  if (values.number && !values.number.toString().match(/^\d{10}$/)) {
    errors.number = "invalid phone number"
  }
  return errors
}

export default reduxForm({ form: "branchForm", validate })(BranchForm)
