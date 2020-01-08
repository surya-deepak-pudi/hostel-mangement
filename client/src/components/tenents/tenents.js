import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import history from "../../history"
import _ from "lodash"
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Avatar,
  CircularProgress
} from "@material-ui/core"
import { Link } from "react-router-dom"
import { YellowButton } from "../utilities/styledComponents"
import { DeleteButton } from "../utilities/FieldComponets"
import { fetchTenents, deleteTenents } from "../../actions/TenentsActions"
import { fetchBranches } from "../../actions/branchesActions"

class Tenents extends Component {
  componentDidMount() {
    this.props.fetchTenents()
    this.props.fetchBranches()
  }
  render() {
    if (!_.isEmpty(this.props.tenents)) {
      let tenents = Object.keys(this.props.tenents)
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
          <List>
            {tenents.map(tenent => {
              tenent = this.props.tenents[tenent]
              return (
                <Fragment>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={tenent.name} src={tenent.image} />
                    </ListItemAvatar>
                    <Link
                      to={`tenents/show/${tenent._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemText
                        primary={tenent.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              branch:
                            </Typography>
                            {tenent.BranchName}
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                              style={{ marginLeft: "20px" }}
                            >
                              room:
                            </Typography>
                            {tenent.room}
                          </React.Fragment>
                        }
                      />
                    </Link>
                    <ListItemSecondaryAction>
                      <YellowButton href={`/tenents/edit/${tenent._id}`}>
                        Edit
                      </YellowButton>
                      <DeleteButton
                        onClickMethod={() => {
                          this.props.deleteTenents(tenent._id)
                        }}
                      ></DeleteButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>
              )
            })}
          </List>
        </Container>
      )
    }
    return <CircularProgress />
  }
}

const mapStateToProps = state => {
  return { branches: state.branches, tenents: state.tenents }
}
export default connect(mapStateToProps, {
  fetchTenents,
  deleteTenents,
  fetchBranches
})(Tenents)
