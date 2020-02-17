import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import _ from "lodash"
import { Typography, Container, Button } from "@material-ui/core"
import { Spinner } from "../utilities/styledComponents"
import { fetchBalances, payRent } from "../../actions/TenentsActions"
import TenentsList from "../Layouts/tennetsList"

class Tenents extends Component {
  componentDidMount() {
    this.props.fetchBalances()
  }
  paidButton = tenent => {
    return (
      <Button
        onClick={() => {
          this.props.payRent(tenent._id)
          document.location.reload()
        }}
        color="primary"
        variant="contained"
      >
        Paid
      </Button>
    )
  }
  render() {
    return (
      <Container maxWidth="md" align="center">
        <Typography
          // color="primary"
          variant="h4"
          component="h3"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          BALANCES
        </Typography>
        {!this.props.errors.noRecords && (
          <TenentsList
            fields={["rent", "dues"]}
            buttons={[this.paidButton]}
            tenents={this.props.tenents}
          />
        )}
        {this.props.errors.noRecords && (
          <Fragment>
            <Typography
              component="h1"
              variant="h3"
              style={{ marginTop: "150px", marginBottom: "150px" }}
            >
              {"NO PAYMENTS TO BE RECIEVED"}
            </Typography>
          </Fragment>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { tenents: state.tenents, errors: state.errors }
}
export default connect(mapStateToProps, {
  fetchBalances,
  payRent
})(Tenents)
