import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
// Components
import Button from 'material-ui/Button';
import Input from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

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
    textAlign: 'left',
  },
  button: {
    marginTop: '10px',
    width: '100%',
  },
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      ssid: '',
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
          <Select
            fullWidth
            displayEmpty
            className={classes.input}
            value={this.state.ssid}
            onChange={event => this.setState({ ssid: event.target.value })}
          >
            <MenuItem value="">
              <em>Select WiFi Network</em>
            </MenuItem>
            <MenuItem value={'foo'}>Foo</MenuItem>
          </Select>
          <Input
            fullWidth
            type="password"
            label="WiFi Password"
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
            Register Device
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Register);
