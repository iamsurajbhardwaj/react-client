import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  footer: {
    fontSize: 5,
    backgroundColor: theme.palette.common.black,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    cursor: 'pointer',
  },
  link: {
    color: theme.palette.common.black,
    textDecoration: 'none',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[200],
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[400],
    },
  },
});


function SimpleTable(props) {
  const { classes,
    columns,
    data,
    id,
    onselect,
    order,
    orderBy,
    onSort,
    count,
    rowsPerPage,
    page,
    actions,
    onChangePage } = props;

  const tableHeadEntry = columns.map((item) => {
    const { field, label, ...rest } = item;
    return (
      <CustomTableCell key={field} {...rest}>
        <TableSortLabel
          active={orderBy === field}
          direction={order}
          onClick={onSort(order, field)}
        >
          {(!label) ? field : label}
        </TableSortLabel>
      </CustomTableCell>
    );
  });

  const tablePagination = () => {
    if (!count) return null;
    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[false]}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
          />
        </TableRow>
      </TableFooter>
    );
  };
  const dataEntry = data.map((row) => {
    const { id: Id } = row;
    return (
      <TableRow className={classes.row} key={row[id]}>
        {columns.map((column) => {
          const { align, field, format } = column;
          return (
            <CustomTableCell onClick={onselect(Id)} align={align} key={`${row[id]}.${field}`}>
              {(format) ? format(row[field]) : row[field] }
            </CustomTableCell>
          );
        })}
        <CustomTableCell>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {actions.map((action, index) => {
              const { icon, handler } = action;
              return (
                <IconButton key={index} onClick={handler(row)}>
                  {icon}
                </IconButton>
              );
            })}
          </div>
        </CustomTableCell>
      </TableRow>
    );
  });
  return (
    <Paper className={classes.root}>
      <Table key={id} className={classes.table}>
        <TableHead>
          <TableRow className={classes.row} key={id}>
            {tableHeadEntry}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataEntry}
        </TableBody>
        {tablePagination()}
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.shape().isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  onselect: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
SimpleTable.defaultProps = {
  page: 0,
  rowsPerPage: 100,
};

export default withStyles(styles)(SimpleTable);
