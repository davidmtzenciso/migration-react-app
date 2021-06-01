import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import { Grid, Paper, Box, Snackbar, withStyles} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { styles } from './styles';

import SelectOption from './SelectOption';
import DataTable from './DataTable';
import { get_metadata } from '.././migrationSlice';

class Migration extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.pods = this.props.metadata.pods;
    this.componentName = this.props.request.error.componentName;
    this.open = this.props.request.error.isNotFixed;
    this.message = this.props.request.error.message;

    this.handleClose = (event) => {
      console.log("component with error: " + this.componentName)
      this.props.selectPodOrTable({
        key: this.componentName,
        value: "not_selected"
      });
      this.props.evaluateDuplicatedPod({componentName: this.componentName})
    }

    this.props.getMetadata();
  }

  handleSubmit() {}

  componentDidMount(){}

  render() {
    if (this.props.metadata.schemas.length > 1) {
        return (
          <div ref={this.wrapper} className={this.props.classes.root}>

          <Grid item xs={10} >
           <Paper className = {this.props.classes.paper} elevation={2} >
             <Box className = {this.props.classes.box} component="span">
               <SelectOption name = "from" options={this.props.metadata.pods} />
               <SelectOption name = "to" options={this.props.metadata.pods} />
               <SelectOption name = {this.props.metadata.schemas[0].name}
                             options = {this.props.metadata.schemas[0].tables}/>
               <SelectOption name = {this.props.metadata.schemas[1].name}
                             options = {this.props.metadata.schemas[1].tables}/>
             </Box>
           </Paper>
          </Grid>

            <Grid key = "tables_container" container spacing={1}>
              <Grid key="tables_from" item xs={6}>
                <Paper className={this.props.classes.paper}>
                <DataTable name = "data_from"/>
                </Paper>
              </Grid>
              <Grid key="tables_to" item xs={6}>
                <Paper className={this.props.classes.paper}>
                <DataTable name = "data_to"/>
                </Paper>
              </Grid>
            </Grid>

            <Snackbar open={this.open} autoHideDuration={3000} onClose={this.handleClose}>
              <MuiAlert elevation={6} onClose={this.handleClose} variant="filled"  severity="error">
                {this.message}
              </MuiAlert>
            </Snackbar>
        </div>
        );

      }
      return null;
    }
}

const mapStateToProps = state => {
  return {
    metadata: state.migration.metadata,
    dataFrom: state.migration.dataFrom,
    dataTo: state.migration.dataTo,
    noError: state.migration.noError,
    request: state.migration.request
  };
};

const dispatchMapToAction = {
  evaluateDuplicatedPod: createAction("migration/evaluate_duplicated_pod"),
  selectPodOrTable: createAction("migration/select_pod_or_table"),
  getMetadata: get_metadata
};

export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(Migration);
