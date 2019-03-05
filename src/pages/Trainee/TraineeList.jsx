import React from 'react';
import Button from '@material-ui/core/Button';
import { PropTypes } from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AddDialog, DeleteDialog, EditDialog } from './Components';
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
      dialogOpen: {
        editDialog: '',
        deleteDialog: '',
        addDialog: '',
      },
      page: 0,
      row: '',
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

  handlePageChange = (event, page) => {
    this.setState({
      page,
    });
  }

  handleClickOpen = () => {
    const { dialogOpen } = this.state;
    this.setState({
      dialogOpen: { ...dialogOpen, addDialog: true },
    });
  };

  handleEditDialogOpen = row => () => {
    const { dialogOpen } = this.state;
    this.setState({
      dialogOpen: { ...dialogOpen, editDialog: true },
      row,
    });
  }

  handleDeleteDialogOpen = row => () => {
    const { dialogOpen } = this.state;
    this.setState({
      dialogOpen: { ...dialogOpen, deleteDialog: true },
      row,
    });
  }

  handleClose = (field) => {
    const { dialogOpen } = this.state;
    this.setState({
      dialogOpen: { ...dialogOpen, [field]: false },
    });
  };

  handleData = (data, field) => {
    console.log(`Successfully ${field}`, data);
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

  render() {
    const { order, orderby, page, dialogOpen, row } = this.state;
    const { editDialog, deleteDialog, addDialog } = dialogOpen;
    return (
      <div style={mainStyle}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button size="small" variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Trainee
          </Button>
        </div>
        {addDialog ? <AddDialog open={addDialog} handleClose={this.handleClose} handleData={this.handleData} /> : ''}
        {deleteDialog ? <DeleteDialog open={deleteDialog} data={row} handleClose={this.handleClose} handleData={this.handleData} /> : ''}
        {editDialog ? <EditDialog open={editDialog} data={row} handleClose={this.handleClose} handleData={this.handleData} /> : ''}
        <Table
          id="id"
          actions={
            [
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleDeleteDialogOpen,
              },
            ]
          }
          columns={this.columns}
          data={trainees}
          orderBy={orderby}
          order={order}
          count={100}
          rowsPerPage={10}
          page={page}
          onSort={this.handleSort}
          onselect={this.handleSelect}
          onChangePage={this.handlePageChange}
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
