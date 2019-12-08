import React, { Fragment } from "react"
import BranchForm from "../Layouts/branchform"
import { connect } from "react-redux"
import { Typography, Container } from "@material-ui/core"

import { createBranches } from "../../actions/branchesActions"

const branchesCreate = props => {
  return (
    <Container maxWidth="xl" align="center">
      <Typography
        variant="h4"
        component="h3"
        style={{ marginTop: "20px", marginBottom: "5px" }}
      >
        Add a Branch
      </Typography>
      <br></br>
      <BranchForm onSubmit={props.createBranches}></BranchForm>
    </Container>
  )
}

export default connect(null, { createBranches })(branchesCreate)
