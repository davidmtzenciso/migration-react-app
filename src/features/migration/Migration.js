import React from 'react';
import { connect } from 'react-redux';
import SelectOption from './SelectOption';
import { createAction } from '@reduxjs/toolkit';

class Migration extends React.Component {
  constructor(props) {
    super(props);
    this.props.set_metadata({
       dbNames: ["dev5", "implsb1"],
       tableNames: ["client_confgr"],
       sqlOpNames: ["INSERT", "UPDATE"]
    });

  }

  componentDidMount() {}

  handleSubmit() {


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit()}>
      <SelectOption name = "Source Pods" options={this.props.metadata.dbNames}/>
      <SelectOption name = "Destination Pods" options={this.props.metadata.dbNames}/>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { metadata: state.migration.metadata};
};

const dispatchMapToAction = {
  set_metadata: createAction("migration/set_metadata")
};

export default connect(mapStateToProps, dispatchMapToAction)(Migration);
