import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Box, Grid, Paper } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { styles } from './styles';

import SelectOption from './SelectOption';


class SelectBox extends React.Component {

  constructor(props) {
    super(props);
    console.log("SELECT BOX-----");
    this.pods = this.props.metadata.pods;
    this.schemas = this.props.metadata.schemas;
  }

  render() {
    return (
      <Grid key = "envs" container spacing={1} className={this.props.classes.container}>

       <Grid item xs='6' >
        <Paper className={this.props.classes.paper} elevation={2} >
          <Box className={this.props.classes.box} component="span" >
            <SelectOption name = "from:" options={this.pods} />
            <SelectOption name = {this.schemas[0].name} options={this.schemas[0].tables} />
            <SelectOption name = {this.schemas[1].name} options={this.schemas[1].tables} />
          </Box>
        </Paper>
       </Grid>

       <Grid item xs='6' >
        <Paper className={this.props.classes.paper}>
          <Box className={this.props.classes.box} component="span">
            <SelectOption name = "from:" options={this.pods} />
            <SelectOption name = {this.schemas[0].name} options={this.schemas[0].tables} />
            <SelectOption name = {this.schemas[1].name} options={this.schemas[1].tables} />
          </Box>
        </Paper>
       </Grid>

      </Grid>
    );
  }

}

const mapStateToProps = state => {
  return {
    metadata: state.migration.metadata
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(SelectBox);
