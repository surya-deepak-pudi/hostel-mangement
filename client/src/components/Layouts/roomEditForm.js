import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import {
  TextField,
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel
} from "@material-ui/core"
import { Field, reduxForm } from "redux-form"

class RoomEditForm extends Component {
  useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
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
          {...input}
          {...custom}
          variant="outlined"
          className={
            custom.size !== "small" ? classes.textField : classes.smallTextField
          }
        />
      </Fragment>
    )
  }

  radioButtonComponent = ({ input }) => {
    const selectedValue = input.value
    return (
      <FormControl style={{ display: "inline-block" }}>
        <FormLabel component="legend">AC:</FormLabel>
        <RadioGroup
          name={input.name}
          value={input.value}
          onChange={input.onChange}
          row
        >
          <FormControlLabel
            value={true}
            control={<Radio />}
            label="YES"
            labelPlacement="start"
            checked={selectedValue === "true" || selectedValue === true}
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label="NO"
            labelPlacement="start"
            checked={selectedValue === "false" || selectedValue === false}
          />
        </RadioGroup>
      </FormControl>
    )
  }
  render() {
    console.log(this.props)
    return (
      <form>
        <Field
          name="number"
          label="enter room number"
          component={this.textFieldComponent}
        ></Field>
        <br></br>
        <Field
          name="floor"
          label="enter floor number"
          type="number"
          component={this.textFieldComponent}
        ></Field>
        <br></br>
        <Field
          name="beds"
          label="enter number of beds"
          type="number"
          component={this.textFieldComponent}
        ></Field>
        <br></br>
        <Field
          name="fee"
          label="enter amount of fee"
          type="number"
          component={this.textFieldComponent}
        ></Field>
        <br></br>
        <Field name="AC" component={this.radioButtonComponent}>
          <Radio value={true} label="YES" />
          <Radio value={false} label="NO" />
        </Field>
        <br></br>
        <Button
          onClick={this.props.handleSubmit(values => {
            console.log("im pressed")
            this.props.editRoomsAction(this.props.id, this.props.rid, values)
          })}
          size="large"
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    )
  }
}

const validate = () => {
  return null
}
export default reduxForm({ form: "roomEditForm", validate })(RoomEditForm)
