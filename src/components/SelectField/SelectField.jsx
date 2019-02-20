import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    console.log('constructor');
  }

  // componentDidMount() {
  //   console.log('Didmount');
  //   this.setState({
  //   });
  // }

  // eventChangeHandler = (event) => {
  //   this.setState({
  //     value: event.target.value,
  //   });
  // }

  render() {
    const {
      error,
      label,
      options,
      defaultText,
      ...rest
    } = this.props;
    // const errorStyle = (error) ? style.error : {};
    const { value } = this.state;
    console.log('render>>>', value);
    return (
      <div>
        {(label) ? (
          <div style={{ ...style.label }}>
            {label}
          </div>
        ) : ''}
        <div>
          <select {...rest} style={{ ...style.base }}>
            <option value="">{defaultText}</option>
            {
              options.map(item => (
                <option value={item.label}>{item.label}</option>
              ))
            }
          </select>
        </div>
        {(error) ? <info style={{ color: 'red', fontSize: '14px' }}>{error}</info> : ''}
      </div>
    );
  }
}
SelectField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf,
  defaultText: PropTypes.string,
};
SelectField.defaultProps = {
  error: '',
  label: 'Please Choose',
  options: [],
  defaultText: 'Select',
  // value: '',
  // onChange: () => {},
};
export default SelectField;
