import React, { Component } from 'react';
// Components
import { Button } from 'react-toolbox/lib/button';
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
      <div>
        <form>
          <Input
            type="text"
            value={this.state.username}
            onChange={(e, newValue) => this.setState({ username: newValue })}
          />
          <Input
            type="password"
            value={this.state.password}
            onChange={(e, newValue) => this.setState({ password: newValue })}
          />
          <Button
            label="Submit"
            primary
            style={{ marginTop: '20px' }}
            onClick={this.onSubmit}
          />
        </form>
      </div>
    );
  }
}

export default LoginView;
