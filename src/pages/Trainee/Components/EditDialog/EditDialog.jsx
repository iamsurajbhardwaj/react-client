import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Person, Email } from '@material-ui/icons/';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as constants from '../../../../configs/constants';
import { SnackbarConsumer } from '../../../../contexts/SnackbarProvider';


class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      errors: {
        name: '',
        email: '',
      },
      hasError: {
        name: false,
        email: false,
      },
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const { name, email } = data;
    this.setState({
      name,
      email,
    });
  }

  handleChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, this.getError(field));
  };

  getError = field => () => {
    const { errors, hasError, ...rest } = this.state;
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
    const { hasError, name, email } = this.state;
    const { data } = this.props;
    let touched = false;
    let notError = 0;
    let result = false;
    Object.keys(hasError).forEach((i) => {
      if (hasError[i] === false) {
        notError += 1;
      }
    });
    if (data.name !== name || data.email !== email) {
      touched = true;
    }
    if (notError === 2 && touched) {
      result = true;
    } else if (notError !== 2) {
      result = false;
    }
    return result;
  }

  onSubmitClick = snackBarOpen => () => {
    const { name, email } = this.state;
    const { handleClose, handleData } = this.props;
    handleData({ name, email }, 'Updated');
    handleClose('editDialog');
    snackBarOpen('Trainee Updated Successfully', 'success');
  }

  render() {
    const { open, handleClose } = this.props;
    const {
      errors, name, email, hasError } = this.state;
    return (
      <div>
        <SnackbarConsumer>
          {snackBaropen => (
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
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={() => handleClose('editDialog')}>
              Cancel
                </Button>
                {
                  this.buttonCheck() ? <Button color="primary" onClick={this.onSubmitClick(snackBaropen)}>Submit</Button> : <Button disabled color="primary">Submit</Button>
                }
              </DialogActions>
            </Dialog>
          )}
        </SnackbarConsumer>

      </div>
    );
  }
}

export default AddDialog;

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleData: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
