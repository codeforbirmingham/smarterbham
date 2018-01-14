import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import io from 'socket.io-client';

const styles = () => ({
  root: {
    textAlign: 'center',
  },
  table: {
    width: '80%',
    margin: '0 auto',
  },
});

class DeviceView extends React.Component {
  constructor() {
    super();
    this.socket = io(process.env.NODE_URL);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    this.setupListeners();
  }

  componentWillUnmount() {
    this.socket.close();
  }

  setupListeners() {
    this.socket.on('update', (data) => {
      const dataArr = this.state.data;
      dataArr.push(data);
      this.setState({ data: dataArr });
    });
    // TODO: handle accepted/rejected
    this.socket.on('status', status => console.log(status));
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.root}>
        <h1>Device is registered!</h1>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Temperature (F)</TableCell>
              <TableCell>Humidity</TableCell>
              <TableCell>Noise</TableCell>
              <TableCell>Lights</TableCell>
              <TableCell>Particle Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((n, i) => (
              <TableRow key={i}>
                <TableCell>{n.temperature}</TableCell>
                <TableCell>{n.humidity}</TableCell>
                <TableCell>{n.noise}</TableCell>
                <TableCell>{n.lights}</TableCell>
                <TableCell>{n.particle_size}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    );
  }
}

DeviceView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(DeviceView);
