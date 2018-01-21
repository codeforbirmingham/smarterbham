/* eslint react/forbid-prop-types: "off", react/prefer-stateless-function: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { MuiThemeProvider } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import { theme } from './getPageContext';

class Layout extends React.Component {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ height: this.props.viewportHeight ? '100vh' : '100%', width: '100%' }}
        >
          {this.props.children}
        </Grid>
      </MuiThemeProvider>
    );
  }
}

Layout.defaultProps = {
  viewportHeight: false,
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  viewportHeight: PropTypes.bool,
};

export default Layout;
