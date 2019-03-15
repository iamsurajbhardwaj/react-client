import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts';

const AuthRoutes = ({ component: Component, ...rest }) => (
  <Router>
    <Route
      {...rest}
      render={matchProps => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />
  </Router>
);
AuthRoutes.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AuthRoutes;
