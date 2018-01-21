import React from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import io from 'socket.io-client';
import Container from '../components/Container';
import withRoot from '../components/withRoot';

const styles = () => ({
  table: {
    width: '80%',
    margin: '0 auto',
  },
});

class DeviceView extends React.Component {
  constructor() {
    super();
    this.socket = io('http://localhost:3000');
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
    // TODO: handle accepted/rejected on 'status' event
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
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
      </Container>
    );
  }
}

DeviceView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRoot(withStyles(styles)(DeviceView));
