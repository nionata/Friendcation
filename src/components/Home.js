import React, {Component} from 'react';
import "../assets/styling/Home.css";
import * as firebase from 'firebase';
import Question from "./Question";
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.renderFriend = this.renderFriend.bind(this);
    this.onDestination = this.onDestination.bind(this);
    this.renderDes = this.renderDes.bind(this);
    //this.textCode = this.textCode.bind(this);

    this.state = {
        gId: props.match.params.id,
        friends: [],
        name: "",
        des: [],
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
          budget: friend.val().budget,
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

  renderDes(des, index) {
    return(
      <div className="card" key={index}>
          <div className="card-body">
            <b>{des}</b>
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

    if(this.state.des.length !== 0) {

        this.setState({
          des: []
        });

        return
    }

    var responses = [];
    var { friends } = this.state;

    friends.forEach(function(friend, index) {
      var { location, budget } = friend;
      console.log(location,budget);
      var url = "https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=UYe3laOLWr1Aq8eN0iOxBXygxA84YNb5&origin=" + location + "&max_price=" + budget + "";
      console.log(url);
      axios.get(url).then(function(response) {
        var destinations = [];

        response.data.results.forEach(flight => destinations.push(flight.destination));

        responses.push(destinations);

        if(responses.length === friends.length) {
          console.log(responses);

          var refResponsesOne = responses[0].filter(function(destination) {
            return responses[1].includes(destination);
          }.bind(this));

          var finalDes = refResponsesOne.filter(function(destination) {
            return responses[2].includes(destination);
          });

          this.setState({
            des: finalDes,
          });

          console.log(finalDes);
        }
      }.bind(this));
    }.bind(this));


    /*for(var i = 0; i < 1; i++) {
      var { location, budget } = friends[i];
      console.log(location,budget);
      var url = "https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=UYe3laOLWr1Aq8eN0iOxBXygxA84YNb5&origin=" + location + "&max_price=" + 200;
      console.log(url);
      axios.get(url)
      .then(response => responses.append(response.data));
      /*.then(function(response) {
        responses.append(response.data);
        console.log(response.data);
      });
    }*/
  }

  /*textCode(e) {
    e.preventDefault();

    axios({
      method: 'POST',
      url: 'https://api.twilio.com/2010-04-01',
      data: {
        'to': '+17279024583',
        'from': '+17278773264',
        'body': 'Join your friends for a Friendcation: https://20e07962.ngrok.io/friends/' + this.state.gId + '/join'
      }
    });

    //<i className="fa fa-share-alt fa-2x" onClick={this.textCode} aria-hidden="true"></i>

    console.log("hi");
  }*/

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
                  {
                    (this.props.location.pathname === "/friends/" + this.state.gId + "/join") ? (
                      <i className="fa fa-home fa-2x" onClick={() => this.props.history.push('/friends/' + this.state.gId)} aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-plus fa-2x" onClick={() => this.props.history.push('/friends/' + this.state.gId + '/join')} aria-hidden="true"></i>
                    )
                  }
                </div>
                <h3 className="">Friend(s)</h3>
                <p>Here are your friends who have signed up for the trip</p>
                {this.state.friends.map(this.renderFriend)}
                {
                  (this.props.location.pathname === "/friends/" + this.state.gId + "/join") ? (
                    <span>
                    <div style={{textAlign: "right"}}>
                    </div>
                    <Question title="Join the Friend-cation!" buttonTitle="Join!" onPress={this.onPress}/>
                    </span>
                  ) : (
                    <span>
                    <div className="Home-body-action">
                      <button className="btn btn-main" onClick={this.onDestination}>Find Our Destination</button>
                    </div>
                    </span>
                  )
                }
                {this.state.des.map(this.renderDes)}
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
