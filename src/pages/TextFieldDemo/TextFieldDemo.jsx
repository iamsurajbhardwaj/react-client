import React from 'react';
import { TextField } from '../../components';

const mainStyle = {
  display: 'flex',
  padding: '2px',
  flexDirection: 'column',
  border: '2px solid black',
};
const TextFieldDemo = () => (
  <div style={mainStyle}>
    <TextField disabled value="Disabled Input" label="This is a Disabled Input" />
    <TextField value="Accessible" label="A Valid Input" />
    <TextField value="101" label="An Input With Error" error="Could not be greater than" />
  </div>
);
export default TextFieldDemo;
