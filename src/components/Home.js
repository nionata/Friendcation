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
    var updates = {};
    var gId = this.state.gId;
    var friend = firebase.database().ref().child(gId + '/friend/').push();

    updates[gId + '/friends/' + friend.key + '/name'] = name;
    updates[gId + '/friends/' + friend.key + '/budget'] = budget;
    updates[gId + '/friends/' + friend.key + '/destination'] = destination;
    updates[gId + '/friends/' + friend.key + '/location'] = location;

    firebase.database().ref().update(updates).then(function() {
      this.props.history.push('/friends/' + gId);
    }.bind(this));
  }

  onDestination(e) {
    e.preventDefault();


  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>Friend<img height="30px" width="30px" src="https://i.pinimg.com/originals/62/2e/0a/622e0a5f3dbc382572dfba679cd187ad.png" alt=""/>cation!</h2>
          <h3 className="Home-subtitle">{this.state.name}</h3>
        </div>
        <div className="Home-body">
          {
            (this.state.name !== null) ? (
              <span>
                <div style={{textAlign: 'right'}}>
                  <i className="fa fa-share-alt fa-2x" onClick={() => prompt("Enter a friend's phone number to invite them to join.")} aria-hidden="true"></i>
                </div>
                <h3 className="">Friend(s)</h3>
                <p>Here are your friends who have signed up for the trip</p>
                {this.state.friends.map(this.renderFriend)}
                {
                  (this.props.location.pathname === "/friends/" + this.state.gId + "/join") ? (
                    <Question title="Join the Friend-cation!" buttonTitle="Join!" onPress={this.onPress}/>
                  ) : (
                    <div className="Home-body-action">
                      <button className="btn btn-main" onClick={this.onDestination}>Find Our Destination</button>
                    </div>
                  )
                }
              </span>
            ) : (
              <div style={{textAlign: 'center'}}>
                <h3>That Friend-cation does not exist!</h3>
              </div>
            )
          }
      </div>
      </div>
    );
  }
}

export default Home;
