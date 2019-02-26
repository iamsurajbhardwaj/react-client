import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ExitToApp } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = {
  root: {
    flexGrow: 1,
    fontSize: 10,
    marginBottom: 10,
  },
  part1: {
    flexGrow: 10,
    fontSize: 15,
  },
  part2: {
    flexGrow: 0.5,
    fontSize: 15,
  },
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" className={classes.part1}>
            Trainee Portal
          </Typography>
          <Typography color="inherit" className={classes.part2}>
            TRAINEE
          </Typography>
          <Typography color="inherit" className={classes.part2}>
            TEXTFIELD DEMO
          </Typography>
          <Typography color="inherit" className={classes.part2}>
            INPUT DEMO
          </Typography>
          <Typography color="inherit" className={classes.part2}>
            CHILDREN DEMO
          </Typography>
          <Button
            className={classes.part2}
            color="inherit"
          >
            <InputAdornment position="start">
              <ExitToApp />
            </InputAdornment>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Navbar);
