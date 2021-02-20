import React from 'react'
import logo from './logo.svg';
import './App.css';
import Migration from './features/migration/Migration';
import store from './app/store';
import { Provider } from 'react-redux';



class App extends React.Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
          <Provider store={store}>
            <Migration />
          </Provider>
          </header>
        </div>
    );
  }
}

export default App;
