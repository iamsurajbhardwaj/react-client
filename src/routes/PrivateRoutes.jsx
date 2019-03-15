import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';

const PrivateRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      localStorage.token ? (<PrivateLayout>
      <Component {...matchProps} />
    </PrivateLayout>) : <Redirect to='/' />
    )}
  />
);
PrivateRoutes.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoutes;
