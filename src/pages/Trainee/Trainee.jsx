import React from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './Components';


class Trainee extends React.Component {
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
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        {open ? <AddDialog open={open} handleClose={this.handleClose} handleData={this.handleData} /> : ''}
      </div>
    );
  }
}

export default Trainee;
