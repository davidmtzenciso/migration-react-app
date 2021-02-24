import React from 'react';
import SelectOption from './SelectOption';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';

class SelectBox extends React.Component {

  constructor(props) {
    super(props);
    this.name1 = props.params.select1.name;
    this.name2 = props.params.select2.name;
    this.data1 = props.params.select1.data;
    this.data2 = props.params.select2.data;

    console.log("SELECT BOX-----");
  }


  render() {
    return (
        <Box className={this.props.classes.box} component="span">
          <label>{this.props.label} </label>
          <SelectOption name = {this.name1} options={this.data1} />
          <SelectOption name = {this.name2} options={this.data2} />
        </Box>
    );
  }

}

export default connect()(SelectBox);
