import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';

const DeleteDialog = (props) => {
  const { open, handleClose, handleData, data } = props;

  const onSubmitClick = () => {
    const { name, email } = data;
    handleData({ name, email }, 'Deleted');
    handleClose('deleteDialog');
  };
  return (
    <div>
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
          <Button onClick={() => handleClose('deleteDialog')} color="primary">
              Cancel
          </Button>
          <Button onClick={onSubmitClick} color="primary" autoFocus>
              Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default DeleteDialog;

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleData: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
