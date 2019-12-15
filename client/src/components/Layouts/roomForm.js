import React, { Component, Fragment } from "react"
import { Field, reduxForm, FieldArray } from "redux-form"
import { makeStyles } from "@material-ui/core/styles"
import {
  TextField,
  Typography,
  Container,
  Button,
  CircularProgress,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Paper
} from "@material-ui/core"
import { connect } from "react-redux"
import { deleteRoomsAction } from "../../actions/roomsActions"

class RoomForm extends Component {
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

  fieldArrayComponent = ({ fields }) => {
    return (
      <ul style={{ listStyle: "none" }}>
        <Container align="center">
          {fields.map((room, index) => (
            <Paper style={{ marginTop: "20px" }}>
              <li key={index}>
                <Typography variant="h6" gutterBottom>
                  Room #{index + 1}
                </Typography>
                <Field
                  name={`${room}.number`}
                  label="enter room number"
                  component={this.textFieldComponent}
                ></Field>
                <Field
                  name={`${room}.floor`}
                  label="enter floor number"
                  type="number"
                  component={this.textFieldComponent}
                ></Field>

                <Field
                  name={`${room}.beds`}
                  label="enter number of beds"
                  type="number"
                  component={this.textFieldComponent}
                ></Field>
                <Field
                  name={`${room}.fee`}
                  label="enter amount of fee"
                  type="number"
                  component={this.textFieldComponent}
                ></Field>
                <Field
                  name={`${room}.AC`}
                  component={this.radioButtonComponent}
                >
                  <Radio value={true} label="YES" />
                  <Radio value={false} label="NO" />
                </Field>
                <br></br>
                <Button
                  size="small"
                  color="primary"
                  type="submit"
                  variant="contained"
                  style={{ marginBottom: "10px" }}
                  onClick={this.props.handleSubmit(() => {
                    this.props.onSubmit(this.props.id, fields.get(index))
                    fields.remove(index)
                  })}
                >
                  save
                </Button>
              </li>
            </Paper>
          ))}
          <li key="button">
            <Button
              color="inherit"
              onClick={() => fields.push({})}
              style={{ marginTop: "10px" }}
            >
              Add New Room
            </Button>
          </li>
        </Container>
      </ul>
    )
  }

  buttonRender = () => {}
  render() {
    if (this.props.branches) {
      return (
        <Fragment>
          <form>
            <FieldArray
              name="rooms"
              component={this.fieldArrayComponent}
            ></FieldArray>
            <Button
              size="large"
              color="primary"
              variant="contained"
              href="/branches"
            >
              Done!
            </Button>
          </form>
        </Fragment>
      )
    } else {
      return <CircularProgress />
    }
  }
}

const x = new RoomForm()

const validate = (values, props) => {
  const errors = {}
  const roomArrayErrors = []
  if (!values.rooms || !values.rooms.length) {
    errors.rooms = { _errors: "Atleast one room must be added" }
  } else {
    values.rooms.forEach((room, roomIndex) => {
      const roomErrors = {}
      if (props.branches[props.id]) {
        for (let i = 0; i < props.branches[props.id].rooms.length; i++) {
          if (room.number === props.branches[props.id].rooms[i].number) {
            roomErrors.number = "already exists"
            roomArrayErrors[roomIndex] = roomErrors
          }
        }
      }
      if (!room || !room.number) {
        roomErrors.number = "Required"
        roomArrayErrors[roomIndex] = roomErrors
      }
      if (!room || !room.floor) {
        roomErrors.floor = "Required"
        roomArrayErrors[roomIndex] = roomErrors
      }
      if (props.branches[props.id]) {
        if (room.floor > props.branches[props.id].floors) {
          roomErrors.floor = "Not a valid floor"
          roomArrayErrors[roomIndex] = roomErrors
        }
      }
      if (!room || !room.beds) {
        roomErrors.beds = "Required"
        roomArrayErrors[roomIndex] = roomErrors
      }
      if (!room || !room.fee) {
        roomErrors.fee = "Required"
        roomArrayErrors[roomIndex] = roomErrors
      }
    })
  }
  if (roomArrayErrors.length) {
    errors.rooms = roomArrayErrors
  }
  return errors
}

const mapStateToProps = (state, ownProps) => {
  return {
    branches: state.branches,
    initalValues: { rooms: ownProps.initialValues }
  }
}
export default connect(mapStateToProps, { deleteRoomsAction })(
  reduxForm({ form: "roomForm", validate })(RoomForm)
)
