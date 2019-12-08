import React from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 400
  },
  button: {
    marginRight: theme.spacing(3)
  }
}))

const Header = props => {
  const classes = useStyles()
  return (
    <AppBar position="static" className={classes.palette}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          href="/"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Hostel Name
        </Typography>
        <Button href="/branches" color="inherit" className={classes.button}>
          Branches
        </Button>
        <Button href="/tenents" color="inherit" className={classes.button}>
          Tenents
        </Button>
        <Button href="/balances" color="inherit" className={classes.button}>
          Balance
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
