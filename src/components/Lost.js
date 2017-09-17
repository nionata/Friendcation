import React, { Component } from 'react';
import '../assets/styling/Lost.css';

class Lost extends Component {
  render() {
    return (
      <div className="Lost">
        <h1>We can't find your friends here!</h1>
        <h2>Start over at the home page or try your share link again.</h2>
        <a href="/friends/12"><img className="Lost-img" src="https://static.vecteezy.com/system/resources/previews/000/146/568/non_2x/palm-tree-summertime-vacation-vector.jpg" alt=""/></a>
      </div>
    );
  }
}

export default Lost;
