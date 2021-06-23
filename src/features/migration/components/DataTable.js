import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import { styles } from './styles';
import PropTypes from 'prop-types';

import { Table, TableBody, TableCell, TableContainer, TableHead,
         TableRow, TablePagination, TableSortLabel, Toolbar, Typography,
         Checkbox, IconButton, Tooltip, FormControlLabel, Grid, Paper
      }  from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';



const propTypes = () => {
 return {
     classes: PropTypes.object.isRequired,
     numSelected: PropTypes.number.isRequired,
     onRequestSort: PropTypes.func.isRequired,
     onSelectAllClick: PropTypes.func.isRequired,
     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
     orderBy: PropTypes.string.isRequired,
     rowCount: PropTypes.number.isRequired,
   };
}

class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.request = this.props.request;
    this.metadata = this.props.metadata;
    this.name = this.props.name;
    this.order = "asc";
    this.orderBy = "";
    this.selected = [];
    this.page = 0;
    this.rowsPerPage = 10;
    this.tableName = "";
    this.createHandlers();
  }

  createHandlers() {
    this.sortHandler = (property) => (event) => {
      this.handleRequestSort(event, property);
    };

    this.handleRequestSort = (event, property) => {
        const isAsc = this.orderBy === property && this.order === 'asc';
        this.order = (isAsc ? 'desc' : 'asc');
        this.orderBy = property;
      };

  this.handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.selected = [];//this.queryResult.map((n) => n.name);
    } else {
     this.selected = [];
    }
  };

  this.handleClick = (event, name) => {
    const selectedIndex = this.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.selected.slice(1));
    } else if (selectedIndex === this.selected.length - 1) {
      newSelected = newSelected.concat(this.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.selected.slice(0, selectedIndex),
        this.selected.slice(selectedIndex + 1),
      );
    }

    this.selected = newSelected;
  };

  this.handleChangePage = (event, newPage) => {
    this.page = newPage;
  };

  this.handleChangeRowsPerPage = (event) => {
    this.RowsPerPage = parseInt(event.target.value, 10);
    this.page = 0;
  };

  this.isSelected = (name) => this.selected.indexOf(name) !== -1;
  const pod = this.props.request[this.props.name];
  const tableName = this.props.request.tableName;
  this.emptyRows = this.rowsPerPage - Math.min(this.rowsPerPage, this.props.queryResults[tableName].data[pod].length - this.page * this.rowsPerPage);

  }

  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => this.descendingComparator(a, b, orderBy);
  }

  stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  createHeadCells() {
    const schema = this.props.metadata.schemas[this.props.request.schema];
    const tableName = this.props.request.tableName;
    this.tableName = tableName;
    const tableMeta = schema[tableName];

    return tableMeta.map((column, index) => {
        return {
          id: schema + tableName + column + index, label: column, tableName: tableName
        }
    });
  }

  createRowElements() {
    const schema = this.props.metadata.schemas[this.props.request.schema];
    const tableName = this.props.request.tableName;
    const pod = this.props.request[this.props.name];
    let data;
    
    try {
      data = this.props.queryResults[tableName].data[pod];
    } catch (error) {
      data = [];
    }

    return data.map((row, index) => (
      <TableRow key = {schema + tableName + index}>
      { Object.values(row).map((val) => (
        <TableCell align="left">{val}</TableCell>))}
      </TableRow>
    ));
  }


  render() {
    return (
          <TableContainer component={Paper} >
            <Table id={this.props.name} className={this.props.classes.table} aria-label="simple table">
              <TableHead>
                <TableRow key={this.props.name + "_heads"} >
                  {this.createHeadCells().map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align='left'
                      padding="checkbox"
                      sortDirection={this.orderBy === headCell.tableName + "_+id" ? this.order : false}
                    >
                      <TableSortLabel key={headCell.id + "_sort_label"}
                        active={this.orderBy === headCell.id}
                        direction={this.orderBy === headCell.id ? this.order : 'asc'}
                        onClick={this.sortHandler(headCell.id)}
                      >
                        {headCell.label}
                        {this.orderBy === headCell.id ? (
                          <span className={this.classes.visuallyHidden}>
                            {this.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                      <Checkbox key={headCell.id + "_checkbox"}
                        indeterminate={this.numSelected > 0 && this.numSelected < this.rowCount}
                        checked={this.rowCount > 0 && this.numSelected === this.rowCount}
                        onChange={this.onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all query fields' }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody key = { this.name + "_" + this.tableName + "_data" }>
                { this.createRowElements()}
              </TableBody>
            </Table>
          </TableContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    metadata: state.migration.metadata,
    request: state.migration.request,
    queryResults: state.migration.queryResults
  };
};

const dispatchMapToAction = {

};

export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(DataTable);
