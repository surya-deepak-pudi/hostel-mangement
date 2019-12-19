import { withStyles } from "@material-ui/core/styles"
import { TextField, Button, Paper, Grid } from "@material-ui/core"

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
