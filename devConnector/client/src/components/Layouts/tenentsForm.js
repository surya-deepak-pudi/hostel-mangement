import React, { Component, Fragment } from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { Button, Paper, Typography, Grid } from "@material-ui/core"
import { connect } from "react-redux"
import FileBase from "react-file-base64"
import {
  TextFieldComponent,
  renderOptions,
  renderFromHelper
} from "../utilities/FieldComponets"
import { Repeator } from "../utilities/styledComponents"
import { showBranches } from "../../actions/branchesActions"

const fullStyle = {
  backgroundColor: "#9e9e9e",
  width: "200px"
}

const clickedStyle = {
  backgroundColor: "#bbdefb",
  // backgroundColor: "#ef9a9a",
  width: "250px"
  // height: "140````````px"
}
const unclickedStyle = {
  width: "200px"
}

class TenentForm extends Component {
  constructor(props) {
    super(props)
    this.state = { selected: null }
    this.count = null
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedBranch !== prevProps.selectedBranch) {
      this.props.showBranches(this.props.selectedBranch)
    }
    if (this.props.initialValues && this.count === null) {
      console.log("im in didmunt")
      this.setState({ selected: this.props.initialValues.roomNumber })
      this.count = 1
      console.log(this.state)
    }
  }
  inputFieldComponent = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => {
    return (
      <Fragment>
        <FileBase
          type="file"
          multiple={false}
          error={touched && invalid}
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
        {renderFromHelper({ touched, error })}
      </Fragment>
    )
  }

  styleProvider = room => {
    if (!this.props.initialValues) {
      if (room.vacancies > 0) {
        console.log(room)
        if (this.state.selected === room._id) {
          return clickedStyle
        }
        return unclickedStyle
      }
      return fullStyle
    } else {
      if (this.state.selected === room._id) {
        return clickedStyle
      }
      return unclickedStyle
    }
  }

  roomFieldComponent = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => {
    let roomFloors = this.props.branches[this.props.selectedBranch].rooms
    return (
      // all rooms
      <Grid container direction="row" justify="center" spacing={2}>
        {roomFloors.map(rooms => {
          return (
            //per floor
            <Grid item key={rooms[0]}>
              <Grid
                container
                direction="row"
                justify="center"
                spacing={2}
                key={rooms[0]}
              >
                <Typography component="p" variant="subtitle1">
                  Floor {rooms[0]}:
                </Typography>
                {rooms.map(room => {
                  return (
                    //per room
                    <Grid item key={room._id}>
                      {room &&
                        typeof room === "object" &&
                        room.constructor === Object && (
                          <Fragment>
                            <Paper
                              style={this.styleProvider(room)}
                              onClick={() => {
                                if (
                                  room.vacancies > 0 ||
                                  (this.props.initialValues &&
                                    this.props.initialValues.roomNumber ===
                                      room._id)
                                ) {
                                  this.setState({ selected: room._id })
                                  input.onChange(room._id)
                                }
                              }}
                            >
                              <Typography variant="subtitle1" component="p">
                                <b>Room Number:</b>
                                {room.number}
                                <br></br>
                                <b>Fee:</b>
                                {room.fee}
                                <br></br>
                                <b>A/C:</b>
                                {room.AC ? "available" : "not available"}
                                <br></br>
                                <Grid container justify="center">
                                  <Grid item>
                                    <b>beds:</b>
                                  </Grid>
                                  <Grid item>
                                    <Repeator
                                      number={room.beds}
                                      vacancies={room.vacancies}
                                    ></Repeator>
                                  </Grid>
                                </Grid>
                              </Typography>
                            </Paper>
                          </Fragment>
                        )}
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(formValues => {
          formValues = {
            ...formValues,
            BranchName: this.props.branches[formValues.Branch].name
          }
          this.props.onSubmit(formValues, this.props.id)
        })}
      >
        <Typography
          // color="primary"
          variant="h5"
          component="h3"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          enter tenant details
        </Typography>
        <br></br>
        {/* name */}
        <Field
          name="name"
          label="Enter the Tenent name"
          component={TextFieldComponent}
          size="md"
          variant="outlined"
        ></Field>
        <br></br>

        {/* mail */}

        <Field
          name="mail"
          label="Enter the email id"
          component={TextFieldComponent}
          variant="outlined"
          size="md"
        ></Field>
        <br></br>

        {/* date */}
        <Field
          name="date"
          size="md"
          label="add date"
          type="date"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          component={TextFieldComponent}
        />
        <br></br>

        {/* number */}
        <Field
          name="number"
          label="Enter mobile number"
          type="tel"
          variant="outlined"
          size="md"
          component={TextFieldComponent}
        ></Field>
        <br></br>

        {/* advance */}

        <Field
          name="advance"
          label="Advance"
          type="number"
          variant="outlined"
          size="sm"
          component={TextFieldComponent}
        ></Field>
        <br></br>

        {/* adhar */}
        <Field
          name="adhar"
          label="Enter aadhar"
          variant="outlined"
          size="md"
          component={TextFieldComponent}
        ></Field>
        <br></br>

        {/* occupation */}
        <Field
          name="occupation"
          label="Enter Occupation"
          variant="outlined"
          size="md"
          component={TextFieldComponent}
        ></Field>
        <br></br>

        {/* gaurdian */}
        <Field
          name="gaurdianName"
          label="Enter the Tenent name"
          component={TextFieldComponent}
          size="md"
          variant="outlined"
        ></Field>
        <br></br>

        {/* gaurdainanumber */}
        <Field
          name="gaurdianNumber"
          label="Enter gaurdian mobile number"
          type="tel"
          variant="outlined"
          size="md"
          component={TextFieldComponent}
        ></Field>
        <br></br>

        {/* gaurdianaddress */}
        <Field
          name="gaurdianAddress"
          label="Enter Gaurdian address"
          variant="outlined"
          size="md"
          component={TextFieldComponent}
          multiline
          rowsMax="4"
        ></Field>
        <br></br>

        {/* tenent image */}
        <Field
          name="image"
          label="upload an image"
          component={this.inputFieldComponent}
        ></Field>
        <br></br>
        <br></br>
        <Typography
          // color="primary"
          variant="h5"
          component="h3"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          select a room
        </Typography>
        {/* branch*/}
        {renderOptions(this.props.branches)}
        <br></br>
        {this.props.selectedBranch &&
          this.props.branches[this.props.selectedBranch] &&
          this.props.branches[this.props.selectedBranch].rooms &&
          Array.isArray(
            this.props.branches[this.props.selectedBranch].rooms[0]
          ) && (
            <Field
              name="roomNumber"
              label="select a room"
              component={this.roomFieldComponent}
            ></Field>
          )}
        {/* {console.log(this.props)} */}
        {/* submit button` */}
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
    "mail",
    "date",
    "advance",
    "adhar",
    "number",
    "occupation",
    "gaurdianName",
    "gaurdianAddress",
    "gaurdianNumber",
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
  if (
    values.gaurdiannumber &&
    !values.gaurdianNumber.toString().match(/^\d{10}$/)
  ) {
    errors.gaurdianNumber = "invalid phone number"
  }
  if (
    values.mail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)
  ) {
    errors.mail = "Invalid email address"
  }
  return errors
}

const selector = formValueSelector("tenentForm")

const mapStateToProps = state => {
  const selectedBranch = selector(state, "Branch")
  return { selectedBranch, branches: state.branches }
}

export default connect(mapStateToProps, { showBranches })(
  reduxForm({ form: "tenentForm", validate })(TenentForm)
)
