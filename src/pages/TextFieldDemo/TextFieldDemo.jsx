import '../../components';
import React from 'react';

const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  // padding: '1%',
  border: '2px solid black',
};
const props = {
  margin: '2px',
  border: '1px solid gray',
  borderRadius: '5px',
  padding: '5px',
};
const bold = {
  fontWeight: 'bold',
  fontSize: '14px',
};
const errorMessage = {
  color: '#cc0033',
  display: 'inline-block',
  fontSize: '12px',
  lineHeight: '15px',
  margin: '5px 0 0',
};
const border = {
  margin: '2px',
  border: '1px solid red',
  borderRadius: '5px',
  padding: '5px',
};
const TextFieldDemo = () => (
  <div style={mainStyle}>
    <p style={bold}>This is a disabled input </p>
    <input type="text" disabled placeholder="Disabled Input" style={props} />
    <p style={bold}>A valid input </p>
    <input type="text" value="Accessible" style={props} />
    <p style={bold}>An input with error </p>
    <input type="text" value="101" style={border} />
    <p style={errorMessage}>Could not be greater</p>
  </div>
);
export default TextFieldDemo;
