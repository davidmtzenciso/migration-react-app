import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Grid, Paper} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { styles } from './styles';


class Row extends React.Component {

  constructor(props) {
    super(props);
    console.log("creating row------------");
    console.log(props);
    this.length = props.elements.length;
    this.elements = props.elements;
  }

  render() {
    if(this.length > 0 && this.length < 13) {
        const size = 12/this.length;

        return this.elements.map((element) => {
          return (
              <Grid key={element.name} item xs={size}>
                <Paper className={element.classes.paper}>
                {element.create(element.name, element.classes, element.metadata)}
                </Paper>
              </Grid>
          );
      });
    }
    return null;
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
)(Row);
