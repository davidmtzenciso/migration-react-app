import React from 'react'
import { connect } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

import { Select, MenuItem } from '@material-ui/core';


class SelectOption extends React.Component {

  constructor(props) {
    super(props);
    this.name = props.name;
    this.key = props.name.toLowerCase();
    this.options = props.options;

    if(this.name === 'from') {
      this.option = this.props.request.from.pod;
    } else if (this.name === 'to') {
      this.option = this.props.request.to.pod;
    }

    this.handleChange = (event) => {
        this.props.update({
            key: this.key,
            value: event.target.value
        });
    }
  }

   setOption(value) {
     this.option = value;
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
      <label>
        {this.name}
        <Select
          style={{ margin: "2vh", padding: "1vh 2vh 0vh 1vh" }}
          labelId={this.name}
          value={this.props.selected}
          onChange={this.handleChange}
        >
        {this.createList()}
        </Select>
      </label>
    );
  }
}

const mapStateToProps = state => {
  return {
    request: state.migration.request
  };
};

const dispatchMapToAction = {
  update: createAction("select_pod_n_table")
};


export default connect(mapStateToProps, dispatchMapToAction)(SelectOption);
