import React, {Component} from 'react';
import "../assets/styling/Home.css";
import * as firebase from 'firebase';
import Question from "./Question";

class Home extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.renderFriend = this.renderFriend.bind(this);

    this.state = {
        gId: props.match.params.id,
        friends: [],
        name: "",
    };
  }

  componentDidMount() {
    var friends = [];

    firebase.database().ref().child(this.state.gId + "/name").on('value', function(snapshot) {
      this.setState({
        name: snapshot.val()
      });
    }.bind(this));

    firebase.database().ref().child(this.state.gId + '/friends').on('value', function(snapshot) {
      snapshot.forEach(function(friend) {
        friends.push({
          fId: friend.key,
          name: friend.val().name,
          location: friend.val().location,
          destination: friend.val().destination,
        });
      });

      this.setState({friends});
      friends = [];
    }.bind(this));
  }

  renderFriend(friend, index) {
    return(
      <div className="card" key={index}>
          <div className="card-body">
            <b>{friend.name}</b>
            <br/>
            Leaving from: {friend.location}
          </div>
      </div>
    );
  }

  onPress(name, budget, destination, location) {
    console.log(name, budget, destination, location);
  }


  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>Friend<img height="30px" width="30px" src="https://i.pinimg.com/originals/62/2e/0a/622e0a5f3dbc382572dfba679cd187ad.png" alt=""/>cation!</h2>
          <h3 className="Home-subtitle">{this.state.name}</h3>
        </div>
        <div className="Home-body">
          <h3 className="">Friend(s)</h3>
          <p>Here are your friends who have signed up for the trip</p>
          {this.state.friends.map(this.renderFriend)}
          {
            (this.props.location.pathname === "/friends/" + this.state.gId + "/join") ? (
              <Question title="Join the Friend-cation!" buttonTitle="Join!" onPress={this.onPress}/>
            ) : (
              <div className="Home-body-action">
                <button className="btn btn-main">Find Our Destination</button>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Home;
