import React from 'react';

const styles = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
};

const NoMatch = () => (
  <div style={styles}>
    <div><h1>Not Found</h1></div>
    <div>Seems like the page you are looking for does not exits !</div>
    <h2>:(</h2>
  </div>
);

export default NoMatch;
