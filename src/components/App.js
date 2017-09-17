import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Lost from './Lost';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/friends/:id' component={Home} />
          <Route path='*' component={Lost} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;