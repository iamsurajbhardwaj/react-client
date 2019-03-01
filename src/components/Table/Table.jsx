import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {
  const { classes, column, data, id } = props;

  const tableHead = column.map((item) => {
    const { field, label, ...rest } = item;
    return (
      <TableCell key={field} {...rest}>{label}</TableCell>
    );
  });
  const dataEntry = data.map((item) => {
    const { id: Id } = item;
    return (
      <TableRow key={Id}>
        {column.map((a) => {
          const { align, field } = a;
          return (
            <TableCell align={align} key={`${Id}.${field}`}>{item[field]}</TableCell>
          );
        })}
      </TableRow>
    );
  });
  return (
    <Paper className={classes.root}>
      <Table key={id} className={classes.table}>
        <TableHead>
          <TableRow key={id}>
            {tableHead}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataEntry}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.shape().isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleTable);
