import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import { TextField, Button, Paper, Grid, Select } from "@material-ui/core"
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined"
import HotelIcon from "@material-ui/icons/Hotel"

export const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button)

export const GreyPaper = withStyles({
  root: {
    background: "#bbdefb",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "10px",
    paddingBottom: "10px",
    paddingRight: "25px",
    paddingLeft: "25px"
  }
})(Paper)

export class Repeator extends React.Component {
  createArray = number => {
    let a = []
    for (let i = 0; i < number; i++) {
      a[i] = i
    }
    return a
  }
  render() {
    let filled = this.createArray(this.props.number - this.props.vacancies)
    let vacancies = this.createArray(this.props.vacancies)
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="baseline"
      >
        <Grid item>
          {filled.map(el => {
            return <HotelIcon style={{ marginRight: "2px" }} />
          })}
        </Grid>
        <Grid item>
          {vacancies.map(el => {
            return <HotelOutlinedIcon style={{ marginRight: "2px" }} />
          })}
        </Grid>
      </Grid>
    )
  }
}

export const RedButton = withStyles({
  root: {
    background: "red",
    margin: "2px"
  },
  label: {
    color: "white"
  }
})(Button)

export const GreenButton = withStyles({
  root: {
    background: "green",
    margin: "2px"
  },
  label: {
    color: "white"
  }
})(Button)

export const YellowButton = withStyles({
  root: {
    background: "#ffc400",
    margin: "2px"
  },
  label: {
    color: "white"
  }
})(Button)

export const XsTextField = withStyles({
  root: {
    width: 100,
    marginRight: "20px",
    marginBottom: "20px"
  }
})(TextField)

export const SmTextField = withStyles({
  root: {
    width: 200,
    marginRight: "20px",
    marginBottom: "20px"
  }
})(TextField)

export const StyledSelect = withStyles({
  root: {
    width: 200
  }
})(Select)

export const MdTextField = withStyles({
  root: {
    width: 400,
    marginRight: "20px",
    marginBottom: "20px"
  }
})(TextField)

export const StyledCard = withStyles({
  root: {
    card: {
      maxWidth: 345
    },
    media: {
      height: 140
    }
  }
})

export const VerticalAlignGrid = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center"
  }
})(Grid)
