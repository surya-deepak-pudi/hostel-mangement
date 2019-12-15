import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Container, Typography, Paper, Button } from "@material-ui/core"
import {
  createRoomsAction,
  deleteRoomsAction
} from "../../actions/roomsActions"
import { showBranches } from "../../actions/branchesActions"
import RoomForm from "../Layouts/roomForm"
import img from "../../nodata.png"

class RoomsCreate extends Component {
  componentDidMount() {
    this.props.showBranches(this.props.match.params.id)
  }
  renderList() {
    let rooms = Object.keys(this.props.rooms)
    if (rooms.length) {
      return (
        <Container maxWidth="xl" align="center">
          <Typography
            variant="h4"
            component="h3"
            style={{ marginTop: "20px", marginBottom: "5px" }}
          >
            Added Rooms
          </Typography>
          <ul style={{ listStyle: "none" }}>
            {rooms.map(room => {
              room = this.props.rooms[room]
              return (
                <li>
                  <Paper key={room._id}>
                    <Typography variant="subtitle1">
                      <b>room number:</b>
                      {room.number}
                      <b style={{ marginLeft: "30px" }}>floor:</b>
                      {room.floor}
                      <b style={{ marginLeft: "30px" }}>beds:</b>
                      {room.beds}
                      <b style={{ marginLeft: "30px" }}>rent:</b>
                      {room.fee}
                      <b style={{ marginLeft: "30px" }}>A/C:</b>
                      {room.AC ? "available" : "not available"}
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      style={{ marginBottom: "10px" }}
                      href={`/branches/${this.props.match.params.id}/rooms/edit/${room._id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      style={{ marginBottom: "10px", marginLeft: "10px" }}
                      onClick={() => {
                        this.props.deleteRoomsAction(
                          this.props.match.params.id,
                          room._id
                        )
                      }}
                    >
                      Delete
                    </Button>
                  </Paper>
                </li>
              )
            })}
          </ul>
        </Container>
      )
    } else {
      return (
        <Container align="center">
          <img alt="no rooms added" src={img}></img>
          <Typography variant="subtitle1">No rooms are added yet</Typography>
        </Container>
      )
    }
  }
  render() {
    return (
      <Fragment>
        {this.renderList()}

        <Container maxWidth="xl" align="center">
          <Typography
            variant="h4"
            component="h3"
            style={{ marginTop: "20px", marginBottom: "5px" }}
          >
            Add Rooms
          </Typography>
          <br></br>
          <RoomForm
            onSubmit={this.props.createRoomsAction}
            id={this.props.match.params.id}
          ></RoomForm>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    branches: state.branches[ownProps.match.params.id],
    rooms: state.rooms
  }
}

export default connect(mapStateToProps, {
  showBranches,
  createRoomsAction,
  deleteRoomsAction
})(RoomsCreate)
