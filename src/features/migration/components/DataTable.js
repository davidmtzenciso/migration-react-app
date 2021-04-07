import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import { styles } from './styles';


import { Table, TableBody, TableCell, TableContainer,
        TableHead, TableRow,
        Grid, Paper, withStyles
      }  from '@material-ui/core';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.pod = this.props.pod;
    this.pod = "not selected";
  }

  createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  createRows() {
   return [
    this.createData(' ', ' ', ' ', ' ', ' '),
    this.createData(' ', ' ', ' ', ' ', ' '),
    this.createData(' ', ' ', ' ', ' ', ' '),
    ];
  }

  render() {
    return (
          <TableContainer spacing={1} component={Paper}>
            <Table className={this.props.classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell >SCHEMA</TableCell>
                  <TableCell align="right">CONFGR_VAL</TableCell>
                  <TableCell align="right">DEFAULT_IND</TableCell>
                  <TableCell align="right">CUSTOM_EXPRESSION</TableCell>
                  <TableCell align="right">PRECEDENCE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody key = { this.pod}>
                {this.createRows().map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    request: state.migration.request
  };
};

const dispatchMapToAction = {
  set_metadata: createAction("migration/set_metadata"),
};

export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(DataTable);
