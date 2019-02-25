import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
  }

  render() {
    const {
      error,
      label,
      options,
      defaultText,
      ...rest
    } = this.props;
    return (
      <>
        {(label) ? (
          <div style={{ ...style.label }}>
            {label}
          </div>
        ) : ''}
        <>
          <select {...rest} style={{ ...style.base }}>
            <option value="">{defaultText}</option>
            {
              options.map(item => (
                <option key={item.label} value={item.label}>{item.label}</option>
              ))
            }
          </select>
        </>
        {(error) ? <span style={{ color: 'red', fontSize: '14px' }}>{error}</span> : ''}
      </>
    );
  }
}
SelectField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
  defaultText: PropTypes.string,
};
SelectField.defaultProps = {
  error: '',
  label: 'Please Choose',
  options: [],
  defaultText: 'Select',
};
export default SelectField;
