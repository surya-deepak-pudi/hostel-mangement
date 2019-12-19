import React, { Component, Fragment } from "react"
import _ from "lodash"
import { connect } from "react-redux"
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Button
} from "@material-ui/core"
import { fetchBranches, deleteBranches } from "../../actions/branchesActions"
import RenderCard from "../Layouts/branchCard"

class Branches extends Component {
  componentDidMount() {
    this.props.fetchBranches()
  }
  renderGrid = () => {
    if (!_.isEmpty(this.props.branches)) {
      let branches = Object.keys(this.props.branches)
      return (
        <Grid container justify="center" alignItems="center" spacing={2}>
          {branches.map(branch => {
            branch = this.props.branches[branch]
            return (
              <Grid item key={branches._id} xs={12} sm={4} md={3}>
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
    return (
      <div style={{ marginTop: "150px", marginBottom: "150px" }}>
        <CircularProgress />
      </div>
    )
  }
  render() {
    return (
      <Fragment>
        <Container maxWidth="xl" align="center">
          <Typography
            color="primary"
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
  return { branches: state.branches }
}
export default connect(mapStateToProps, { fetchBranches, deleteBranches })(
  Branches
)
