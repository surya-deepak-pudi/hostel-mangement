import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import _ from "lodash"
import {
  Container,
  Typography,
  CircularProgress,
  Button
} from "@material-ui/core"
import RenderRooms from "../Layouts/RenderRooms"
import { GreyPaper } from "../utilities/styledComponents"
import { showBranches } from "../../actions/branchesActions"

class ShowBranch extends Component {
  componentDidMount() {
    this.props.showBranches(this.props.match.params.id)
  }
  render() {
    const { branches } = this.props
    if (!_.isEmpty(branches)) {
      console.log(branches)
      return (
        <Fragment>
          <Container>
            <Typography
              // color="primary"
              variant="h4"
              component="h3"
              style={{
                marginTop: "20px",
                marginBottom: "30px",
                textTransform: "capitalize"
              }}
            >
              {`${branches.name}:`}
            </Typography>
            <GreyPaper>
              <Typography variant="subtitle1">
                <b style={{ marginRight: "5px" }}>CareTaker:</b>
                {branches.careTaker}
                <br></br>
                <b style={{ marginRight: "5px" }}>Number:</b>
                {branches.number}
                <br></br>
                <b style={{ marginRight: "5px" }}>Address:</b>
                {branches.address}
              </Typography>
            </GreyPaper>
            <RenderRooms
              rooms={branches.rooms}
              id={this.props.match.params.id}
            ></RenderRooms>
            <Button
              size="large"
              color="primary"
              variant="contained"
              href={`/branches/${branches._id}/rooms/new`}
              style={{ marginTop: "20px" }}
            >
              Add new Rooms
            </Button>
          </Container>
        </Fragment>
      )
    } else {
      return (
        <div style={{ marginTop: "150px", marginBottom: "150px" }}>
          <CircularProgress />
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { branches: state.branches[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { showBranches })(ShowBranch)
