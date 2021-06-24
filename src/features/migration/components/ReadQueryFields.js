import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import { Grid, Breadcrumbs, Button, Typography ,TextField , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class ReadQueryFields extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.handleChange = (event) => {
      this.props.setReadingConditions({
        instruction: (event.target.value ? "add":"remove"),
        column: event.target.name,
        value: event.target.value,
      })
    };

    this.handleOpenDialog = (event) => {
      this.subqueryColumn = event.currentTarget.value;
      this.props.registerSubquery({
        instruction: "add",
        column: event.currentTarget.value
      });
    };

    this .handleAdd = (event) => {
    };

    this .handleCancel = (event) => {
      this.props.registerSubquery({
        instruction: "remove",
        column: event.currentTarget.value
      });
    };
  }

  setData() {
    this.tableName = this.props.request.tableName;
    this.schema = this.props.request.schema;
    this.tableNames = Object.keys(this.props.metadata.schemas[this.schema]);
  }

  createDialog(schema, tableName, columnName) {
    if (this.tableNames.find(name => name === columnName)) {
      const postfix = schema + tableName + columnName;
      return (
        <div>
          <Button key = {"open_dialog_button"+ postfix} variant="outlined" size="large" onClick={this.handleOpenDialog} value={columnName}>{columnName}</Button>
          <Dialog key = {"dialog_"+ postfix}
                open={ (this.props.subqueries.find(query => query[this.subqueryColumn] !== undefined) ? true : false) }
                fullWidth="md"
                maxWidth="md"
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Sub Query</DialogTitle>
            <DialogContentText>
             Select the columns to find the table {columnName}
           </DialogContentText>
            <DialogContent>
              <Grid key = "read_conditions" container item xs={12} >
                {this.createTextFields(schema, columnName)}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button key = {"cancel_dialog" + postfix} onClick={this.handleCancel} color="primary" value={columnName}> Cancel </Button>
              <Button key = {"add_dialog" + postfix} onClick={this.handleAdd} color="primary" value={columnName}> Add</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return null;
    }
  }

  createTextFields(schema, tableName) {
    console.log("create textfields for: " + tableName);
    return this.props.metadata.schemas[schema][tableName].map((column, index) => {
      const postfix = schema + tableName + column + index;
      this.dialog = this.createDialog(schema, tableName, column);
      return (
        <Grid key = {"container_for_" + postfix} item xs={2}>
          {this.dialog ? this.dialog : <TextField key={"field_ " + postfix} name={column} label={column} variant="outlined" onChange={this.handleChange} />}
        </Grid>
      );
    });
  }

  render() {
    this.setData();
    console.log("subqueries before rendering: " + JSON.stringify(this.props.subqueries));
    const subquery = this.props.subqueries.find(query => query[this.subqueryColumn] !== undefined )
    console.log("dialog open: " + JSON.stringify(subquery));
    return (
      <Grid key = "read_conditions" container item xs={12} >
        {this.createTextFields(this.schema, this.tableName)}
      </Grid>

    );
  }
}

const mapStateToProps = state => {
  return {
    request: state.migration.request,
    metadata: state.migration.metadata,
    subqueries: state.migration.request.readConditions.subqueries
  };
};

const dispatchMapToAction = {
  setReadingConditions: createAction("migration/set_reading_conditions"),
  registerSubquery: createAction("migration/register_subquery")
};

export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(ReadQueryFields);
