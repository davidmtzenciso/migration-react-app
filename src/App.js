import React from 'react';
import Migration from './features/migration/components/Migration';
import store from './app/store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppBar, IconButton, Button, Typography, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { styles } from './styles';

class App extends React.Component {
  construct(props) {
    this.nodeRef = React.createRef();
  }

  render() {
    return (
      <Router>
        <div ref={this.nodeRef}>
          <AppBar noderef={this.nodeRef} position="static">
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
          <div ref={this.nodeRef}>
          <Switch>
            <Provider store={store}>
              <Route path="/" component={Migration}/>
              <Route path="/migration" component={Migration}/>
            </Provider>
          </Switch>

          </div>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
