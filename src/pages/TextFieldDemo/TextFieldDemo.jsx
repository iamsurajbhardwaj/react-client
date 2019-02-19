import React from 'react';
import { TextField, Slider } from '../../components';
import { PUBLIC_IMAGE_FOLDER } from '../../configs/constants';

const mainStyle = {
  display: 'flex',
  padding: '2px',
  flexDirection: 'column',
  border: '2px solid black',
};
const imageArray = [
  `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
  `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
  `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE_FOLDER}js.jpg`,
  `${PUBLIC_IMAGE_FOLDER}load-balancer.png`];
const TextFieldDemo = () => (
  <div style={mainStyle}>
    <Slider banner={imageArray} />
    <TextField disabled value="Disabled Input" label="This is a Disabled Input" />
    <TextField value="Accessible" label="A Valid Input" />
    <TextField value="101" label="An Input With Error" error="Could not be greater than" />
  </div>
);
export default TextFieldDemo;
