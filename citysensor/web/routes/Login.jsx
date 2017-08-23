import React, { Component } from 'react';
// Components
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

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
      <div style={styles}>
        <form>
          <Input
            type="text"
            value={this.state.username}
            onChange={val => this.setState({ username: val })}
          />
          <Input
            type="password"
            value={this.state.password}
            onChange={val => this.setState({ password: val })}
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
