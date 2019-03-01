import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, Route } from 'react-router-dom';
import { getDateFormatted } from '../../lib';
import trainees from './data/trainee';
import { NoMatch } from '../NoMatch';


const styles = {
  card: {
    margin: '3%',
  },
  media: {
    width: 200,
    height: 200,
  },
  link: {
    color: 'black',
    textDecoration: 'none',
  },
};

const TraineeDetails = (props) => {
  const { classes, match: { params: { id } } } = props;
  const card = () => {
    const details = trainees.find(item => (item.id === id));
    if (!details) return <Route component={NoMatch} />;
    const date = getDateFormatted(details.createdAt, 'dddd, MMMM Do YYYY, h:mm:ss a');
    return (
      <div>
        <Card className={classes.card}>
          <Grid container alignItems="center" spacing={16}>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={details.imagePath}
                title={details.name}
              />
            </Grid>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {details.name}
              </Typography>
              <p style={{ color: 'gray' }}>{date}</p>
              <p>{details.email}</p>
            </CardContent>
          </Grid>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="small" variant="contained">
            <Link className={classes.link} to="/trainee">
            back
            </Link>
          </Button>
        </div>

      </div>
    );
  };
  return (
    <div>
      { card() }
    </div>
  );
};

TraineeDetails.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default withStyles(styles)(TraineeDetails);
