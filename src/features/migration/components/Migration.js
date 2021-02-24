import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import SelectOption from './SelectOption';
import SelectBox from './SelectBox';
import Row from './Row';
import { styles } from './styles';

import { Table, TableBody, TableCell, TableContainer,
        TableHead, TableRow
       } from '@material-ui/core';

import { DataGrid, Grid, FormControl, Paper,
        TextField, Switch, FormControlLabel,
        Button, Icon, withStyles
        } from '@material-ui/core';

class Migration extends React.Component {
  constructor(props) {
    super(props);
    console.log("MIGRATION-------");

    this.props.set_metadata({
         dbNames: ["dev5", "implsb1", "imptstsb1"],
         tableNames: {
           xprod: ["client_confgr", "client", "client_tier_config"],
           cost: ["encounter", "client_parsing_rules", "service_type_code_override"]
         },
         sqlOpNames: ["INSERT", "UPDATE", "DELETE"]
      });
      this.checkedNonBlueInd = 0;
  }

  handleSubmit() {}

  createEnvBox(name, classes, metadata) {
    const params = {
      select1: { name: "From", data: metadata.dbNames },
      select2: { name: "To", data: metadata.dbNames }
    };
    return (
      <SelectBox classes={classes} label={name} params={params}/>
    );
  }

  createTableNamesBox(name, classes, metadata) {
    const params = {
      select1: { name: "xproduct", data: metadata.tableNames.xprod },
      select2: { name: "cost", data: metadata.tableNames.cost }
    };
    return (
      <SelectBox classes={classes} label={name} params={params}/>
    );
  }

  createRow() {
    const elements = [];
    elements.push({
      name: "Tables",
      create : this.createTableNamesBox,
      classes: this.props.classes,
      metadata: this.props.metadata
    });
    elements.push({
      name: "Pods",
      create : this.createEnvBox,
      classes: this.props.classes,
      metadata: this.props.metadata
    });
    return elements;
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

  setCheckedNonBlueInd(event) {
    this.checkedNonBlueInd = event.target.value;
  }

  createTable() {
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
          <TableBody>
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

  createTableRow() {
    const elements = [];
    elements.push({
      name: "Tables",
      create : this.createTable,
      classes: this.props.classes,
      metadata: this.props.metadata
    });
    elements.push({
      name: "Pods",
      create : this.createTable,
      classes: this.props.classes,
      metadata: this.props.metadata
    });
    return elements;
  }

  render() {
    if (this.props.metadata.dbNames) {
        return (
          <form className={this.props.classes.root}>
          <Grid key = "search_params" container spacing={1}>
            <Row elements = {this.createRow()}/>
          </Grid>
          <Grid>
          <TextField key="client_code" className = {this.props.classes.paper} id="standard-basic" label="client code" />
          <TextField key="product_name" className = {this.props.classes.paper} id="standard-basic" label="product name" />
          <FormControlLabel className = {this.props.classes.paper}
            control = {
              <Switch
                checked={this.checkedNonBlueInd}
                onChange={this.setCheckedNonBlueInd}
                name="checkedNonBlueInd"
                color="primary"
              />
            }
            label="Blue"
          />
          <Button
            variant="contained"
            color="primary"
            className={this.props.classes.button}
          >
            Search
          </Button>
          </Grid>

          <Grid key = "tables_container" container spacing={1}>
            <Grid key="tables" item xs={6} >
              <Paper className={this.props.classes.paper}>
              {this.createTable()}
              </Paper>
            </Grid>
            <Grid key="tables" item xs={6} >
                <Paper className={this.props.classes.paper}>
                {this.createTable()}
                </Paper>
            </Grid>
          </Grid>
        </form>
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
