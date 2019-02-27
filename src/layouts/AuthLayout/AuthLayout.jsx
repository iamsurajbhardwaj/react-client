import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';

const AuthLayout = ({ children }) => (
  <div className="page page-dashboard">
    <div className="main">
      {children}
      <Footer />
    </div>
  </div>
);
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthLayout;
