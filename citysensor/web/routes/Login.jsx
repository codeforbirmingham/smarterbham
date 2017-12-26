import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
// Components
import Button from 'material-ui/Button';
import Input from 'material-ui/TextField';

const styles = () => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  item: {
    textAlign: 'center',
  },
  input: {
    marginBottom: '10px',
  },
  button: {
    marginTop: '10px',
    width: '100%',
  },
});

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
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item className={classes.item}>
          <h1>Smarter Bham Project</h1>
          <Input
            fullWidth
            type="text"
            label="username"
            className={classes.input}
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
          />
          <Input
            fullWidth
            type="password"
            label="password"
            className={classes.input}
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
          />
          <Button
            raised
            color="primary"
            className={classes.button}
            onClick={this.onSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  }
}

LoginView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(LoginView);
