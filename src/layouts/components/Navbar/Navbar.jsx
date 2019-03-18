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
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    fontSize: 10,
    marginBottom: 10,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  title: {
    flexGrow: 10,
    fontSize: '1.5rem',
  },
  menuOption: {
    flexGrow: 0.5,
    fontSize: '1rem',
  },
};

function Navbar(props) {
  const { classes } = props;
  const handleLogout = () => {
    localStorage.removeItem('token');
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" className={classes.title}>
          Trainee Portal
          </Typography>
          <Button
            className={classes.menuOption}
            color="inherit"
          >
            <Link className={classes.link} to="/">
            Trainee
            </Link>
          </Button>
          <Button
            className={classes.menuOption}
            color="inherit"
          >
            <Link className={classes.link} to="/text-field-demo">
            TEXTFIELD DEMO
            </Link>
          </Button>
          <Button
            className={classes.menuOption}
            color="inherit"
          >
            <Link className={classes.link} to="/input-demo">
            INPUT DEMO
            </Link>
          </Button>
          <Button
            className={classes.menuOption}
            color="inherit"
          >
            <Link className={classes.link} to="/children-demo">
            CHILDREN DEMO
            </Link>
          </Button>
          <Button
            className={classes.menuOption}
            color="inherit"
            onClick={() => handleLogout()}
          >
            <InputAdornment position="start">
              <ExitToApp />
            </InputAdornment>
            <Link className={classes.link} to="/login">
              Logout
            </Link>
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
