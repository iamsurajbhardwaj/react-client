import React from 'react';
import propTypes from 'prop-types';
import textFieldStyle from './style';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { error, label, ...rest } = this.props;
    const errorStyle = (error) ? textFieldStyle.error : {};
    return (
      <>
        {(label) ? (
          <div
            style={{
              fontWeight: 'bold', fontSize: '15px', paddingBottom: '20px', paddingTop: '20px',
            }}
          >
            {label}
          </div>
        ) : ''}
        <input type="text" {...rest} style={{ ...textFieldStyle.base, ...errorStyle }} />
        {(error) ? <span style={{ color: 'red', fontSize: '14px' }}>{error}</span> : ''}
      </>
    );
  }
}
TextField.propTypes = {
  error: propTypes.string,
  label: propTypes.string,
  value: propTypes.string.isRequired,
};
TextField.defaultProps = {
  error: '',
  label: 'Please Enter',
};
export default TextField;
