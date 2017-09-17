import React, { Component } from 'react';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            budget: "",
            destination: "",
            location: ""
        };
    }

    render() {
        return (
            <div className = "Question" >
                <form>
                    <div class="form-group">
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={(name) => this.setState(name)} />
                    </label>
                    </div>

                    <div class="form-group">
                    <label>
                        Budget:
                        <input type="text" value={this.state.budget} onChange={(budget) => this.setState(budget)} />
                    </label>
                    </div>

                    <div class="form-group">
                    <label>
                        Destination:
                        <input type="text" value={this.state.destination} onChange={(destination) => this.setState(destination)} />
                    </label>
                    </div>

                    <div class = "form-group">
                    <label>
                        Location:
                        <input type="text" value={this.state.locatioon} onChange={(location) => this.setState(location)} />
                    </label>
                    </div>
                    <input type="submit" value="Submit" />
                </form>

                <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
</form>
            </div

export default Question;
