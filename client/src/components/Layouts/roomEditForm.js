import React, { Component } from "react"
import { Button, Radio, Grid } from "@material-ui/core"
import { Field, reduxForm } from "redux-form"
import {
  TextFieldComponent,
  radioButtonComponent
} from "../utilities/FieldComponets"

class RoomEditForm extends Component {
  render() {
    console.log(this.props)
    return (
      <form
        onSubmit={this.props.handleSubmit(values => {
          console.log("im pressed")
          this.props.editRoomsAction(this.props.id, this.props.rid, values)
        })}
      >
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          style={{ marginTop: "25px" }}
        >
          <Grid item>
            <Field
              variant="outlined"
              size="sm"
              name="number"
              label="enter room number"
              component={TextFieldComponent}
            ></Field>
          </Grid>
          <Grid item>
            <Field
              variant="outlined"
              size="xs"
              name="floor"
              label="floor"
              type="number"
              component={TextFieldComponent}
            ></Field>
          </Grid>
          <Grid item>
            <Field
              variant="outlined"
              size="xs"
              name="beds"
              label="beds"
              type="number"
              component={TextFieldComponent}
            ></Field>
          </Grid>
          <Grid item>
            <Field
              variant="outlined"
              size="sm"
              name="fee"
              label="enter amount of fee"
              type="number"
              component={TextFieldComponent}
            ></Field>
          </Grid>
          <Grid item>
            <Field name="AC" component={radioButtonComponent}>
              <Radio value={true} label="YES" />
              <Radio value={false} label="NO" />
            </Field>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              size="large"
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const validate = (values, props) => {
  const errors = {}
  const requiredFields = ["number", "fee", "beds", "AC", "floor"]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required"
    }
  })
  if (props.branches) {
    if (values["floor"] > props.branches.floors) {
      errors["floor"] = "Not a valid floor"
    }
  }
  return errors
}

export default reduxForm({ form: "roomEditForm", validate })(RoomEditForm)
