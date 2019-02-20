import React from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import * as constants from '../../configs/constants';

const mainStyle = {
  display: 'flex',
  padding: '2px',
  flexDirection: 'column',
  border: '2px solid black',
};
class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSportChange = (event) => {
    this.setState({ sport: event.target.value });
  }


  render() {
    const { name, sport } = this.state;
    // const check = (sport === 'Cricket') ? cricket : football;
    let check = '';
    if (sport) check = constants[sport.toLowerCase()];
    // console.log('check>>>', sport.toLowerCase(), check);
    return (
      <div style={mainStyle}>
        <TextField label="Name" value={name} onChange={this.handleNameChange} />
        <SelectField label="What do you play? " options={constants.options} onChange={this.handleSportChange} />
        {
          (sport) ? <RadioGroup label="What do you do?" options={check} /> : ''
        }
      </div>
    );
  }
}

export default InputDemo;
