import React from 'react';
import Router from 'next/router';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import NProgress from 'nprogress';
import deviceApi from '../services/deviceApi';
import {
  ERROR,
  showNotification,
} from '../components/Notification';
import Layout from '../components/Layout';

const styles = () => ({
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

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      macAddress: '',
      password: '',
      networks: [],
      showPasswordField: false,
      isRegistering: false,
      error: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    deviceApi.get('/networks').then(res => this.setState({ networks: res.data }));
  }

  onSubmit() {
    const {
      networks,
      macAddress,
      password,
    } = this.state;
    const network = _.find(networks, { mac: macAddress }) || {};

    if (this.isValid()) {
      NProgress.start();
      this.setState({ isRegistering: true, error: false });
      deviceApi.post('/networks', { ssid: network.ssid, password })
        .then(() => {
          Router.replace('/');
          this.setState({ isRegistering: false });
          NProgress.done();
        })
        .catch(() => {
          showNotification(`Unable to connect to ${network.ssid}. Please try again.`, ERROR);
          this.setState({ isRegistering: false });
          NProgress.done();
        });
    }
  }

  isValid() {
    const {
      networks,
      macAddress,
      password,
    } = this.state;
    const network = _.find(networks, { mac: macAddress }) || {};
    let isValid;

    if (_.isEmpty(network.ssid)) {
      isValid = false;
    } else if (network.security !== 'NONE' && _.isEmpty(password)) {
      showNotification('Password required', ERROR);
      isValid = false;
    } else {
      isValid = true;
    }

    this.setState({ error: !isValid });
    return isValid;
  }

  handleNetworkSelect(macAddress) {
    const network = _.find(this.state.networks, { mac: macAddress });
    const showPasswordField = !_.isEmpty(macAddress) && network.security !== 'NONE';
    this.setState({ macAddress, showPasswordField });
  }

  renderSelectOptions() {
    return this.state.networks.map(network => (
      <MenuItem key={network.mac} value={network.mac}>
        {network.ssid} &nbsp;{network.security && <i className="fa fa-lock" />}
      </MenuItem>
    ));
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Grid item className={classes.item}>
          <h1>Smarter Bham Project</h1>
          <Select
            fullWidth
            displayEmpty
            className={classes.input}
            value={this.state.macAddress}
            onChange={event => this.handleNetworkSelect(event.target.value)}
            disabled={this.state.isRegistering || _.isEmpty(this.state.networks)}
          >
            <MenuItem value="">
              {_.isEmpty(this.state.networks)
                ? <em>Scanning Networks...</em>
                : <em>Select Network</em>
              }
            </MenuItem>
            {this.renderSelectOptions()}
          </Select>
          { this.state.showPasswordField && <Input
            fullWidth
            type="password"
            label="WiFi Password"
            className={classes.input}
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
            disabled={this.state.isRegistering}
            error={this.state.error}
          />
          }
          <Button
            raised
            color="primary"
            className={classes.button}
            onClick={this.onSubmit}
            disabled={this.state.isRegistering || _.isEmpty(this.state.macAddress)}
          >
            {this.state.isRegistering ? 'Connecting to WiFi...' : 'Register Device'}
          </Button>
        </Grid>
      </Layout>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Register);
