import React from 'react'
import { connect } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

import { Select, MenuItem } from '@material-ui/core';


class SelectOption extends React.Component {

  constructor(props) {
    super(props);
    console.log("SelectOption ----");
    console.log(props);

    this.action = props.action;
    this.name = props.name;
    this.key = props.name.toLowerCase();
    this.options = props.options;
    this.option = this.options[0];
    console.log("options: " + this.options);

    this.handleChange = (event) => {
        this.props.update({
            key: this.key,
            value: event.target.value
        });
        this.setOption(event.target.value);
    }
  }

   setOption(value) {
     this.option = value;
   }

  createList(){
    return this.options.map((element, index) => {
      return (
        <MenuItem key = {index} value = {element}> {element} </MenuItem>
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
          id={this.name}
          value={this.option}
          onChange={this.handleChange}
        >
        {this.createList()}
        </Select>
      </label>
    );
  }
}

const dispatchMapToAction = {
  update: createAction("select_schema_table")
};


export default connect(null, dispatchMapToAction)(SelectOption);
