import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import { Person, Email, VisibilityOff, Visibility } from '@material-ui/icons/';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as constants from '../../../../configs/constants';


class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordVisibility: {
        showPassword: false,
        showConfirmPassword: false,
      },
      errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      isTouched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
      hasError: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleClickShowPassword = field => () => {
    const { passwordVisibility } = this.state;
    this.setState({
      passwordVisibility: { ...passwordVisibility, [field]: !passwordVisibility[field] },
    });
  };

  handleChange = field => (event) => {
    const { isTouched } = this.state;
    this.setState({
      [field]: event.target.value,
      isTouched: { ...isTouched, [field]: true },
    }, this.getError(field));
  };

  getError = field => () => {
    const { errors, hasError, isTouched, ...rest } = this.state;
    constants.schema1.validate(rest, { abortEarly: false })
      .then(() => {
        this.setState({
          errors: { ...errors, [field]: '' },
          hasError: { ...hasError, [field]: false },
        });
      })
      .catch((error) => {
        error.inner.forEach((err) => {
          if (err.path === field) {
            this.setState({
              errors: { ...errors, [field]: err.message },
              hasError: { ...hasError, [field]: true },
            });
          }
        });
        if (!error.inner.some(err => err.path === field) && hasError[field]) {
          this.setState({
            errors: { ...errors, [field]: '' },
            hasError: { ...hasError, [field]: false },
          });
        }
      });
  }

  buttonCheck = () => {
    const { hasError, isTouched } = this.state;
    let notError = 0;
    let touched = 0;
    let result = false;
    Object.keys(hasError).forEach((i) => {
      if (hasError[i] === false) {
        notError += 1;
      }
    });
    Object.keys(isTouched).forEach((i) => {
      if (isTouched[i] === true) {
        touched += 1;
      }
    });
    if (notError === 4 && touched === 4) {
      result = true;
    } else if (notError !== 4 && touched !== 4) {
      result = false;
    }
    return result;
  }

  onSubmitClick = () => {
    const { name, email, password } = this.state;
    const { handleClose, handleData } = this.props;
    handleData({ name, email, password });
    handleClose();
  }

  render() {
    const { open, handleClose } = this.props;
    const {
      errors, name, email, password, confirmPassword, hasError, passwordVisibility,
    } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="Add-trainee" color="primary">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your trainee details
            </DialogContentText>
            <TextField
              id="outlined-name"
              label="Name"
              className="textField"
              value={name}
              error={hasError.name}
              helperText={errors.name}
              onChange={this.handleChange('name')}
              onBlur={this.getError('name')}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              id="outlined-email"
              label="Email"
              className="textField"
              value={email}
              error={hasError.email}
              helperText={errors.email}
              onChange={this.handleChange('email')}
              onBlur={this.getError('email')}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-password"
                  label="Password"
                  className="textField"
                  type={passwordVisibility.showPassword ? 'text' : 'password'}
                  value={password}
                  error={hasError.password}
                  helperText={errors.password}
                  onChange={this.handleChange('password')}
                  onBlur={this.getError('password')}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword('showPassword')}
                        >
                          {passwordVisibility.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-confirm-password"
                  type={passwordVisibility.showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  className="textField"
                  value={confirmPassword}
                  error={hasError.confirmPassword}
                  helperText={errors.confirmPassword}
                  onChange={this.handleChange('confirmPassword')}
                  onBlur={this.getError('confirmPassword')}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword('showConfirmPassword')}
                        >
                          {passwordVisibility.showConfirmPassword
                            ? <Visibility />
                            : <VisibilityOff />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            {
              this.buttonCheck() ? <Button color="primary" onClick={this.onSubmitClick}>Submit</Button> : <Button disabled color="primary">Submit</Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddDialog;

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleData: PropTypes.func.isRequired,
};
