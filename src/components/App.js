import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import New from './New';
import Lost from './Lost';
import Splash from './Splash';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Splash} />
          <Route exact path='/new' component={New} />
          <Route exact path='/friends/:id' component={Home} />
          <Route exact path='/friends/:id/join' component={Home} />
          <Route path='*' component={Lost} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
