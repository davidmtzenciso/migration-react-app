import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import { TextField } from '@material-ui/core';
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
  }




  render() {
    const tableName = this.props.request.tableName;
    const schema = this.props.request.schema;

    return this.props.metadata.schemas[schema][tableName].map((column) => (
      <TextField key={schema + tableName + column} name={column} label={column} variant="outlined" onChange={this.handleChange} />
    ));
  }

}

const mapStateToProps = state => {
  return {
    request: state.migration.request,
    metadata: state.migration.metadata
  };
};

const dispatchMapToAction = {
  setReadingConditions: createAction("migration/set_reading_conditions")
};

export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(ReadQueryFields);
