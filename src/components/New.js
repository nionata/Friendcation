import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../assets/styling/Home.css';
import Question from './Question';

class New extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);

    this.state = {
      name: "",
    };
  }

  onPress(name, budget, destination, location) {
    console.log(name, budget, destination, location);
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>Friend<img height="30px" width="30px" src="https://i.pinimg.com/originals/62/2e/0a/622e0a5f3dbc382572dfba679cd187ad.png" alt=""/>cation!</h2>
          <h3>Create a new Friend-cation</h3>
        </div>
        <div className="Home-body">
            <div className="form-group">
              <label for="exampleInputEmail1">What is your trip name?</label>
              <input type="text" className="form-control" placeholder="Enter name"/>
            </div>
            <Question title="" buttonTitle="Create!" onPress={this.onPress}/>
        </div>
      </div>
    );
  }
}

export default New;
