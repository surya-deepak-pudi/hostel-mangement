import React, { Component } from "react"
import TenentForm from "../Layouts/tenentsForm"
import { connect } from "react-redux"
import { Typography, Container } from "@material-ui/core"
import { showTenents, updateTenents } from "../../actions/TenentsActions"
import { fetchBranches } from "../../actions/branchesActions"

class TenentsEdit extends Component {
  componentDidMount() {
    this.props.showTenents(this.props.match.params.id)
    this.props.fetchBranches(["_id", "name", "rooms", "floors"])
  }
  render() {
    return (
      <Container maxWidth="xl" align="center">
        <Typography
          // color="primary"
          variant="h4"
          component="h3"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          Add a Tenent
        </Typography>
        <br></br>
        <TenentForm
          onSubmit={(values, id) => this.props.updateTenents(values, id)}
          initialValues={this.props.tenents[this.props.match.params.id]}
          branches={this.props.branches}
          id={this.props.match.params.id}
        ></TenentForm>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { tenents: state.tenents, branches: state.branches }
}
export default connect(mapStateToProps, {
  showTenents,
  updateTenents,
  fetchBranches
})(TenentsEdit)
