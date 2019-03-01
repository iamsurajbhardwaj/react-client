import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AddDialog } from './Components';
import { Table } from '../../components';
import { mainStyle } from '../../configs/constants';
import trainees from './data/trainee';

const column = [
  {
    field: 'name',
    align: 'center',
    label: 'Name',
  },
  {
    field: 'email',
    label: 'Email-Address',
  },
];
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
    const { match: { path: Path } } = this.props;
    return (
      <div style={mainStyle}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Trainee
          </Button>
        </div>
        {open ? <AddDialog open={open} handleClose={this.handleClose} handleData={this.handleData} /> : ''}
        <Table id="table1" column={column} data={trainees} />
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
