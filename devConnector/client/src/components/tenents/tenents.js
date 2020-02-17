import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import _ from "lodash"
import {
  Typography,
  Container,
  Button,
  CircularProgress
} from "@material-ui/core"
import { YellowButton } from "../utilities/styledComponents"
import { DeleteButton } from "../utilities/FieldComponets"
import { fetchTenents, deleteTenents } from "../../actions/TenentsActions"
import { fetchBranches } from "../../actions/branchesActions"
import TenentsList from "../Layouts/tennetsList"

class Tenents extends Component {
  componentDidMount() {
    this.props.fetchTenents()
    this.props.fetchBranches(["_id", "name"])
  }
  editButton = tenent => {
    return (
      <YellowButton href={`/tenents/edit/${tenent._id}`}>Edit</YellowButton>
    )
  }
  deleteButton = tenent => {
    return (
      <DeleteButton
        onClickMethod={() => {
          this.props.deleteTenents(tenent._id)
        }}
      ></DeleteButton>
    )
  }
  render() {
    let buttonArray = []
    buttonArray[0] = this.editButton
    buttonArray[1] = this.deleteButton
    return (
      <Container maxWidth="md" align="center">
        <Typography
          // color="primary"
          variant="h4"
          component="h3"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          Tenants
        </Typography>
        {!this.props.errors.noRecords && (
          <TenentsList
            tenents={this.props.tenents}
            branches={this.props.branches}
            buttons={buttonArray}
          ></TenentsList>
        )}
        {this.props.errors.noRecords && (
          <Fragment>
            <Typography
              component="h1"
              variant="h3"
              style={{ marginTop: "150px", marginBottom: "150px" }}
            >
              NO TENENTS ADDED
            </Typography>
          </Fragment>
        )}
        <Button
          size="large"
          color="primary"
          variant="contained"
          style={{ marginTop: "30px" }}
          href="/tenents/new"
        >
          Add tenant
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    branches: state.branches,
    tenents: state.tenents,
    errors: state.errors
  }
}
export default connect(mapStateToProps, {
  fetchTenents,
  deleteTenents,
  fetchBranches
})(Tenents)
