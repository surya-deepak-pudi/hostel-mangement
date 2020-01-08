import React from "react"
import TenentForm from "../Layouts/tenentsForm"
import { connect } from "react-redux"
import { Typography, Container } from "@material-ui/core"

import { createTenents } from "../../actions/TenentsActions"
import { fetchBranches } from "../../actions/branchesActions"

class TenentCreate extends React.Component {
  componentDidMount() {
    this.props.fetchBranches()
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
          onSubmit={this.props.createTenents}
          branches={this.props.branches}
        ></TenentForm>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { branches: state.branches }
}
export default connect(mapStateToProps, { createTenents, fetchBranches })(
  TenentCreate
)
