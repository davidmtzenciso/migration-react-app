import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import { MuiThemeProvider, Snackbar, Grid, Paper, Box, withStyles} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { styles } from './styles';

import SelectOption from './SelectOption';
//import DataTable from './DataTable';
import { get_metadata } from '.././migrationSlice';

class Migration extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.pods = this.props.metadata.pods;
    this.componentName = this.props.request.error.componentName;
    this.open = this.props.request.error.isNotFixed;
    this.message = this.props.request.error.message;
    this.metadata = this.props.metadata;
    this.getMetadata = this.props.getMetadata;
    this.isLoaded = this.props.isLoaded;

    this.handleClose = (event) => {
      console.log("component with error: " + this.componentName)
      this.props.selectPodOrTable({
        key: this.componentName,
        value: "not_selected"
      });
      this.props.evaluateDuplicatedPod({componentName: this.componentName});
    }
  }

  componentDidMount() {
    this.getMetadata();
  }

  render() {
    if (this.props.isLoaded) {
      return (
        <MuiThemeProvider>
          <div ref={this.wrapper} className={this.props.classes.root}>
          <Grid item xs={12} >
           <Paper nodeRef={this.wrapper} className={this.props.classes.paper} elevation={2} >
             <Box nodeRef={this.wrapper} className={this.props.classes.box} component="span">
              <SelectOption nodeRef={this.wrapper} name="from" options={this.props.metadata.pods}/>
              <SelectOption nodeRef={this.wrapper} name="to" options={this.props.metadata.pods}/>
              <SelectOption nodeRef={this.wrapper} name="xproduct" options={Object.keys(this.props.metadata.schemas["xproduct"])}/>
              <SelectOption nodeRef={this.wrapper} name="cost" options={Object.keys(this.props.metadata.schemas["cost"])}/>
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
      </MuiThemeProvider>
        );
     }
    else {
      return (
        <div> loading.... </div>
      );
    }
  }
}

const mapStateToProps = state => {
    return {
      isLoaded: state.migration.loaded,
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
