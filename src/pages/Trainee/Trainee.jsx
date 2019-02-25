import React from 'react';
import Button from '@material-ui/core/Button';
import AddDialog from './Components/AddDialog/AddDialog';


class ChildrenDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ open: '' });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        <AddDialog open={open} />
      </div>
    );
  }
}

export default ChildrenDemo;
