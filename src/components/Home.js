import React, {Component} from 'react';
import "../assets/styling/Home.css";
import * as firebase from 'firebase';
import Question from "./Question";

class Home extends Component {
  constructor(props) {
    super(props);

    //this.handleOnName = this.handleOnName.bind(this);
    this.renderFriend = this.renderFriend.bind(this);

    this.state = {
        gId: props.match.params.id,
        friends: [],
    };
  }

  componentDidMount() {
    var friends = [];

    firebase.database().ref().child(this.state.gId).on('value', function(snapshot) {
      snapshot.forEach(function(friend) {
        friends.push({
          fId: friend.key,
          name: friend.val().name,
          location: friend.val().location,
          destination: friend.val().destination,
        });
      });

      this.setState({friends});
    }.bind(this));
  }

  renderFriend(friend, index) {
    return(
        <h4 key={index} className="Friend">{friend.name}</h4>
    );
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>Lets get this Friend-cation going!</h2>
          {
            (this.state.friends.length !== 0) ? (
              <div className="Home-">
                <h3>Here is who is going!</h3>
                {this.state.friends.map(this.renderFriend)}
                <button className="btn">Join the Friend-cation</button>
              </div>
            ) : (
              <button className="btn">Get Started</button>
            )
          }
        </div>
        <p className="Home-intro">
          To get started, pick your preference bellow. {this.state.gId}
        </p>
        <Question/>
      </div>
    );
  }
}

export default Home;
