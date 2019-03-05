import React from 'react';
import Button from '@material-ui/core/Button';
import { PropTypes } from 'prop-types';
import { AddDialog } from './Components';
import { Table } from '../../components';
import { mainStyle } from '../../configs/constants';
import trainees from './data/trainee';
import { getDateFormatted } from '../../lib';

class TraineeList extends React.Component {
  columns = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'email',
      label: 'Email-Address',
      format: value => value.toUpperCase(),
    },
    {
      field: 'createdAt',
      align: 'right',
      label: 'Date',
      format: value => getDateFormatted(value, 'dddd, MMMM Do YYYY, h:mm:ss a'),
    },
  ];

  constructor(props) {
    super(props);
    this.state = ({
      open: '',
      name: '',
      email: '',
      password: '',
      order: 'asc',
      orderby: 'field',
    });
  }

  handleSelect = id => () => {
    const { history, match: { path: Path } } = this.props;
    return (
      history.push(`${Path}/${id}`)
    );
  }

  handleSort = (order, field) => () => {
    const changeOrder = (order === 'desc') ? 'asc' : 'desc';
    const { orderby } = this.state;
    if (field !== orderby) {
      return (
        this.setState({
          order: 'asc',
          orderby: field,
        })
      );
    }
    return (
      this.setState({
        order: changeOrder,
        orderby: field,
      })
    );
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
    const { open, order, orderby } = this.state;
    return (
      <div style={mainStyle}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button size="small" variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Trainee
          </Button>
        </div>
        {open ? <AddDialog open={open} handleClose={this.handleClose} handleData={this.handleData} /> : ''}
        <Table
          id="id"
          columns={this.columns}
          data={trainees}
          orderBy={orderby}
          order={order}
          onSort={this.handleSort}
          onselect={this.handleSelect}
        />
      </div>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default TraineeList;
