import React, { Component } from 'react';
// Components
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

class LoginView extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log(this.state);
  }

  render() {
    return (
      <div id="login">
        <section>
          <h1>Smarter Bham Project</h1>
          <Input
            type="text"
            label="username"
            value={this.state.username}
            onChange={val => this.setState({ username: val })}
          />
          <Input
            type="password"
            label="password"
            value={this.state.password}
            onChange={val => this.setState({ password: val })}
          />
          <Button
            label="Submit"
            primary
            raised
            onClick={this.onSubmit}
          />
        </section>
      </div>
    );
  }
}

export default LoginView;
