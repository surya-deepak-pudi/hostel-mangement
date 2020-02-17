import React, { Component, Fragment } from "react"
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
  Avatar
} from "@material-ui/core"
import { Link } from "react-router-dom"
import { Spinner } from "../utilities/styledComponents"

class Tenents extends Component {
  renderButtons = (buttons, tenent) => {
    let i = 0
    return (
      <Fragment>
        {buttons.map(button => {
          i++
          return <Fragment key={i}>{button(tenent)}</Fragment>
        })}
      </Fragment>
    )
  }
  otherFields = (fields, tenent) => {
    let i = 0
    i++
    return (
      <Fragment>
        {fields.map(field => {
          return (
            <Fragment key={i}>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                style={{ marginLeft: "20px" }}
              >
                {`${field}:`}
              </Typography>
              {tenent[field]}
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
  renderContent = () => {
    let tenents = Object.keys(this.props.tenents)
    return (
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
                        {this.props.fields &&
                          this.otherFields(this.props.fields, tenent)}
                      </React.Fragment>
                    }
                  />
                </Link>
                <ListItemSecondaryAction>
                  {this.renderButtons(this.props.buttons, tenent)}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          )
        })}
      </List>
    )
  }
  render() {
    return (
      <Fragment>
        {_.isEmpty(this.props.tenents) && <Spinner></Spinner>}
        {!_.isEmpty(this.props.tenents) && this.renderContent()}
      </Fragment>
    )
  }
}

export default Tenents
