import React, { Component } from 'react';

class Question extends Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);

        this.state = {
            name: "",
            budget: "",
            destination: "",
            location: ""
        };
    }

    onPress(e) {
      e.preventDefault();

      const {name, budget, destination, location} = this.state;

      this.props.onPress(name, budget, destination, location);
    }

    render() {
      const {name, budget, destination, location} = this.state;

      return (
        <div className="Question">
          <h3>{this.props.title}</h3>
            <div className="form-group">
              <label>What is your name?</label>
              <input type="text" className="form-control" placeholder="Enter a name" value={name} onChange={(e) => this.setState({name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>What is your budget?</label>
              <input type="text" className="form-control" placeholder="Enter a budget" value={budget} onChange={(e) => this.setState({budget: e.target.value})} />
            </div>
            <div className="form-group">
              <label>What airport will you fly to?</label>
              <input type="text" className="form-control" placeholder="Enter an airport" value={destination} onChange={(e) => this.setState({destination: e.target.value})} />
            </div>
            <div className="form-group">
              <label>What airport are you flying from</label>
              <input type="text" className="form-control" placeholder="Enter an airport" value={location} onChange={(e) => this.setState({location: e.target.value})} />
            </div>
            <button className="btn btn-main" onClick={this.onPress}>{this.props.buttonTitle}</button>
        </div>
      );
    }
}

export default Question;
