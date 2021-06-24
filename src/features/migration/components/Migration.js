import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import { MuiThemeProvider, Snackbar, Grid, GridList, Paper, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import MuiAlert from '@material-ui/lab/Alert';
import { styles } from './styles';

import SelectOption from './SelectOption';
import DataTable from './DataTable';
import ReadQueryFields from './ReadQueryFields';
import { get_metadata, send_query } from '.././migrationSlice';

class Migration extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.pods = this.props.metadata.pods;
    this.message = this.props.request.error.message;
    this.metadata = this.props.metadata;
    this.getMetadata = this.props.getMetadata;
    this.isLoaded = this.props.isLoaded;

    this.onGetDataClicked = (event) => {
      this.props.sendQuery()
    };

  }

  componentDidMount() {
    this.getMetadata();
  }

  render() {
    if (this.props.isLoaded) {
      return (
          <div ref={this.wrapper} className={this.props.classes.root}>
          <Grid noderef={this.wrapper}>
            <Grid item xs={12} >
             <Paper noderef={this.wrapper} className={this.props.classes.paper} elevation={2} >
               <Box noderef={this.wrapper} className={this.props.classes.box} component="span">
                <SelectOption noderef={this.wrapper} name="from" options={this.props.metadata.pods}/>
                <SelectOption noderef={this.wrapper} name="to" options={this.props.metadata.pods}/>
                <SelectOption noderef={this.wrapper} name="xproduct" options={Object.keys(this.props.metadata.schemas["xproduct"])}/>
                <SelectOption noderef={this.wrapper} name="cost" options={Object.keys(this.props.metadata.schemas["cost"])}/>
                <Button  variant="contained" color="primary"   justify="center" onClick={this.onGetDataClicked}>Get Data</Button>
               </Box>
             </Paper>
            </Grid>
            <Grid noderef={this.wrapper} container>
            <ReadQueryFields subQueries={[]}/>
            </Grid>
            <Grid key="tables_from" item xs={12} className={this.props.classes.table} >
                <Paper className={this.props.classes.paper} >
                  <DataTable noderef={this.wrapper} name = "from"/>
                </Paper>
              </Grid>
              <Grid key="tables_to" item xs={12} className={this.props.classes.table} >
                <Paper className={this.props.classes.paper}>
                  <DataTable noderef={this.wrapper} name = "to"/>
                </Paper>
            </Grid>
          </Grid>
          <Snackbar open={this.props.request.error.isNotFixed} autoHideDuration={3000} >
            <MuiAlert elevation={6} variant="filled"  severity="error">
              {this.props.request.error.message}
            </MuiAlert>
          </Snackbar>
        </div>
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
  getMetadata: get_metadata,
  sendQuery: send_query
};

export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(Migration);
