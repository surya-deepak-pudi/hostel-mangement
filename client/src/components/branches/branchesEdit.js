import React, { Component } from "react"
import { Container, Typography } from "@material-ui/core"
import { connect } from "react-redux"
import _ from "lodash"
import { updateBranches, showBranches } from "../../actions/branchesActions"
import BranchForm from "../Layouts/branchform"

class BranchEdit extends Component {
  componentDidMount() {
    this.props.showBranches(this.props.match.params.id)
  }
  onSubmit = formValues => {
    this.props.updateBranches(this.props.match.params.id, formValues)
  }
  render() {
    if (this.props.branches) {
      return (
        <Container maxWidth="xl" align="center">
          <Typography
            variant="h4"
            component="h3"
            style={{ marginTop: "20px", marginBottom: "5px" }}
          >
            Edit Branch
          </Typography>
          <br></br>
          <BranchForm
            id={this.props.match.params.id}
            onSubmit={this.props.updateBranches}
            initialValues={_.pick(
              this.props.branches,
              "name",
              "careTaker",
              "number",
              "floors",
              "address",
              "image"
            )}
          ></BranchForm>
        </Container>
      )
    } else {
      return (
        <div>
          <p>not loaded yet</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { branches: state.branches[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { updateBranches, showBranches })(
  BranchEdit
)
