import React, { Component, Fragment } from "react"
import _ from "lodash"
import { connect } from "react-redux"
import { Container, Typography, Grid, Button } from "@material-ui/core"
import { Spinner } from "../utilities/styledComponents"
import { fetchBranches, deleteBranches } from "../../actions/branchesActions"
import RenderCard from "../Layouts/branchCard"

class Branches extends Component {
  componentDidMount() {
    this.props.fetchBranches(["_id", "image", "address", "name"])
  }
  renderGrid = () => {
    if (this.props.errors.noRecords) {
      return (
        <Fragment>
          <Container align="center">
            <Typography
              component="h1"
              variant="h3"
              style={{ marginTop: "150px" }}
            >
              NO TENENTS EXISTS
            </Typography>
          </Container>
        </Fragment>
      )
    }
    if (!_.isEmpty(this.props.branches)) {
      let branches = Object.keys(this.props.branches)
      return (
        <Grid container alignItems="center" spacing={2}>
          {branches.map(branch => {
            branch = this.props.branches[branch]
            return (
              <Grid item key={branches._id} xs={12} sm={3} md={4}>
                <RenderCard
                  branch={branch}
                  deleteMethod={this.props.deleteBranches}
                ></RenderCard>
              </Grid>
            )
          })}
        </Grid>
      )
    }
    return <Spinner></Spinner>
  }
  render() {
    return (
      <Fragment>
        <Container maxWidth="md">
          <Typography
            // color="primary"
            variant="h4"
            component="h3"
            style={{ marginTop: "20px", marginBottom: "30px" }}
          >
            Branches
          </Typography>
          {this.renderGrid()}
          <Button
            color="primary"
            size="large"
            variant="contained"
            style={{ marginTop: "30px" }}
            href="branches/new"
          >
            Create New
          </Button>
        </Container>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return { branches: state.branches, errors: state.errors }
}
export default connect(mapStateToProps, { fetchBranches, deleteBranches })(
  Branches
)
