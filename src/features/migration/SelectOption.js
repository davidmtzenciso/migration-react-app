import React from 'react'
import { connect } from 'react-redux';

class SelectOption extends React.Component {

  constructor(props) {
    super(props);

    const name = props.name;
    const options = props.dbNames;
    console.log("SelectOption ----");
    console.log(props);

  }

  createList(){
    return this.props.dbNames.map((name) => {
      return (
        <option key = {name.toString()} value = {name}> {name} </option>
      );
    });
  }


  render() {
    return (
      <label>
        {this.name}
        <select>
        {this.createList()}
        </select>
      </label>
    );
  }
}

const mapStateToProps = state => {
  console.log("state in migration-------");
  console.log(state);

  return { dbNames: state.migration.metadata.dbNames};
};

export default connect(mapStateToProps)(SelectOption);
