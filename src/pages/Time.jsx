import React from 'react';
import moment from 'moment';

const Time = () => {
  const time = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

  return (
    <>
      <p>Hello</p>
      <p><strong>Date Time is:</strong></p>
      <p>{`${time}`}</p>
    </>
  );
};

export default Time;
