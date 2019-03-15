import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts';

const AuthRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      localStorage.token ? <Redirect to='/trainee' /> : (<AuthLayout>
      <Component {...matchProps} />
    </AuthLayout>)
    )}
  />
);
AuthRoutes.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AuthRoutes;
