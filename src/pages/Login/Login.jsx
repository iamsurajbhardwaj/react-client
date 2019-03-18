import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { Email, VisibilityOff, Visibility } from '@material-ui/icons/';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { schemaLogin } from '../../configs/constants';
import { callApi } from '../../lib';
import { SnackbarConsumer } from '../../contexts';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      errors: {
        email: '',
        password: '',
      },
      hasError: {
        email: false,
        password: false,
      },
      isTouched: {
        email: false,
        password: false,
      },
    };
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword });
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
    schemaLogin.validate(rest, { abortEarly: false })
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

  handleClick =  async (snackBarOpen) => {
    this.setState({
      loading: true,
    })
    const { history } = this.props;
    const { email, password } = this.state;
    const result = await callApi('post', '/user/login', { email, password });
    if (result.data) {
      const { data } = result.data;
      localStorage.setItem('token', data);
      history.push('/trainee')
    } else  snackBarOpen(result.message, 'error')
    this.setState({
      loading: false,
    })

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
    if (notError === 2 && touched === 2) {
      result = true;
    } else if (notError !== 4 && touched !== 4) {
      result = false;
    }
    return result;
  }

  render() {
    const { classes } = this.props;
    const { email, password, hasError, errors, showPassword, loading } = this.state;
    return (
      <SnackbarConsumer>
        {snackBarOpen => (
          <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            id="outlined-email"
            label="Email"
            className="email"
            value={email}
            error={hasError.email}
            helperText={errors.email}
            onChange={this.handleChange('email')}
            onBlur={this.getError('email')}
            margin="normal"
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="outlined-password"
            label="Password"
            className="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            error={hasError.password}
            helperText={errors.password}
            onChange={this.handleChange('password')}
            onBlur={this.getError('password')}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!(this.buttonCheck()) || (loading)}
            className={classes.submit}
            onClick={() => this.handleClick(snackBarOpen)}
          >
            {loading ? <CircularProgress /> : 'Sign in'}
          </Button>
        </Paper>
      </main>
        )}
      </SnackbarConsumer>

    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Login);
