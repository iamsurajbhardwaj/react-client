import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContentText from '@material-ui/core/DialogContentText';
import { SnackbarConsumer } from '../../../../contexts/SnackbarProvider';
import { callApi } from '../../../../lib';

class DeleteDialog extends React.Component {
  constructor(props){
    super(props);
    this.state=({
      loading: false,
    })
  }

  onSubmitClick =  async (snackBarOpen) => {
    const { handleClose, handleData, data } = this.props;
    const { originalId: id, name, email, createdAt } = data;
    this.setState({
      loading: true,
    })
    const result = await callApi('delete', `/trainee/${id}`);
    const { message, status } = result.data;
    if (status === 'ok') {
      if (moment(createdAt).isBefore('2019-02-14')) {
        return snackBarOpen('Trainee deleted successfully', 'success');
      }
      snackBarOpen(message, 'success')
      handleData({ name, email }, 'Deleted');
      handleClose('deleteDialog');
    } else {
      snackBarOpen(message, 'error')
    }
    this.setState({
      loading: false,
    })
  }

  render() {
    const { open, handleClose, loading } = this.props;
    return (
      <div>
        <SnackbarConsumer>
          {snackBarOpen => (
            <Dialog
              open={open}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Do you really want to delete?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose('deleteDialog')} variant="contained" disabled={loading} color="primary">
                Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={() => this.onSubmitClick(snackBarOpen)}
                >
                  {(loading) ? <CircularProgress /> : 'Delete'}
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </SnackbarConsumer>
      </div>
    );
  }

};


export default DeleteDialog;

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleData: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
