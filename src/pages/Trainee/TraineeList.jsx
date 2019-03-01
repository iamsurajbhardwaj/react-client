import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AddDialog } from './Components';

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      open: '',
      name: '',
      email: '',
      password: '',
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleData = (data) => {
    const { name, email, password } = data;
    this.setState({
      name,
      email,
      password,
    });
  }

  render() {
    console.log('Trainee data after creation', this.state);
    const { open } = this.state;
    const { match: { path: Path }, match } = this.props;
    console.log('>>>>>>>>>>>>>>>>>>>>', match);
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        {open ? <AddDialog open={open} handleClose={this.handleClose} handleData={this.handleData} /> : ''}
        <ul>
          <li>
            <Link to={`${Path}/5c6c47af7740654f0915fac9`}>
            Sachin Tendulkar
            </Link>
          </li>
          <li>
            <Link to={`${Path}/5c6c47af7740654f0455fac9`}>
            Virat Kohli
            </Link>
          </li>
          <li>
            <Link to={`${Path}/5c6567af7740654f0915fac9`}>
            M.S. Dhoni
            </Link>
          </li>
          <li>
            <Link to={`${Path}/5c6c47af7747854f0915fac9`}>
            Rohit Sharma
            </Link>
          </li>
          <li>
            <Link to={`${Path}/5c6c47af7740654f0915876c9`}>
            Bumrah
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default TraineeList;
