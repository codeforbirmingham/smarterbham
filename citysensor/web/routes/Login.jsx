import React, { Component } from 'react';
// Components
import Button from 'material-ui/Button';
import Input from 'material-ui/TextField';

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
            placeholder="username"
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
          />
          <Input
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
          />
          <Button
            raised
            onClick={this.onSubmit}
          >
            Submit
          </Button>
        </section>
      </div>
    );
  }
}

export default LoginView;
