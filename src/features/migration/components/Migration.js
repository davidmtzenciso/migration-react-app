import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import { Grid, Paper, FormControlLabel, withStyles} from '@material-ui/core';
import { styles } from './styles';

import SelectOption from './SelectOption';
import DataTable from './DataTable';

class Migration extends React.Component {
  constructor(props) {
    super(props);
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
      this.isBlue = true;
  }

  handleSubmit() {}

  setIsBlue(event) {
    this.isBlue = event.target.value;
  }


  render() {
    if (this.props.metadata.pods) {
        return (
          <div className={this.props.classes.root}>

          <Grid item xs={12} >
           <Paper className={this.props.classes.paper} elevation={2} >
             <Box className={this.props.classes.box} component="span">
               <SelectOption name = "from" options={this.metadata.pods} />
               <SelectOption name = "to" options={this.metadata.pods} />
               <SelectOption name = {"from_" + this.metadata.schemas[0].name}
                             options={this.metadata.schemas[0].tables}/>
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
        </div>
        );
      }
      return null;
    }
}

const mapStateToProps = state => {
  return {
    metadata: state.migration.metadata,
    data: state.migration.data
  };
};

const dispatchMapToAction = {
  set_metadata: createAction("migration/set_metadata"),
};

export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(Migration);
