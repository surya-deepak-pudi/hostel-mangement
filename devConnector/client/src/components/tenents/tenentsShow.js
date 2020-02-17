import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Paper
} from "@material-ui/core"
import { showTenents } from "../../actions/TenentsActions"

class ShowTenents extends Component {
  componentDidMount() {
    this.props.showTenents(this.props.match.params.id)
  }
  render() {
    let tenent = this.props.tenents[this.props.match.params.id]
    console.log(tenent)
    if (!tenent) {
      return <CircularProgress></CircularProgress>
    } else {
      return (
        <Container maxWidth="md" align="center">
          <Typography
            // color="primary"
            variant="h4"
            component="h3"
            style={{
              marginTop: "20px",
              marginBottom: "30px",
              textTransform: "capitalize"
            }}
          >
            Profile
          </Typography>
          <Paper style={{ padding: "30px" }}>
            <img
              src={tenent.image}
              alt={tenent.name}
              style={{ height: "200px", width: "200px" }}
            ></img>
            <Typography component="p" variant="subtitle1">
              <b>Name:</b>
              {tenent.name}
              <br></br>
              <b>Branch:</b>
              {tenent.BranchName}
              <br></br>
              <b>Room:</b>
              {tenent.room}
              <br></br>
              <b>Mail:</b>
              {tenent.mail}
              <br></br>
              <b>Mobile:</b>
              {tenent.number}
              <br></br>
              <b>Adhaar:</b>
              {tenent.adhar}
              <br></br>
              <b>Occupation:</b>
              {tenent.occupation}
              <br></br>
              <b>Gaurdian Name:</b>
              {tenent.gaurdianName}
              <br></br>
              <b>Gaurdian Number:</b>
              {tenent.gaurdianNumber}
              <br></br>
              <b>Gaurdian Address:</b>
              {tenent.gaurdianAddress}
            </Typography>
          </Paper>
          <Button
            size="large"
            color="primary"
            variant="contained"
            href="/tenents"
            style={{ marginTop: "20px" }}
          >
            Done
          </Button>
        </Container>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { tenents: state.tenents }
}

export default connect(mapStateToProps, { showTenents })(ShowTenents)
