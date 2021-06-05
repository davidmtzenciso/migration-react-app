import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import { FormControl, InputLabel, Select, MenuItem, withStyles } from '@material-ui/core';

import { styles } from './styles';

class SelectOption extends React.Component {

  constructor(props) {
    super(props);
    console.log("select option creation.......");
    this.nodeRef = React.createRef();
    this.metadata = props.metadata;

    this.handleChange = (event) => {
        this.props.selectPodOrTable({
            key: this.props.name,
            value: event.target.value
        });
        this.props.evaluateSelection({key: this.props.name, value: this.option});
      }
    }



   setOption() {
     if(this.props.name === 'from') {
       this.option = this.props.request.from;
     } else if (this.props.name === 'to') {
       this.option = this.props.request.to;
     } else if (this.props.name === this.props.request.schema){
       this.option = this.props.request.tableName;
     } else {
       this.option = "_";
     }
  }

  createList() {
    return this.props.options.map((element) => {
      return (
        <MenuItem key = {this.props.name + "_" + element} value = {element}> {element} </MenuItem>
      );
    });
  }

  render() {
      this.setOption();
      return (
          <FormControl nodeRef={this.nodeRef}>
            <InputLabel id={this.props.name}>{this.props.name}</InputLabel>
            <Select
              name = {this.props.name + "_"}
              style={{ margin: "2vh", padding: "1vh 2vh 0vh 1vh" }}
              labelId={this.props.name}
              value={this.option}
              onChange={this.handleChange}
            >
              {this.createList()}
            </Select>
          </FormControl>
    );
  }
}

const mapStateToProps = state => {
  return {
    request: state.migration.request,
  };
};

const dispatchMapToAction = {
  selectPodOrTable: createAction("migration/select_pod_or_table"),
  evaluateSelection: createAction("migration/evaluate_pod_selection"),
};


export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(SelectOption);
