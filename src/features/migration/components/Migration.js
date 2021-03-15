import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import { Grid, Paper, FormControlLabel,
        TextField, Switch, withStyles
        } from '@material-ui/core';
import { styles } from './styles';

import SelectBox from './SelectBox';
import DataTable from './DataTable';

class Migration extends React.Component {
  constructor(props) {
    super(props);
    console.log("MIGRATION-------");

    this.props.set_metadata({
         pods: ["dev5", "implsb1", "imptstsb1"],
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
      this.isBlue = 0;
  }

  handleSubmit() {}

  setIsBlue(event) {
    this.isBlue = event.target.value;
  }


  render() {
    if (this.props.metadata.pods) {
        return (
          <div className={this.props.classes.root}>
            <SelectBox/>
            <Grid container spacing={1} className={this.props.classes.container}>
              <Paper className={this.props.classes.paper} component="span">
                <TextField key="client_code" id="client_code" label="client code"
                          className={this.props.classes.field} />
                <FormControlLabel
                    control = {
                      <Switch
                        checked={this.isBlue}
                        onChange={this.setIsBlue}
                        name="isBlue"
                        color="primary"
                      />
                    }
                    label="is Blue"
                  />
              </Paper>
            </Grid>
            <Grid key = "tables_container" container spacing={1}>
              <Grid key="tables" item xs={6}>
                <Paper className={this.props.classes.paper}>
                <DataTable/>
                </Paper>
              </Grid>
              <Grid key="tables" item xs={6}>
                <Paper className={this.props.classes.paper}>
                <DataTable/>
                </Paper>
              </Grid>
            </Grid>
        </div>
        );
      }
      return null;
    }
}

const mapStateToProps = state => {
  return {
    metadata: state.migration.metadata
  };
};

const dispatchMapToAction = {
  set_metadata: createAction("migration/set_metadata"),
};

export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(Migration);
