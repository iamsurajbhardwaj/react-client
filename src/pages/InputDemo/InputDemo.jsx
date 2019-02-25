import React from 'react';
import { TextField, SelectField, RadioGroup, Button } from '../../components';
import * as constants from '../../configs/constants';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = constants.state;
  }

  handleChange = field => (event) => {
    const { isTouched } = this.state;
    if (field === 'sport') {
      this.setState({
        role: '',
      });
    }
    this.setState({
      [field]: event.target.value,
      isTouched: { ...isTouched, [field]: true },
    }, this.getError(field));
  };

  buttonCheck = () => {
    const { hasError, isTouched } = this.state;
    let notError = 0;
    let touched = 0;
    let result = false;
    Object.keys(hasError).forEach((i) => {
      if (hasError[i] === false) {
        notError += 1;
      }
    });
    Object.keys(isTouched).forEach((i) => {
      if (isTouched[i] === true) {
        touched += 1;
      }
    });
    if (notError === 3 && touched === 3) {
      result = true;
    } else if (notError !== 3 && touched !== 3) {
      result = false;
    }
    return result;
  }

  getError = field => () => {
    const { errors, hasError, isTouched, ...rest } = this.state;
    constants.schema.validate(rest, { abortEarly: false })
      .then(() => {
        this.setState({
          errors: { ...errors, [field]: '' },
          hasError: { ...hasError, [field]: false },
        });
      })
      .catch((error) => {
        error.inner.forEach((err) => {
          if (err.path === field) {
            this.setState({
              errors: { ...errors, [field]: err.message },
              hasError: { ...hasError, [field]: true },
            });
          }
        });
        if (!error.inner.some(err => err.path === field) && hasError[field]) {
          this.setState({
            errors: { ...errors, [field]: '' },
            hasError: { ...hasError, [field]: false },
          });
        }
      });
  }

  render() {
    const { name, sport, role, errors } = this.state;
    console.log('state', this.state);
    let check = '';
    if (sport) check = constants[sport.toLowerCase()];
    return (
      <div style={constants.mainStyle}>
        <TextField label="Name" value={name} error={errors.name} onChange={this.handleChange('name')} onBlur={this.getError('name')} />
        <SelectField label="Which game do you play? " value={sport} options={constants.options} error={errors.sport} onChange={this.handleChange('sport')} onBlur={this.getError('sport')} />
        {
          (sport) ? <RadioGroup label="What do you do?" value={role} options={check} error={errors.role} onChange={this.handleChange('role')} onBlur={this.getError('role')} /> : ''
        }
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button value="Cancel" />
          {
            this.buttonCheck() ? <Button style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold' }} value="Submit" /> : <Button disabled value="Submit" />
          }
        </div>
      </div>
    );
  }
}
export default InputDemo;
