import React, { Component } from 'react';
import '../assets/styling/Splash.css';

class Splash extends Component {
  render() {
    return (
      <div className="Splash-bod">
        <div className="Splash">
          <h2>Welcome to <i>Friendcation</i>!</h2>
          <br/>
          <h3>We take the all the hassle out of traveling with friends and leave the fun to you!</h3>
          <br/>
          <button onClick={() => this.props.history.push('/new')}>Get Started!</button>
        </div>
        </div>
    )
  }
}

export default Splash;
