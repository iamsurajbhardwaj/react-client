import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TraineeList } from '.';
import TraineeDetails from './TraineeDetails';

const Trainee = (props) => {
  const { match: { path: Path } } = props;
  return (
    <Router>
      <Switch>
        <Route exact path={`${Path}/:id`} component={TraineeDetails} />
        <Route exact path={`${Path}`} component={TraineeList} />
      </Switch>
    </Router>
  );
};

Trainee.propTypes = {
  match: PropTypes.shape().isRequired,
};


export default Trainee;
