import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const SnackBarContext = React.createContext(() => console.log('Snackbar context'));
export const SnackbarConsumer = SnackBarContext.Consumer;

const styles = theme => ({
  success: {
    backgroundColor: green[500],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing.unit,
  },
});

class SnackBarProvider extends Component {
  variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: '',
      message: '',
    };
  }

  handleOpen = (message, status) => {
    this.setState({
      open: true,
      message,
      status,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { status, message, open } = this.state;
    const { classes, children, ...rest } = this.props;
    const Icon = this.variantIcon[status];
    return (
      <SnackBarContext.Provider value={this.handleOpen}>
        {children}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          onClose={this.handleClose}
          autoHideDuration={3000}
        >
          <SnackbarContent
            className={classes[status]}
            aria-describedby="snackbar"
            message={
              (
                <span id="snackbar" className={classes.message}>
                  <Icon className={classNames(classes.icon, classes.iconVariant)} />
                  {message}
                </span>
              )
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
            {...rest}
          />
        </Snackbar>
      </SnackBarContext.Provider>
    );
  }
}

SnackBarProvider.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(SnackBarProvider);
