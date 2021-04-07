import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import { Grid, Paper, Box, Snackbar, withStyles} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { styles } from './styles';

import SelectOption from './SelectOption';
import DataTable from './DataTable';

class Migration extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();

    this.props.set_metadata({
         pods: ["dev5", "implsb1", "imptstsb1", "prodqa"],
         schemas:[{
            name: "xproduct",
            tables: ["client_confgr", "client", "client_tier_config"]
          },
          {
            name: "cost",
            tables: ["encounter", "client_parsing_rules", "service_type_code_override"]
          }],
          sqlOpNames: ["INSERT", "UPDATE", "DELETE"]
      });

      this.handleClose = (event) => {
        this.props.updateSelection({
          key: this.componentName,
          value = ""
        });
        this.props.evaluateDuplicatedPod({value: this.componentName})
      }
  }

  setOpenErrorFeedback(error) {
    this.open = !error.isFixed;
    this.reason = error.message;
    this.componentName = error.key;
  }


  handleSubmit() {}

  render() {
    if (this.props.metadata.schemas.length > 1) {
      this.setOpenErrorFeedback(this.props.request.error);
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
                <DataTable pod={this.props.dataFrom.pod} name={this.props.dataFrom.tableName}/>
                </Paper>
              </Grid>
              <Grid key="tables_to" item xs={6}>
                <Paper className={this.props.classes.paper}>
                <DataTable pod={this.props.dataTo.pod} name={this.props.dataTo.tableName}/>
                </Paper>
              </Grid>
            </Grid>

            <Snackbar open={this.open} autoHideDuration={3000} onClose={this.handleClose}>
              <MuiAlert elevation={6} onClose={this.handleClose} variant="filled"  severity="error">
                {this.reason}
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
  set_metadata: createAction("migration/set_metadata"),
  evaluateDuplicatedPod: createAction("migration/evaluate_duplicated_pod"),
  updateSelection: createAction("migration/select_pod_n_table"),

};

export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(Migration);
