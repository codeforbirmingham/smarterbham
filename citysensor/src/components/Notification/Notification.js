/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar, { SnackbarContent } from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  info: {
    backgroundColor: '#333',
  },
  error: {
    backgroundColor: '#F44336',
  },
  success: {
    backgroundColor: '#27ae60',
  },
  warn: {
    backgroundColor: '#e67e22',
  },
});

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      message: props.message,
    };
    this.hideNotification = this.hideNotification.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show, message: nextProps.message });
  }

  hideNotification() {
    this.setState({ show: false, message: '' });
  }

  render() {
    const { show, message } = this.state;
    const { classes, type } = this.props;

    return (
      <Snackbar
        open={show}
        autoHideDuration={3000}
        onClose={this.hideNotification}
      >
        <SnackbarContent
          className={classes[type]}
          message={message}
        />
      </Snackbar>
    );
  }
}

Notification.defaultProps = {
  type: 'default',
};

Notification.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default withStyles(styles)(Notification);
