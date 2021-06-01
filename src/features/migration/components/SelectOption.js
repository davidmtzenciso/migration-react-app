import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import { FormControl, InputLabel, Select, MenuItem, withStyles } from '@material-ui/core';

import { styles } from './styles';

class SelectOption extends React.Component {

  constructor(props) {
    super(props);
    this.wrapper = React.createRef();

    this.name = props.name;
    this.options = props.options;
    this.request = props.request;
    this.setOption();

    this.handleChange = (event) => {
        this.props.selectPodOrTable({
            key: this.name,
            value: event.target.value
        });
      }
      this.props.evaluateDuplicatedPod({componentName: this.name});
    }

   setOption() {
     if(this.name === 'from') {
       this.option = this.request.from;
     } else if (this.name === 'to') {
       this.option = this.request.to;
     } else {
       this.option = this.options[0];
     }
  }

  createList() {
    return this.options.map((element) => {
      return (
        <MenuItem key = {this.name + "_" + element} value = {element}> {element} </MenuItem>
      );
    });
  }

  render() {
      return (
        <FormControl ref={this.wrapper}>
          <InputLabel id={this.name}>{this.name}</InputLabel>
          <Select
            name = {this.name + "_"}
            style={{ margin: "2vh", padding: "1vh 2vh 0vh 1vh" }}
            labelId={this.name}
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
    request: state.migration.request
  };
};

const dispatchMapToAction = {
  selectPodOrTable: createAction("migration/select_pod_or_table"),
  evaluateDuplicatedPod: createAction("migration/evaluate_duplicated_pod")
};


export default compose(
  connect(mapStateToProps, dispatchMapToAction),
  withStyles(styles),
)(SelectOption);
