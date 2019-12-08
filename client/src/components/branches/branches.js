import React, { Component } from "react"
import { fetchBranches } from "../../actions/branchesActions"
import { connect } from "react-redux"

class Branches extends Component {
  componentDidMount() {
    this.props.fetchBranches()
  }
  render() {
    return <div>hiii</div>
  }
}
const mapStateToProps = state => {
  return { branches: state.branches }
}
export default connect(mapStateToProps, { fetchBranches })(Branches)
