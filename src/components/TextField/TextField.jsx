import React from 'react';
import propTypes from 'prop-types';
import textFieldStyle from './style';

const TextField = (props) => {
  const { error, label, ...rest } = props;
  const errorStyle = (error) ? textFieldStyle.error : {};
  return (
    <>
      {(label) ? (
        <info
          style={{
            fontWeight: 'bold', fontSize: '15px', paddingBottom: '20px', paddingTop: '20px',
          }}
        >
          {label}
        </info>
      ) : ''}
      <input type="text" {...rest} style={{ ...textFieldStyle.base, ...errorStyle }} />
      {(error) ? <info style={{ color: 'red', fontSize: '14px' }}>{error}</info> : ''}
    </>
  );
};
TextField.propTypes = {
  error: propTypes.string,
  label: propTypes.string,
};
TextField.defaultProps = {
  error: '',
  label: 'Please Enter',
};
export default TextField;
