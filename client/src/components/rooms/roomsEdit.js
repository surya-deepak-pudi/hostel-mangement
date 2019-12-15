import React, { Component, Fragment } from "react"
import _ from "lodash"
import { connect } from "react-redux"
import { Typography, Container } from "@material-ui/core"
import RoomEditForm from "../Layouts/roomEditForm"
import { editRoomsAction, showRoomsAction } from "../../actions/roomsActions"
import { showBranches } from "../../actions/branchesActions"

class RoomsCreate extends Component {
  componentDidMount() {
    this.props.showBranches(this.props.match.params.id)
    this.props.showRoomsAction(
      this.props.match.params.id,
      this.props.match.params.rid
    )
  }
  render() {
    return (
      <Container maxWidth="xl" align="center">
        <Typography
          variant="h4"
          component="h3"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          Edit Room
        </Typography>
        <RoomEditForm
          initialValues={this.props.rooms}
          branches={this.props.branches}
          id={this.props.match.params.id}
          rid={this.props.match.params.rid}
          editRoomsAction={this.props.editRoomsAction}
        ></RoomEditForm>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    branches: state.branches[ownProps.match.params.id],
    rooms: state.rooms[ownProps.match.params.rid]
  }
}

export default connect(mapStateToProps, {
  showBranches,
  showRoomsAction,
  editRoomsAction
})(RoomsCreate)
