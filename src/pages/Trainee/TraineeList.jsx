import React from "react";
import Button from "@material-ui/core/Button";
import { PropTypes } from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { AddDialog, DeleteDialog, EditDialog } from "./Components";
import { Table } from "../../components";
import { mainStyle } from "../../configs/constants";
import { getDateFormatted, callApi } from "../../lib";

class TraineeList extends React.Component {
  columns = [
    {
      field: "name",
      label: "Name"
    },
    {
      field: "email",
      label: "Email-Address",
      format: value => value.toUpperCase()
    },
    {
      field: "createdAt",
      align: "right",
      label: "Date",
      format: value => getDateFormatted(value, "dddd, MMMM Do YYYY, h:mm:ss a")
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: {
        editDialog: "",
        deleteDialog: "",
        addDialog: ""
      },
      traineeRecords: [],
      page: 0,
      count: 0,
      row: "",
      order: "asc",
      orderby: "field",
      loading: true
    };
  }

  componentDidMount = () => {
    this.fetchTrainee();
  };

  handleSelect = id => () => {
    const {
      history,
      match: { path }
    } = this.props;
    return history.push(`${path}/${id}`);
  };

  fetchTrainee = async () => {
    const { page } = this.state;
    const skip = page * 20;
    const result = await callApi("get", `/trainee?limit=20&skip=${skip}`);
    const { data } = result.data;
    const { records, count,  } = data;
    this.setState({
      traineeRecords: records,
      loading: false,
      count
    });
  };

  handlePageChange = (event, page) => {
      this.setState({
      page,
      loading: true
    },()=>this.fetchTrainee());
  };

  handleClickOpen = () => {
    const { dialogOpen } = this.state;
    this.setState({
      dialogOpen: { ...dialogOpen, addDialog: true }
    });
  };

  handleEditDialogOpen = row => () => {
    const { dialogOpen } = this.state;
    this.setState({
      dialogOpen: { ...dialogOpen, editDialog: true },
      row
    });
  };

  handleDeleteDialogOpen = row => () => {
    const { dialogOpen } = this.state;
    this.setState({
      dialogOpen: { ...dialogOpen, deleteDialog: true },
      row
    });
  };

  handleClose = field => {
    const { dialogOpen } = this.state;
    this.setState({
      dialogOpen: { ...dialogOpen, [field]: false }
    }, ()=> this.fetchTrainee())
  };

  handleData = (data, field) => {
    console.log(`Successfully ${field}`, data);
    const { page, traineeRecords } = this.state;
    if(page !== 0 && traineeRecords.length === 1 ) {
      console.log('handlepagechange');
      this.setState({
        page: page-1,
        // loading: true
      },()=>this.fetchTrainee());
    }
  };

  handleSort = (order, field) => () => {
    const changeOrder = order === "desc" ? "asc" : "desc";
    const { orderby } = this.state;
    if (field !== orderby) {
      return this.setState({
        order: "asc",
        orderby: field
      });
    }
    return this.setState({
      order: changeOrder,
      orderby: field
    });
  };

  render() {
    const {
      order,
      orderby,
      page,
      dialogOpen,
      row,
      traineeRecords,
      count,
      loading
    } = this.state;
    const { editDialog, deleteDialog, addDialog } = dialogOpen;
    return (
      <div style={mainStyle}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpen}
          >
            Add Trainee
          </Button>
        </div>
        {addDialog ? (
          <AddDialog
            open={addDialog}
            handleClose={this.handleClose}
            handleData={this.handleData}
          />
        ) : (
          ""
        )}
        <DeleteDialog
          open={deleteDialog}
          data={row}
          handleClose={this.handleClose}
          handleData={this.handleData}
        />
        {editDialog ? (
          <EditDialog
            open={editDialog}
            data={row}
            handleClose={this.handleClose}
            handleData={this.handleData}
            fetchTrainee={this.fetchTrainee}
          />
        ) : (
          ""
        )}
        <Table
          id="originalId"
          actions={[
            {
              icon: <EditIcon fontSize="small" />,
              handler: this.handleEditDialogOpen
            },
            {
              icon: <DeleteIcon fontSize="small" />,
              handler: this.handleDeleteDialogOpen
            }
          ]}
          columns={this.columns}
          data={traineeRecords}
          orderBy={orderby}
          order={order}
          count={count}
          rowsPerPage={20}
          page={page}
          dataLength={traineeRecords.length}
          loading={loading}
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
  history: PropTypes.shape().isRequired
};

export default TraineeList;
