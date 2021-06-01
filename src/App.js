import React from 'react';
import Migration from './features/migration/components/Migration';
import store from './app/store';
import { Provider } from 'react-redux';

import { AppBar, IconButton, Button, Typography, Toolbar, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { styles } from './styles';

class App extends React.Component {

  render() {
    return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={this.props.classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={this.props.classes.title}>
                Migration tool
              </Typography>
              <Button color="inherit">Promote</Button>
            </Toolbar>
          </AppBar>
          <div>
            <Provider store={store}>
              <Migration />
            </Provider>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(App);
