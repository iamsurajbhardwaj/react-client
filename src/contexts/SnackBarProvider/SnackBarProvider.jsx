import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import { Snackbar as SnackBar } from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

export const SnackBarContext = React.createContext(() => console.log('Successfully executed'));

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
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
  },
});

function MySnackbarContent(props) {
  const { classes, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classes[variant]}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classes.iconVariant} />
          {message}
        </span>
      )}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.shape().isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'error']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class SnackBarPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      open: true,
    });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickAway') {
      return;
    }
    this.setState({ open: false });
  };

  handleSnackBar = () => {
    console.log('hello Snackbar');
  };

  render() {
    const { open } = this.state;
    const { children } = this.props;
    const variant = 'error';
    const message = 'Not Allowed';

    return (
      <>
        <SnackBarContext.Provider value={this.handleSnackBar}>
          {children}
          <SnackBar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={this.handleClose}
          >
            <MySnackbarContentWrapper
              onClose={this.handleClose}
              variant={variant}
              message={message}
            />
          </SnackBar>
        </SnackBarContext.Provider>
      </>
    );
  }
}

export default withStyles(styles2)(SnackBarPop);
