import React, { Component, Fragment } from "react"
import { Field, reduxForm, FieldArray } from "redux-form"
import {
  Typography,
  Button,
  Radio,
  CircularProgress,
  Grid
} from "@material-ui/core"
import {
  TextFieldComponent,
  radioButtonComponent,
  DeleteButton
} from "../utilities/FieldComponets"
import { GreyPaper, GreenButton } from "../utilities/styledComponents"
import { connect } from "react-redux"
import { deleteRoomsAction } from "../../actions/roomsActions"

//class declaration

class RoomForm extends Component {
  //field array

  fieldArrayComponent = ({ fields }) => {
    return (
      <ul style={{ listStyle: "none" }}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          {fields.map((room, index) => (
            <Grid item>
              <GreyPaper>
                <li key={index}>
                  {/* title */}
                  <Typography variant="h6" gutterBottom>
                    Room #{index + 1}
                  </Typography>

                  {/* Name */}
                  <Field
                    name={`${room}.number`}
                    label="enter room number"
                    component={TextFieldComponent}
                    size="sm"
                  ></Field>

                  {/* floor number */}
                  <Field
                    name={`${room}.floor`}
                    label="floor"
                    type="number"
                    size="xs"
                    min="1"
                    component={TextFieldComponent}
                  ></Field>

                  {/* Number of beds */}
                  <Field
                    name={`${room}.beds`}
                    label="beds"
                    type="number"
                    size="xs"
                    min="1"
                    component={TextFieldComponent}
                  ></Field>

                  {/* fee */}
                  <Field
                    name={`${room}.fee`}
                    label="enter amount of fee"
                    type="number"
                    size="sm"
                    component={TextFieldComponent}
                  ></Field>

                  {/* AC */}
                  <Field name={`${room}.AC`} component={radioButtonComponent}>
                    <Radio value={true} label="YES" />
                    <Radio value={false} label="NO" />
                  </Field>
                  <br></br>

                  {/* save button */}
                  <GreenButton
                    size="small"
                    type="submit"
                    onClick={this.props.handleSubmit(() => {
                      this.props.onSubmit(this.props.id, fields.get(index))
                      fields.remove(index)
                    })}
                  >
                    save
                  </GreenButton>

                  {/* remove button */}
                  <DeleteButton
                    onClickMethod={() => {
                      fields.remove(index)
                    }}
                  ></DeleteButton>
                </li>
              </GreyPaper>
            </Grid>
          ))}

          {/* Add new Button */}
          <Grid item>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => fields.push({})}
            >
              Add New Room
            </Button>
          </Grid>
        </Grid>
      </ul>
    )
  }

  //render
  render() {
    if (this.props.branches) {
      return (
        <Fragment>
          <form>
            <FieldArray
              name="rooms"
              component={this.fieldArrayComponent}
            ></FieldArray>
          </form>
        </Fragment>
      )
    } else {
      return <CircularProgress />
    }
  }
}

//validations
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

//config and exports
const mapStateToProps = (state, ownProps) => {
  return {
    branches: state.branches,
    initalValues: { rooms: ownProps.initialValues }
  }
}
export default connect(mapStateToProps, { deleteRoomsAction })(
  reduxForm({ form: "roomForm", validate })(RoomForm)
)
