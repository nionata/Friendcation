import React, {Component} from 'react';
import "../assets/styling/Home.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>Lets get this Friend-cation going!</h2>
          <h3>Answer a few questions below and you will be all set!</h3>
        </div>
        <p className="Home-intro">
          To get started, pick your preference bellow.
        </p>
      </div>
    );
  }
}

export default Home;
