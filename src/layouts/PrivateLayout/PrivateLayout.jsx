import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components';

const PrivateLayout = ({ children }) => (
  <div className="private-layout">

    <div>
      <div><Navbar /></div>

      <div>{children}</div>
    </div>
  </div>
);
PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired,
};


export default PrivateLayout;
