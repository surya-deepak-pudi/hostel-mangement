import React, { Component, Fragment } from "react"
import { fetchBranches } from "../../actions/branchesActions"
import { connect } from "react-redux"
import { Container, Typography } from "@material-ui/core"

class Branches extends Component {
  componentDidMount() {
    this.props.fetchBranches()
  }
  render() {
    return (
      <Fragment>
        <Container maxWidth="xl" align="center">
          <Typography
            variant="h4"
            component="h3"
            style={{ marginTop: "20px", marginBottom: "5px" }}
          >
            Branches
          </Typography>
        </Container>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return { branches: state.branches }
}
export default connect(mapStateToProps, { fetchBranches })(Branches)
