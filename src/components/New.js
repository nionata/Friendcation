import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../assets/styling/Home.css';

class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>Friend<img height="30px" width="30px" src="https://i.pinimg.com/originals/62/2e/0a/622e0a5f3dbc382572dfba679cd187ad.png" />cation!</h2>
        </div>
        <div className="Home-body">
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Trip Name</label>
              <input type="text" className="form-control" placeholder="Enter name"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default New;
